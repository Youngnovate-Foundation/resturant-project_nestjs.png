'use client';
import React, { useState } from "react";
import Image from "next/image";

const FoodCard = ({ food, onClick }) => {
  // If item has packages, use lowest price. If not, use food.price
  const lowestPackagePrice = food.packages?.length
    ? food.packages[0].price
    : food.price;

  return (
    <>
      <div
        onClick={onClick}
        className="bg-white w-72 flex flex-col justify-center items-center shadow-md rounded-lg gap-4 h-72 cursor-pointer hover:shadow-xl transition"
      >
        <Image
          src={food.imageUrl}
          alt={food.name}
          width={160}
          height={160}
          className="w-40 h-40 rounded-full object-cover"
        />

        <h2 className="font-bold text-center">{food.name}</h2>

        <h4 className="text-amber-500 font-semibold">
          ₵{lowestPackagePrice}
        </h4>
      </div>
    </>
  );
};

export default FoodCard;
