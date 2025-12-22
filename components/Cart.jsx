"use client";

import React from "react";
import { Trash, Plus, Minus } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useCart } from "../app/hooks/useCart";

export default function Cart() {
  const { currentUser } = useUser();
  const userId = currentUser?.id;
  const { cart, cartTotal, isLoading, updateQuantity, removeItem } = useCart(userId);

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center p-6">
        <span className="text-gray-700 font-medium">
          Please login to view your cart.
        </span>
      </div>
    );
  }

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
    <div className="p-6 bg-white shadow-xl rounded-xl w-full max-w-2xl mx-auto space-y-4 max-h-[70vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Cart</h2>

      {cart.map((item) => {
        // Determine the display price
        let price = 0;

if (item.food) {
  // Take the smallest package price dynamically
  price = item.food.packages?.length
    ? Math.min(...item.food.packages.map((p) => p.price))
    : item.food.price || 0;
} else if (item.drink) {
  price = item.drink.price || 0;
} else if (item.others) {
  price = item.others.price || 0;
}


        return (
          <div key={item.id} className="flex items-center justify-between border-b py-3">
            <div className="flex items-center gap-4">
              <img
                src={
                  item.food?.imageUrl ||
                  item.drink?.imageUrl ||
                  item.others?.imageUrl
                }
                alt={
                  item.food?.name ||
                  item.drink?.name ||
                  item.others?.name
                }
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">
                  {item.food?.name || item.drink?.name || item.others?.name}
                </h3>
                <p className="text-amber-500 font-semibold">₵{price || item.food?.packages?.[0]?.price}</p>
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
        );
      })}

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
