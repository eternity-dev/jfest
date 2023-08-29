<?php

namespace App\Services\Payment;

use App\Enums\OrderStatusEnum;
use App\Enums\PaymentStatusEnum;
use App\Mail\Payment\PendingPayment;
use App\Mail\Payment\SuccessPayment;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Registration;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Midtrans\Notification;
use Midtrans\Snap;

class MidtransPaymentService
{
    public const FRAUD_ACCEPT = 'accept';
    public const FRAUD_CHALLENGE = 'challenge';

    public const STATUS_CAPTURE = 'capture';
    public const STATUS_SETTLEMENT = 'settlement';
    public const STATUS_PENDING = 'pending';
    public const STATUS_DENY = 'deny';
    public const STATUS_CANCEL = 'cancel';
    public const STATUS_EXPIRE = 'expire';
    public const STATUS_FAILURE = 'failure';

    public function handleRedirect(User $user)
    {
        $orderFee = 2000;
        $order = $user->orders()->where([
            ['status', OrderStatusEnum::Pending],
            ['expired_at', '>', now()]
        ])->latest()->first();

        if (!is_null($order->payment) && $order->payment->amount === $order->total_price) {
            return redirect()->away($order->payment->link);
        }

        $params = [
            'transaction_details' => [
                'order_id' => Str::upper(sprintf('%s#%s', $order->reference, Str::random('4'))),
                'gross_amount' => $order->total_price + $orderFee
            ],
            'item_details' => array_merge(
                [],
                $this->transformTicketsToItemsList($order->tickets),
                $this->transformRegistrationsToItemsList($order->registrations)
            ),
            'customer_details' => [
                'email' => $user->email,
            ],
            'page_expiry' => [
                'duration' => 1,
                'unit' => 'days'
            ],
            'callbacks' => [
                'finish' => route('user.payment.fallback'),
                'unfinish' => route('user.order.index')
            ]
        ];

        $transaction = Snap::createTransaction($params);
        $payment = new Payment([
            'amount' => $order->total_price,
            'fee' => $orderFee,
            'link' => $transaction->redirect_url
        ]);

        logger()->channel('stack')->debug('Payment has been created', [
            'user_id' => $user->uuid,
            'payment_id' => $payment->id
        ]);

        $order->payment()->save($payment);
        return redirect()->away($payment->link);
    }

