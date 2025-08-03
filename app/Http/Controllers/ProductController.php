<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index()
    {
        $products = Product::with('category')
            ->active()
            ->latest()
            ->paginate(12);

        $categories = Category::active()
            ->withCount('products')
            ->get();

        return Inertia::render('products/index', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    /**
     * Display the specified product.
     */
    public function show(Product $product)
    {
        $product->load('category');
        
        // Get related products from the same category
        $relatedProducts = Product::with('category')
            ->active()
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->take(4)
            ->get();

        return Inertia::render('products/show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }
}