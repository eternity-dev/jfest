<?php

namespace App\Http\Controllers\User\Checkout;

use App\Enums\OrderStatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutInfoController extends Controller
{
    public function __invoke(Request $request, Order $order)
    {
        try {
            $order = $order->where('id', $order->id)->with([
                'tickets' => ['activity:id,name,slug,price'],
                'registrations' => ['competition:id,name,slug,price']
            ])->first();

            return Inertia::render('checkout/index', [
                'data' => $order,
                ...$this->withLinkProps($request, [
                    'redirectToPaymentUrl' => route('user.payment.redirect', compact('order'))
                ]),
                ...$this->withAuthProps($request),
                ...$this->withMetaProps([
                    'head' => [
                        'title' => $this->appName . ' - Checkout',
                        'description' => 'Checkout orders list that you have been waiting for'
                    ]
                ])
            ]);
        } catch (\Throwable|ModelNotFoundException $exception) {
            logger()->channel('error')->error($exception->getMessage());
        }
    }
}
