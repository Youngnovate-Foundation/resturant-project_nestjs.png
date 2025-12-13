"use client";
import React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const FoodCard = ({ food, onClick, userId }) => {
  const queryClient = useQueryClient();

  // Show preview price (first package or base food price)
  const previewPrice = food.packages?.length
    ? food.packages[0].price
    : food.price;

  // ADD TO CART mutation
  const addToCart = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          foodId: food.id,
          packageId: food.packages?.[0]?.id || null, // first package as default
          quantity: 1,
        }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", userId]);
      alert("Added to cart!");
    },
    onError: (err) => alert(err.message),
  });

  return (
    <div
      onClick={onClick}
      className="bg-white w-72 flex flex-col justify-center items-center shadow-md rounded-lg gap-4 h-72 cursor-pointer hover:shadow-xl transition"
    >
      <Image
        src={food.imageUrl}
        alt={food.name}
        width={160}
        height={160}
        className="w-40 h-40 rounded-full object-cover"
      />

      <h2 className="font-bold text-center">{food.name}</h2>

      <h4 className="text-amber-500 font-semibold">₵{previewPrice}</h4>

      {/* Add to Cart Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevents opening modal
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
