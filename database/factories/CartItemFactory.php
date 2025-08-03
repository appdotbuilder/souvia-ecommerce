<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CartItem>
 */
class CartItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'session_id' => fake()->uuid(),
            'customer_id' => Customer::factory(),
            'product_id' => Product::factory(),
            'quantity' => fake()->numberBetween(1, 5),
            'product_variation' => [
                'size' => fake()->randomElement(['S', 'M', 'L', 'XL']),
                'color' => fake()->randomElement(['Black', 'White', 'Navy', 'Red']),
            ],
        ];
    }
}