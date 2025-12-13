"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";

const Modal = ({ open, setOpen, food, userId }) => {
  const [order, setOrder] = useState({
    userId,
    foodId: food.id,
    packageId: null,
    location: "",
    notes: "",
    quantity: 1,
  });

  // update selected package
  const updatePackage = (id) => {
    setOrder((prev) => ({ ...prev, packageId: id }));
  };

  const updateLocation = (val) =>
    setOrder((prev) => ({ ...prev, location: val }));

  const updateNotes = (val) =>
    setOrder((prev) => ({ ...prev, notes: val }));

  // Mutation → Add to cart
  const addToCart = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!res.ok) throw new Error("Failed to add to cart");
      return res.json();
    },
    onSuccess: () => {
      alert("Item added to cart!");
      setOpen(false);
    },
    onError: (err) => alert(err.message),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-h-[97%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{food.name}</DialogTitle>

          <div className="space-y-2">
            {/* Food image */}
            <Image
              src={food.imageUrl}
              alt={food.name}
              width={500}
              height={200}
              className="w-full h-52 rounded-lg object-cover"
            />

            {/* PACKAGE SELECT */}
            <div className="my-4">
              <h2 className="font-bold text-xl">CHOOSE PACKAGE</h2>

              <div className="grid grid-cols-2 gap-2 bg-gray-200 p-2 mb-1">
                {food.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => updatePackage(pkg.id)}
                    className={`border p-4 rounded-lg cursor-pointer bg-white transition ${
                      order.packageId === pkg.id
                        ? "border-amber-400 bg-amber-50"
                        : "border-gray-200"
                    }`}
                  >
                    <h3 className="font-semibold">{pkg.name}</h3>
                    <p className="text-sm text-gray-500">₵{pkg.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* LOCATION */}
            <div className="my-4">
              <h2 className="font-bold text-xl">ENTER LOCATION</h2>
              <input
                onChange={(e) => updateLocation(e.target.value)}
                value={order.location}
                type="text"
                className="border border-gray-200 w-full py-2 px-2"
              />
            </div>

            {/* NOTES */}
            <div className="my-4">
              <h2 className="font-bold text-xl">ENTER NOTES</h2>
              <textarea
                onChange={(e) => updateNotes(e.target.value)}
                value={order.notes}
                className="border border-gray-200 w-full py-2 px-2"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              onClick={() => addToCart.mutate()}
              disabled={addToCart.isPending}
              className="bg-amber-500 hover:bg-amber-600 transition-colors duration-300 mx-auto px-4 py-2 rounded-md font-semibold text-white shadow-md cursor-pointer"
            >
              {addToCart.isPending ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
