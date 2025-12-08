"use client"

import { useQuery } from '@tanstack/react-query'

export default function AdminDashboardPage() {
  const {data: stats, isLoading} = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await fetch('/api/admin/stats');
      return res.json();
    },
  });

  if (isLoading) {
    return <div className="w-full flex justify-center py-10">
            <div className="p-4 rounded-xl shadow-md bg-white flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-4 border-gray-300 border-t-blue-500"></div>
              <span className="font-medium text-gray-700">Loading...</span>
            </div>
          </div>
  }

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow-md p-6 rounded-xl">
          <p className="text-sm text-gray-500">Completed Orders</p>
          <h3 className="text-3xl font-bold text-gray-800">
            {stats?.completedOrders ?? 0}
          </h3>
        </div>
        <div className="bg-white shadow-md p-6 rounded-xl">
          <p className="text-sm text-gray-500">Foods Available</p>
          <h3 className="text-3xl font-bold text-gray-800">
            {stats?.foodCount ?? 0}
          </h3>
        </div>
        <div className="bg-white shadow-md p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <p className="text-sm text-gray-500">
            Go to the Orders page to manage.
          </p>
        </div>
      </div>
    </div>
  );
}