<?php

namespace App\Services\Payment\Providers;

use App\Enums\OrderStatusEnum;
use App\Enums\PaymentStatusEnum;
use App\Mail\Payment\SuccessPayment;
use App\Models\Order;
use App\Models\Registration;
use App\Models\Ticket;
use App\Models\User;
use App\Services\Contract\PaymentProvider;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Midtrans\Notification;
use Midtrans\Snap;

class MidtransProvider implements PaymentProvider
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

    public function handleRedirect(User $user, callable $beforeCallback): RedirectResponse
    {
        $order = $user->orders()->where([
            ['status', OrderStatusEnum::Pending],
            ['expired_at', '>', now()]
        ])->latest()->first();

        if (!is_null($order->payment) && $order->payment->amount === $order->total_price) {
            return Redirect::away($order->payment->link);
        }

        $orderId = Str::upper(sprintf('%s#%s', $order->reference, Str::random(4)));
        $orderGrossAmount = $order->total_price + self::FEE;

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => $orderGrossAmount
            ],
            'item_details' => array_merge(
                [[
                    'price' => self::FEE,
                    'quantity' => 1,
                    'name' => 'Transaction Fee',
                    'category' => 'fee'
                ]],
                $this->mapTicketsToItems($order->tickets),
                $this->mapRegistrationsToItems($order->registrations)
            ),
            'customer_details' => [
                'email' => $user->email
            ],
            'page_expiry' => [
                'duration' => 1,
                'unit' => 'days'
            ],
            'callbacks' => [
                'finish' => route('user.payment.fallback.midtrans'),
                'unfinish' => route('user.order.index')
            ]
        ];

        $transaction = Snap::createTransaction($params);

        call_user_func_array($beforeCallback, [
            $order,
            [
                'link' => $transaction->redirect_url,
                'fee' => self::FEE
            ]
        ]);

        logger()->channel('stack')->info('Payment snap', [
            'link' => $transaction->redirect_url
        ]);

        return Redirect::away($transaction->redirect_url);
    }

    public function handleNotification(callable $afterCallback): array
    {
        try {
            $notification = new Notification();

            $trxId = $notification->transaction_id;
            $trxStatus = $notification->transaction_status;
            $trxFraudStatus = $notification->fraud_status;
            $trxSigKey = $notification->signature_key;
            $trxPaymentType = $notification->payment_type;
            $trxStatusCode = $notification->status_code;
            $trxGrossAmount = $notification->gross_amount;

            $orderId = explode('#', $notification->order_id)[0];

            logger()->channel('stack')->info('Midtrans notification received', [
                'order_id' => $orderId,
                'trx_id' => $trxId,
                'trx_status' => $trxStatus
            ]);

            if (!$this->signatureIsValid(
                $trxSigKey,
                $notification->order_id,
                $trxStatusCode,
                $trxGrossAmount
            )) {
                throw new \Exception('Invalid signature key provided');
            }

            $order = Order::where('reference', $orderId)->firstOrFail();

            $payment = $order->payment;
            $payment->transaction_id = $trxId;
            $payment->method = $trxPaymentType;

            $meta = [
                'trx_id' => $trxId,
                'trx_status' => $trxStatus,
                'order_status' => OrderStatusEnum::Pending,
                'payment_status' => PaymentStatusEnum::Pending
            ];

            switch ($trxStatus) {
                case self::STATUS_CAPTURE:
                case self::STATUS_SETTLEMENT:
                    if ($trxFraudStatus == self::FRAUD_ACCEPT) {
                        $meta['order_status'] = OrderStatusEnum::Paid;
                        $meta['payment_status'] = PaymentStatusEnum::Success;
                        break;
                    } else if ($trxFraudStatus == self::FRAUD_CHALLENGE) {
                        $meta['order_status'] = OrderStatusEnum::Paid;
                        $meta['payment_status'] = PaymentStatusEnum::Challenge;
                        break;
                    }
                case self::STATUS_CANCEL:
                    $meta['payment_status'] = PaymentStatusEnum::Canceled;
                    break;
                case self::STATUS_DENY:
                    $meta['payment_status'] = PaymentStatusEnum::Failed;
                    break;
                case self::STATUS_EXPIRE:
                    $meta['payment_status'] = PaymentStatusEnum::Expired;
                    break;
                case self::STATUS_FAILURE:
                    $meta['payment_status'] = PaymentStatusEnum::Failed;
                    break;
                default: break;
            }

            if ($meta['order_status'] == OrderStatusEnum::Paid) {
                Mail::to($order->user->email)->send(new SuccessPayment($order));

                logger()->channel('email')->info('New email has been sent', [
                    'from' => env('MAIL_FROM_ADDRESS'),
                    'to' => $order->user->email
                ]);
            }

            call_user_func_array($afterCallback, [
                $order,
                $payment,
                $meta,
            ]);

            $order->status = $meta['order_status'];
            $payment->status = $meta['payment_status'];

            $order->save();
            $payment->save();

            logger()->channel('stack')->info(
                'Notification has been processed',
                $meta
            );

            return [
                'message' => 'Midtrans notification received',
                'status' => Response::HTTP_OK
            ];
        } catch (ModelNotFoundException) {
            logger()->channel('error')->error('Invalid order id provided', [
                'order_id' => $orderId
            ]);

            return [
                'message' => 'Invalid order id provided',
                'status' => Response::HTTP_BAD_REQUEST
            ];
        } catch (\Exception|\Throwable $exception) {
            logger()->channel('error')->error($exception->getMessage(), [
                'order_id' => $orderId
            ]);

            return [
                'message' => $exception->getMessage(),
                'status' => Response::HTTP_SERVICE_UNAVAILABLE,
            ];
        }
    }

    private function mapRegistrationsToItems(Collection $registrations)
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

    private function mapTicketsToItems(Collection $tickets)
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

    private function signatureIsValid(
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
