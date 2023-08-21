<?php

namespace App\Services\Order;

use App\Enums\OrderStatusEnum;
use App\Models\Competition;
use App\Models\Order;
use App\Models\Registration;
use App\Models\User;

class CreateNewRegistrationOrderService
{
    public function handle(User $user, Competition $competition, array $data)
    {
        try {
            if ($user->orders->isEmpty()) {
                $order = new Order([
                    'total_price' => $competition->price,
                ]);

                $user->orders()->save($order);
                $user->registrations()->save($this->generateRegistration($user, $competition, $data));
            } else {
                $order = $user->order()->where([
                    ['status', OrderStatusEnum::Pending->value],
                    ['expired_at', '>', now()]
                ])->first();

                if (is_null($order)) {
                    $order = new Order([
                        'total_price' => $competition->price
                    ]);

                    $user->orders()->save($order);
                    $order->registrations()->save($this->generateRegistration($user, $competition, $data));
                } else {
                    $order->registrations()->save($this->generateRegistration($user, $competition, $data));
                }
            }

            return true;
        } catch (\Throwable $exception) {
            dd($exception);
            return false;
        }
    }

    private function generateRegistration(User $user, Competition $competition, array $data)
    {
        return new Registration([
            'competition_id' => $competition->id,
            'user_id' => $user->uuid,
            'email' => $data['email'],
            'name' => $data['name'],
            'phone' => $data['phone'],
            'instagram' => $data['instagram'],
            'nickname' => $data['nickname']
        ]);
    }
}
