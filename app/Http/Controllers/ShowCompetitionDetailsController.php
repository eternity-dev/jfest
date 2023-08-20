<?php

namespace App\Http\Controllers;

use App\Enums\EventTypeEnum;
use App\Models\Competition;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShowCompetitionDetailsController extends Controller
{
    public function __invoke(Request $request, Competition $competition)
    {
        $competition->type = EventTypeEnum::Competition->value;

        return Inertia::render('detail/index', [
            'data' => $competition,
            ...$this->withLinkProps($request, [
                'orderUrl' => route('user.order.competition.create', compact('competition'))
            ]),
            ...$this->withAuthProps($request),
            ...$this->withMetaProps([
                'head' => [
                    'title' => $this->appName . ' - ' . $competition->name,
                    'description' => $competition->description
                ]
            ])
        ]);
    }
}
