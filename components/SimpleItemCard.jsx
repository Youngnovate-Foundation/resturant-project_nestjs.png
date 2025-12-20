"use client";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../context/UserContext"; // ✅ import context

const SimpleItemCard = ({ item, type }) => {
  const { currentUser } = useUser(); // ✅ get logged-in user
  const queryClient = useQueryClient();

  // ADD TO CART mutation
  const addToCart = useMutation({
    mutationFn: async () => {
      if (!currentUser) throw new Error("You must be logged in"); // ✅ prevent action if not logged in

      const payload = {
        userId: currentUser.id, // ✅ associate with current user
        quantity: 1,
      };

      if (type === "drink") payload.drinkId = item.id;
      if (type === "others") payload.othersId = item.id;

      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add to cart");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", currentUser?.id]); // ✅ invalidate cart for current user
      alert("Added to cart!");
    },
    onError: (err) => alert(err.message),
  });

  return (
    <div className="bg-white w-72 flex flex-col items-center shadow-md rounded-lg h-72">
      <div className="flex flex-col items-center mt-4 gap-2">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={160}
          height={160}
          className="w-40 h-40 rounded-full object-cover"
        />

        <h2 className="font-bold text-center">{item.name}</h2>
        <h4 className="text-amber-500 font-semibold">₵{item.price}</h4>

        <button
          onClick={() => {
            if (!currentUser) {
              alert("Please login to add items to your cart."); // ✅ login check
              return;
            }
            addToCart.mutate();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl cursor-pointer hover:bg-emerald-700 transition-all shadow-sm active:scale-95"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SimpleItemCard;
