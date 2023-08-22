<?php

use App\Models\Registration;
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
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Registration::class)->constrained()->cascadeOnDelete();
            $table->string('slug', 100)->unique();
            $table->string('name', 100);
            $table->string('leader_email', 100)->comment('Auto-sync with the user data');
            $table->string('leader_name', 100)->comment('Auto-sync with the user data');
            $table->string('leader_phone', 20)->comment('Auto-sync with th user data');
            $table->string('leader_instagram', 50)->nullable();
            $table->string('leader_nickname', 50)->nullable();
            $table->smallInteger('number_of_members');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teams');
    }
};
