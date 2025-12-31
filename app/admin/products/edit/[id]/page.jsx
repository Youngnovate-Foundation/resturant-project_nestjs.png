"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProduct({ params }) {
  const router = useRouter();
  const { id } = params;

  const [type, setType] = useState("FOOD");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    async function load() {
      // Try food first
      let res = await fetch(`/api/food/${id}`);
      if (res.ok) {
        const data = await res.json();
        setType("FOOD");
        setName(data.name);
        setImageUrl(data.imageUrl || "");
        setPackages(data.packages || []);
        return;
      }

      res = await fetch(`/api/drink/${id}`);
      if (res.ok) {
        const data = await res.json();
        setType("DRINK");
        setName(data.name);
        setImageUrl(data.imageUrl || "");
        setPrice(data.price);
        return;
      }

      res = await fetch(`/api/others/${id}`);
      const data = await res.json();
      setType("OTHER");
      setName(data.name);
      setImageUrl(data.imageUrl || "");
      setPrice(data.price);
    }

    load();
  }, [id]);

  const updatePackage = (i, field, value) => {
    const copy = [...packages];
    copy[i][field] = value;
    setPackages(copy);
  };

  const handleSave = async () => {
    let url = "";
    let payload = { id, name, imageUrl };

    if (type === "FOOD") {
      url = "/api/food/update";
      payload.packages = packages;
    }

    if (type === "DRINK") {
      url = "/api/drink/update";
      payload.price = price;
    }

    if (type === "OTHER") {
      url = "/api/others/update";
      payload.price = price;
    }

    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    router.push("/admin/products");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />

      <input
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />

      {type === "FOOD" &&
        packages.map((pkg, i) => (
          <div key={i} className="border p-3 rounded mb-3">
            <input
              value={pkg.packageName}
              onChange={(e) =>
                updatePackage(i, "packageName", e.target.value)
              }
              className="w-full p-2 border rounded mb-2"
            />
            <input
              value={pkg.price}
              onChange={(e) => updatePackage(i, "price", e.target.value)}
              type="number"
              className="w-full p-2 border rounded"
            />
          </div>
        ))}

      {type !== "FOOD" && (
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          className="w-full p-3 border rounded mb-4"
        />
      )}

      <button
        onClick={handleSave}
        className="w-full bg-green-600 text-white py-3 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
