<?php

namespace App\Services\Order;

use App\Enums\OrderStatusEnum;
use App\Models\Activity;
use App\Models\Order;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Support\Collection;

class CreateNewTicketsOrderService
{
    public function handle(User $user, Activity $activity, int $amount)
    {
        try {
            if ($user->orders->isEmpty()) {
                $order = new Order([
                    'total_price' => $activity->price * $amount
                ]);

                $user->orders()->save($order);
                $order->tickets()->saveMany($this->generateTickets($user, $activity, $amount));
            } else {
                $order = $user->order()->where([
                    ['status', OrderStatusEnum::Pending->value],
                    ['expired_at', '>', now()]
                ])->first();

                if (is_null($order)) {
                    $order = new Order([
                        'total_price' => $activity->price * $amount
                    ]);

                    $user->orders()->save($order);
                    $order->tickets()->saveMany($this->generateTickets($user, $activity, $amount));
                } else {
                    $order->tickets()->saveMany($this->generateTickets($user, $activity, $amount));
                }
            }

            return true;
        } catch (\Throwable $exception) {
            return false;
        }
    }

    private function generateTickets(User $user, Activity $activity, int $amount)
    {
        $tickets = new Collection([]);

        for ($i = 0; $i < $amount; $i++) {
            $tickets->push(new Ticket([
                'activity_id' => $activity->id,
                'user_id' => $user->uuid
            ]));
        }

        return $tickets;
    }
}
