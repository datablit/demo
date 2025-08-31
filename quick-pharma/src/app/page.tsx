"use client";

import { useApp } from "@/contexts/AppContext";
import { Product, products } from "@/data/products";
import Navbar from "@/components/Navbar";
import SocialProof from "@/components/SocialProof";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const {
    user,
    addToCart,
    cart,
    updateQuantity,
    removeFromCart,
    socialProofEnabled,
  } = useApp();

  const handleAddToCart = (product: Product) => {
    if (!user) {
      alert("Please sign in to add items to cart");
      return;
    }
    addToCart(product);
  };

  const getProductQuantity = (productId: string) => {
    const cartItem = cart.find((item) => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleIncreaseQuantity = (product: Product) => {
    if (!user) {
      alert("Please sign in to add items to cart");
      return;
    }
    addToCart(product);
  };

  const handleDecreaseQuantity = (productId: string) => {
    const cartItem = cart.find((item) => item.product.id === productId);
    if (cartItem && cartItem.quantity > 1) {
      updateQuantity(productId, cartItem.quantity - 1);
    } else if (cartItem && cartItem.quantity === 1) {
      removeFromCart(productId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg mb-8 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=400&fit=crop&crop=center"
              alt="Pharmacy background"
              fill
              className="object-cover opacity-20"
              sizes="100vw"
            />
          </div>
          <div className="relative text-center py-16 px-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to QuickPharma
            </h1>
            <p className="text-xl md:text-2xl mb-6">
              🚚 Get your medicines delivered in 30 minutes
            </p>
            {!user && (
              <Link
                href="/auth"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold text-lg shadow-lg transition-colors"
              >
                Sign In to Start Shopping
              </Link>
            )}
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Available Medicines
          </h2>
          <p className="text-gray-600">
            Browse our collection of essential medicines and health products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 group"
            >
              <div className="h-48 bg-gray-100 rounded-md mb-4 relative overflow-hidden">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-500 text-sm">
                      Medicine Image
                    </span>
                  </div>
                )}
              </div>

              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {product.name}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>

              {/* Social Proof Experiment */}
              {socialProofEnabled && (
                <div className="mb-4">
                  <SocialProof
                    productId={product.id}
                    productName={product.name}
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>

                {getProductQuantity(product.id) === 0 ? (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDecreaseQuantity(product.id)}
                      className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-sm flex items-center justify-center shadow-md"
                    >
                      −
                    </button>
                    <span className="font-bold text-lg text-gray-900 bg-gray-100 px-3 py-1 rounded min-w-[2.5rem] text-center">
                      {getProductQuantity(product.id)}
                    </span>
                    <button
                      onClick={() => handleIncreaseQuantity(product)}
                      className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-sm flex items-center justify-center shadow-md"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
