<?php

namespace App\Http\Controllers\User\Payment;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Ticket;
use App\Services\Payment\PaymentService;
use Illuminate\Support\Str;

class PaymentNotificationController extends Controller
{
    public function __invoke(PaymentService $paymentService)
    {
        try {
            $response = $paymentService->callback('midtrans', function (Order $order) {
                $dbTicketsCount = Ticket::count();
                $currTicketsCount = $order->tickets->count();

                $order->tickets->each(function ($ticket, $idx) use (
                    $dbTicketsCount,
                    $currTicketsCount
                ) {
                    $uniqueCount = ($dbTicketsCount - $currTicketsCount) + ($idx + 1);

                    $ticket->uuid = Str::uuid();
                    $ticket->code = Str::upper(Str::slug(sprintf(
                        '%s-%s',
                        sprintf(
                            '%s-%s-%s',
                            env('APP_NAME'),
                            $ticket->activity->id,
                            explode('-', $ticket->user_id)[0]
                        ),
                        Str::padLeft($uniqueCount, 7, '0')
                    )));

                    $ticket->save();
                });

                $order->registrations->each(function ($registration) {
                    $registration->uuid = Str::uuid();
                    $registration->save();
                });
            });

            return response()->json([
                'message' => $response['message']
            ], $response['status']);
        } catch (\Throwable $exception) {
            logger()->channel('error')->error($exception->getMessage());
        }
    }
}
