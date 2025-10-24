import React from "react";
import Image from "next/image";

const FoodCard = () => {
    return (
        <div className="bg-white w-72 flex flex-col justify-center items-center shadow-md rounded-lg gap-4 h-72">
            <Image
                src="/fried_yam.jpeg"
                alt="Fried yam"
                width={160}
                height={160}
                className="w-40 h-40 rounded-full"
            />
        <h2 className="font-bold">Fried Yam with Fish</h2>
        <h4 className="text-amber-400">₵500</h4>
        </div>
    );
};

export default FoodCard;