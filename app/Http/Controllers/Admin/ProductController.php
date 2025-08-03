<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
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
            ->latest()
            ->paginate(10);

        return Inertia::render('admin/products/index', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new product.
     */
    public function create()
    {
        $categories = Category::active()->get();

        return Inertia::render('admin/products/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created product.
     */
    public function store(StoreProductRequest $request)
    {
        $product = Product::create($request->validated());

        return redirect()->route('admin.products.show', $product)
            ->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified product.
     */
    public function show(Product $product)
    {
        $product->load('category');

        return Inertia::render('admin/products/show', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit(Product $product)
    {
        $categories = Category::active()->get();

        return Inertia::render('admin/products/edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified product.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update($request->validated());

        return redirect()->route('admin.products.show', $product)
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified product.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('admin.products.index')
            ->with('success', 'Product deleted successfully.');
    }
}