    public function handleOnCallback(callable $afterCallback)
    {
        try {
            $notification = new Notification();

            $trxId = $notification->transaction_id;
            $trxStatus = $notification->transaction_status;
            $trxFraudStatus = $notification->fraud_status;
            $trxSigKey = $notification->signature_key;

            $orderId = explode('#', $notification->order_id)[0];
            $paymentType = $notification->payment_type;
            $statusCode = $notification->status_code;
            $grossAmount = $notification->gross_amount;

            logger()->channel('stack')->debug('Notification has been received', [
                'order_id' => $orderId,
                'trx_id' => $trxId,
                'trx_status' => $trxStatus
            ]);

            if (!$this->verifySignature(
                $trxSigKey,
                $notification->order_id,
                $statusCode,
                $grossAmount
            )) {
                throw new \Exception('Invalid payment signature key');
            }

            $order = Order::where('reference', $orderId)->firstOrFail();
            $payment = $order->payment;

            $payment->transaction_id = $trxId;
            $payment->method = $paymentType;

            switch ($trxStatus) {
                case self::STATUS_CAPTURE:
                case self::STATUS_SETTLEMENT:
                    if ($trxFraudStatus == self::FRAUD_CHALLENGE) {
                        $order->status = OrderStatusEnum::Paid;
                        $payment->status = PaymentStatusEnum::Challenge;

                        logger()->channel('stack')->info('Payment success', [
                            'order_id' => $orderId,
                            'user_id' => $order->user->uuid,
                            'trx_id' => $trxId,
                        ]);
                        break;
                    } else {
                        $order->status = OrderStatusEnum::Paid;
                        $payment->status = PaymentStatusEnum::Success;

                        logger()->channel('stack')->info('Payment success', [
                            'order_id' => $orderId,
                            'user_id' => $order->user->uuid,
                            'trx_id' => $trxId,
                        ]);
                        break;
                    }
                case self::STATUS_CANCEL:
                    $payment->status = PaymentStatusEnum::Canceled;

                    logger()->channel('stack')->info('Payment status changed',  [
                        'order_id' => $orderId,
                        'trx_id' => $trxId,
                        'status' => $payment->status
                    ]);
                    break;
                case self::STATUS_DENY:
                    $payment->status = PaymentStatusEnum::Failed;

                    logger()->channel('stack')->warning('Payment status changed',  [
                        'order_id' => $orderId,
                        'trx_id' => $trxId,
                        'status' => $payment->status
                    ]);
                    break;
                case self::STATUS_EXPIRE:
                    $payment->status = PaymentStatusEnum::Expired;

                    logger()->channel('stack')->info('Payment status changed',  [
                        'order_id' => $orderId,
                        'trx_id' => $trxId,
                        'status' => $payment->status
                    ]);
                    break;
                case self::STATUS_FAILURE:
                    $payment->status = PaymentStatusEnum::Failed;

                    logger()->channel('stack')->info('Payment status changed',  [
                        'order_id' => $orderId,
                        'trx_id' => $trxId,
                        'status' => $payment->status
                    ]);
                    break;
                default:
                    $payment->status = PaymentStatusEnum::Pending;

                    logger()->channel('stack')->info('Payment status changed',  [
                        'order_id' => $orderId,
                        'trx_id' => $trxId,
                        'status' => $payment->status
                    ]);
                    break;
            }

            if ($order->status === OrderStatusEnum::Paid) {
                Mail::to($order->user->email)->send(new SuccessPayment($order));

                logger()->channel('email')->info('Email sent successfully', [
                    'from' => env('MAIL_FROM_ADDRESS'),
                    'to' => $order->user->email
                ]);
            }

            $order->save();
            $payment->save();

            call_user_func_array($afterCallback, [
                $order,
                $payment
            ]);

            return [
                'message' => 'Notification received',
                'status' => Response::HTTP_OK
            ];
        } catch (ModelNotFoundException) {
            logger()->channel('error')->error('Invalid order id provided', [
                'order_id' => $orderId,
            ]);

            return [
                'message' => 'Invalid order id',
                'status' => Response::HTTP_BAD_REQUEST
            ];
        } catch (\Throwable $exception) {
            logger()->channel('error')->error($exception->getMessage(), [
                'order_id' => $orderId,
            ]);

            return [
                'message' => $exception->getMessage(),
                'status' => Response::HTTP_SERVICE_UNAVAILABLE
            ];
        }
    }

    private function transformRegistrationsToItemsList(Collection $registrations)
    {
        return $registrations->map(function (Registration $registration) {
            return [
                'id' => $registration->competition->slug,
                'price' => $registration->price,
                'quantity' => 1,
                'name' => $registration->competition->name,
                'category' => $registration->competition->type
            ];
        })->groupBy('price')->map(function (Collection $item, int $price) {
            return array_merge($item[0], [
                'price' => $price,
                'quantity' => $item->count()
            ]);
        })->values()->all();
    }

    private function transformTicketsToItemsList(Collection $tickets)
    {
        return $tickets->map(function (Ticket $ticket) {
            return [
                'id' => $ticket->activity->slug,
                'price' => $ticket->price,
                'quantity' => 1,
                'name' => $ticket->activity->name,
                'category' => $ticket->activity->type
            ];
        })->groupBy('price')->map(function (Collection $item, int $price) {
            return array_merge($item[0], [
                'price' => $price,
                'quantity' => $item->count()
            ]);
        })->values()->all();
    }

    private function verifySignature(
        string $sigKey,
        string $orderId,
        string $statusCode,
        string $grossAmount,
        ): bool
    {
        $serverKey = config('services.midtrans.server_key');

        $hashedSigKey = $orderId;
        $hashedSigKey .= $statusCode;
        $hashedSigKey .= $grossAmount;
        $hashedSigKey .= $serverKey;

        $hashedSigKey = hash('sha512', $hashedSigKey);

        return $hashedSigKey == $sigKey;
    }
}
