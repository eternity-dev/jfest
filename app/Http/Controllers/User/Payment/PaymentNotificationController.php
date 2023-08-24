<?php

namespace App\Http\Controllers\User\Payment;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\Payment\PaymentService;
use Illuminate\Support\Str;

class PaymentNotificationController extends Controller
{
    public function __invoke(PaymentService $paymentService)
    {
        $response = $paymentService->callback('midtrans', function (Order $order) {
            $ticketsCount = $order->tickets->count();

            $order->tickets->each(function ($ticket) use ($ticketsCount) {
                $ticket->uuid = Str::uuid();
                $ticket->code = Str::upper(Str::slug(sprintf(
                    '%s-%s',
                    uniqid(sprintf('%s-%s', env('APP_NAME'), $ticket->activity->id), true),
                    Str::padLeft($ticketsCount, 5, '0')
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
    }
}
