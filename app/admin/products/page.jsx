"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import BackToTop from "@/components/BackToTop";

export default function ManageProductsPage() {
  const { data: products, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/product"); // unified endpoint
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  if (isPending) {
    return (
      <div className="w-full flex justify-center py-40">
        <div className="p-4 rounded-xl shadow-md bg-white flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-4 border-gray-300 border-t-green-500"></div>
          <span className="font-medium text-gray-700">Loading Products...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Products</h1>

        <Link
          href="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Add Product
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow p-4 space-y-4"
          >
            {product.imageUrl && (
              <div className="relative w-full h-40 rounded-md overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <span className="text-xs px-2 py-1 rounded bg-gray-200">
                {product.type}
              </span>
            </div>

            {/* Food vs Non-Food */}
            {product.type === "FOOD" ? (
              <p className="text-sm text-gray-600">
                Packages: {product.packages?.length}
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Price: ₵{product.price}
              </p>
            )}

            <div className="flex justify-between items-center pt-2">
              <Link
                href={`/admin/products/edit/${product.id}`}
                className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Edit
              </Link>

              <button
                onClick={() =>
                  fetch(`/api/product/delete?id=${product.id}`, {
                    method: "DELETE",
                  }).then(() => location.reload())
                }
                className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <BackToTop />
    </div>
  );
}
