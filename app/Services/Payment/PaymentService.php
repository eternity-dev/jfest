<?php

namespace App\Services\Payment;

class PaymentService
{
    private array $handlers = [
        'midtrans' => MidtransPaymentService::class
    ];

    public function redirect(string $handler, ...$args)
    {
        if ($this->isVerifiedHandler($handler)) {
            $handler = new $this->handlers[$handler];
            return $handler->handleRedirect(...$args);
        }
    }

    public function callback(string $handler, callable|null $afterCallback = null): array
    {
        if ($this->isVerifiedHandler($handler)) {
            $handler = new $this->handlers[$handler];
            return $handler->handleOnCallback($afterCallback);
        }
    }

    private function isVerifiedHandler(string $handler): bool
    {
        if (!array_key_exists($handler, $this->handlers)) {
            throw new \Exception(sprintf(
                'Payment handler for %s is not a valid handler',
                $handler
            ));
        }

        return true;
    }
}
