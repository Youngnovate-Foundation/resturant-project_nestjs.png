"use client";
import FoodCard from "@/components/FoodCard";
import Modal from "@/components/Modal";
import { useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";

//import { foods } from "@/utils/foods";


const page = () => {
  const {
    isPending,
    isError,
    data: foods,
    error,
  } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const res = await fetch("/api/food/");
      const data = await res.json();
      return data;
    },
  });

  const [open, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  

  return (
    <div className="flex flex-wrap gap-8 justify-center items-center p-8 bg-gray-100">
      {isPending && (
        <div className="w-full flex justify-center py-10">
          <div className="p-4 rounded-xl shadow-md bg-white flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-4 border-gray-300 border-t-blue-500"></div>
            <span className="font-medium text-gray-700">Loading...</span>
          </div>
        </div>
      )}
      {isError && <div>Error: {error.message}</div>}

      {foods?.length >= 1 &&
        foods?.map((food, i) => (
          <FoodCard
            onClick={() => {
              setSelectedFood(food);
              setOpen(true);
            }}
            food={food}
            key={i}
          />
        ))}

      {selectedFood  && open && (
        <Modal food={selectedFood} open={open} setOpen={setOpen} />
      )   }
    </div>
  );
};

export default page;