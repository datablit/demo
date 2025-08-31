"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: "card" | "cod";
  status: "pending" | "cancelled";
  createdAt: Date;
}

export type ExperimentVariant = "control" | "v1" | "v2";

interface AppContextType {
  user: User | null;
  signIn: (email: string) => void;
  signOut: () => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  orders: Order[];
  placeOrder: (paymentMethod: "card" | "cod") => string;
  cancelOrder: (orderId: string) => void;
  socialProofEnabled: boolean;
  toggleSocialProof: () => void;
  experimentVariant: ExperimentVariant;
  setExperimentVariant: (variant: ExperimentVariant) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [socialProofEnabled, setSocialProofEnabled] = useState<boolean>(false);
  const [experimentVariant, setExperimentVariant] =
    useState<ExperimentVariant>("control");

  const signIn = (email: string) => {
    // Dummy auth - just set a user
    setUser({
      id: "1",
      email,
      name: email.split("@")[0],
    });
  };

  const signOut = () => {
    setUser(null);
    setCart([]);
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (paymentMethod: "card" | "cod") => {
    const total = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const orderId = Math.random().toString(36).substring(2, 9);

    const newOrder: Order = {
      id: orderId,
      items: [...cart],
      total,
      paymentMethod,
      status: "pending",
      createdAt: new Date(),
    };

    setOrders((prev) => [...prev, newOrder]);
    clearCart();
    return orderId;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "cancelled" } : order
      )
    );
  };

  const toggleSocialProof = () => {
    setSocialProofEnabled((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        signIn,
        signOut,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        orders,
        placeOrder,
        cancelOrder,
        socialProofEnabled,
        toggleSocialProof,
        experimentVariant,
        setExperimentVariant,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
