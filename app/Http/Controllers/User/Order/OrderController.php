<?php

namespace App\Http\Controllers\User\Order;

use App\Enums\OrderStatusEnum;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function __invoke(Request $request)
    {
        $order = $request->user()->order()->where([
            ['status', OrderStatusEnum::Pending->value],
            ['expired_at', '>', now()]
        ])->with(['tickets', 'registrations'])->first();

        dd($order->tickets, $order->registrations);
    }
}
