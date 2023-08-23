<?php

namespace App\Http\Controllers\User\Checkout;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Midtrans\Notification;

class CheckoutSummaryController extends Controller
{
    public function __invoke(Request $request)
    {
        dd($request->all());
    }
}
