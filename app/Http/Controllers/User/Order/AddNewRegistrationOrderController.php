<?php

namespace App\Http\Controllers\User\Order;

use App\Enums\EventTypeEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Order\AddNewRegistrationOrderRequest;
use App\Models\Competition;
use App\Services\Order\OrderService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class AddNewRegistrationOrderController extends Controller
{
    public function create(Request $request, Competition $competition)
    {
        $competition->type = EventTypeEnum::Competition->value;

        return Inertia::render('order/registration/index', [
            'data' => $competition,
            ...$this->withLinkProps($request, [
                'submitUrl' => route('user.order.competition.store', compact('competition'))
            ]),
            ...$this->withAuthProps($request),
            ...$this->withMetaProps([
                'head' => [
                    'title' => $this->appName . ' - New Registration',
                    'description' => $this->appName . ' competition registration page'
                ]
            ])
        ]);
    }

    public function store(
        AddNewRegistrationOrderRequest $request,
        Competition $competition,
        OrderService $orderService
    ) {
        $data = $request->validated();
        $user = $request->user();

        $isSuccess = $orderService->createRegistrationOrder(
            $user,
            $competition,
            $data
        );

        abort_unless(
            $isSuccess,
            Response::HTTP_SERVICE_UNAVAILABLE,
            'Internal server error'
        );

        return Inertia::location(route('user.order.index'));
    }
}
