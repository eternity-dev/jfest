<?php

namespace App\Http\Controllers\User\Order;

use App\Enums\EventTypeEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Order\AddNewTicketOrderRequest;
use App\Models\Activity;
use App\Models\Ticket;
use App\Services\Order\OrderService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class AddNewTicketOrderController extends Controller
{
    public function create(Request $request, Activity $activity)
    {
        if (!$activity->sale->is_tickets_available) {
            $request->session()->flash(
                'message',
                sprintf(
                    'Tickets for %s already sold out',
                    $activity->sale->name
                )
            );

            return Inertia::location(route('global.home'));
        }

        $activity->type = EventTypeEnum::Activity->value;

        return Inertia::render('order/ticket/index', [
            'data' => $activity,
            ...$this->withLinkProps($request, [
                'submitUrl' => route('user.order.activity.store', compact('activity'))
            ]),
            ...$this->withAuthProps($request),
            ...$this->withMetaProps([
                'head' => [
                    'title' => $this->appName . ' - Order Ticket',
                    'description' => $this->appName . ' order tickets page'
                ]
            ])
        ]);
    }

    public function store(
        AddNewTicketOrderRequest $request,
        Activity $activity,
        OrderService $orderService
    ) {
        if (!$activity->sale->is_tickets_available) {
            $request->session()->flash(
                'message',
                sprintf(
                    'Tickets for %s already sold out',
                    $activity->sale->name
                )
            );

            return Inertia::location(route('global.home'));
        }

        $amount = $request->only('amount')['amount'];
        $user = $request->user();

        $isSuccess = $orderService->createTicketsOrder(
            $user,
            $activity,
            $amount
        );

        abort_unless(
            $isSuccess,
            Response::HTTP_SERVICE_UNAVAILABLE,
            'Internal server error'
        );

        return Inertia::location(route('user.order.index'));
    }
}
