<?php

namespace App\Services\Order;

use App\Models\Order;

class RemapTicketOrderService
{
    public function handle(Order &$order)
    {
        $order->tickets->map(function ($ticket) {
            $date = $ticket->activity->date;
            $ticket->activity->dateStr = $date->diffForHumans();

            return $ticket;
        });
    }
}
