import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderItem {
    id: number;
    quantity: number;
    unit_price: number;
    total_price: number;
    product_variation: {
        size?: string;
        color?: string;
    } | null;
    product: {
        id: number;
        name: string;
        category: {
            name: string;
        };
    };
}

interface Order {
    id: number;
    order_number: string;
    status: string;
    subtotal: number;
    shipping_cost: number;
    total_amount: number;
    payment_method: string;
    payment_status: string;
    shipping_address: string;
    shipping_city: string;
    shipping_postal_code: string;
    shipping_province: string;
    notes: string | null;
    created_at: string;
    customer: {
        name: string;
        email: string;
        phone: string;
    };
    order_items: OrderItem[];
}

interface Props {
    order: Order;
    [key: string]: unknown;
}

export default function OrderShow({ order }: Props) {
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
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800', icon: '⏳', label: 'Pending' },
            confirmed: { color: 'bg-blue-100 text-blue-800', icon: '✅', label: 'Confirmed' },
            processing: { color: 'bg-purple-100 text-purple-800', icon: '⚙️', label: 'Processing' },
            shipped: { color: 'bg-indigo-100 text-indigo-800', icon: '🚚', label: 'Shipped' },
            delivered: { color: 'bg-green-100 text-green-800', icon: '📦', label: 'Delivered' },
            cancelled: { color: 'bg-red-100 text-red-800', icon: '❌', label: 'Cancelled' },
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        return (
            <Badge className={`${config.color} px-3 py-1`}>
                {config.icon} {config.label}
            </Badge>
        );
    };

    const getPaymentStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800', icon: '⏳', label: 'Pending Payment' },
            paid: { color: 'bg-green-100 text-green-800', icon: '✅', label: 'Paid' },
            failed: { color: 'bg-red-100 text-red-800', icon: '❌', label: 'Payment Failed' },
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        return (
            <Badge className={`${config.color} px-3 py-1`}>
                {config.icon} {config.label}
            </Badge>
        );
    };

    const getPaymentMethodLabel = (method: string) => {
        return method === 'bank_transfer' ? '🏦 Bank Transfer' : '💵 Cash on Delivery';
    };

    return (
        <>
            <Head title={`Order ${order.order_number} - Souvia`} />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-4">
                                <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    👗 Souvia
                                </Link>
                            </div>
                            <nav className="flex items-center space-x-6">
                                <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium">
                                    Home
                                </Link>
                                <Link href="/products" className="text-gray-700 hover:text-purple-600 font-medium">
                                    Products
                                </Link>
                                <Link href="/cart" className="text-gray-700 hover:text-purple-600 font-medium">
                                    🛒 Cart
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Success Message */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                        <div className="flex items-center space-x-3">
                            <div className="text-3xl">🎉</div>
                            <div>
                                <h1 className="text-2xl font-bold text-green-900 mb-2">
                                    Order Placed Successfully!
                                </h1>
                                <p className="text-green-700">
                                    Thank you for your order. We'll send you a confirmation email shortly.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Order #{order.order_number}
                            </h2>
                            <p className="text-gray-600">
                                Placed on {formatDate(order.created_at)}
                            </p>
                        </div>
                        <div className="flex flex-col sm:items-end space-y-2 mt-4 sm:mt-0">
                            {getStatusBadge(order.status)}
                            {getPaymentStatusBadge(order.payment_status)}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Order Items */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <span>📦</span>
                                        <span>Order Items</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {order.order_items.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <span className="text-2xl">👗</span>
                                            </div>
                                            <div className="flex-1">
                                                <Badge variant="outline" className="mb-2">
                                                    {item.product.category.name}
                                                </Badge>
                                                <h4 className="font-semibold text-gray-900 mb-1">
                                                    {item.product.name}
                                                </h4>
                                                {item.product_variation && (
                                                    <div className="text-sm text-gray-600 mb-2">
                                                        {item.product_variation.size && (
                                                            <span>Size: {item.product_variation.size}</span>
                                                        )}
                                                        {item.product_variation.size && item.product_variation.color && (
                                                            <span>, </span>
                                                        )}
                                                        {item.product_variation.color && (
                                                            <span>Color: {item.product_variation.color}</span>
                                                        )}
                                                    </div>
                                                )}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-600">
                                                        {formatPrice(item.unit_price)} × {item.quantity}
                                                    </span>
                                                    <span className="font-bold text-purple-600">
                                                        {formatPrice(item.total_price)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Payment Information */}
                            {order.payment_method === 'bank_transfer' && order.payment_status === 'pending' && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-2">
                                            <span>🏦</span>
                                            <span>Payment Instructions</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <h4 className="font-semibold text-blue-900 mb-2">
                                                Bank Transfer Details
                                            </h4>
                                            <div className="space-y-2 text-sm text-blue-800">
                                                <p><strong>Bank:</strong> Bank Central Asia (BCA)</p>
                                                <p><strong>Account Number:</strong> 1234567890</p>
                                                <p><strong>Account Name:</strong> Souvia Store</p>
                                                <p><strong>Amount:</strong> {formatPrice(order.total_amount)}</p>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <p className="mb-2">
                                                <strong>Important:</strong> Please transfer the exact amount and include your order number ({order.order_number}) in the transfer description.
                                            </p>
                                            <p>
                                                After payment, please contact us via WhatsApp at +62 812 3456 7890 to confirm your transfer.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Order Summary & Shipping */}
                        <div className="space-y-6">
                            {/* Order Summary */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <span>📋</span>
                                        <span>Order Summary</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal ({order.order_items.length} items)</span>
                                        <span className="font-medium">{formatPrice(order.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium">{formatPrice(order.shipping_cost)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-purple-600 border-t pt-3">
                                        <span>Total</span>
                                        <span>{formatPrice(order.total_amount)}</span>
                                    </div>
                                    <div className="text-sm text-gray-600 border-t pt-3">
                                        <strong>Payment Method:</strong><br />
                                        {getPaymentMethodLabel(order.payment_method)}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Shipping Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <span>🚚</span>
                                        <span>Shipping Information</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <p className="font-semibold text-gray-900">{order.customer.name}</p>
                                        <p className="text-sm text-gray-600">{order.customer.phone}</p>
                                        <p className="text-sm text-gray-600">{order.customer.email}</p>
                                    </div>
                                    <div className="text-sm text-gray-700">
                                        <p>{order.shipping_address}</p>
                                        <p>{order.shipping_city}, {order.shipping_postal_code}</p>
                                        <p>{order.shipping_province}</p>
                                    </div>
                                    {order.notes && (
                                        <div className="border-t pt-3">
                                            <p className="text-sm font-medium text-gray-700 mb-1">Order Notes:</p>
                                            <p className="text-sm text-gray-600">{order.notes}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Actions */}
                            <div className="space-y-3">
                                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                                    <Link href="/products">
                                        🛍️ Continue Shopping
                                    </Link>
                                </Button>
                                <Button variant="outline" className="w-full">
                                    📧 Contact Support
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}