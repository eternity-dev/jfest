<?php

namespace App\Services\Order;

use App\Models\Activity;
use App\Models\Order;
use App\Models\User;

class OrderService
{
    public function createTicketsOrder(User $user, Activity $activity, int $amount)
    {
        return (new CreateNewTicketsOrderService())->handle($user, $activity, $amount);
    }

    public function remapTicketOrder(Order|null &$order)
    {
        return (new RemapTicketOrderService())->handle($order);
    }

    public function remapRegistrationOrder(Order|null &$order)
    {
        return (new RemapRegistrationOrderService())->handle($order);
    }
}
