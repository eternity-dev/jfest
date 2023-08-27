<?php

namespace App\Http\Controllers\User\History;

use App\Enums\OrderStatusEnum;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();
        $orders = $user->orders()
            ->with([
                'tickets' => [
                    'activity:id,slug,name'
                ]
            ])
            ->with([
                'registrations' => [
                    'competition:id,slug,name',
                    'team' => ['members']
                ]
            ])
            ->where('status', OrderStatusEnum::Paid)
            ->get();

        return Inertia::render('history/index', [
            'data' => $orders,
            ...$this->withLinkProps($request, []),
            ...$this->withAuthProps($request),
            ...$this->withMetaProps([
                'head' => [
                    'title' => sprintf('%s - History', $this->appName),
                    'description' => sprintf('Your history of tickets and registrations you\'re paying')
                ]
            ])
        ]);
    }
}
