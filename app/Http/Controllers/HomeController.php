<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Competition;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke(Request $request)
    {
        $activities = Activity::all()->map(function ($activity) {
            $activity->type = 'activity';
            $activity->details_url = route('global.activity.show', compact('activity'));
            $activity->order_url = route('user.order.activity', compact('activity'));

            return $activity;
        });

        $competitions = Competition::all()->map(function ($competition) {
            $competition->type = 'competition';
            $competition->details_url = route('global.competition.show', compact('competition'));
            $competition->order_url = route('user.order.competition', compact('competition'));

            return $competition;
        });

        return Inertia::render('home/index', [
            'activities' => $activities,
            'competitions' => $competitions,
            ...$this->withLinkProps($request, []),
            ...$this->withAuthProps($request),
            ...$this->withMetaProps([
                'head' => [
                    'title' => sprintf('%s - Home', $this->appName),
                    'description' => sprintf('%s home page', $this->appName)
                ],
            ])
        ]);
    }
}
