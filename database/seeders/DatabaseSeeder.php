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
        collect([
            new Activity([
                'name' => 'Japanese Festival 7',
                'description' => 'Japanese culture special event by JCOS (Japanese Community of STIKOM Bali)',
                'price' => 30000,
                'price_tag' => 'pre-sale',
                'image_url' => 'https://image.google.com/japanese-festival-7.png',
                'date' => Carbon::create(2023, 10, 8),
                'purchase_opened_at' => Carbon::create(2023, 9, 3),
                'purchase_closed_at' => Carbon::create(2023, 10, 8)
            ])
        ])->each(function ($activity) {
            $activity->save();
        });

        collect([
            new Competition([
                'name' => 'Cosplay Competition',
                'description' => '',
                'price' => 60000,
                'price_tag' => 'pre-sale',
                'group_url' => 'https://web.whatsapp.com/wall-magazine',
                'guide_book_url' => 'https://drive.google.com/file/d/1cYyNDtxTF55rlLg_4vrsT7PI5zBq-7fU/view?usp=drive_link',
                'image_url' => 'https://drive.google.com/uc?export=view&id=1trM0YphP8K-0NV3dGjkIt6JBmogpwtuG',
                'with_ticket' => true,
                'use_instagram_field' => true,
                'use_nickname_field' => true,
                'use_multi_participant' => true,
                'min_participants' => 0,
                'max_participants' => 4,
                'registration_opened_at' => Carbon::create(2023, 9, 3),
                'registration_closed_at' => Carbon::create(2023, 9, 17),
            ]),
            new Competition([
                'name' => 'Singing Competition',
                'description' => '',
                'price' => 50000,
                'price_tag' => 'pre-sale',
                'group_url' => 'https://web.whatsapp.com/wall-magazine',
                'guide_book_url' => 'https://drive.google.com/file/d/1u-e5am9a-LTzL0Y5iykQ-xxE7yOiJZ8U/view?usp=drive_link',
                'image_url' => 'https://drive.google.com/uc?export=view&id=1MxkV39_ZhG_rqXH7fZtS8BP28OSUxC56',
                'with_ticket' => true,
                'use_instagram_field' => true,
                'use_nickname_field' => true,
                'use_multi_participant' => false,
                'min_participants' => 0,
                'max_participants' => 0,
                'registration_opened_at' => Carbon::create(2023, 9, 3),
                'registration_closed_at' => Carbon::create(2023, 9, 17),
            ]),
        ])->each(function ($competition) {
            $competition->save();
        });
    }
}
