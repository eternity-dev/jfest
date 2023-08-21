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
        $order = $request->user()->order()->where([
            ['status', OrderStatusEnum::Pending->value],
            ['expired_at', '>', now()]
        ])->with([
            'tickets' => ['activity:id,name,slug,price,date'],
            'registrations' => ['competition:id,name,slug,price,group_url,registration_closed_at']
        ])->first();

        $orderService->remapTicketOrder($order);
        $orderService->remapRegistrationOrder($order);

        return Inertia::render('order/index', [
            'data' => $order,
            ...$this->withLinkProps($request, [
                'checkoutUrl' => route('user.order.checkout'),
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
