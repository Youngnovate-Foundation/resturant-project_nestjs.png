"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Admin Dashboard", href: "/admin/dashboard" },
    { name: "Manage Orders", href: "/admin/orders" },
    { name: "Manage Products", href: "/admin/products" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block px-4 py-2 rounded ${
              pathname === item.href
                ? "bg-gray-300 font-semibold"
                : "text-gray-700 hover:bg-green-100"
            }`}
          >
            {item.name}
          </Link>
        ))}

        <button className="mt-4 w-full text-left p-3 bg-red-500 text-white rounded-md hover:bg-red-600">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 py-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
          <p className="text-gray-500">Welcome Admin</p>
        </div>

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
}
