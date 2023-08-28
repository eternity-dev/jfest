<?php

namespace App\Http\Controllers\User\Order;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RemoveOrderController extends Controller
{
    public function removeTicket(Request $request, Ticket $ticket)
    {
        try {
            $ticket->delete();
            $request->session()->flash('message', 'Item has been removed from your orders list');
        } catch (\Throwable $exception) {
            logger()->channel('error')->error($exception->getMessage(), [
                'user_id' => $request->user()->id,
                'ticket_id' => $ticket->id
            ]);
        } finally {
            return Inertia::location(route('user.order.index'));
        }
    }

    public function removeRegistration(Request $request, Registration $registration)
    {
        try {
            $registration->delete();
            $request->session()->flash('message', 'Registration has been canceled from your orders list');
        } catch (\Throwable $exception) {
            logger()->channel('error')->error($exception->getMessage(), [
                'user_id' => $request->user()->id,
                'registration_id' => $registration->id
            ]);
        } finally {
            return Inertia::location(route('user.order.index'));
        }
    }
}
