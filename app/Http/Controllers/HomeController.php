<?php

namespace App\Http\Controllers;

use App\Enums\EventTypeEnum;
use App\Models\Activity;
use App\Models\Competition;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke(Request $request)
    {
        try {
            $activities = $this->getActivities();
            $competitions = $this->getCompetitions();

            return Inertia::render('home/index', [
                ...compact('activities', 'competitions'),
                ...$this->withLinkProps($request, [
                    'orderTicketUrl' => route('user.order.activity.create', [
                        'activity' => $activities->where('slug', 'japanese-festival-7')->first()
                    ])
                ]),
                ...$this->withAuthProps($request),
                ...$this->withMetaProps([
                    'head' => [
                        'title' => sprintf('%s - Home', $this->appName),
                        'description' => sprintf('%s home page', $this->appName)
                    ],
                ])
            ]);
        } catch (\Throwable $exception) {
            logger()->channel('error')->error($exception->getMessage());
        }

    }

    private function generateActionsUrl(
        EventTypeEnum $type,
        Activity|Competition $event
    ): array {
        return [
            'details_url' => route(sprintf('global.%s.show', $type->value), [
                $type->value => $event
            ]),
            'order_url' => route(sprintf('user.order.%s.create', $type->value), [
                $type->value => $event
            ])
        ];
    }

    private function getActivities(): Collection
    {
        return Activity::all()->map(function ($activity) {
            $urls = $this->generateActionsUrl(EventTypeEnum::Activity, $activity);

            $activity->type = EventTypeEnum::Activity->value;
            $activity->details_url = $urls['details_url'];
            $activity->order_url = $urls['order_url'];

            return $activity;
        });
    }

    private function getCompetitions(): Collection
    {
        return Competition::all()->map(function ($competition) {
            $urls = $this->generateActionsUrl(EventTypeEnum::Competition, $competition);

            $competition->type = EventTypeEnum::Competition->value;
            $competition->details_url = $urls['details_url'];
            $competition->order_url = $urls['order_url'];

            return $competition;
        });
    }
}
