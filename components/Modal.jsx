"use client";
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "../context/UserContext";

const Modal = ({ open, setOpen, food }) => {
  const { currentUser } = useUser();

  const [order, setOrder] = useState({
    userId: null,
    foodId: food.id,
    packageId: null,
    location: "",
    notes: "",
    quantity: 1,
  });

  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setOrder((prev) => ({ ...prev, userId: currentUser.id }));
    }
  }, [currentUser]);

  const updatePackage = (pkg) => {
    setOrder((prev) => ({ ...prev, packageId: pkg.id }));
    setSelectedPackage(pkg);
  };

  const updateLocation = (val) => setOrder((prev) => ({ ...prev, location: val }));
  const updateNotes = (val) => setOrder((prev) => ({ ...prev, notes: val }));

  const addToCart = useMutation({
    mutationFn: async () => {
      if (!currentUser) throw new Error("Please login to add items to your cart");

      const res = await fetch("/api/cart/modal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!res.ok) throw new Error("Failed to submit order");
      return res.json();
    },
    onSuccess: () => {
      alert("Order submitted successfully!");
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
                    onClick={() => updatePackage(pkg)}
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
              <textarea
                onChange={(e) => updateLocation(e.target.value)}
                value={order.location}
                className="border border-gray-200 w-full py-2 px-2 rounded resize-y min-h-[80px]"
                placeholder="Optional if in the Main Restaurant, Kumasi. Give current location if for delivery"
              />
            </div>

            {/* NOTES */}
            <div className="my-4">
              <h2 className="font-bold text-xl">ENTER NOTES</h2>
              <textarea
                onChange={(e) => updateNotes(e.target.value)}
                value={order.notes}
                className="border border-gray-200 w-full py-2 px-2"
                placeholder="Optional: Any extra notes for the order"
              />
            </div>

            {/* QUANTITY */}
            <div className="flex items-center gap-2 my-4">
              <button
                onClick={() =>
                  setOrder((prev) => ({
                    ...prev,
                    quantity: prev.quantity - 1 < 1 ? 1 : prev.quantity - 1,
                  }))
                }
                className="p-2 bg-gray-200 rounded"
              >
                -
              </button>
              <span>{order.quantity}</span>
              <button
                onClick={() =>
                  setOrder((prev) => ({ ...prev, quantity: prev.quantity + 1 }))
                }
                className="p-2 bg-gray-200 rounded"
              >
                +
              </button>
            </div>

            {/* TOTAL */}
            <p className="font-semibold text-lg mt-2">
              Total: ₵{(selectedPackage?.price || 0) * order.quantity}
            </p>

            {/* SUBMIT BUTTON */}
            <button
              onClick={() => addToCart.mutate()}
              disabled={addToCart.isPending || !currentUser || !selectedPackage}
              className="bg-amber-500 hover:bg-amber-600 transition-colors duration-300 mx-auto px-4 py-2 rounded-md font-semibold text-white shadow-md cursor-pointer"
            >
              {addToCart.isPending ? "Submitting..." : "Submit Order"}
            </button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
