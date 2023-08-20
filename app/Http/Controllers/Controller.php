<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    protected string|null $appName = null;

    public function __construct() {
        $this->appName = config('app.name');
    }

    protected function withAuthProps(Request $request): array
    {
        return [
            'auth' => [
                'data' => $request->user(),
                'isAuthenticated' => !is_null($request->user())
            ]
        ];
    }

    protected function withLinkProps(Request $request, array $extendedLinkProps): array
    {
        return [
            'links' => array_merge($extendedLinkProps, [
                'authUrl' => [
                    'attempt' => route('auth.attempt'),
                    'revoke' => route('auth.revoke')
                ],
                'navbarUrl' => [
                    [
                        'label' => 'Home',
                        'href' => route('global.home'),
                        'requireAuthenticated' => false
                    ],
                    [
                        'label' => 'My Orders',
                        'href' => route('global.home'),
                        'requireAuthenticated' => true
                    ],
                    [
                        'label' => 'History',
                        'href' => route('global.home'),
                        'requireAuthenticated' => true
                    ]
                ]
            ])
        ];
    }

    protected function withMetaProps(array $extendedMetaProps): array
    {
        return [
            'meta' => array_merge($extendedMetaProps, [
            ])
        ];
    }
}
