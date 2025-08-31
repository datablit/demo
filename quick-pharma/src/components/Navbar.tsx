"use client";

import Link from "next/link";
import { useApp, type ExperimentVariant } from "@/contexts/AppContext";

export default function Navbar() {
  const {
    user,
    signOut,
    cart,
    socialProofEnabled,
    toggleSocialProof,
    experimentVariant,
    setExperimentVariant,
  } = useApp();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 text-xl font-bold"
            >
              <span className="text-2xl">💊</span>
              <span>QuickPharma</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Experiment Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleSocialProof}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  socialProofEnabled
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-500 hover:bg-gray-600 text-white"
                }`}
                title="Toggle Social Proof Experiment"
              >
                {socialProofEnabled ? "🧪 ON" : "🧪 OFF"}
              </button>

              {socialProofEnabled && (
                <select
                  value={experimentVariant}
                  onChange={(e) =>
                    setExperimentVariant(e.target.value as ExperimentVariant)
                  }
                  className="px-2 py-1 rounded text-xs font-medium bg-white text-gray-900 border"
                >
                  <option value="control">Control</option>
                  <option value="v1">V1 (Viewers)</option>
                  <option value="v2">V2 (Sales)</option>
                </select>
              )}
            </div>

            {user ? (
              <>
                <span className="text-sm">Welcome, {user.name}</span>
                <Link
                  href="/cart"
                  className="relative bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Cart
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/orders"
                  className="bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Orders
                </Link>
                <button
                  onClick={signOut}
                  className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
