<?php

use App\Enums\OrderStatusEnum;
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
            OrderStatusEnum::Expired->value,
            OrderStatusEnum::Paid->value,
            OrderStatusEnum::Pending->value
        ];

        Schema::create('orders', function (Blueprint $table) use ($statuses) {
            $table->id();
            $table->foreignUuid('user_id')->constrained('users', 'uuid')->cascadeOnDelete();
            $table->string('reference');
            $table->enum('status', $statuses)->default(OrderStatusEnum::Pending->value);
            $table->integer('total_price');
            $table->date('expired_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
