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
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->string('purchase_number')->unique()->comment('Unique purchase number');
            $table->foreignId('supplier_id')->constrained()->onDelete('cascade');
            $table->date('purchase_date')->comment('Purchase date');
            $table->enum('status', ['pending', 'ordered', 'received', 'cancelled'])->default('pending')->comment('Purchase status');
            $table->decimal('subtotal', 12, 2)->comment('Purchase subtotal');
            $table->decimal('tax_amount', 10, 2)->default(0)->comment('Tax amount');
            $table->decimal('shipping_cost', 10, 2)->default(0)->comment('Shipping cost');
            $table->decimal('total_amount', 12, 2)->comment('Total purchase amount');
            $table->text('notes')->nullable()->comment('Purchase notes');
            $table->timestamp('received_at')->nullable()->comment('Received date');
            $table->timestamps();
            
            $table->index('purchase_number');
            $table->index('supplier_id');
            $table->index('status');
            $table->index('purchase_date');
            $table->index(['status', 'purchase_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchases');
    }
};