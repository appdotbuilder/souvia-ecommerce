<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@souvia.com',
        ]);

        // Create categories
        $categories = [
            ['name' => 'Dresses', 'slug' => 'dresses'],
            ['name' => 'Tops & Blouses', 'slug' => 'tops-blouses'],
            ['name' => 'Bottoms', 'slug' => 'bottoms'],
            ['name' => 'Outerwear', 'slug' => 'outerwear'],
            ['name' => 'Accessories', 'slug' => 'accessories'],
            ['name' => 'Shoes', 'slug' => 'shoes'],
            ['name' => 'Bags', 'slug' => 'bags'],
            ['name' => 'Jewelry', 'slug' => 'jewelry'],
        ];

        foreach ($categories as $categoryData) {
            Category::create([
                'name' => $categoryData['name'],
                'slug' => $categoryData['slug'],
                'description' => "Discover our collection of {$categoryData['name']}",
                'is_active' => true,
            ]);
        }

        // Create products for each category
        Category::all()->each(function ($category) {
            Product::factory(random_int(5, 15))->create([
                'category_id' => $category->id,
            ]);
        });

        // Create testimonials
        Testimonial::factory(10)->create();

        // Create customers
        Customer::factory(50)->create();

        $this->command->info('Database seeded successfully!');
    }
}