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

const Modal = ({open, setOpen, food}) => {
  
  //const food = {
   // name: "Fried rice and Chicken",
   // image: "/fried_rice.jpg",
   // packages: [{name: "Small Pack", price: 100}, {name: "Medium Pack", price: 150}, {name: "Large Pack", price: 200}],
 // }
const [order,setOrder] = useState(
  {
    //foodId, packageId,location,phone number and the notes
    //foodId: "",
    packageId: null,
    location: "",
    phone: "",
    notes: "",
  }
);

//console.log("Food object:", food);
//console.log(order);


const updateFood =(id) =>{
  setOrder((prev) => ({
    ...prev,
    foodId: id
  }));
};

const updatePackage =(id) =>{
  setOrder((prev) => ({
    ...prev,
    packageId: id
  }));
}

const updateLocation =(user_location) =>{
  setOrder((prev) => ({
    ...prev,
    location: user_location
  }));
  console.log('location ->', user_location);
}


const updatePhone =(user_phone) =>{
  setOrder((prev) => ({
    ...prev,
    phone: user_phone
  }));
}

const updateNotes =(user_notes) =>{
  setOrder((prev) => ({
    ...prev,
    notes: user_notes
  }));
  console.log('notes ->', user_notes);
}

// Log changes immediately so you can see them in the browser console
const submitOrder = async () => {
  // For now, just log the order to the browser console so you can verify
  console.log("Submitting order:", order);

  // If you later add a server API, uncomment the fetch below to POST the order
  // try {
  //   const res = await fetch('/api/orders', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(order),
  //   });
  //   const data = await res.json();
  //   console.log('Server response:', data);
  // } catch (err) {
  //   console.error('Failed to submit order', err);
  // }
};



  const handleSubmit = (e) => {
    e.preventDefault();
    submitOrder();
  };

  return (
    
        
      <Dialog open={open} onOpenChange={setOpen}>
        {/*The open and onOpenChange 
        <DialogTrigger>Click Me</DialogTrigger>*/}
        <DialogContent className="sm:max-h-[97%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{food.name}</DialogTitle>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Image  src={food.imageUrl} alt={food.name} width={500} height={20}
              className="w-full h-52"/>
              <div className="my-4">
                <h2 className="font-bold text-black text-xl">CHOOSE PACKAGE</h2>
                <div className="grid grid-cols-2 gap-2 bg-gray-200 p-2 mb-1">
                  {food.packages.map((pkg, i) => (
                    <div
                      onClick={() => updatePackage(pkg.id ?? i)}
                      key={pkg.id ?? i}
                      className={`border p-4 m-2 rounded-lg cursor-pointer hover:shadow-lg bg-white transition-all ${
                        (pkg.id ?? i) === order.packageId
                          ? 'border-amber-400 border-2 bg-amber-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <h3 className="font-semibold">{pkg.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
               <div className="my-4">
                <h2 className="font-bold text-black text-xl">ENTER LOCATION</h2>
                <input
                onChange={(e) => updateLocation(e.target.value)}
                value={order.location}  type="text"  className="border border-gray-200 w-full py-2 px-2"/>
                </div>  
                 <div className="my-4">
                <h2 className="font-bold text-black text-xl">ENTER NOTES</h2>
                <textarea
                 onChange={(e) => updateNotes(e.target.value)}
                value={order.notes}    type="text"  className="border border-gray-200 w-full py-2 px-2"/>
              </div>
              
              <input className="bg-amber-500 mx-auto px-2 py-1 rounded-md" type="submit" value="submit" />
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    
  );
};
export default Modal;
