"use client";

import { useQuery } from "@tanstack/react-query";
import { CheckCircle, FastForward, Currency } from "lucide-react";

export default function AdminDashboardPage() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await fetch("/api/admin/stats");
      return res.json();
    },
  });

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const res = await fetch("/api/order");
      return res.json();
    },
  });

  const { data: foods, isLoading: foodsLoading } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const res = await fetch("/api/food");
      return res.json();
    },
  });

  const { data: drinks, isLoading: drinksLoading } = useQuery({
    queryKey: ["drinks"],
    queryFn: async () => {
      const res = await fetch("/api/drink");
      return res.json();
    },
  });

  const { data: others, isLoading: othersLoading } = useQuery({
    queryKey: ["others"],
    queryFn: async () => {
      const res = await fetch("/api/others");
      return res.json();
    },
  });

  if (
    statsLoading ||
    ordersLoading ||
    foodsLoading ||
    drinksLoading ||
    othersLoading
  ) {
    return (
      <div className="w-full flex justify-center py-40">
        <div className="p-4 rounded-xl shadow-md bg-white flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-4 border-gray-300 border-t-green-500"></div>
          <span className="font-medium text-gray-700">Loading Dashboard ...</span>
        </div>
      </div>
    );
  }

  // Total revenue from completed orders
  const totalRevenue = orders
    ?.filter((order) => order.status === "COMPLETED")
    .reduce(
      (sum, order) =>
        sum +
        order.items.reduce((sub, item) => sub + item.price * item.quantity, 0),
      0
    ) ?? 0;

  // Total products available
  const totalProducts =
    (foods?.length ?? 0) + (drinks?.length ?? 0) + (others?.length ?? 0);

  // Last 5 orders, sorted by creation date
  const recentOrders = orders
    ?.slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const calculateOrderTotal = (order) =>
    order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {/* Completed Orders */}
        <div className="bg-white shadow-md p-6 rounded-xl flex items-center space-x-4">
          <CheckCircle className="text-green-500 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-500">Completed Orders</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {stats?.completedOrders ?? 0}
            </h3>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white shadow-md p-6 rounded-xl flex items-center space-x-4">
          <FastForward className="text-yellow-500 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-500">Pending Orders</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {(stats?.totalOrders ?? 0) - (stats?.completedOrders ?? 0)}
            </h3>
          </div>
        </div>

        {/* Products Available */}
        <div className="bg-white shadow-md p-6 rounded-xl flex items-center space-x-4">
          <Currency className="text-blue-500 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-500">Products Available</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {totalProducts}
            </h3>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white shadow-md p-6 rounded-xl flex items-center space-x-4">
          <Currency className="text-green-700 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-500">Revenue (₵)</p>
            <h3 className="text-2xl font-bold text-gray-800">{totalRevenue}</h3>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow-md p-6 rounded-xl">
        <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
        {recentOrders?.length ? (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="border rounded-md p-3 flex justify-between items-start"
              >
                <div>
                  <p className="text-sm font-semibold">
                    Order #{order.id} — {order.status}
                  </p>
                  <ul className="text-sm text-gray-600 list-disc ml-5">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.food?.name || item.drink?.name || item.others?.name} × {item.quantity} — ₵{item.price * item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="font-semibold text-gray-800">
                  ₵{calculateOrderTotal(order)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No recent orders found.</p>
        )}
      </div>
    </div>
  );
}
