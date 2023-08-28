<?php

namespace App\Services\Order;

use App\Models\Order;

class RemapTicketOrderService
{
    public function handle(Order|null &$order)
    {
        if (is_null($order)) {
            return;
        }

        $order->tickets->map(function ($ticket) {
            $date = $ticket->activity->date;
            $ticket->activity->dateStr = $date->diffForHumans();
            $ticket->remove_url = route('user.order.activity.remove', [
                'ticket' => $ticket
            ]);

            return $ticket;
        });
    }
}
