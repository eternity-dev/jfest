<?php

namespace App\Services\Contract;

use App\Models\User;
use Illuminate\Http\RedirectResponse;

interface PaymentProvider
{
    final public const FEE = 0.07;

    public function handleRedirect(User $user, callable $beforeCallback): RedirectResponse;

    public function handleNotification(callable $afterCallback): array;
}
