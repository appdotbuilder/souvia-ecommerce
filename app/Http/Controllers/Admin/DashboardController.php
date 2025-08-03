<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        // Get key metrics
        $totalOrders = Order::count();
        $totalRevenue = Order::where('payment_status', 'paid')->sum('total_amount');
        $totalCustomers = Customer::count();
        $lowStockProducts = Product::lowStock()->count();

        // Get recent orders
        $recentOrders = Order::with('customer')
            ->latest()
            ->take(5)
            ->get();

        // Get monthly sales data for chart
        $monthlySales = Order::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('SUM(total_amount) as total')
        )
            ->where('created_at', '>=', now()->subMonths(6))
            ->where('payment_status', 'paid')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Get top selling products
        $topProducts = Product::select('products.*', DB::raw('SUM(order_items.quantity) as total_sold'))
            ->join('order_items', 'products.id', '=', 'order_items.product_id')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->where('orders.payment_status', 'paid')
            ->groupBy('products.id')
            ->orderBy('total_sold', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('admin/dashboard', [
            'metrics' => [
                'totalOrders' => $totalOrders,
                'totalRevenue' => $totalRevenue,
                'totalCustomers' => $totalCustomers,
                'lowStockProducts' => $lowStockProducts,
            ],
            'recentOrders' => $recentOrders,
            'monthlySales' => $monthlySales,
            'topProducts' => $topProducts,
        ]);
    }
}