"use client";

import React from "react";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const userId = 1; // replace with real auth userId
  const { cart, isLoading, updateQuantity, removeItem } = useCart(userId);

  if (isLoading) {
    return (
      <div className="p-6">
        <p>Loading cart...</p>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="p-6 text-center text-gray-600">
        Your cart is empty.
      </div>
    );
  }

  // Cart total
  const cartTotal = cart.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.map((item) => {
        const price = item.price || 0;
        const total = price * item.quantity;
        const title = item.food?.name || item.drink?.name || item.others?.name;
        const image =
          item.food?.imageUrl || item.drink?.imageUrl || item.others?.imageUrl;

        return (
          <div
            key={item.id}
            className="flex justify-between items-center p-4 bg-white rounded-xl shadow"
          >
            <div className="flex items-center gap-4">
              {image && (
                <img
                  src={image}
                  alt={title}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-gray-500">
                  ₵{price} × {item.quantity}
                </p>
                <p className="font-semibold mt-1">= ₵{total}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  updateQuantity.mutate({
                    cartItemId: item.id,
                    quantity: item.quantity - 1,
                  })
                }
                disabled={item.quantity === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity.mutate({
                    cartItemId: item.id,
                    quantity: item.quantity + 1,
                  })
                }
                className="px-3 py-1 bg-gray-200 rounded"
              >
                +
              </button>
              <button
                onClick={() => removeItem.mutate(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                X
              </button>
            </div>
          </div>
        );
      })}

      {/* Cart total */}
      <div className="mt-6 p-4 bg-emerald-600 text-white rounded-xl text-lg font-semibold flex justify-between">
        <span>Total:</span>
        <span>₵{cartTotal}</span>
      </div>
    </div>
  );
}
