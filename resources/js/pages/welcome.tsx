import React from 'react';
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

interface Testimonial {
    customer_name: string;
    message: string;
    rating: number;
    customer_image: string | null;
}

interface Props {
    featuredProducts: Product[];
    categories: Category[];
    testimonials: Testimonial[];
    [key: string]: unknown;
}

export default function Welcome({ featuredProducts, categories, testimonials }: Props) {
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
            <Head title="Souvia - Premium Fashion Store" />
            
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-4">
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    👗 Souvia
                                </h1>
                                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                                    Premium Fashion
                                </Badge>
                            </div>
                            <nav className="flex items-center space-x-6">
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

                {/* Hero Section */}
                <section className="py-20 px-4">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-5xl font-bold text-gray-900 mb-6">
                            ✨ Discover Your Style with Souvia
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Premium fashion for the modern woman. From elegant dresses to trendy accessories, 
                            find everything you need to express your unique style.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3">
                                <Link href="/products">
                                    🛍️ Shop Now
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
                                <Link href="#about">
                                    📖 Learn More
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                🌟 Featured Products
                            </h3>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Discover our most popular items, carefully selected for their quality and style.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredProducts.map((product) => (
                                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                                    <CardContent className="p-0">
                                        <div className="aspect-square bg-gray-100 rounded-t-lg mb-4 flex items-center justify-center">
                                            <span className="text-6xl">👗</span>
                                        </div>
                                        <div className="p-6">
                                            <Badge variant="outline" className="mb-2">
                                                {product.category.name}
                                            </Badge>
                                            <h4 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                                                {product.name}
                                            </h4>
                                            <p className="text-2xl font-bold text-purple-600 mb-4">
                                                {formatPrice(product.price)}
                                            </p>
                                            <div className="flex space-x-2">
                                                <Button 
                                                    onClick={() => addToCart(product)}
                                                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                                                >
                                                    🛒 Add to Cart
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
                    </div>
                </section>

                {/* Categories */}
                <section className="py-16 px-4 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                🏷️ Shop by Category
                            </h3>
                            <p className="text-gray-600">
                                Find exactly what you're looking for in our organized collections.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {categories.map((category) => (
                                <Card key={category.id} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                                    <CardContent className="p-6">
                                        <div className="text-4xl mb-4">👚</div>
                                        <h4 className="font-semibold text-lg mb-2">{category.name}</h4>
                                        <p className="text-sm text-gray-600">
                                            {category.products_count} products
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                💬 What Our Customers Say
                            </h3>
                            <p className="text-gray-600">
                                Don't just take our word for it - hear from our satisfied customers.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <Card key={index} className="text-center">
                                    <CardContent className="p-6">
                                        <div className="text-5xl mb-4">👤</div>
                                        <div className="flex justify-center mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}>
                                                    ⭐
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-gray-600 mb-4 italic">
                                            "{testimonial.message}"
                                        </p>
                                        <p className="font-semibold text-gray-900">
                                            {testimonial.customer_name}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-16 px-4 bg-purple-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                                    🎯 About Souvia
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Souvia is a premium fashion brand dedicated to empowering women through style. 
                                    We carefully curate the latest trends and timeless pieces to help you express 
                                    your unique personality.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">✨</span>
                                        <span className="text-gray-700">Premium Quality Materials</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">🚚</span>
                                        <span className="text-gray-700">Fast & Free Shipping</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">💝</span>
                                        <span className="text-gray-700">Easy Returns & Exchanges</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">👥</span>
                                        <span className="text-gray-700">Expert Fashion Styling</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-8 shadow-lg">
                                <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                    📞 Contact Us
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-xl">📧</span>
                                        <span className="text-gray-700">hello@souvia.com</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-xl">📱</span>
                                        <span className="text-gray-700">+62 812 3456 7890</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-xl">📍</span>
                                        <span className="text-gray-700">Jakarta, Indonesia</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-xl">🕒</span>
                                        <span className="text-gray-700">Mon-Sat: 9AM-8PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-3xl font-bold mb-4">
                            🎉 Ready to Transform Your Wardrobe?
                        </h3>
                        <p className="text-xl mb-8 opacity-90">
                            Join thousands of satisfied customers and discover your perfect style today!
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-3">
                                <Link href="/products">
                                    🛍️ Start Shopping
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-purple-600">
                                <Link href={route('register')}>
                                    ✨ Join Now
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <h5 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    👗 Souvia
                                </h5>
                                <p className="text-gray-400">
                                    Premium fashion for the modern woman.
                                </p>
                            </div>
                            <div>
                                <h6 className="font-semibold mb-4">Quick Links</h6>
                                <ul className="space-y-2 text-gray-400">
                                    <li><Link href="/products" className="hover:text-white">Products</Link></li>
                                    <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
                                    <li><Link href="#about" className="hover:text-white">About</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h6 className="font-semibold mb-4">Customer Care</h6>
                                <ul className="space-y-2 text-gray-400">
                                    <li>📧 hello@souvia.com</li>
                                    <li>📱 +62 812 3456 7890</li>
                                    <li>🕒 Mon-Sat: 9AM-8PM</li>
                                </ul>
                            </div>
                            <div>
                                <h6 className="font-semibold mb-4">Follow Us</h6>
                                <div className="flex space-x-4 text-2xl">
                                    <span className="cursor-pointer hover:text-purple-400">📘</span>
                                    <span className="cursor-pointer hover:text-purple-400">📷</span>
                                    <span className="cursor-pointer hover:text-purple-400">🐦</span>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                            <p>&copy; 2024 Souvia. All rights reserved. Made with ❤️ for fashion lovers.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}