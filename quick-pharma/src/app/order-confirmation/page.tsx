import { useApp } from "@/contexts/AppContext";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const orderId = searchParams.orderId;
  const { orders } = useApp();

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Order Not Found
            </h1>
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

      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-xl text-green-600 font-semibold">
              🚚 Your order will be delivered in 30 minutes
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Details</h2>
            <div className="text-left">
              <p className="mb-2">
                <strong>Order ID:</strong> {order.id}
              </p>
              <p className="mb-2">
                <strong>Payment Method:</strong>{" "}
                {order.paymentMethod === "card"
                  ? "Credit/Debit Card"
                  : "Cash on Delivery"}
              </p>
              <p className="mb-4">
                <strong>Total:</strong>
                <span className="text-xl font-bold text-green-600 ml-2 bg-green-50 px-3 py-1 rounded">
                  ${order.total.toFixed(2)}
                </span>
              </p>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Items:</h3>
                {order.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between py-1"
                  >
                    <span>
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="font-bold text-green-600">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              You can track your order status in the Orders section
            </p>

            <div className="flex space-x-4 justify-center">
              <Link
                href="/orders"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
              >
                View Orders
              </Link>
              <Link
                href="/"
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
