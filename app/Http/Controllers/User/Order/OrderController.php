<?php

namespace App\Http\Controllers\User\Order;

use App\Enums\OrderStatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Services\Order\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function __invoke(Request $request, OrderService $orderService)
    {
        $activity = Activity::where('slug', 'japanese-festival-7')->first();
        $order = $request->user()->orders()->where([
            ['status', OrderStatusEnum::Pending->value],
            ['expired_at', '>', now()]
        ])->with([
            'tickets' => ['activity' => ['sale']],
            'registrations' => ['competition']
        ])->latest()->first();

        if (!is_null($order)) {
            $orderService->remapTickets($order->tickets);
            $orderService->remapRegistrations($order->registrations);
        }

        return Inertia::render('order/index', [
            'data' => $order,
            ...$this->withLinkProps($request, [
                'checkoutUrl' => !is_null($order) ? route('user.checkout.index', compact('order')) : null,
                'orderTicketUrl' => route('user.order.activity.create', compact('activity'))
            ]),
            ...$this->withAuthProps($request),
            ...$this->withMetaProps([
                'head' => [
                    'title' => $this->appName . ' - My Orders',
                    'description' => 'List of all my orders page'
                ]
            ])
        ]);
    }
}
