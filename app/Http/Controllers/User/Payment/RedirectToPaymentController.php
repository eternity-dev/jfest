<?php

namespace App\Http\Controllers\User\Payment;

use App\Enums\OrderStatusEnum;
use App\Enums\PaymentStatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Midtrans\Snap;

class RedirectToPaymentController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();

        $orderFee = 4000;
        $order = $user->orders()->where([
            ['status', OrderStatusEnum::Pending->value],
            ['expired_at', '>', now()]
        ])->latest()->first();

        $transactionDetails = [
            'order_id' => $order->reference,
            'gross_amount' => $order->total_price + $orderFee
        ];

        $ticketsDetails = $order->tickets->map(function ($ticket) {
            return [
                'id' => $ticket->activity->slug,
                'price' => $ticket->price,
                'quantity' => 1,
                'name' => $ticket->activity->name,
                'category' => $ticket->activity->type
            ];
        })->groupBy('price')->map(function ($item, $price) {
            return array_merge($item[0], [
                'price' => $price,
                'quantity' => $item->count()
            ]);
        })->values()->all();

        $registrationsDetails = $order->registrations->map(function ($registration) {
            return [
                'id' => $registration->competition->slug,
                'price' => $registration->price,
                'quantity' => 1,
                'name' => $registration->competition->name,
                'category' => $registration->competition->type
            ];
        })->groupBy('price')->map(function ($item, $price) {
            return array_merge($item[0], [
                'price' => $price,
                'quantity' => $item->count()
            ]);
        })->values()->all();

        $itemDetails = array_merge($ticketsDetails, $registrationsDetails);
        $customerDetails = ['email' => $user->email];

        $transaction = Snap::createTransaction([
            'transaction_details' => $transactionDetails,
            'item_details' => $itemDetails,
            'customer_details' => $customerDetails,
            'page_expiry' => ['duration' => 1, 'unit' => 'days'],
            'callbacks' => [
                'finish' => route('user.checkout.summary', compact('order'))
            ]
        ]);

        $order->payment()->save(new Payment([
            'amount' => $order->total_price,
            'fee' => $orderFee,
            'link' => $transaction->redirect_url,
            'status' => PaymentStatusEnum::Pending->value
        ]));

        return redirect()->away($transaction->redirect_url);
    }
}
