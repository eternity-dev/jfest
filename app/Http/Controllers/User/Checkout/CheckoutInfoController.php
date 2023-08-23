<?php

namespace App\Http\Controllers\User\Checkout;

use App\Enums\OrderStatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutInfoController extends Controller
{
    public function __invoke(Request $request, Order $order)
    {
        $order = $order->where('id', $order->id)->with([
            'tickets' => ['activity'],
            'registrations' => ['competition:id,name,slug,price']
        ])->first();

        return Inertia::render('checkout/index', [
            'data' => $order,
            ...$this->withLinkProps($request, [
                'nextPageUrl' => route('user.checkout.payment', compact('order'))
            ]),
            ...$this->withAuthProps($request),
            ...$this->withMetaProps([
                'head' => [
                    'title' => $this->appName . ' - Checkout',
                    'description' => 'Checkout orders list that you have been waiting for'
                ]
            ])
        ]);
    }
}
