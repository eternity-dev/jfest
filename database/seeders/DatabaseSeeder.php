<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Activity;
use App\Models\Competition;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $activity = new Activity([
            'name' => 'Japanese Festival 7',
            'description' => 'Japanese culture special event by JCOS (Japanese Community of STIKOM Bali)',
            'price' => 30000,
            'price_tag' => 'pre-sale',
            'image_url' => 'https://image.google.com/japanese-festival-7.png',
            'date' => Carbon::create(2023, 10, 8),
            'purchase_opened_at' => Carbon::now()->addDay(),
            'purchase_closed_at' => Carbon::now()->addDay()->addMonths(2)
        ]);

        $competition = new Competition([
            'name' => 'Wall Magazine',
            'description' => 'Competition where peoples compete making awesome wall magazines',
            'price' => 50000,
            'price_tag' => 'pre-sale',
            'group_url' => 'https://web.whatsapp.com/wall-magazine',
            'image_url' => 'https://image.google.com/wall-magazine.png',
            'with_ticket' => true,
            'use_instagram_field' => false,
            'use_nickname_field' => false,
            'use_multi_participant' => true,
            'min_participants' => 0,
            'max_participants' => 4,
            'registration_opened_at' => Carbon::now()->addDay(),
            'registration_closed_at' => Carbon::now()->addDay()->addMonths(2),
        ]);

        $activity->save();
        $competition->save();
    }
}
