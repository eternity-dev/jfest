<?php

namespace App\Enums;

enum PaymentStatusEnum: string
{
    case Canceled = 'canceled';
    case Expired = 'expired';
    case Failed = 'failed';
    case Pending = 'pending';
    case Success = 'success';
}
