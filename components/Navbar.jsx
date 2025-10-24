import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="shadow-md bg-white font-bold py-4 flex justify-between">
      
        <div>My <span className="text-red-400">Food</span></div>
        <div className="flex gap-6">
          <Link href="">All</Link>
          <Link href="">Rice</Link>
          <Link href="">Soup Food</Link>
          <Link href="">Burger</Link>
        </div>
      
    </nav>
  );
};

export default Navbar;