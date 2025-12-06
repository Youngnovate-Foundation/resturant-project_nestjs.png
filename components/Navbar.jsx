import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-green-400 via-green-700 to-green-900 text-white font-semibold py-4 px-6 flex justify-between items-center shadow-md">
      {" "}
      <div className="text-2xl tracking-wider font-extrabold">
        {" "}
        My <span className="text-green-300">Food</span>{" "}
      </div>{" "}
      <div className="flex gap-8 text-lg">
        {" "}
        <Link
          href="/all"
          className="hover:text-green-300 transition-colors duration-300"
        >
          {" "}
          All{" "}
        </Link>{" "}
        <Link
          href="/rice"
          className="hover:text-green-300 transition-colors duration-300"
        >
          {" "}
          Rice{" "}
        </Link>{" "}
        <Link
          href="/soup"
          className="hover:text-green-300 transition-colors duration-300"
        >
          {" "}
          Soup Food{" "}
        </Link>{" "}
        <Link
          href="/burger"
          className="hover:text-green-300 transition-colors duration-300"
        >
          {" "}
          Burger{" "}
        </Link>{" "}
      </div>{" "}
    </nav>
  );
};

export default Navbar;
