import FoodCard from "@/components/FoodCard";
import Modal from "@/components/Modal";
import Navbar from "@/components/Navbar";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-wrap gap-8 justify-center items-center p-8 bg-gray-100">
      <FoodCard />
      <FoodCard />
      <FoodCard />

      <Modal />
    </div>
  );
};

export default page;