"use client";

import React from "react";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const userId = 1; // replace later with real auth userId
  const { cart, cartTotal, isLoading, updateQuantity, removeItem } =
    useCart(userId);

  if (isLoading) {
    return (
      <div className="p-6">
        <p>Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 && (
        <p className="text-gray-600">Your cart is empty.</p>
      )}

      <div className="space-y-4">
        {cart.map((item) => {
          const isFood = !!item.food;

          // ✅ PRICE FIX
          const price = isFood
            ? item.food?.packages?.[0]?.price ?? 0 // Small package
            : item.price;

          const total = price * item.quantity;

          const title =
            item.food?.name ||
            item.drink?.name ||
            item.others?.name;

          return (
            <div
              key={item.id}
              className="flex justify-between p-4 bg-white rounded-xl shadow"
            >
              <div>
                <h2 className="text-lg font-semibold">{title}</h2>

                <p className="text-gray-500">
                  ₵{price} × {item.quantity}
                </p>

                <p className="font-semibold mt-1">
                  = ₵{total}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Decrease */}
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

                {/* Increase */}
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

                {/* Remove */}
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
      </div>

      {/* CART TOTAL */}
      <div className="mt-6 p-4 bg-emerald-600 text-white rounded-xl">
        <h2 className="text-xl font-semibold">
          Total: ₵{cartTotal}
        </h2>
      </div>
    </div>
  );
}
