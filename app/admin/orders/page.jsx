"use client";

import { useQuery, useMutation } from "@tanstack/react-query";

export default function AdminOrdersPage() {
  const {
    data: orders,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const res = await fetch("/api/order");
      return res.json();
    },
  });

  const { mutate: toggleStatus } = useMutation({
    mutationFn: async ({ id, isCompleted }) => {
      await fetch("/api/order/update", {
        method: "PUT",
        body: JSON.stringify({ id, isCompleted }),
      });
    },
    onSuccess: () => location.reload(),
  });

  if (isPending) {
    return <div className="p-6 text-center">Loading orders...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Food</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-3">{order.food?.name}</td>
                <td className="p-3">{order.location}</td>
                <td className="p-3">{order.phone}</td>

                <td className="p-3">
                  {order.isCompleted ? (
                    <span className="bg-green-200 text-green-700 px-2 py-1 rounded-md text-sm">
                      Completed
                    </span>
                  ) : (
                    <span className="bg-yellow-200 text-yellow-700 px-2 py-1 rounded-md text-sm">
                      Pending
                    </span>
                  )}
                </td>

                <td className="p-3 space-x-3">
                  <button
                    onClick={() =>
                      toggleStatus({
                        id: order.id,
                        isCompleted: !order.isCompleted,
                      })
                    }
                    className={`px-3 py-2 rounded-md text-white ${
                      order.isCompleted
                        ? "bg-gray-600 hover:bg-gray-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {order.isCompleted
                      ? "Mark Pending"
                      : "Mark Completed"}
                  </button>

                  <button
                    onClick={() =>
                      fetch(`/api/order/delete?id=${order.id}`, {
                        method: "DELETE",
                      }).then(() => location.reload())
                    }
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
