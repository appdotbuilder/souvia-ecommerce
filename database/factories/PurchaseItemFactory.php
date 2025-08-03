<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Purchase;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PurchaseItem>
 */
class PurchaseItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $quantity = fake()->numberBetween(10, 100);
        $unitCost = fake()->randomFloat(2, 20000, 200000);
        $totalCost = $unitCost * $quantity;

        return [
            'purchase_id' => Purchase::factory(),
            'product_id' => Product::factory(),
            'quantity' => $quantity,
            'unit_cost' => $unitCost,
            'total_cost' => $totalCost,
        ];
    }
}