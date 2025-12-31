"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import BackToTop from "@/components/BackToTop";

export default function AdminOrdersPage() {
  /* =========================
     FETCH ORDERS
     ========================= */
  const {
    data: orders,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const res = await fetch("/api/order");
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
  });

  /* =========================
     UPDATE ORDER STATUS
     ========================= */
  const { mutate: updateStatus, isPending: updating } = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await fetch("/api/order", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
    },
    onSuccess: () => location.reload(),
  });

  if (isPending) {
    return (
      <div className="w-full flex justify-center py-40">
        <div className="p-4 rounded-xl shadow-md bg-white flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-4 border-gray-300 border-t-green-500"></div>
          <span className="font-medium text-gray-700">Loading Orders...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-600">
        Failed to load orders
      </div>
    );
  }

  /* =========================
     CALCULATE TOTALS
     ========================= */
  const completedOrders = orders.filter(
    (order) => order.status === "COMPLETED"
  );

  const productTotals = {};
  let grandTotal = 0;

  completedOrders.forEach((order) => {
    order.items.forEach((item) => {
      const product = item.food || item.drink || item.others;
      if (!product) return;
      const amount = item.price * item.quantity;
      productTotals[product.name] = (productTotals[product.name] || 0) + amount;
      grandTotal += amount;
    });
  });

  const calculateOrderTotal = (order) =>
    order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>

      <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Items</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Notes</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Order Total (₵)</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              const orderTotal = calculateOrderTotal(order);
              return (
                <tr key={order.id} className="border-b align-top">
                  {/* Username */}
                  <td className="p-3 font-medium">{order.user?.name || "Guest"}</td>

                  {/* Items */}
                  <td className="p-3">
                    <ul className="space-y-1">
                      {order.items.map((item) => (
                        <li key={item.id}>
                          {item.food?.name || item.drink?.name || item.others?.name} × {item.quantity} — ₵{item.price * item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>

                  {/* Location */}
                  <td className="p-3">{order.location}</td>

                  {/* Notes */}
                  <td className="p-3">{order.notes || "—"}</td>

                  {/* Status */}
                  <td className="p-3">
                    {order.status === "COMPLETED" ? (
                      <span className="bg-green-200 text-green-700 px-2 py-1 rounded-md">Completed</span>
                    ) : (
                      <span className="bg-yellow-200 text-yellow-700 px-2 py-1 rounded-md">Pending</span>
                    )}
                  </td>

                  {/* Order Total */}
                  <td className="p-3 font-semibold">₵{orderTotal}</td>

                  {/* Actions */}
                  <td className="p-3 space-x-2">
                    <button
                      disabled={updating}
                      onClick={() =>
                        updateStatus({
                          id: order.id,
                          status: order.status === "COMPLETED" ? "PENDING" : "COMPLETED",
                        })
                      }
                      className={`px-3 py-2 rounded-md text-white ${
                        order.status === "COMPLETED"
                          ? "bg-gray-600 hover:bg-gray-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {order.status === "COMPLETED" ? "Mark Pending" : "Mark Completed"}
                    </button>

                    <button
                      onClick={() =>
                        fetch(`/api/order/delete?id=${order.id}`, { method: "DELETE" }).then(() =>
                          location.reload()
                        )
                      }
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}

            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* =========================
          TOTALS PER PRODUCT + GRAND TOTAL
          ========================= */}
      <div className="mt-10 border-t pt-6">
        <h2 className="text-lg font-bold mb-4">Total Summary</h2>

        {Object.entries(productTotals).map(([name, total]) => (
          <div key={name} className="flex justify-between text-sm">
            <span>{name} total</span>
            <span>₵{total}</span>
          </div>
        ))}

        <div className="flex justify-between font-bold text-lg mt-4 border-t pt-3">
          <span>Grand Total</span>
          <span>₵{grandTotal}</span>
        </div>
      </div>
      <BackToTop />
    </div>
  );
}
