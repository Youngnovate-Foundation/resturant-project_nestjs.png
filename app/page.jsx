"use client";
import FoodCard from "@/components/FoodCard";
import { useEffect, useState } from "react";

//import { foods } from "@/utils/foods";


const page = () => {
  const [foods, setFoods] = useState("");
  
    useEffect(() => {
      const fetchfoods = async () => {
        const res = await fetch("/api/food/");
        const data = await res.json();
        setFoods(data);
      };
  
      fetchfoods();
    }, []);
    console.log(foods);
  return (
    <div className="flex flex-wrap gap-8 justify-center items-center p-8 bg-gray-100">

     {foods?.length >= 1 && foods.map((food, i)=>(
      <FoodCard food={food} key={i}/>
     ))} 
     
    

      
    </div>
  );
};

export default page;