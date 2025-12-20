"use client";

import React from "react";
import { useCart } from "@/app/hooks/useCart";
import { Trash, Plus, Minus } from "lucide-react";

export default function Cart({ userId }) {
  const { cart, cartTotal, isLoading, updateQuantity, removeItem } = useCart(userId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-6">
        <span className="text-gray-700 font-medium">Loading Cart...</span>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="flex justify-center items-center p-6">
        <span className="text-gray-700 font-medium">Your cart is empty</span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-xl rounded-xl w-full max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Cart</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b py-3"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.food?.imageUrl || item.drink?.imageUrl || item.others?.imageUrl}
              alt={item.food?.name || item.drink?.name || item.others?.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">
                {item.food?.name || item.drink?.name || item.others?.name}
              </h3>
              <p className="text-amber-500 font-semibold">₵{item.price}</p>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                updateQuantity.mutate({
                  cartItemId: item.id,
                  quantity: item.quantity - 1 < 1 ? 1 : item.quantity - 1,
                })
              }
              className="p-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              <Minus size={16} />
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() =>
                updateQuantity.mutate({
                  cartItemId: item.id,
                  quantity: item.quantity + 1,
                })
              }
              className="p-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              <Plus size={16} />
            </button>
            <button
              onClick={() => removeItem.mutate(item.id)}
              className="p-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
            >
              <Trash size={16} />
            </button>
          </div>
        </div>
      ))}

      {/* Cart Total */}
      <div className="flex justify-between font-bold text-lg mt-4">
        <span>Total:</span>
        <span>₵{cartTotal}</span>
      </div>

      {/* Checkout Button */}
      <button className="w-full mt-4 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition">
        Proceed to Checkout
      </button>
    </div>
  );
}
