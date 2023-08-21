<?php

namespace App\Services\Order;

use App\Models\Activity;
use App\Models\User;

class OrderService
{
    public function createTicketsOrder(User $user, Activity $activity, int $amount)
    {
        return (new CreateNewTicketsOrderService())->handle($user, $activity, $amount);
    }
}
