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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('name')->comment('Product name');
            $table->string('slug')->unique()->comment('URL slug for product');
            $table->text('description')->comment('Product description');
            $table->decimal('price', 12, 2)->comment('Product price');
            $table->integer('stock')->default(0)->comment('Current stock quantity');
            $table->integer('min_stock')->default(5)->comment('Minimum stock alert level');
            $table->string('sku')->unique()->comment('Stock Keeping Unit');
            $table->json('images')->nullable()->comment('Product images array');
            $table->json('variations')->nullable()->comment('Product variations (size, color, etc.)');
            $table->decimal('weight', 8, 2)->nullable()->comment('Product weight in kg');
            $table->string('shipping_origin')->nullable()->comment('Shipping origin address');
            $table->boolean('is_active')->default(true)->comment('Product status');
            $table->boolean('is_featured')->default(false)->comment('Featured product flag');
            $table->timestamps();
            
            $table->index('slug');
            $table->index('category_id');
            $table->index('is_active');
            $table->index('is_featured');
            $table->index('sku');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};