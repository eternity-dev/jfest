<?php

use App\Enums\AttendStatusEnum;
use App\Models\Activity;
use App\Models\Order;
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
        $statuses = [
            AttendStatusEnum::Attended->value,
            AttendStatusEnum::NotAttended->value
        ];

        Schema::create('tickets', function (Blueprint $table) use ($statuses) {
            $table->id();
            $table->uuid()->nullable();
            $table->foreignIdFor(Activity::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Order::class)->constrained()->cascadeOnDelete();
            $table->foreignUuid('user_id')->constrained('users', 'uuid')->cascadeOnDelete();
            $table->enum('attended_status', $statuses)->default(AttendStatusEnum::NotAttended->value);
            $table->timestamp('attended_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
