import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

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
        slug: string;
        price: number;
        stock: number;
        category: {
            name: string;
        };
    };
}

interface Props {
    cartItems: CartItem[];
    total: number;
    [key: string]: unknown;
}

export default function CartIndex({ cartItems, total }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const updateQuantity = (cartItem: CartItem, newQuantity: number) => {
        if (newQuantity < 1 || newQuantity > cartItem.product.stock) return;
        
        router.patch(route('cart.update', cartItem.id), {
            quantity: newQuantity,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const removeItem = (cartItem: CartItem) => {
        router.delete(route('cart.destroy', cartItem.id), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getItemTotal = (cartItem: CartItem) => {
        return cartItem.product.price * cartItem.quantity;
    };

    return (
        <>
            <Head title="Shopping Cart - Souvia" />
            
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
                                <Link href="/cart" className="text-purple-600 font-medium">
                                    🛒 Cart
                                </Link>
                                <div className="flex items-center space-x-2">
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={route('login')}>Login</Link>
                                    </Button>
                                    <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700">
                                        <Link href={route('register')}>Register</Link>
                                    </Button>
                                </div>
                            </nav>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            🛒 Shopping Cart
                        </h1>
                        <p className="text-gray-600">
                            {cartItems.length === 0 
                                ? 'Your cart is empty' 
                                : `You have ${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart`
                            }
                        </p>
                    </div>

                    {cartItems.length === 0 ? (
                        /* Empty Cart */
                        <div className="text-center py-16">
                            <div className="text-8xl mb-6">🛒</div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Your cart is empty
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Looks like you haven't added any items to your cart yet.
                            </p>
                            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                                <Link href="/products">
                                    🛍️ Continue Shopping
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                {cartItems.map((cartItem) => (
                                    <Card key={cartItem.id}>
                                        <CardContent className="p-6">
                                            <div className="flex items-center space-x-4">
                                                {/* Product Image */}
                                                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <span className="text-2xl">👗</span>
                                                </div>

                                                {/* Product Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <Badge variant="outline" className="mb-2">
                                                                {cartItem.product.category.name}
                                                            </Badge>
                                                            <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                                                <Link 
                                                                    href={`/products/${cartItem.product.slug}`}
                                                                    className="hover:text-purple-600 transition-colors"
                                                                >
                                                                    {cartItem.product.name}
                                                                </Link>
                                                            </h3>
                                                            {cartItem.product_variation && (
                                                                <div className="text-sm text-gray-600 mb-2">
                                                                    {cartItem.product_variation.size && (
                                                                        <span>Size: {cartItem.product_variation.size}</span>
                                                                    )}
                                                                    {cartItem.product_variation.size && cartItem.product_variation.color && (
                                                                        <span>, </span>
                                                                    )}
                                                                    {cartItem.product_variation.color && (
                                                                        <span>Color: {cartItem.product_variation.color}</span>
                                                                    )}
                                                                </div>
                                                            )}
                                                            <p className="text-xl font-bold text-purple-600">
                                                                {formatPrice(cartItem.product.price)}
                                                            </p>
                                                        </div>

                                                        {/* Remove Button */}
                                                        <Button
                                                            onClick={() => removeItem(cartItem)}
                                                            variant="outline"
                                                            size="sm"
                                                            className="text-red-600 hover:text-red-700 hover:border-red-300"
                                                        >
                                                            🗑️ Remove
                                                        </Button>
                                                    </div>

                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center justify-between mt-4">
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                                            <div className="flex items-center space-x-2">
                                                                <button
                                                                    onClick={() => updateQuantity(cartItem, cartItem.quantity - 1)}
                                                                    disabled={cartItem.quantity <= 1}
                                                                    className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                >
                                                                    −
                                                                </button>
                                                                <span className="px-3 py-1 border border-gray-300 rounded-md bg-gray-50 min-w-[50px] text-center">
                                                                    {cartItem.quantity}
                                                                </span>
                                                                <button
                                                                    onClick={() => updateQuantity(cartItem, cartItem.quantity + 1)}
                                                                    disabled={cartItem.quantity >= cartItem.product.stock}
                                                                    className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Item Total */}
                                                        <div className="text-right">
                                                            <p className="text-sm text-gray-600">Subtotal</p>
                                                            <p className="text-lg font-bold text-gray-900">
                                                                {formatPrice(getItemTotal(cartItem))}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Stock Warning */}
                                                    {cartItem.product.stock <= 5 && (
                                                        <div className="mt-2 text-sm text-yellow-600">
                                                            ⚠️ Only {cartItem.product.stock} left in stock
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <Card className="sticky top-8">
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-6">
                                            📋 Order Summary
                                        </h3>
                                        
                                        <div className="space-y-4 mb-6">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                                                <span className="font-medium">{formatPrice(total)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Shipping</span>
                                                <span className="font-medium">{formatPrice(15000)}</span>
                                            </div>
                                            <div className="border-t pt-4">
                                                <div className="flex justify-between">
                                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                                    <span className="text-xl font-bold text-purple-600">
                                                        {formatPrice(total + 15000)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-3 mb-4">
                                            <Link href="/checkout">
                                                💳 Proceed to Checkout
                                            </Link>
                                        </Button>

                                        <Button asChild variant="outline" className="w-full">
                                            <Link href="/products">
                                                🛍️ Continue Shopping
                                            </Link>
                                        </Button>

                                        {/* Shipping Info */}
                                        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                                            <h4 className="font-semibold text-purple-900 mb-2">
                                                🚚 Free Shipping
                                            </h4>
                                            <p className="text-sm text-purple-700">
                                                Free shipping on orders over Rp 500,000
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}