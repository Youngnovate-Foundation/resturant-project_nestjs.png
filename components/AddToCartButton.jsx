"use client";

import React from "react";
import { useCart } from "@/hooks/useCart";

export default function AddToCartButton({ userId, foodId, drinkId }) {
  const { addToCart } = useCart(userId);

  return (
    <button
      onClick={() =>
        addToCart.mutate({
          userId,
          foodId,
          drinkId,
          quantity: 1,
        })
      }
      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
    >
      Add to Cart
    </button>
  );
}
