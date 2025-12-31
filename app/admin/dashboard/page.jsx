"use client";

import { useQuery } from "@tanstack/react-query";
import { Currency, CheckCircle, FastForward } from "lucide-react";

export default function AdminDashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await fetch("/api/admin/stats");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-10">
        <div className="p-4 rounded-xl shadow-md bg-white flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-4 border-gray-300 border-t-blue-500"></div>
          <span className="font-medium text-gray-700">Loading...</span>
        </div>
      </div>
    );
  }

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

        {/* Foods Available */}
        <div className="bg-white shadow-md p-6 rounded-xl flex items-center space-x-4">
          <Currency className="text-blue-500 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-500">Foods Available</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {stats?.foodCount ?? 0}
            </h3>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white shadow-md p-6 rounded-xl flex items-center space-x-4">
          <Currency className="text-green-700 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-500">Revenue (₵)</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {stats?.totalRevenue ?? 0}
            </h3>
          </div>
        </div>
      </div>

      {/* Optional note about recent orders */}
      <div className="bg-white shadow-md p-6 rounded-xl">
        <h2 className="text-lg font-bold mb-2">Recent Orders</h2>
        <p className="text-sm text-gray-500">
          Go to the Orders page to manage orders in detail.
        </p>
      </div>
    </div>
  );
}
