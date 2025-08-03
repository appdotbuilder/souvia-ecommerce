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
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Supplier company name');
            $table->string('contact_person')->nullable()->comment('Contact person name');
            $table->string('email')->unique()->comment('Supplier email address');
            $table->string('phone')->nullable()->comment('Supplier phone number');
            $table->text('address')->nullable()->comment('Supplier address');
            $table->string('city')->nullable()->comment('Supplier city');
            $table->string('postal_code')->nullable()->comment('Supplier postal code');
            $table->string('province')->nullable()->comment('Supplier province');
            $table->text('notes')->nullable()->comment('Supplier notes');
            $table->enum('status', ['active', 'inactive'])->default('active')->comment('Supplier status');
            $table->timestamps();
            
            $table->index('email');
            $table->index('name');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};