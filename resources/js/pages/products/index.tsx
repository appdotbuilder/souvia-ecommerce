import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    images: string[] | null;
    stock: number;
    category: {
        name: string;
    };
}

interface Category {
    id: number;
    name: string;
    slug: string;
    products_count: number;
}

interface PaginationData {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    products: PaginationData;
    categories: Category[];
    [key: string]: unknown;
}

export default function ProductsIndex({ products, categories }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const addToCart = (product: Product) => {
        router.post(route('cart.store'), {
            product_id: product.id,
            quantity: 1,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Products - Souvia" />
            
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
                                <Link href="/products" className="text-purple-600 font-medium">
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
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            🛍️ All Products
                        </h1>
                        <p className="text-gray-600">
                            Discover our complete collection of fashion items
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar - Categories */}
                        <div className="lg:w-64 flex-shrink-0">
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-lg mb-4">🏷️ Categories</h3>
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => setSelectedCategory(null)}
                                            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                                                selectedCategory === null 
                                                    ? 'bg-purple-100 text-purple-800' 
                                                    : 'hover:bg-gray-100'
                                            }`}
                                        >
                                            All Products ({products.total})
                                        </button>
                                        {categories.map((category) => (
                                            <button
                                                key={category.id}
                                                onClick={() => setSelectedCategory(category.slug)}
                                                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                                                    selectedCategory === category.slug 
                                                        ? 'bg-purple-100 text-purple-800' 
                                                        : 'hover:bg-gray-100'
                                                }`}
                                            >
                                                {category.name} ({category.products_count})
                                            </button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Products Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.data.map((product) => (
                                    <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                                        <CardContent className="p-0">
                                            <div className="aspect-square bg-gray-100 rounded-t-lg mb-4 flex items-center justify-center">
                                                <span className="text-6xl">👗</span>
                                            </div>
                                            <div className="p-6">
                                                <div className="flex justify-between items-start mb-2">
                                                    <Badge variant="outline">
                                                        {product.category.name}
                                                    </Badge>
                                                    {product.stock <= 5 && product.stock > 0 && (
                                                        <Badge variant="destructive" className="text-xs">
                                                            Low Stock
                                                        </Badge>
                                                    )}
                                                    {product.stock === 0 && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            Out of Stock
                                                        </Badge>
                                                    )}
                                                </div>
                                                <h4 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                                                    {product.name}
                                                </h4>
                                                <p className="text-2xl font-bold text-purple-600 mb-4">
                                                    {formatPrice(product.price)}
                                                </p>
                                                <div className="flex space-x-2">
                                                    <Button 
                                                        onClick={() => addToCart(product)}
                                                        disabled={product.stock === 0}
                                                        className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                                                    >
                                                        {product.stock === 0 ? '❌ Out of Stock' : '🛒 Add to Cart'}
                                                    </Button>
                                                    <Button asChild variant="outline" size="sm">
                                                        <Link href={`/products/${product.slug}`}>
                                                            👁️ View
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Pagination */}
                            {products.last_page > 1 && (
                                <div className="flex justify-center items-center space-x-2 mt-8">
                                    {products.current_page > 1 && (
                                        <Button variant="outline" size="sm">
                                            Previous
                                        </Button>
                                    )}
                                    
                                    <div className="flex space-x-1">
                                        {Array.from({ length: products.last_page }, (_, i) => i + 1).map((page) => (
                                            <Button
                                                key={page}
                                                variant={page === products.current_page ? "default" : "outline"}
                                                size="sm"
                                                className={page === products.current_page ? "bg-purple-600" : ""}
                                            >
                                                {page}
                                            </Button>
                                        ))}
                                    </div>

                                    {products.current_page < products.last_page && (
                                        <Button variant="outline" size="sm">
                                            Next
                                        </Button>
                                    )}
                                </div>
                            )}

                            {/* Empty State */}
                            {products.data.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        No products found
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Try adjusting your filters or browse all categories.
                                    </p>
                                    <Button asChild>
                                        <Link href="/products">
                                            View All Products
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}