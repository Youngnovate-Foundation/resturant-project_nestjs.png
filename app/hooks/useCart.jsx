"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useCart(userId) {
  const queryClient = useQueryClient();

  // Fetch cart
  const { data, isLoading } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      const res = await fetch(`/api/cart/`, {
        headers: { "userId": userId }
      });
      return res.json();
    },
    enabled: !!userId, // Only fetch if userId exists
  });

  // Add to cart
  const addToCart = useMutation({
    mutationFn: async (payload) => {
      // For food, auto-select the smallest package
      if (payload.foodId) {
        const res = await fetch(`/api/food/${payload.foodId}`);
        const food = await res.json();

        if (food.packages && food.packages.length) {
          const smallPackage = food.packages.reduce((prev, curr) =>
            curr.price < prev.price ? curr : prev
          );
          payload.packageId = smallPackage.id;
          payload.price = smallPackage.price;
        }
      }

      // Drinks and Others price
      if (payload.drinkId && !payload.price) {
        const res = await fetch(`/api/drink/${payload.drinkId}`);
        const drink = await res.json();
        payload.price = drink.price;
      }

      if (payload.othersId && !payload.price) {
        const res = await fetch(`/api/others/${payload.othersId}`);
        const other = await res.json();
        payload.price = other.price;
      }

      const res2 = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res2.ok) throw new Error("Failed to add to cart");
      return res2.json();
    },
    onSuccess: () => queryClient.invalidateQueries(["cart", userId]),
  });

  // Update quantity
  const updateQuantity = useMutation({
    mutationFn: async ({ cartItemId, quantity }) => {
      const res = await fetch("/api/cart/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId, quantity }),
      });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries(["cart", userId]),
  });

  // Remove item
  const removeItem = useMutation({
    mutationFn: async (cartItemId) => {
      await fetch("/api/cart/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId }),
      });
    },
    onSuccess: () => queryClient.invalidateQueries(["cart", userId]),
  });

  // Compute cart total
  const cartTotal = data?.items?.reduce((sum, item) => {
    let price = item.price;
    if (item.food && item.packageId) {
      const pkg = item.food.packages.find(p => p.id === item.packageId);
      if (pkg) price = pkg.price;
    }
    return sum + price * item.quantity;
  }, 0) || 0;


  // in useCart.js
const resetCart = () => {
  queryClient.setQueryData(["cart", userId], {
    items: [],
  });
};


  return {
    cart: data?.items || [],
    cartTotal,
    isLoading,
    addToCart,
    updateQuantity,
    removeItem,
    resetCart,
  };
}
