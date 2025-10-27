"use client";

import React, { use, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

const Modal = () => {
  const [open, setOpen] = useState(false);
  const food = {
    name: "Fried rice and Chicken",
    image: "/fried_rice.jpg",
    packages: [{name: "Small Pack", price: 100}, {name: "Medium Pack", price: 150}, {name: "Large Pack", price: 200}],
  }
  return (
    <div>
        <button onClick={()=>setOpen(true)}>Click Me</button>
      <Dialog open={open} onOpenChange={setOpen}>
        {/*The open and onOpenChange 
        <DialogTrigger>Click Me</DialogTrigger>*/}
        <DialogContent className="sm:max-h-[97%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{food.name}</DialogTitle>
            <div className="space-y-2">
              <Image  src={food.image} alt={food.name} width={500} height={20}
              className="w-full h-52"/>
              <div className="my-4">
                <h2 className="font-bold text-black text-xl">CHOOSE PACKAGE</h2>
                <div className="grid grid-cols-2 gap-2 bg-gray-200 p-2 mb-1">
                  {food.packages.map((pkg) => (
                    <div key={pkg.name} className="border p-4 m-2 rounded-lg cursor-pointer hover:shadow-lg">
                      <h3 className="font-semibold">{pkg.name}</h3>
                </div>
                  ))}
                </div>
              </div>
               <div className="my-4">
                <h2 className="font-bold text-black text-xl">ENTER LOCATION</h2>
                <input type="text"  className="border border-gray-200 w-full py-2 px-2"/>
                </div>  
                 <div className="my-4">
                <h2 className="font-bold text-black text-xl">ENTER NOTES</h2>
                <textarea type="text"  className="border border-gray-200 w-full py-2 px-2"/>
              </div>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Modal;
