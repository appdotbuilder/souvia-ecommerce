import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Metrics {
    totalOrders: number;
    totalRevenue: number;
    totalCustomers: number;
    lowStockProducts: number;
}

interface Order {
    id: number;
    order_number: string;
    total_amount: number;
    status: string;
    created_at: string;
    customer: {
        name: string;
    };
}

interface Product {
    id: number;
    name: string;
    total_sold: number;
}

interface Props {
    metrics: Metrics;
    recentOrders: Order[];
    topProducts: Product[];
    monthlySales: Array<{ month: number; total: number }>;
    [key: string]: unknown;
}

export default function AdminDashboard({ metrics, recentOrders, topProducts }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
            confirmed: { color: 'bg-blue-100 text-blue-800', icon: '✅' },
            processing: { color: 'bg-purple-100 text-purple-800', icon: '⚙️' },
            shipped: { color: 'bg-indigo-100 text-indigo-800', icon: '🚚' },
            delivered: { color: 'bg-green-100 text-green-800', icon: '📦' },
            cancelled: { color: 'bg-red-100 text-red-800', icon: '❌' },
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                {config.icon} {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <>
            <Head title="Admin Dashboard - Souvia" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Admin Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-4">
                                <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    👗 Souvia
                                </Link>
                                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">
                                    Admin
                                </span>
                            </div>
                            <nav className="flex items-center space-x-6">
                                <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium">
                                    🏠 Store
                                </Link>
                                <Link href={route('admin.dashboard')} className="text-purple-600 font-medium">
                                    📊 Dashboard
                                </Link>
                                <Link href={route('admin.products.index')} className="text-gray-700 hover:text-purple-600 font-medium">
                                    👗 Products
                                </Link>
                                <Button asChild variant="outline" size="sm">
                                    <Link href={route('logout')} method="post">
                                        🚪 Logout
                                    </Link>
                                </Button>
                            </nav>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="space-y-8">
                {/* Page Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            📊 Dashboard
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Welcome to Souvia Admin Panel
                        </p>
                    </div>
                    <div className="flex space-x-3">
                        <Button asChild variant="outline">
                            <Link href="/">
                                🏠 View Store
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={route('admin.products.create')}>
                                ➕ Add Product
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                    <p className="text-3xl font-bold text-gray-900">{metrics.totalOrders}</p>
                                </div>
                                <div className="text-4xl">📦</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                    <p className="text-2xl font-bold text-green-600">{formatPrice(metrics.totalRevenue)}</p>
                                </div>
                                <div className="text-4xl">💰</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Customers</p>
                                    <p className="text-3xl font-bold text-gray-900">{metrics.totalCustomers}</p>
                                </div>
                                <div className="text-4xl">👥</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                                    <p className="text-3xl font-bold text-red-600">{metrics.lowStockProducts}</p>
                                </div>
                                <div className="text-4xl">⚠️</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Orders */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span className="flex items-center space-x-2">
                                    <span>📋</span>
                                    <span>Recent Orders</span>
                                </span>
                                <Button asChild variant="outline" size="sm">
                                    <Link href="/admin/orders">
                                        View All
                                    </Link>
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentOrders.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        <div className="text-4xl mb-2">📭</div>
                                        <p>No recent orders</p>
                                    </div>
                                ) : (
                                    recentOrders.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    #{order.order_number}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {order.customer.name} • {formatDate(order.created_at)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900">
                                                    {formatPrice(order.total_amount)}
                                                </p>
                                                <div className="mt-1">
                                                    {getStatusBadge(order.status)}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Top Products */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span className="flex items-center space-x-2">
                                    <span>🏆</span>
                                    <span>Top Selling Products</span>
                                </span>
                                <Button asChild variant="outline" size="sm">
                                    <Link href={route('admin.products.index')}>
                                        View All
                                    </Link>
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {topProducts.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        <div className="text-4xl mb-2">📊</div>
                                        <p>No sales data available</p>
                                    </div>
                                ) : (
                                    topProducts.map((product, index) => (
                                        <div key={product.id} className="flex items-center space-x-4">
                                            <div className="flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-600 rounded-full font-bold text-sm">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 line-clamp-1">
                                                    {product.name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {product.total_sold} sold
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <span>⚡</span>
                            <span>Quick Actions</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Button asChild variant="outline" size="lg" className="h-auto p-6 flex-col space-y-2">
                                <Link href={route('admin.products.index')}>
                                    <div className="text-2xl">👗</div>
                                    <span>Manage Products</span>
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="h-auto p-6 flex-col space-y-2">
                                <Link href="/admin/orders">
                                    <div className="text-2xl">📦</div>
                                    <span>View Orders</span>
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="h-auto p-6 flex-col space-y-2">
                                <Link href="/admin/customers">
                                    <div className="text-2xl">👥</div>
                                    <span>Customers</span>
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="h-auto p-6 flex-col space-y-2">
                                <Link href="/admin/reports">
                                    <div className="text-2xl">📊</div>
                                    <span>Reports</span>
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                    </div>
                </div>
            </div>
        </>
    );
}