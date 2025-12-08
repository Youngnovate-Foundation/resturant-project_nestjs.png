"use client";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-orange-400 to-orange-700  text-white font-semibold py-4 px-6 flex justify-between items-center shadow-md">
      {" "}
      <div className="text-2xl tracking-wider font-extrabold">
        {" "}
        <span className="text-green-700">My </span>
        <span className="text-black">Food</span>{" "}
      </div>{" "}
      <div className="flex gap-8 text-lg">
        {" "}
        <Link
          href="/all"
          className="hover:text-orange-300 transition-colors duration-300"
        >
          {" "}
          All{" "}
        </Link>{" "}
        <Link
          href="/rice"
          className="hover:text-orange-300 transition-colors duration-300"
        >
          {" "}
          Rice{" "}
        </Link>{" "}
        <Link
          href="/soup"
          className="hover:text-orange-300 transition-colors duration-300"
        >
          {" "}
          Soup Food{" "}
        </Link>{" "}
        <Link
          href="/burger"
          className="hover:text-orange-300 transition-colors duration-300"
        >
          {" "}
          Burger{" "}
        </Link>{" "}
      </div>{" "}
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
