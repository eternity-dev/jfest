<?php

namespace App\Http\Controllers\User\Payment;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use App\Services\Payment\PaymentService;
use Illuminate\Http\Request;

class PaymentRedirectController extends Controller
{
    public function __invoke(Request $request, PaymentService $paymentService)
    {
        try {
            return $paymentService->redirect(
                'midtrans',
                $request->user(),
                function (Order $order, array $meta) {
                    $payment = new Payment([
                        'amount' => $order->total_price,
                        'fee' => $meta['fee'],
                        'link' => $meta['link']
                    ]);

                    $order->payment()->save($payment);
                    logger()->channel('stack')->info('Payment instance has been created', [
                        'user_id' => $order->user->uuid,
                        'order_id' => $order->reference
                    ]);
                }
            );
        } catch (\Throwable|\Exception $exception) {
            logger()->channel('error')->error($exception->getMessage());
        }
    }
}
