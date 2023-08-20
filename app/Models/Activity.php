<?php

namespace App\Models;

use App\Traits\Slug;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Activity extends Model
{
    use Slug;

    protected $casts = [
        'price' => 'integer',
        'date' => 'date:Y-m-d',
        'purchase_opened_at' => 'datetime:Y-m-d',
        'purchase_closed_at' => 'datetime:Y-m-d'
    ];

    protected $fillable = [
        'name',
        'description',
        'price',
        'price_tag',
        'image_url',
        'date',
        'purchase_opened_at',
        'purchase_closed_at'
    ];

    protected $guarded = ['id'];

    public function tickets(): HasMany
    {
        return $this->hasMany(Ticket::class);
    }
}
