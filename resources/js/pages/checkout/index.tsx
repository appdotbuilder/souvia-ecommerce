import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CartItem {
    id: number;
    quantity: number;
    product_variation: {
        size?: string;
        color?: string;
    } | null;
    product: {
        id: number;
        name: string;
        price: number;
        category: {
            name: string;
        };
    };
}

interface Props {
    cartItems: CartItem[];
    subtotal: number;
    shippingCost: number;
    total: number;
    [key: string]: unknown;
}

export default function CheckoutIndex({ cartItems, subtotal, shippingCost, total }: Props) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postal_code: '',
        province: '',
        payment_method: 'bank_transfer',
        notes: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.post(route('checkout.store'), formData, {
            onSuccess: () => {
                setIsSubmitting(false);
            },
            onError: (errors) => {
                setErrors(errors);
                setIsSubmitting(false);
            },
        });
    };

    const getItemTotal = (cartItem: CartItem) => {
        return cartItem.product.price * cartItem.quantity;
    };

    const provinces = [
        'DKI Jakarta',
        'Jawa Barat',
        'Jawa Tengah',
        'Jawa Timur',
        'Banten',
        'Yogyakarta',
        'Sumatera Utara',
        'Sumatera Selatan',
        'Bali',
        'Kalimantan Timur',
    ];

    return (
        <>
            <Head title="Checkout - Souvia" />
            
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

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            💳 Checkout
                        </h1>
                        <nav className="flex items-center space-x-2 text-sm text-gray-600">
                            <Link href="/cart" className="hover:text-purple-600">Cart</Link>
                            <span>→</span>
                            <span className="text-purple-600 font-medium">Checkout</span>
                        </nav>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Checkout Form */}
                        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
                            {/* Shipping Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <span>📦</span>
                                        <span>Shipping Information</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                placeholder="Enter your full name"
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                placeholder="Enter your email"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                                                errors.phone ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder="Enter your phone number"
                                        />
                                        {errors.phone && (
                                            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Address *
                                        </label>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                                                errors.address ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder="Enter your complete address"
                                        />
                                        {errors.address && (
                                            <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                                                    errors.city ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                placeholder="City"
                                            />
                                            {errors.city && (
                                                <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Postal Code *
                                            </label>
                                            <input
                                                type="text"
                                                name="postal_code"
                                                value={formData.postal_code}
                                                onChange={handleInputChange}
                                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                                                    errors.postal_code ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                placeholder="Postal Code"
                                            />
                                            {errors.postal_code && (
                                                <p className="mt-1 text-sm text-red-600">{errors.postal_code}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Province *
                                            </label>
                                            <select
                                                name="province"
                                                value={formData.province}
                                                onChange={handleInputChange}
                                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                                                    errors.province ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            >
                                                <option value="">Select Province</option>
                                                {provinces.map((province) => (
                                                    <option key={province} value={province}>
                                                        {province}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.province && (
                                                <p className="mt-1 text-sm text-red-600">{errors.province}</p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Payment Method */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <span>💰</span>
                                        <span>Payment Method</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                            <input
                                                type="radio"
                                                name="payment_method"
                                                value="bank_transfer"
                                                checked={formData.payment_method === 'bank_transfer'}
                                                onChange={handleInputChange}
                                                className="text-purple-600"
                                            />
                                            <div className="flex-1">
                                                <div className="font-medium">🏦 Bank Transfer</div>
                                                <div className="text-sm text-gray-600">
                                                    Transfer to our bank account. Order will be processed after payment confirmation.
                                                </div>
                                            </div>
                                        </label>

                                        <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                            <input
                                                type="radio"
                                                name="payment_method"
                                                value="cod"
                                                checked={formData.payment_method === 'cod'}
                                                onChange={handleInputChange}
                                                className="text-purple-600"
                                            />
                                            <div className="flex-1">
                                                <div className="font-medium">💵 Cash on Delivery (COD)</div>
                                                <div className="text-sm text-gray-600">
                                                    Pay when your order arrives at your doorstep.
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Order Notes */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <span>📝</span>
                                        <span>Order Notes (Optional)</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Any special instructions for your order..."
                                    />
                                </CardContent>
                            </Card>
                        </form>

                        {/* Order Summary */}
                        <div className="lg:col-span-1 space-y-6">
                            <Card className="sticky top-8">
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <span>📋</span>
                                        <span>Order Summary</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Order Items */}
                                    <div className="space-y-3">
                                        {cartItems.map((cartItem) => (
                                            <div key={cartItem.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                                <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center flex-shrink-0">
                                                    <span className="text-lg">👗</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-sm text-gray-900 truncate">
                                                        {cartItem.product.name}
                                                    </p>
                                                    <div className="flex items-center justify-between text-xs text-gray-600">
                                                        <span>Qty: {cartItem.quantity}</span>
                                                        <span className="font-medium">
                                                            {formatPrice(getItemTotal(cartItem))}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pricing Summary */}
                                    <div className="space-y-2 border-t pt-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                                            <span className="font-medium">{formatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Shipping</span>
                                            <span className="font-medium">{formatPrice(shippingCost)}</span>
                                        </div>
                                        <div className="flex justify-between text-lg font-bold text-purple-600 border-t pt-2">
                                            <span>Total</span>
                                            <span>{formatPrice(total)}</span>
                                        </div>
                                    </div>

                                    {/* Place Order Button */}
                                    <Button
                                        type="submit"
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-3"
                                    >
                                        {isSubmitting ? '⏳ Processing...' : '🎉 Place Order'}
                                    </Button>

                                    <div className="text-xs text-gray-600 text-center">
                                        By placing your order, you agree to our Terms of Service and Privacy Policy.
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}