import FoodCard from "@/components/FoodCard";
import Modal from "@/components/Modal";
import Navbar from "@/components/Navbar";
import { foods } from "@/utils/foods";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-wrap gap-8 justify-center items-center p-8 bg-gray-100">

     {foods.map((food, i)=>(
      <FoodCard food={food} key={i}/>
     ))} 
     
    

      
    </div>
  );
};

export default page;