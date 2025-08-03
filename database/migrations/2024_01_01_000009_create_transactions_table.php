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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_number')->unique()->comment('Unique transaction number');
            $table->enum('type', ['income', 'expense'])->comment('Transaction type');
            $table->string('category')->comment('Transaction category');
            $table->decimal('amount', 12, 2)->comment('Transaction amount');
            $table->text('description')->comment('Transaction description');
            $table->date('transaction_date')->comment('Transaction date');
            $table->string('reference_type')->nullable()->comment('Reference model type (order, purchase, etc.)');
            $table->unsignedBigInteger('reference_id')->nullable()->comment('Reference model ID');
            $table->timestamps();
            
            $table->index('type');
            $table->index('category');
            $table->index('transaction_date');
            $table->index(['type', 'transaction_date']);
            $table->index(['reference_type', 'reference_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};