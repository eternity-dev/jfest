<?php

namespace App\Http\Controllers\User\Payment;

use App\Enums\PaymentStatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Midtrans\Notification as MidtransNotification;

class PaymentNotificationController extends Controller
{
    public const FRAUD_ACCEPT = 'accept';
    public const FRAUD_CHALLENGE = 'challenge';

    public const STAT_CANCEL = 'cancel';
    public const STAT_CAPTURE = 'capture';
    public const STAT_DENY = 'deny';
    public const STAT_SETTLEMENT = 'settlement';

    public function __invoke(Request $request)
    {
        try {
            $user = $request->user();
            $transaction = new MidtransNotification();

            $paymentId = $transaction->payment_id;
            $paymentOrderId = $transaction->order_id;
            $paymentStatus = $transaction->transaction_status;
            $paymentType = $transaction->payment_type;

            $fraudStatus = $transaction->fraud_status;

            $order = $user->orders()->where('reference', $paymentOrderId)->first();
            $payment = $order->payment;
            $newPaymentData = [
                'transaction_id' => $paymentId,
                'method' => $paymentType,
            ];

            if ($paymentStatus == self::STAT_CAPTURE) {
                if ($fraudStatus == self::FRAUD_ACCEPT) {
                    $paymentData['status'] = PaymentStatusEnum::Success->value;
                } else if ($fraudStatus == self::FRAUD_CHALLENGE) {
                    $paymentData['status'] = PaymentStatusEnum::Challenge->value;
                }
            } else if ($paymentStatus == self::STAT_SETTLEMENT) {
                if ($fraudStatus == self::FRAUD_ACCEPT) {
                    $paymentData['status'] = PaymentStatusEnum::Success->value;
                } else if ($fraudStatus == self::FRAUD_CHALLENGE) {
                    $paymentData['status'] = PaymentStatusEnum::Challenge->value;
                }
            } else if ($paymentStatus == self::STAT_CANCEL) {
                $paymentData['status'] = PaymentStatusEnum::Canceled->value;
            } else if ($paymentStatus == self::STAT_DENY) {
                $paymentData['status'] = PaymentStatusEnum::Failed->value;
            }

            $this->updatePayment($payment, $newPaymentData);

            logger()->debug('Notification received', [
                'transaction_id' => $paymentId,
                'order_id' => $paymentOrderId
            ]);
        } catch (\Throwable $exception) {
            logger()->warning($exception->getMessage(), [
                'transaction_id' => $paymentId,
                'order_id' => $paymentOrderId
            ]);
        }
    }

    private function updatePayment(Payment $payment, array $updatedData)
    {
        $payment->transaction_id = $updatedData['transaction_id'];
        $payment->method = $updatedData['method'];
        $payment->status = $updatedData['status'];

        $payment->save();
    }
}
