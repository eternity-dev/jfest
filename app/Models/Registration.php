<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Registration extends Model
{
    protected $fillable = [
        'competition_id',
        'order_id',
        'user_id',
        'email',
        'name',
        'phone',
        'instagram',
        'nickname'
    ];

    protected $guarded = ['id'];

    public function competition(): BelongsTo
    {
        return $this->belongsTo(Competition::class);
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'uuid');
    }
}
