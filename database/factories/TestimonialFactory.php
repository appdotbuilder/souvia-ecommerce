<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Testimonial>
 */
class TestimonialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $testimonials = [
            "I absolutely love shopping at Souvia! The quality is amazing and the styles are always on-trend.",
            "Great customer service and fast shipping. My favorite online fashion store!",
            "The dresses I bought fit perfectly and look exactly like the photos. Highly recommended!",
            "Souvia has become my go-to for professional wear. Elegant and affordable.",
            "The variety of products is impressive. I always find something I love here.",
        ];

        return [
            'customer_name' => fake()->name(),
            'message' => fake()->randomElement($testimonials),
            'rating' => fake()->numberBetween(4, 5),
            'is_featured' => fake()->boolean(30), // 30% chance of being featured
            'is_active' => true,
        ];
    }
}