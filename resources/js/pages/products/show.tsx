import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    images: string[] | null;
    variations: {
        sizes?: string[];
        colors?: string[];
    } | null;
    weight: number | null;
    shipping_origin: string | null;
    category: {
        name: string;
        slug: string;
    };
}

interface Props {
    product: Product;
    relatedProducts: Product[];
    [key: string]: unknown;
}

export default function ProductShow({ product, relatedProducts }: Props) {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const addToCart = () => {
        const variation: Record<string, string> = {};
        if (selectedSize) variation.size = selectedSize;
        if (selectedColor) variation.color = selectedColor;

        router.post(route('cart.store'), {
            product_id: product.id,
            quantity: quantity,
            product_variation: Object.keys(variation).length > 0 ? variation : null,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const addRelatedToCart = (relatedProduct: Product) => {
        router.post(route('cart.store'), {
            product_id: relatedProduct.id,
            quantity: 1,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title={`${product.name} - Souvia`} />
            
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
                    {/* Breadcrumb */}
                    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
                        <Link href="/" className="hover:text-purple-600">Home</Link>
                        <span>→</span>
                        <Link href="/products" className="hover:text-purple-600">Products</Link>
                        <span>→</span>
                        <Link href={`/products?category=${product.category.slug}`} className="hover:text-purple-600">
                            {product.category.name}
                        </Link>
                        <span>→</span>
                        <span className="text-gray-900">{product.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        {/* Product Images */}
                        <div>
                            <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                                <span className="text-8xl">👗</span>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="aspect-square bg-gray-100 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                                        <span className="text-2xl">👗</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div>
                            <Badge variant="outline" className="mb-4">
                                {product.category.name}
                            </Badge>
                            
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {product.name}
                            </h1>
                            
                            <p className="text-4xl font-bold text-purple-600 mb-6">
                                {formatPrice(product.price)}
                            </p>

                            <div className="space-y-6 mb-8">
                                {/* Stock Status */}
                                <div className="flex items-center space-x-2">
                                    {product.stock > 10 ? (
                                        <>
                                            <span className="text-green-600">✅</span>
                                            <span className="text-green-600 font-medium">In Stock ({product.stock} available)</span>
                                        </>
                                    ) : product.stock > 0 ? (
                                        <>
                                            <span className="text-yellow-600">⚠️</span>
                                            <span className="text-yellow-600 font-medium">Low Stock ({product.stock} left)</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-red-600">❌</span>
                                            <span className="text-red-600 font-medium">Out of Stock</span>
                                        </>
                                    )}
                                </div>

                                {/* Size Selection */}
                                {product.variations?.sizes && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Size
                                        </label>
                                        <div className="flex space-x-2">
                                            {product.variations.sizes.map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`px-4 py-2 border rounded-md transition-colors ${
                                                        selectedSize === size
                                                            ? 'border-purple-600 bg-purple-50 text-purple-600'
                                                            : 'border-gray-300 hover:border-gray-400'
                                                    }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Color Selection */}
                                {product.variations?.colors && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Color
                                        </label>
                                        <div className="flex space-x-2">
                                            {product.variations.colors.map((color) => (
                                                <button
                                                    key={color}
                                                    onClick={() => setSelectedColor(color)}
                                                    className={`px-4 py-2 border rounded-md transition-colors ${
                                                        selectedColor === color
                                                            ? 'border-purple-600 bg-purple-50 text-purple-600'
                                                            : 'border-gray-300 hover:border-gray-400'
                                                    }`}
                                                >
                                                    {color}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Quantity */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Quantity
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                        >
                                            −
                                        </button>
                                        <span className="px-4 py-2 border border-gray-300 rounded-md bg-gray-50 min-w-[60px] text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                            disabled={quantity >= product.stock}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Add to Cart */}
                            <div className="space-y-4 mb-8">
                                <Button
                                    onClick={addToCart}
                                    disabled={product.stock === 0}
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-3 disabled:opacity-50"
                                >
                                    {product.stock === 0 ? '❌ Out of Stock' : '🛒 Add to Cart'}
                                </Button>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button variant="outline" className="w-full">
                                        💝 Add to Wishlist
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        📤 Share
                                    </Button>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="border-t pt-8 space-y-4">
                                {product.weight && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Weight:</span>
                                        <span className="font-medium">{product.weight} kg</span>
                                    </div>
                                )}
                                {product.shipping_origin && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Ships from:</span>
                                        <span className="font-medium">{product.shipping_origin}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Category:</span>
                                    <span className="font-medium">{product.category.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 Product Description</h2>
                        <div className="bg-white rounded-lg p-8 shadow-sm">
                            <p className="text-gray-700 leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">✨ Related Products</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedProducts.map((relatedProduct) => (
                                    <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
                                        <CardContent className="p-0">
                                            <div className="aspect-square bg-gray-100 rounded-t-lg mb-4 flex items-center justify-center">
                                                <span className="text-4xl">👗</span>
                                            </div>
                                            <div className="p-4">
                                                <Badge variant="outline" className="mb-2 text-xs">
                                                    {relatedProduct.category.name}
                                                </Badge>
                                                <h4 className="font-semibold text-sm mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                                                    {relatedProduct.name}
                                                </h4>
                                                <p className="text-xl font-bold text-purple-600 mb-3">
                                                    {formatPrice(relatedProduct.price)}
                                                </p>
                                                <div className="flex space-x-2">
                                                    <Button 
                                                        onClick={() => addRelatedToCart(relatedProduct)}
                                                        disabled={relatedProduct.stock === 0}
                                                        size="sm"
                                                        className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-xs"
                                                    >
                                                        {relatedProduct.stock === 0 ? '❌' : '🛒'}
                                                    </Button>
                                                    <Button asChild variant="outline" size="sm">
                                                        <Link href={`/products/${relatedProduct.slug}`}>
                                                            👁️
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}