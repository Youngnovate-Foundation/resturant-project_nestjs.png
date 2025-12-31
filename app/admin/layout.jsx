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
    <div className="min-h-screen flex bg-gray-100 py-20">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5 space-y-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-4 py-2 rounded transition-colors duration-300
                ${
                  pathname === item.href
                    ? "bg-gray-300 font-semibold"
                    : "text-gray-700 hover:bg-green-100"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <button className="mt-auto w-full text-left p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3 md:mb-0">
            Admin Dashboard
          </h2>
          <p className="text-gray-600 text-sm md:text-base">Welcome, Admin</p>
        </div>

        {/* Page Content Container */}
        <div className="bg-white shadow-md rounded-xl p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
