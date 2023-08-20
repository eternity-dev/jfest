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
            'links' => [
                'authUrl' => [
                    'attempt' => route('auth.attempt'),
                    'revoke' => route('auth.revoke')
                ],
                'navbarUrl' => [
                    ['label' => 'Home', 'href' => route('global.home')]
                ]
            ],
            'auth' => [
                'data' => $request->user(),
                'isAuthenticated' => !is_null($request->user())
            ]
        ]);
    }
}
