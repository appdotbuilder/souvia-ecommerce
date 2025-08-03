<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display the specified order.
     */
    public function show(Order $order)
    {
        $order->load(['customer', 'orderItems.product']);

        return Inertia::render('orders/show', [
            'order' => $order,
        ]);
    }
}