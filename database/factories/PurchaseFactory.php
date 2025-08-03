<?php

namespace Database\Factories;

use App\Models\Supplier;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Purchase>
 */
class PurchaseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->randomFloat(2, 500000, 5000000);
        $shippingCost = fake()->randomFloat(2, 0, 100000);
        $taxAmount = fake()->randomFloat(2, 0, $subtotal * 0.1);
        $total = $subtotal + $shippingCost + $taxAmount;

        return [
            'purchase_number' => 'PUR-' . now()->format('YmdHis') . '-' . fake()->unique()->randomNumber(4),
            'supplier_id' => Supplier::factory(),
            'purchase_date' => fake()->date(),
            'status' => fake()->randomElement(['pending', 'ordered', 'received']),
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'shipping_cost' => $shippingCost,
            'total_amount' => $total,
            'notes' => fake()->optional()->sentence(),
            'received_at' => fake()->optional()->dateTime(),
        ];
    }
}