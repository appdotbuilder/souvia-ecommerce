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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique()->comment('Unique order number');
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'])->default('pending')->comment('Order status');
            $table->decimal('subtotal', 12, 2)->comment('Order subtotal');
            $table->decimal('shipping_cost', 10, 2)->default(0)->comment('Shipping cost');
            $table->decimal('tax_amount', 10, 2)->default(0)->comment('Tax amount');
            $table->decimal('total_amount', 12, 2)->comment('Total order amount');
            $table->enum('payment_method', ['bank_transfer', 'cod'])->comment('Payment method');
            $table->enum('payment_status', ['pending', 'paid', 'failed'])->default('pending')->comment('Payment status');
            $table->text('shipping_address')->comment('Shipping address');
            $table->string('shipping_city')->comment('Shipping city');
            $table->string('shipping_postal_code')->comment('Shipping postal code');
            $table->string('shipping_province')->comment('Shipping province');
            $table->text('notes')->nullable()->comment('Order notes');
            $table->timestamp('shipped_at')->nullable()->comment('Shipped date');
            $table->timestamp('delivered_at')->nullable()->comment('Delivered date');
            $table->timestamps();
            
            $table->index('order_number');
            $table->index('customer_id');
            $table->index('status');
            $table->index('payment_status');
            $table->index(['status', 'created_at']);
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