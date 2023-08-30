<?php

namespace App\Http\Controllers\User\Payment\Fallbacks;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MidtransFallbackController extends Controller
{
    public function __invoke(Request $request)
    {
        return to_route('user.payment.fallback', [
            'order_id' => $request->query('order_id'),
            'status_code' => $request->query('status_code'),
            'transaction_status' => $request->query('transaction_status')
        ]);
    }
}
