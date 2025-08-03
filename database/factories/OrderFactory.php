<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->randomFloat(2, 100000, 1000000);
        $shippingCost = 15000;
        $total = $subtotal + $shippingCost;

        return [
            'order_number' => 'ORD-' . now()->format('YmdHis') . '-' . fake()->unique()->randomNumber(4),
            'customer_id' => Customer::factory(),
            'status' => fake()->randomElement(['pending', 'confirmed', 'processing', 'shipped', 'delivered']),
            'subtotal' => $subtotal,
            'shipping_cost' => $shippingCost,
            'tax_amount' => 0,
            'total_amount' => $total,
            'payment_method' => fake()->randomElement(['bank_transfer', 'cod']),
            'payment_status' => fake()->randomElement(['pending', 'paid']),
            'shipping_address' => fake()->address(),
            'shipping_city' => fake()->city(),
            'shipping_postal_code' => fake()->postcode(),
            'shipping_province' => fake()->randomElement(['DKI Jakarta', 'Jawa Barat', 'Jawa Tengah']),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}