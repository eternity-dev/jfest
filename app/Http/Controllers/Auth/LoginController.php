<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    public function attempt(Request $request)
    {
        $driver = Socialite::driver('google');

        return $request->isXmlHttpRequest() || $request->expectsJson()
            ? response()->json([
                'meta' => [
                    'redirectUrl' => $driver
                        ->stateless()
                        ->redirect()
                        ->getTargetUrl()
                ]
            ])
            : Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        $capturedUser = Socialite::driver('google')->user();
        $capturedUserId = $capturedUser->getId();
        $capturedUserEmail = $capturedUser->getEmail();

        $userCredentials = [
            'email' => $capturedUserEmail,
            'password' =>  $capturedUserId
        ];

        if (Auth::attempt($userCredentials)) {
            return redirect()
                ->intended(RouteServiceProvider::HOME);
        } else {
            $user = new User();
            $user->email = $capturedUserEmail;
            $user->password = $capturedUserId;
            $user->name = $capturedUser->getName();
            $user->avatar = $capturedUser->getAvatar();
            $user->save();

            Auth::login($user);

            return redirect()
                ->intended(RouteServiceProvider::HOME);
        }
    }
}
