"use client";
import React from "react";
import Link from "next/link";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useUser();

  const handleLogout = async () => {
    await fetch("/api/auth/logout");
    setCurrentUser(null);
    window.location.href = "/auth/login";
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-orange-400 to-orange-700 text-white font-semibold py-4 px-6 flex items-center shadow-md">
      {/* Logo */}
      <div className="text-2xl tracking-wider font-extrabold mr-8 flex-shrink-0">
        <span className="text-green-700">Ceccy </span>
        <span className="text-black">Ann Restaurant</span>
      </div>

      {/* Nav links */}
      <div className="flex gap-8 text-lg flex-1 justify-center">
        <a href="#Foods" className="hover:text-orange-300 transition-colors duration-300">
          Foods
        </a>
        <a href="#Drinks" className="hover:text-orange-300 transition-colors duration-300">
          Drinks
        </a>
        <a href="#Others" className="hover:text-orange-300 transition-colors duration-300">
          Others
        </a>
      </div>

      {/* User info + Logout */}
      <div className="flex items-center gap-4 flex-shrink-0">
        {currentUser ? (
          <>
            <span className="text-black font-semibold truncate max-w-xs">
              Hi, {currentUser.name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/auth/login"
            className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
