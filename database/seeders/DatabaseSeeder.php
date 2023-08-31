<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Activity;
use App\Models\ActivitySale;
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
        $sales = collect([
            new ActivitySale([
                'unique_id' => 'PS1',
                'name' => 'Pre-Sale 1',
                'price' => 30000,
                'tickets_qty_available' => 100
            ]),
            new ActivitySale([
                'unique_id' => 'PS2',
                'name' => 'Pre-Sale 2',
                'price' => 35000
            ])
        ])->map(function ($activitySale) {
            $activitySale->save();
            return $activitySale;
        });

        collect([
            new Activity([
                'activity_sale_id' => $sales[0]->id,
                'name' => 'Japanese Festival 7',
                'description' => 'Japanese culture special event by JCOS (Japanese Community of STIKOM Bali)',
                'image_url' => null,
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
                'group_url' => null,
                'guide_book_url' => 'https://drive.google.com/file/d/1cYyNDtxTF55rlLg_4vrsT7PI5zBq-7fU/view?usp=drive_link',
                'image_url' => 'https://drive.google.com/uc?export=view&id=1trM0YphP8K-0NV3dGjkIt6JBmogpwtuG',
                'with_ticket' => true,
                'use_instagram_field' => true,
                'use_nickname_field' => true,
                'use_multi_participant' => true,
                'min_participants' => 1,
                'max_participants' => 4,
                'registration_opened_at' => Carbon::create(2023, 9, 3),
                'registration_closed_at' => Carbon::create(2023, 9, 17),
            ]),
            new Competition([
                'name' => 'Singing Competition',
                'description' => '',
                'price' => 50000,
                'price_tag' => 'pre-sale',
                'group_url' => null,
                'guide_book_url' => 'https://drive.google.com/file/d/1u-e5am9a-LTzL0Y5iykQ-xxE7yOiJZ8U/view?usp=drive_link',
                'image_url' => 'https://drive.google.com/uc?export=view&id=1MxkV39_ZhG_rqXH7fZtS8BP28OSUxC56',
                'with_ticket' => true,
                'use_instagram_field' => true,
                'use_nickname_field' => true,
                'use_multi_participant' => false,
                'min_participants' => 1,
                'max_participants' => 1,
                'registration_opened_at' => Carbon::create(2023, 9, 3),
                'registration_closed_at' => Carbon::create(2023, 9, 17),
            ]),
            new Competition([
                'name' => 'Mading Fisik',
                'description' => '',
                'price' => 100000,
                'price_tag' => 'pre-sale',
                'group_url' => null,
                'guide_book_url' => 'https://drive.google.com/file/d/1ElvH0IsE0UsHEWJFq4Xs74KMp6Mr8KF8/view?usp=drive_link',
                'image_url' => 'https://drive.google.com/uc?export=view&id=1Uqaww6x0KbxKCKzAwAgqcAlE86liniOz',
                'with_ticket' => false,
                'use_instagram_field' => false,
                'use_nickname_field' => false,
                'use_multi_participant' => true,
                'min_participants' => 4,
                'max_participants' => 4,
                'registration_opened_at' => Carbon::create(2023, 9, 3),
                'registration_closed_at' => Carbon::create(2023, 9, 17),
            ]),
            new Competition([
                'name' => 'Speech Contest',
                'description' => '',
                'price' => 50000,
                'price_tag' => 'pre-sale',
                'group_url' => null,
                'guide_book_url' => 'https://drive.google.com/file/d/1J-AieS1VEj27RWwV1EQ4iJ3UGRoUYUsT/view?usp=drive_link',
                'image_url' => 'https://drive.google.com/uc?export=view&id=1KMZvd0n9o1QQeVWRjtlCa-uKMKtK6r3w',
                'with_ticket' => true,
                'use_instagram_field' => false,
                'use_nickname_field' => false,
                'use_multi_participant' => false,
                'min_participants' => 1,
                'max_participants' => 1,
                'registration_opened_at' => Carbon::create(2023, 9, 3),
                'registration_closed_at' => Carbon::create(2023, 9, 17),
            ]),
            new Competition([
                'name' => 'Shodou',
                'description' => '',
                'price' => 50000,
                'price_tag' => 'pre-sale',
                'group_url' => null,
                'guide_book_url' => 'https://drive.google.com/file/d/1wUQILn3BDgXaZgq2AFbo3E8GJw8EUDCd/view?usp=drive_link',
                'image_url' => 'https://drive.google.com/uc?export=view&id=1ud449D1Pyv1ZeZ4VM500LX1UuKOeT9AP',
                'with_ticket' => true,
                'use_instagram_field' => false,
                'use_nickname_field' => true,
                'use_multi_participant' => false,
                'min_participants' => 1,
                'max_participants' => 1,
                'registration_opened_at' => Carbon::create(2023, 9, 3),
                'registration_closed_at' => Carbon::create(2023, 9, 17),
            ]),
        ])->each(function ($competition) {
            $competition->save();
        });
    }
}
