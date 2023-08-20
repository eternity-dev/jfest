<?php

use App\Enums\PaymentStatusEnum;
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
            PaymentStatusEnum::Canceled->value,
            PaymentStatusEnum::Expired->value,
            PaymentStatusEnum::Failed->value,
            PaymentStatusEnum::Pending->value,
            PaymentStatusEnum::Success->value,
        ];

        Schema::create('payments', function (Blueprint $table) use ($statuses) {
            $table->id();
            $table->uuid();
            $table->foreignIdFor(Order::class);
            $table->string('transaction_id')->unique();
            $table->float('amount');
            $table->float('fee')->default(0.0);
            $table->string('link');
            $table->string('method')->nullable();
            $table->enum('status', $statuses)->default(PaymentStatusEnum::Pending->value);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
