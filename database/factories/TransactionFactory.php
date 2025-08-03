<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['income', 'expense']);
        $categories = [
            'income' => ['Sales', 'Refunds', 'Other Income'],
            'expense' => ['Purchases', 'Marketing', 'Operations', 'Shipping', 'Other Expenses'],
        ];

        return [
            'transaction_number' => 'TXN-' . now()->format('YmdHis') . '-' . fake()->unique()->randomNumber(4),
            'type' => $type,
            'category' => fake()->randomElement($categories[$type]),
            'amount' => fake()->randomFloat(2, 10000, 1000000),
            'description' => fake()->sentence(),
            'transaction_date' => fake()->date(),
            'reference_type' => fake()->optional()->randomElement(['App\Models\Order', 'App\Models\Purchase']),
            'reference_id' => fake()->optional()->randomNumber(5),
        ];
    }
}