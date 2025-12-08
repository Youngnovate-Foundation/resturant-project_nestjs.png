"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddFoodPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/food/create", {
      method: "POST",
      body: JSON.stringify({ name, imageUrl }),
    });

    router.push("/admin/foods");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Food</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Food Name"
        className="w-full p-3 border rounded-md mb-4"
      />

      <input
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
        className="w-full p-3 border rounded-md mb-4"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
}
