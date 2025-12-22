"use client";

import React from "react";
import { useCart } from "@/hooks/useCart";
import { useUser } from "../context/UserContext"; // ✅ import UserContext

export default function AddToCartButton({ foodId, drinkId }) {
  const { currentUser } = useUser(); // ✅ get logged-in user
  const { addToCart } = useCart(currentUser?.id); // ✅ pass currentUser.id to hook

  const handleAddToCart = () => {
    if (!currentUser) {
      alert("Please login to add items to your cart.");
      return;
    }

    addToCart.mutate({
      userId: currentUser.id,
      foodId,
      drinkId,
      quantity: 1,
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
    >
      Add to Cart
    </button>
  );
}
