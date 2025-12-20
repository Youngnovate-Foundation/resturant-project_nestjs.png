"use client";
import React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../context/UserContext"; // ✅ import context

const FoodCard = ({ food, onClick }) => {
  const { currentUser } = useUser(); // ✅ get logged-in user
  const queryClient = useQueryClient();

  // Preview price (first package or base price)
  const previewPrice = food.packages?.length
    ? food.packages[0].price
    : food.price;

  // ADD TO CART mutation
  const addToCart = useMutation({
    mutationFn: async () => {
      if (!currentUser) throw new Error("You must be logged in");

      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id, // ✅ automatically use logged-in user
          foodId: food.id,
          packageId: food.packages?.[0]?.id || null,
          quantity: 1,
        }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", currentUser?.id]);
      alert("Added to cart!");
    },
    onError: (err) => alert(err.message),
  });

  return (
    <div
      onClick={onClick}
      className="bg-white w-72 flex flex-col justify-center items-center shadow-md rounded-lg gap-4 h-72 cursor-pointer hover:shadow-xl transition"
    >
      <div className="flex flex-col items-center gap-2">
        <Image
          src={food.imageUrl}
          alt={food.name}
          width={160}
          height={160}
          className="w-40 h-40 rounded-full object-cover"
        />
        <h2 className="font-bold text-center">{food.name}</h2>
        <h4 className="text-amber-500 font-semibold">₵{previewPrice}</h4>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevents opening modal
          if (!currentUser) {
            alert("Please login to add items to your cart.");
            return;
          }
          addToCart.mutate();
        }}
        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all shadow-sm active:scale-95"
      >
        <ShoppingCart size={18} />
        <span>Add to Cart</span>
      </button>
    </div>
  );
};

export default FoodCard;
