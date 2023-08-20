<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke(Request $request)
    {
        return Inertia::render('home/index', [
            'events' => [],
            'competitions' => [],
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
