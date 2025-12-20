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
  });

  // Add to cart
  const addToCart = useMutation({
    mutationFn: async (payload) => {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return res.json();
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

  return {
    cart: data?.items || [],
    cartTotal: data?.cartTotal || 0,
    isLoading,
    addToCart,
    updateQuantity,
    removeItem,
  };
}
