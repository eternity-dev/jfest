<?php

namespace App\Http\Controllers\User\Payment;

use App\Http\Controllers\Controller;
use App\Services\Payment\PaymentService;
use Illuminate\Http\Request;

class PaymentRedirectController extends Controller
{
    public function __invoke(Request $request, PaymentService $paymentService)
    {
        return $paymentService->redirect('midtrans', $request->user());
    }
}
