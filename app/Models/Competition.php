<?php

namespace App\Models;

use App\Traits\Slug;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Competition extends Model
{
    use Slug;

    protected $casts = [
        'price' => 'integer',
        'registration_opened_at' => 'datetime:Y-m-d',
        'registration_closed_at' => 'datetime:Y-m-d'
    ];

    protected $fillable = [
        'name',
        'description',
        'price',
        'price_tag',
        'group_url',
        'image_url',
        'registration_opened_at',
        'registration_closed_at'
    ];

    protected $guarded = ['id'];
}
