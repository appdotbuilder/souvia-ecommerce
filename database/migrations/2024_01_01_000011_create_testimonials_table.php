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
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('customer_name')->comment('Customer name for testimonial');
            $table->string('customer_image')->nullable()->comment('Customer image path');
            $table->text('message')->comment('Testimonial message');
            $table->integer('rating')->default(5)->comment('Rating out of 5');
            $table->boolean('is_featured')->default(false)->comment('Featured testimonial flag');
            $table->boolean('is_active')->default(true)->comment('Testimonial status');
            $table->timestamps();
            
            $table->index('is_featured');
            $table->index('is_active');
            $table->index('rating');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};