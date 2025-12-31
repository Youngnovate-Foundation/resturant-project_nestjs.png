"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  const [type, setType] = useState("FOOD");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");

  const [packages, setPackages] = useState([
    { packageName: "", price: "" },
  ]);

  const addPackage = () =>
    setPackages([...packages, { packageName: "", price: "" }]);

  const updatePackage = (i, field, value) => {
    const copy = [...packages];
    copy[i][field] = value;
    setPackages(copy);
  };

  const removePackage = (i) =>
    setPackages(packages.filter((_, index) => index !== i));

  const handleSubmit = async () => {
    let url = "";
    let payload = {};

    if (type === "FOOD") {
      url = "/api/food/create";
      payload = { name, imageUrl, packages };
    }

    if (type === "DRINK") {
      url = "/api/drink/create";
      payload = { name, imageUrl, price };
    }

    if (type === "OTHER") {
      url = "/api/others/create";
      payload = { name, imageUrl, price };
    }

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    router.push("/admin/products");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>

      {/* TYPE */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      >
        <option value="FOOD">Food</option>
        <option value="DRINK">Drink</option>
        <option value="OTHER">Other</option>
      </select>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full p-3 border rounded mb-4"
      />

      <input
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
        className="w-full p-3 border rounded mb-4"
      />

      {/* FOOD ONLY */}
      {type === "FOOD" && (
        <>
          <h2 className="font-semibold mb-2">Packages</h2>
          {packages.map((pkg, i) => (
            <div key={i} className="border p-3 rounded mb-3">
              <input
                value={pkg.packageName}
                onChange={(e) =>
                  updatePackage(i, "packageName", e.target.value)
                }
                placeholder="Package name"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                value={pkg.price}
                onChange={(e) => updatePackage(i, "price", e.target.value)}
                placeholder="Price"
                type="number"
                className="w-full p-2 border rounded mb-2"
              />
              {packages.length > 1 && (
                <button
                  onClick={() => removePackage(i)}
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            onClick={addPackage}
            className="w-full bg-gray-200 py-2 rounded mb-4"
          >
            + Add Package
          </button>
        </>
      )}

      {/* DRINK / OTHER */}
      {type !== "FOOD" && (
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
          className="w-full p-3 border rounded mb-4"
        />
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-3 rounded"
      >
        Save
      </button>
    </div>
  );
}
