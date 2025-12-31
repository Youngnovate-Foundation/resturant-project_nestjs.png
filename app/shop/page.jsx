"use client";

import FoodCard from "@/components/FoodCard";
import SimpleItemCard from "@/components/SimpleItemCard";
import Modal from "@/components/Modal";
import Cart from "@/components/Cart";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Page({ userId }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Fetch foods
 const { data: foods = [], isLoading: foodsLoading, isError: foodsError, error: foodsErr } = useQuery({
  queryKey: ["foods"],
  queryFn: async () => {
    const res = await fetch("/api/food/");
    if (!res.ok) throw new Error("Failed to fetch foods");
    const data = await res.json();
    return Array.isArray(data) ? data : []; // ← ensure it's an array
  },
});


  // Fetch drinks
  const { data: drinks, isLoading: drinksLoading, isError: drinksError, error: drinksErr } = useQuery({
    queryKey: ["drinks"],
    queryFn: async () => {
      const res = await fetch("/api/drink/");
      if (!res.ok) throw new Error("Failed to fetch drinks");
      return res.json();
    },
  });

  // Fetch others
  const { data: others, isLoading: othersLoading, isError: othersError, error: othersErr } = useQuery({
    queryKey: ["others"],
    queryFn: async () => {
      const res = await fetch("/api/others/");
      if (!res.ok) throw new Error("Failed to fetch others");
      return res.json();
    },
  });

  if (foodsLoading || drinksLoading || othersLoading) {
    return (
      <div className="w-full flex justify-center py-10">
        <div className="p-4 rounded-xl shadow-md bg-white flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-4 border-gray-300 border-t-green-500"></div>
          <span className="font-medium text-gray-700">Loading...</span>
        </div>
      </div>
    );
  }

  if (foodsError || drinksError || othersError) {
    return (
      <div className="text-red-600">
        Error: {foodsErr?.message || drinksErr?.message || othersErr?.message}
      </div>
    );
  }

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  return (
    <div className="relative flex">
      {/* Main Shop Content */}
      <div className="flex-1 p-8 bg-gray-100 space-y-8">
        {/* Toggle Cart Button */}
        <button
          onClick={() => setCartOpen(!cartOpen)}
          className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 shadow-lg"
        >
          {cartOpen ? "Close Cart" : "Open Cart"}
        </button>

        {/* Welcome Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4 py-10">
            Welcome to <span className="text-emerald-600">Ceccy Ann Resturant</span> Resturant
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover a variety of delicious foods, refreshing drinks, and other delightful treats. Browse our menu and add your favorite items to the cart!
          </p>
        </section>

        {/* FOODS */}
        <section id="Foods">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 border-b-2 border-emerald-500 w-max mx-auto pb-2 py-10">
            Foods
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {foods?.map(food => (
              <div key={food.id} className="w-[30%] min-w-[200px]">
                <FoodCard
                  food={food}
                  userId={userId}
                  onClick={() => handleOpenModal(food)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* DRINKS */}
        <section id="Drinks">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 border-b-2 border-emerald-500 w-max mx-auto pb-2">
            Drinks
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {drinks?.map(drink => (
              <div key={drink.id} className="w-[30%] min-w-[200px]">
                <SimpleItemCard
                  item={drink}
                  type="drink"
                  userId={userId}
                  onClick={() => handleOpenModal(drink)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* OTHERS */}
        <section id="Others">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 border-b-2 border-emerald-500 w-max mx-auto pb-2">
            Others
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {others?.map(other => (
              <div key={other.id} className="w-[30%] min-w-[200px]">
                <SimpleItemCard
                  item={other}
                  type="others"
                  userId={userId}
                  onClick={() => handleOpenModal(other)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Modal */}
        {selectedItem && open && (
          <Modal food={selectedItem} open={open} setOpen={setOpen} />
        )}
      </div>

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform z-40 ${
          cartOpen ? "translate-x-0" : "translate-x-96"
        }`}
      >
        <div className="flex justify-end p-4 border-b">
          <button
            onClick={() => setCartOpen(false)}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Close
          </button>
        </div>
        <Cart userId={userId} />
      </div>
    </div>
  );
}
