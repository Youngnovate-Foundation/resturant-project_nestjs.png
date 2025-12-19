"use client";

import FoodCard from "@/components/FoodCard";
import SimpleItemCard from "@/components/SimpleItemCard";
import Modal from "@/components/Modal";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Page({ userId }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch foods
  const { data: foods, isLoading: foodsLoading, isError: foodsError, error: foodsErr } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const res = await fetch("/api/food/");
      return res.json();
    },
  });

  // Fetch drinks
  const { data: drinks, isLoading: drinksLoading, isError: drinksError, error: drinksErr } = useQuery({
    queryKey: ["drinks"],
    queryFn: async () => {
      const res = await fetch("/api/drink/");
      return res.json();
    },
  });

  // Fetch others
  const { data: others, isLoading: othersLoading, isError: othersError, error: othersErr } = useQuery({
    queryKey: ["others"],
    queryFn: async () => {
      const res = await fetch("/api/others/");
      return res.json();
    },
  });

  if (foodsLoading || drinksLoading || othersLoading) {
    return (
      <div className="w-full flex justify-center py-10">
        <div className="p-4 rounded-xl shadow-md bg-white flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-4 border-gray-300 border-t-blue-500"></div>
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
    <div className="p-8 bg-gray-100 space-y-8">
      {/* Welcome Section with Resturant Introduction */}
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
        <div className="w-[30%] min-w-[200px]">
          <FoodCard
            key={food.id}
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
    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 border-b-2 border-emerald-500 w-max mx-auto pb-2" >
      Drinks
    </h2>
    <div className="flex flex-wrap justify-center gap-6">
      {drinks?.map(drink => (
        <div className="w-[30%] min-w-[200px]">
          <SimpleItemCard
            key={drink.id}
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
    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 border-b-2 border-emerald-500 w-max mx-auto pb-2" >
      Others
    </h2>
    <div className="flex flex-wrap justify-center gap-6">
      {others?.map(other => (
        <div className="w-[30%] min-w-[200px]">
          <SimpleItemCard
            key={other.id}
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
  );
}