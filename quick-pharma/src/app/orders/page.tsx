"use client";

import { useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const { user, orders, cancelOrder } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  const handleCancelOrder = (orderId: string) => {
    if (confirm("Are you sure you want to cancel this order?")) {
      cancelOrder(orderId);
      alert("Order cancelled successfully");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-8">
              You haven't placed any orders yet
            </p>
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                    <p className="text-gray-600">
                      Placed on {order.createdAt.toLocaleDateString()} at{" "}
                      {order.createdAt.toLocaleTimeString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Payment:{" "}
                      {order.paymentMethod === "card"
                        ? "Credit/Debit Card"
                        : "Cash on Delivery"}
                    </p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "pending"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status === "pending"
                        ? "🚚 On the way"
                        : "❌ Cancelled"}
                    </span>
                    <p className="text-xl font-bold mt-2 text-green-600 bg-green-50 px-3 py-1 rounded">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Items:</h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex justify-between items-center"
                      >
                        <span className="text-gray-700">
                          {item.product.name} x{item.quantity}
                        </span>
                        <span className="font-bold text-green-600">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {order.status === "pending" && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <p className="text-green-600 font-medium">
                        ⏰ Estimated delivery: 30 minutes from order time
                      </p>
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                      >
                        Cancel Order
                      </button>
                    </div>
                  </div>
                )}

                {order.status === "cancelled" && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-red-600 font-medium">
                      This order has been cancelled
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
