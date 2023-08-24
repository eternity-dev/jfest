<?php

namespace App\Http\Controllers\User\Payment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PaymentFallbackController extends Controller
{
    public function __invoke(Request $request)
    {
        dd($request->all());
    }
}
