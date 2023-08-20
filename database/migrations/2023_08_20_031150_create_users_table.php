<?php

use App\Enums\RoleTypeEnum;
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
        $roles = [
            RoleTypeEnum::Admin->value,
            RoleTypeEnum::User->value
        ];

        Schema::create('users', function (Blueprint $table) use ($roles) {
            $table->id();
            $table->uuid()->index();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('avatar');
            $table->enum('role', $roles)->default(RoleTypeEnum::User->value);
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
