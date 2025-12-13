"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useCart(userId) {
  const queryClient = useQueryClient();

  // Fetch cart
  const { data, isLoading } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      const res = await fetch("app/api/cart", {
        headers: { userId }
      });
      return res.json();
    },
  });

  // Add to cart
  const addToCart = useMutation({
    mutationFn: async (payload) => {
      const res = await fetch("app/api/cart/add", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries(["cart", userId]),
  });

  // Update quantity
  const updateQuantity = useMutation({
    mutationFn: async ({ cartItemId, quantity }) => {
      const res = await fetch("app/api/cart/update-quantity", {
        method: "PATCH",
        body: JSON.stringify({ cartItemId, quantity }),
      });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries(["cart", userId]),
  });

  // Remove item
  const removeItem = useMutation({
    mutationFn: async (cartItemId) => {
      await fetch("app/api/cart/remove", {
        method: "DELETE",
        body: JSON.stringify({ cartItemId }),
      });
    },
    onSuccess: () => queryClient.invalidateQueries(["cart", userId]),
  });

  return {
    cart: data?.items || [],
    cartTotal: data?.cartTotal || 0,
    isLoading,
    addToCart,
    updateQuantity,
    removeItem,
  };
}
