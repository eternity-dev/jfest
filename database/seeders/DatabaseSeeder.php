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
            'name' => 'Costume Walk',
            'description' => 'Competition where peoples compete for costume walk',
            'price' => 50000,
            'price_tag' => 'pre-sale',
            'group_url' => 'https://web.whatsapp.com/costume-walk',
            'image_url' => 'https://image.google.com/costume-walk.png',
            'use_instagram_field' => true,
            'use_nickname_field' => true,
            'registration_opened_at' => Carbon::now()->addDay(),
            'registration_closed_at' => Carbon::now()->addDay()->addMonths(2),
        ]);

        $activity->save();
        $competition->save();
    }
}
