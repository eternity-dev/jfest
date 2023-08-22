<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('competitions', function (Blueprint $table) {
            $table->boolean('with_ticket')->default(false)->after('image_url');
            $table->boolean('use_multi_participant')->default(false)->after('use_nickname_field');
            $table->smallInteger('min_participants')->default(0)->after('use_multi_participant');
            $table->smallInteger('max_participants')->after('min_participants');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('competitions', function (Blueprint $table) {
            $table->dropColumn([
                'with_ticket',
                'use_multi_participant',
                'min_participants',
                'max_participants'
            ]);
        });
    }
};
