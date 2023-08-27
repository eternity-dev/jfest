<?php

namespace App\Http\Controllers\User\Payment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentFallbackController extends Controller
{
    public function __invoke(Request $request)
    {
        return Inertia::render('payment/fallback', [
            'data' => [
                'orderId' => $request->query('order_id'),
                'statusCode' => $request->query('status_code'),
                'transactionStatus' => $request->query('transaction_status'),
            ],
            ...$this->withLinkProps($request, [
                'historyPageUrl' => route('user.history.index')
            ]),
            ...$this->withAuthProps($request),
            ...$this->withMetaProps([
                'head' => [
                    'title' => $this->appName . ' - Thanks'
                ]
            ])
        ]);
    }
}
