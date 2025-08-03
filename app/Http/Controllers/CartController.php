<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display the shopping cart.
     */
    public function index()
    {
        $sessionId = session()->getId();
        
        $cartItems = CartItem::with('product.category')
            ->where('session_id', $sessionId)
            ->get();

        $total = $cartItems->sum(function ($item) {
            return $item->product->price * $item->quantity;
        });

        return Inertia::render('cart/index', [
            'cartItems' => $cartItems,
            'total' => $total,
        ]);
    }

    /**
     * Add item to cart.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'product_variation' => 'nullable|array',
        ]);

        $sessionId = session()->getId();
        $product = Product::find($request->product_id);

        // Check if item already exists in cart
        $existingItem = CartItem::where('session_id', $sessionId)
            ->where('product_id', $request->product_id)
            ->where('product_variation', $request->product_variation)
            ->first();

        if ($existingItem) {
            $existingItem->update([
                'quantity' => $existingItem->quantity + $request->quantity,
            ]);
        } else {
            CartItem::create([
                'session_id' => $sessionId,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'product_variation' => $request->product_variation,
            ]);
        }

        return redirect()->back()->with('success', 'Product added to cart!');
    }

    /**
     * Update cart item quantity.
     */
    public function update(Request $request, CartItem $cartItem)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem->update([
            'quantity' => $request->quantity,
        ]);

        return redirect()->back()->with('success', 'Cart updated!');
    }

    /**
     * Remove item from cart.
     */
    public function destroy(CartItem $cartItem)
    {
        $cartItem->delete();

        return redirect()->back()->with('success', 'Item removed from cart!');
    }
}