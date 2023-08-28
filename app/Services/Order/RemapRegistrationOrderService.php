<?php

namespace App\Services\Order;

use App\Models\Order;

class RemapRegistrationOrderService
{
    public function handle(Order|null &$order)
    {
        if (is_null($order)) {
            return;
        }

        $order->registrations->map(function ($registration) {
            $date = $registration->competition->registration_closed_at;
            $registration->competition->registrationCloseAtStr = $date->diffForHumans();
            $registration->remove_url = route('user.order.competition.remove', [
                'registration' => $registration
            ]);

            return $registration;
        });
    }
}
