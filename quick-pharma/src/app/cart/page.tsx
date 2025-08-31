"use client";

import { useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import Navbar from "@/components/Navbar";
import SocialProof from "@/components/SocialProof";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CartPage() {
  const { user, cart, updateQuantity, removeFromCart, socialProofEnabled } =
    useApp();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart</h1>
            <p className="text-gray-600 mb-8">Your cart is empty</p>
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between border-b border-gray-200 py-4 last:border-b-0"
            >
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-md mr-4 relative overflow-hidden">
                  {item.product.image ? (
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-gray-500 text-xs">Med</span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {item.product.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.product.description}
                  </p>
                  {socialProofEnabled && (
                    <div className="mt-2">
                      <SocialProof
                        productId={item.product.id}
                        productName={item.product.name}
                      />
                    </div>
                  )}
                  <p className="text-green-600 font-bold text-lg">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-lg flex items-center justify-center shadow-md"
                  >
                    −
                  </button>
                  <span className="font-bold text-xl text-gray-900 bg-gray-100 px-3 py-1 rounded min-w-[3rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-lg flex items-center justify-center shadow-md"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <p className="font-bold text-xl text-green-700">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 font-bold px-3 py-2 rounded border border-red-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-gray-900 bg-yellow-100 px-4 py-2 rounded-lg">
                Total: ${total.toFixed(2)}
              </span>
            </div>

            <div className="flex space-x-4">
              <Link
                href="/"
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-center font-medium"
              >
                Continue Shopping
              </Link>
              <Link
                href="/checkout"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-center font-medium"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
