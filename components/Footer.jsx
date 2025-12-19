import React from "react";
// Footer component with gradient background and developer credit
const Footer = () => {
    return (
      <footer className="bg-gradient-to-r from-orange-500 to-orange-700 text-white text-center font-semibold py-6 mt-auto shadow-lg rounded-t-lg">
        {" "}
        <p className="text-lg tracking-wide drop-shadow-md">
          {" "}
           Developed by <span className="font-bold font-serif">Patrick</span> | ©{" "}
          {new Date().getFullYear()} All rights reserved.{" "}
        </p>{" "}
        <p className="mt-2 text-sm opacity-80">
          {" "}
          Thank you for visiting our restaurant app!{" "}
        </p>{" "}
      </footer>
    );
};

export default Footer;