<?php

namespace App\Http\Controllers\User\Payment;

use App\Http\Controllers\Controller;
use App\Services\Payment\PaymentService;
use Illuminate\Http\Request;

class PaymentRedirectController extends Controller
{
    public function __invoke(Request $request, PaymentService $paymentService)
    {
        try {
            return $paymentService->redirect('midtrans', $request->user());
        } catch (\Throwable|\Exception $exception) {
            logger()->channel('error')->error($exception->getMessage());
        }
    }
}
