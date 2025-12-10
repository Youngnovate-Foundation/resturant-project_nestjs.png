"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddFoodPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [packages, setPackages] = useState([
    { packageName: "", price: "" }
  ]);

  const addPackage = () => {
    setPackages([...packages, { packageName: "", price: "" }]);
  };

  const removePackage = (index) => {
    setPackages(packages.filter((_, i) => i !== index));
  };

  const updatePackage = (index, field, value) => {
    const updated = [...packages];
    updated[index][field] = value;
    setPackages(updated);
  };

  const handleSubmit = async () => {
    await fetch("/api/food/create", {
      method: "POST",
      body: JSON.stringify({
        name,
        imageUrl,
        packages,
      }),
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

      {/* Packages */}
      <h2 className="text-lg font-semibold mb-2">Packages</h2>

      {packages.map((pkg, index) => (
        <div key={index} className="border p-4 rounded-md mb-3">
          <input
            value={pkg.packageName}
            onChange={(e) =>
              updatePackage(index, "packageName", e.target.value)
            }
            placeholder="Package Name (e.g. Small, Medium)"
            className="w-full p-2 border rounded-md mb-3"
          />

          <input
            value={pkg.price}
            onChange={(e) => updatePackage(index, "price", e.target.value)}
            placeholder="Price"
            type="number"
            className="w-full p-2 border rounded-md mb-3"
          />

          {packages.length > 1 && (
            <button
              className="text-red-600 text-sm"
              onClick={() => removePackage(index)}
            >
              Remove Package
            </button>
          )}
        </div>
      ))}

      <button
        onClick={addPackage}
        className="w-full bg-gray-200 py-2 rounded-md mb-4"
      >
        + Add Package
      </button>

      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700"
      >
        Save
      </button>
    </div>
  );
}
