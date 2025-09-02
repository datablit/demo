"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import datablit from "@datablit/datablit-js";

export default function CheckoutPage() {
  const { user, cart, placeOrder } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const [isCodDisable, setIsCodDisable] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    } else if (cart.length === 0) {
      router.push("/cart");
    }
  }, [user, cart.length, router]);

  useEffect(() => {
    if (user && user.id)
      datablit.rule
        .evalRule({ key: "disable_cod", userId: user.id })
        .then((res) => setIsCodDisable(res.result));
  }, [user]);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate processing time
    setTimeout(() => {
      const orderId = placeOrder(paymentMethod);
      setIsProcessing(false);
      router.push(`/order-confirmation?orderId=${orderId}`);
    }, 1500);

    // Track "PLACED_ORDER"
    datablit.track("PLACED_ORDER", { total: total });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 bg-blue-50 px-4 py-2 rounded">
              Order Summary
            </h2>

            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0 bg-gray-50 px-3 rounded mb-2"
              >
                <div>
                  <p className="font-bold text-lg text-gray-900">
                    {item.product.name}
                  </p>
                  <p className="text-base text-gray-700 font-medium">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-bold text-lg text-green-700">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-gray-900 bg-yellow-100 px-4 py-2 rounded-lg">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 bg-blue-50 px-4 py-2 rounded">
              Payment Method
            </h2>

            <div className="space-y-4">
              <div className="flex items-center bg-gray-50 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300">
                <input
                  id="card"
                  name="payment"
                  type="radio"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value as "card")}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor="card"
                  className="ml-4 block text-lg font-bold text-gray-900"
                >
                  💳 Credit/Debit Card
                </label>
              </div>

              {/* Show COD only if rule return false */}

              {!isCodDisable && (
                <div className="flex items-center bg-gray-50 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300">
                  <input
                    id="cod"
                    name="payment"
                    type="radio"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value as "cod")}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor="cod"
                    className="ml-4 block text-lg font-bold text-gray-900"
                  >
                    💰 Cash on Delivery
                  </label>
                </div>
              )}
            </div>

            {paymentMethod === "card" && (
              <div className="mt-6 p-4 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">
                  💳 Card payment selected. Click Place Order to proceed.
                </p>
              </div>
            )}

            {paymentMethod === "cod" && (
              <div className="mt-6 p-4 bg-green-50 rounded-md">
                <p className="text-sm text-green-800">
                  💰 Cash on Delivery selected. Pay when your order arrives.
                </p>
              </div>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-md font-medium"
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
