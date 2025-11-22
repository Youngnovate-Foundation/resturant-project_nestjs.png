"use client"
import React from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

const page = () => {
     const {
    isPending,
    isError,
    data: orders,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("/api/order");
      const data = await res.json();
      return data;
    },
  });
  
  const {mutate}=useMutation({
  mutationFn: async (id, isCompleted) => {
    const res = await fetch('/api/order', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id, isCompleted),
    });

    if (!res.ok)
      throw new Error('Failed to MARK order as completed');

    return res.json();  // 🔥 THIS IS THE FIX
  },
  // onSuccess: () => {
  //   alert('Order MARKED as completed successfully!');
  //   //setOpen(false);
  // },
  // onError: (error) => {
  //   alert(`Error submitting order: ${error.message}`);
  // }
});

    useMutation;

    if (orders){
        console.log('Orders data:', orders);
    }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Orders</h1>
      <div className="space-y-4">
        {isPending && (
          <div className="w-full flex justify-center py-10">
            <div className="p-4 rounded-xl shadow-md bg-white flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-4 border-gray-300 border-t-blue-500"></div>
              <span className="font-medium text-gray-700">Loading...</span>
            </div>
          </div>
        )}

        {orders &&
          orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-3 border rounded"
            >
              <div>
                <p>
                  <strong>#{order.id + 1}</strong>
                </p>
                <p>
                  <strong>Food:</strong> {order.food.name}
                </p>
                <p>
                  <strong>Package:</strong> {order.package.size}
                </p>
                <p>
                  <strong>Location:</strong> {order.location}
                </p>
                <p>
                  <strong>Phone:</strong> {order.phone}
                </p>
              </div>

              <div>
                <button
                  className={`px-4 py-2 rounded cursor-pointer text-white 
    ${
      order.isCompleted
        ? "bg-blue-500 hover:bg-blue-600"
        : "bg-green-500 hover:bg-green-600"
    }`}
                  onClick={() => {
                    mutate({ id: order.id, isCompleted: !order.isCompleted });
                  }}
                >
                  {order.isCompleted ? "Completed" : "Mark as Completed"}
                </button>
              </div>
            </div>
          ))}
      </div>{" "}
      {/* ← THIS was missing */}
    </div>
  );
};



export default page