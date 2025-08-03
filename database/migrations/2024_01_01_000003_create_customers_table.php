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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Customer full name');
            $table->string('email')->unique()->comment('Customer email address');
            $table->string('phone')->nullable()->comment('Customer phone number');
            $table->text('address')->nullable()->comment('Customer address');
            $table->string('city')->nullable()->comment('Customer city');
            $table->string('postal_code')->nullable()->comment('Customer postal code');
            $table->string('province')->nullable()->comment('Customer province');
            $table->date('birth_date')->nullable()->comment('Customer birth date');
            $table->enum('gender', ['male', 'female'])->nullable()->comment('Customer gender');
            $table->enum('status', ['active', 'inactive'])->default('active')->comment('Customer status');
            $table->timestamps();
            
            $table->index('email');
            $table->index('phone');
            $table->index('status');
            $table->index('city');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};