"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditFood({ params }) {
  const router = useRouter();
  const { id } = params;

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function loadFood() {
      const res = await fetch(`/api/food/${id}`);
      const data = await res.json();
      setName(data.name);
      setImageUrl(data.imageUrl || "");
    }
    loadFood();
  }, [id]);

  const handleSave = async () => {
    await fetch("/api/food/update", {
      method: "PUT",
      body: JSON.stringify({ id, name, imageUrl }),
    });

    router.push("/admin/foods");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Food</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border rounded-md mb-4"
      />

      <input
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full p-3 border rounded-md mb-4"
      />

      <button
        onClick={handleSave}
        className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700"
      >
        Save Changes
      </button>
    </div>
  );
}
