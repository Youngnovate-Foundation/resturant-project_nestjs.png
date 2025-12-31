"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // adjust according to your auth
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/auth/login";
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-orange-400 to-orange-700 text-white font-semibold py-4 px-6 flex justify-between items-center shadow-md">
      <div className="text-2xl tracking-wider font-extrabold">
        <span className="text-green-700">Ceccy </span>
        <span className="text-black">Ann Restaurant</span>
      </div>

      <div className="flex gap-8 text-lg">
        <a href="#Foods" className="hover:text-orange-300 transition">
          Foods
        </a>
        <a href="#Drinks" className="hover:text-orange-300 transition">
          Drinks
        </a>
        <a href="#Others" className="hover:text-orange-300 transition">
          Others
        </a>
      </div>

      <div>
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <span className="text-black font-semibold">
              Hi, Dear Valued Customer
            </span>
            <button
              onClick={handleLogout}
              className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/auth/login"
            className="relative group text-black font-semibold hover:underline"
          >
            Hi, Guest
             <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 translate-y-[-10px] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded transition-all duration-300">
              Click to login
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
