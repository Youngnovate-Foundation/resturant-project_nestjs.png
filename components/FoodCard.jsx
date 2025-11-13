'use client';
import React, { use, useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import { foods } from "@/utils/foods";

const FoodCard = ({food}) => {
   const lowestPackagePrice = food.packages[0].price;
   const [open, setOpen] = useState(false);

   
    return (
        <>
        <div onClick={()=> setOpen(true)} className="bg-white w-72 flex flex-col justify-center items-center shadow-md rounded-lg gap-4 h-72">
            <Image
                src={food.imageUrl}
                alt={food.name}
                width={160}
                height={160}
                className="w-40 h-40 rounded-full"
            />
        <h2 className="font-bold">{food.name}</h2>
        <h4 className="text-amber-400">₵{lowestPackagePrice}</h4>
        </div>

        <Modal food={food} open={open} setOpen={setOpen}/>
        </>
    );
};

export default FoodCard;