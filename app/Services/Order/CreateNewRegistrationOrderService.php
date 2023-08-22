<?php

namespace App\Services\Order;

use App\Enums\OrderStatusEnum;
use App\Models\Activity;
use App\Models\Competition;
use App\Models\Order;
use App\Models\Registration;
use App\Models\Team;
use App\Models\TeamMember;
use App\Models\Ticket;
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
                $this->createRegistration($user, $order, $competition, $data);
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
                    $this->createRegistration($user, $order, $competition, $data);
                } else {
                    $order->total_price += $competition->price;
                    $this->createRegistration($user, $order, $competition, $data);
                }
            }

            return true;
        } catch (\Throwable $exception) {
            dd($exception);
            return false;
        }
    }

    private function createRegistration(
        User $user,
        Order $order,
        Competition $competition,
        array $data
    ) {
        $registration = new Registration([
            'competition_id' => $competition->id,
            'user_id' => $user->uuid,
            'email' => $data['email'],
            'name' => $data['name'],
            'phone' => $data['phone'],
            'instagram' => $data['instagram'],
            'nickname' => $data['nickname'],
            'price' => $competition->price
        ]);

        $order->registrations()->save($registration);

        if ($competition->use_multi_participant) {
            $teamMembers = [];
            $team = new Team([
                'name' => $data['teamName'],
                'leader_email' => $registration->email,
                'leader_name' => $registration->name,
                'leader_phone' => $registration->phone,
                'leader_instagram' => $registration->instagram,
                'leader_nickname' => $registration->nickname,
                'number_of_members' => count($data['teamMembers'])
            ]);

            $registration->team()->save($team);

            for ($i = 0; $i < $team->number_of_members; $i++) {
                $teamMembers[] = new TeamMember([
                    'name' => $data['teamMembers'][$i]['name'],
                    'instagram' => $data['teamMembers'][$i]['instagram'],
                    'nickname' => $data['teamMembers'][$i]['nickname'],
                ]);
            }

            $team->members()->saveMany($teamMembers);

            // multiple free pass ticket creation
            if ($competition->with_ticket) $this->createTickets(
                $user,
                $order,
                $team->number_of_members + 1
            );
        }

        // free pass creation
        if ($competition->with_ticket && !$competition->use_multi_participant) {
            $this->createTickets($user, $order, 1);
        }

        if ($order->isDirty('total_price')) $order->save();
    }

    private function createTickets(User $user, Order $order, int $amount)
    {
        $activity = Activity::where('slug', 'japanese-festival-7')->first();
        $tickets = [];

        for ($i = 0; $i < $amount; $i++) {
            $tickets[] = new Ticket([
                'activity_id' => $activity->id,
                'user_id' => $user->uuid,
                'price' => 0
            ]);

            $order->total_price += 0;
        }

        $order->tickets()->saveMany($tickets);
    }
}
