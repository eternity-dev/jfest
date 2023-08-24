<?php

use App\Http\Controllers\User\Payment\PaymentNotificationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::name('payment')->prefix('payment')->group(function () {
    Route::post('/callback', PaymentNotificationController::class)->name('callback');
});
