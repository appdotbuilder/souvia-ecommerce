<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $provinces = [
            'DKI Jakarta',
            'Jawa Barat',
            'Jawa Tengah',
            'Jawa Timur',
            'Banten',
            'Yogyakarta',
            'Sumatera Utara',
            'Sumatera Selatan',
            'Bali',
            'Kalimantan Timur',
        ];

        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'city' => fake()->city(),
            'postal_code' => fake()->postcode(),
            'province' => fake()->randomElement($provinces),
            'birth_date' => fake()->date('Y-m-d', '2000-01-01'),
            'gender' => fake()->randomElement(['male', 'female']),
            'status' => 'active',
        ];
    }
}