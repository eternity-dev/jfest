<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RevokeController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ShowActivityDetailsController;
use App\Http\Controllers\ShowCompetitionDetailsController;
use App\Http\Controllers\User\Order\AddNewRegistrationOrderController;
use App\Http\Controllers\User\Order\AddNewTicketOrderController;
use App\Http\Controllers\User\Order\OrderController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::name('auth.')->prefix('auth')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::get('/attempt', [LoginController::class, 'attempt'])->name('attempt');
        Route::get('/callback', [LoginController::class, 'callback'])->name('callback');
    });

    Route::get('/revoke', RevokeController::class)->name('revoke')->middleware('auth');
});

Route::name('user.')->middleware('auth')->group(function () {
    Route::name('order.')->prefix('orders')->group(function () {
        Route::get('/{activity:slug}/create', [AddNewTicketOrderController::class, 'create'])->name('activity.create');
        Route::post('/{activity:slug}', [AddNewTicketOrderController::class, 'store'])->name('activity.store');
        Route::get('/{competition:slug}/create', [AddNewRegistrationOrderController::class, 'create'])->name('competition.create');
        Route::post('/{competition:slug}', [AddNewRegistrationOrderController::class, 'store'])->name('competition.store');

        Route::get('/', OrderController::class)->name('index');
    });
});

Route::name('global.')->group(function () {
    Route::get('/', HomeController::class)->name('home');

    Route::name('activity.')->prefix('activities')->group(function () {
        Route::get('/{activity:slug}', ShowActivityDetailsController::class)->name('show');
    });

    Route::name('competition.')->prefix('competitions')->group(function () {
        Route::get('/{competition:slug}', ShowCompetitionDetailsController::class)->name('show');
    });
});
