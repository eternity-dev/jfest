<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RevokeController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ShowActivityDetailsController;
use App\Http\Controllers\ShowCompetitionDetailsController;
use App\Http\Controllers\User\Checkout\CheckoutInfoController;
use App\Http\Controllers\User\Checkout\CheckoutSummaryController;
use App\Http\Controllers\User\History\HistoryController;
use App\Http\Controllers\User\Order\AddNewRegistrationOrderController;
use App\Http\Controllers\User\Order\AddNewTicketOrderController;
use App\Http\Controllers\User\Order\OrderController;
use App\Http\Controllers\User\Order\RemoveOrderController;
use App\Http\Controllers\User\Payment\PaymentFallbackController;
use App\Http\Controllers\User\Payment\PaymentRedirectController;
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
    Route::get('/revoke', RevokeController::class)->name('revoke')->middleware('auth');

    Route::middleware('guest')->group(function () {
        Route::get('/attempt', [LoginController::class, 'attempt'])->name('attempt');
        Route::get('/callback', [LoginController::class, 'callback'])->name('callback');
    });
});

Route::name('user.')->middleware('auth')->group(function () {
    Route::name('payment.')->prefix('payment')->group(function () {
        Route::get('/redirect', PaymentRedirectController::class)->name('redirect');
        Route::get('/fallback', PaymentFallbackController::class)->name('fallback');
    });

    Route::name('checkout.')->prefix('checkout')->group(function () {
        Route::get('/{order:reference}/summary', CheckoutSummaryController::class)->name('summary');
        Route::get('/{order:reference}', CheckoutInfoController::class)->name('index');
    });

    Route::name('history.')->prefix('history')->group(function () {
        Route::get('/', HistoryController::class)->name('index');
    });

    Route::name('order.')->prefix('orders')->group(function () {
        Route::get('/', OrderController::class)->name('index');
        Route::get('/a/{activity:slug}/create', [AddNewTicketOrderController::class, 'create'])->name('activity.create');
        Route::get('/c/{competition:slug}/create', [AddNewRegistrationOrderController::class, 'create'])->name('competition.create');
        Route::post('/a/{activity:slug}', [AddNewTicketOrderController::class, 'store'])->name('activity.store');
        Route::post('/c/{competition:slug}', [AddNewRegistrationOrderController::class, 'store'])->name('competition.store');
        Route::delete('/a/{ticket}/remove', [RemoveOrderController::class, 'removeTicket'])->name('activity.remove');
        Route::delete('/c/{registration}/remove', [RemoveOrderController::class, 'removeRegistration'])->name('competition.remove');
    });
});

Route::name('global.')->group(function () {
    Route::get('/', HomeController::class)->name('home');

    Route::name('activity.')
        ->prefix('activities')
        ->group(function () {
            Route::get('/{activity:slug}', ShowActivityDetailsController::class)->name('show');
        });

    Route::name('competition.')
        ->prefix('competitions')
        ->group(function () {
            Route::get('/{competition:slug}', ShowCompetitionDetailsController::class)->name('show');
        });
});
