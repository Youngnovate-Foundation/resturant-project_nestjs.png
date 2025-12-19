"use client";
// Navbar component with navigation links and logout functionality
import React from "react";
// Navigation links using Next.js Link component
import Link from "next/link";

// Navbar component
const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-orange-400 to-orange-700 text-white font-semibold py-4 px-6 flex justify-between items-center shadow-md">
      {" "}
      <div className="text-2xl tracking-wider font-extrabold">
        {" "}
        <span className="text-green-700">Ceccy </span>
        <span className="text-black">Ann Resturant</span>{" "}
      </div>{" "}
     <div className="flex gap-8 text-lg">
  <a
    href="#Foods"
    className="hover:text-orange-300 transition-colors duration-300"
  >
    Foods
  </a>
  <a
    href="#Drinks"
    className="hover:text-orange-300 transition-colors duration-300"
  >
    Drinks
  </a>
  <a
    href="#Others"
    className="hover:text-orange-300 transition-colors duration-300"
  >
    Others
  </a>
</div>
{" "}
      <button
        onClick={async () => {
          await fetch("/api/auth/logout");
          window.location.href = "/auth/login";
        }}
        className="text-black"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
