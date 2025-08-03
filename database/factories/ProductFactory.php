<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $productNames = [
            'Elegant Evening Dress',
            'Casual Summer Top',
            'Designer Handbag',
            'Comfortable Jeans',
            'Silk Blouse',
            'Leather Jacket',
            'Pearl Necklace',
            'High Heel Shoes',
            'Wool Sweater',
            'Cotton T-Shirt',
            'Midi Skirt',
            'Blazer',
            'Scarf',
            'Watch',
            'Sunglasses',
        ];

        $name = fake()->randomElement($productNames) . ' - ' . fake()->colorName();
        $price = fake()->randomFloat(2, 50000, 2000000);

        return [
            'category_id' => Category::factory(),
            'name' => $name,
            'slug' => Str::slug($name) . '-' . fake()->unique()->randomNumber(4),
            'description' => fake()->paragraph(3),
            'price' => $price,
            'stock' => fake()->numberBetween(0, 100),
            'min_stock' => fake()->numberBetween(5, 20),
            'sku' => 'SKU-' . fake()->unique()->bothify('??##??##'),
            'images' => [
                '/images/product-placeholder-1.jpg',
                '/images/product-placeholder-2.jpg',
            ],
            'variations' => [
                'sizes' => ['S', 'M', 'L', 'XL'],
                'colors' => ['Black', 'White', 'Navy', 'Red'],
            ],
            'weight' => fake()->randomFloat(2, 0.1, 2.0),
            'shipping_origin' => fake()->city(),
            'is_active' => true,
            'is_featured' => fake()->boolean(20), // 20% chance of being featured
        ];
    }
}