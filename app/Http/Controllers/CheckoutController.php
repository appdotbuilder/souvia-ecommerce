<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Models\CartItem;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    /**
     * Display the checkout page.
     */
    public function index()
    {
        $sessionId = session()->getId();
        
        $cartItems = CartItem::with('product.category')
            ->where('session_id', $sessionId)
            ->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')
                ->with('error', 'Your cart is empty!');
        }

        $subtotal = $cartItems->sum(function ($item) {
            return $item->product->price * $item->quantity;
        });

        $shippingCost = 15000; // Fixed shipping cost
        $total = $subtotal + $shippingCost;

        return Inertia::render('checkout/index', [
            'cartItems' => $cartItems,
            'subtotal' => $subtotal,
            'shippingCost' => $shippingCost,
            'total' => $total,
        ]);
    }

    /**
     * Process the checkout.
     */
    public function store(StoreOrderRequest $request)
    {
        $sessionId = session()->getId();
        
        $cartItems = CartItem::with('product')
            ->where('session_id', $sessionId)
            ->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')
                ->with('error', 'Your cart is empty!');
        }

        return DB::transaction(function () use ($request, $cartItems) {
            // Create or find customer
            $customer = Customer::firstOrCreate(
                ['email' => $request->email],
                [
                    'name' => $request->name,
                    'phone' => $request->phone,
                    'address' => $request->address,
                    'city' => $request->city,
                    'postal_code' => $request->postal_code,
                    'province' => $request->province,
                ]
            );

            // Calculate totals
            $subtotal = $cartItems->sum(function ($item) {
                return $item->product->price * $item->quantity;
            });
            $shippingCost = 15000;
            $total = $subtotal + $shippingCost;

            // Create order
            $order = Order::create([
                'order_number' => 'ORD-' . now()->format('YmdHis') . '-' . random_int(1000, 9999),
                'customer_id' => $customer->id,
                'subtotal' => $subtotal,
                'shipping_cost' => $shippingCost,
                'total_amount' => $total,
                'payment_method' => $request->payment_method,
                'shipping_address' => $request->address,
                'shipping_city' => $request->city,
                'shipping_postal_code' => $request->postal_code,
                'shipping_province' => $request->province,
                'notes' => $request->notes,
            ]);

            // Create order items
            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'unit_price' => $cartItem->product->price,
                    'total_price' => $cartItem->product->price * $cartItem->quantity,
                    'product_variation' => $cartItem->product_variation,
                ]);

                // Update product stock
                $cartItem->product->decrement('stock', $cartItem->quantity);
            }

            // Create transaction record
            Transaction::create([
                'transaction_number' => 'TXN-' . now()->format('YmdHis') . '-' . random_int(1000, 9999),
                'type' => 'income',
                'category' => 'Sales',
                'amount' => $total,
                'description' => 'Order #' . $order->order_number,
                'transaction_date' => now()->toDateString(),
                'reference_type' => 'App\Models\Order',
                'reference_id' => $order->id,
            ]);

            // Clear cart
            CartItem::where('session_id', session()->getId())->delete();

            return redirect()->route('orders.show', $order)
                ->with('success', 'Order placed successfully!');
        });
    }
}