<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Testimonial;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page.
     */
    public function index()
    {
        $featuredProducts = Product::with('category')
            ->active()
            ->featured()
            ->take(6)
            ->get();

        $categories = Category::active()
            ->withCount('products')
            ->take(8)
            ->get();

        $testimonials = Testimonial::active()
            ->featured()
            ->take(3)
            ->get();

        return Inertia::render('welcome', [
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
            'testimonials' => $testimonials,
        ]);
    }
}