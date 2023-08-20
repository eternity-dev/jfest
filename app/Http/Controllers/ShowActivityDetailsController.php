<?php

namespace App\Http\Controllers;

use App\Enums\EventTypeEnum;
use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShowActivityDetailsController extends Controller
{
    public function __invoke(Request $request, Activity $activity)
    {
        $activity->type = EventTypeEnum::Activity->value;

        return Inertia::render('detail/index', [
            'data' => $activity,
            ...$this->withLinkProps($request, [
                'orderUrl' => route('user.order.activity', compact('activity'))
            ]),
            ...$this->withAuthProps($request),
            ...$this->withMetaProps([
                'head' => [
                    'title' => $this->appName . ' - ' . $activity->name,
                    'description' => $activity->description
                ]
            ])
        ]);
    }
}
