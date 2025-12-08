"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

export default function ManageFoodsPage() {
  const {
    data: foods,
    isPending,
  } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const res = await fetch("/api/food");
      return res.json();
    },
  });

  if (isPending) {
    return <div className="p-6 text-center">Loading foods...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Foods</h1>

        <Link
          href="/admin/foods/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Add Food
        </Link>
      </div>

      {/* Food List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods?.map((food) => (
          <div
            key={food.id}
            className="bg-white rounded-lg shadow p-4 space-y-4"
          >
            {food.imageUrl && (
              <div className="relative w-full h-40 rounded-md overflow-hidden">
                <Image
                  src={food.imageUrl}
                  alt={food.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <h2 className="text-lg font-semibold">{food.name}</h2>

            <p className="text-sm text-gray-600">
              Packages: {food.packages?.length}
            </p>

            <div className="flex justify-between items-center pt-2">
              <Link
                href={`/admin/foods/edit/${food.id}`}
                className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Edit
              </Link>

              <button
                onClick={() =>
                  fetch(`/api/food/delete?id=${food.id}`, {
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
    </div>
  );
}
