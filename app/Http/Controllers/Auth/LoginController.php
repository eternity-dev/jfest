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
        try {
            $driver = Socialite::driver('google');

            return $request->isXmlHttpRequest() || $request->expectsJson()
                ? response()->json([
                    'meta' => [
                        'redirectUrl' => $driver
                            ->redirect()
                            ->getTargetUrl()
                    ]
                ])
                : Socialite::driver('google')->redirect();
        } catch (\Throwable|\Exception $exception) {
            logger()->channel('error')->error($exception->getMessage());
        }
    }

    public function callback()
    {
        try {
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

                logger()->channel('stack')->info('New user registered', [
                    'user_id' => $user->uuid,
                    'user_email' => $capturedUserEmail
                ]);

                return redirect()
                    ->intended(RouteServiceProvider::HOME);
            }
        } catch (\Throwable|\Exception $exception) {
            logger()->channel('error')->error($exception->getMessage());
        }
    }
}
