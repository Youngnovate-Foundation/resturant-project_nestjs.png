import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-500 to-orange-700 text-white text-center font-semibold py-8 mt-auto shadow-lg rounded-t-lg">
      <p className="text-lg tracking-wide drop-shadow-md">
        Developed by <span className="font-bold font-serif">Patrick</span> | © {new Date().getFullYear()} All rights reserved.
      </p>
      <p className="mt-2 text-sm opacity-80">
        Thank you for visiting our restaurant app!
      </p>

      {/* Social Media Icons */}
      <div className="flex justify-center gap-6 mt-4">
        {/* Facebook */}
        <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.675 0h-21.35C.596 0 0 .592 0 1.325v21.351C0 23.406.596 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.594 1.325-1.324V1.325C24 .592 23.404 0 22.675 0z" />
          </svg>
        </a>

        {/* Twitter */}
        <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 4.557a9.828 9.828 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.379 4.482A13.944 13.944 0 011.671 3.149a4.917 4.917 0 001.523 6.556 4.903 4.903 0 01-2.229-.616c-.054 2.28 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.085 4.918 4.918 0 004.59 3.417A9.867 9.867 0 010 21.539a13.94 13.94 0 007.548 2.212c9.057 0 14.01-7.506 14.01-14.01 0-.213-.004-.425-.014-.636A10.012 10.012 0 0024 4.557z" />
          </svg>
        </a>

        {/* Instagram */}
        <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608C2.175 15.747 2.163 15.368 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.605.437 3.635 1.406 2.666 2.375 2.36 3.545 2.301 4.822 2.242 6.102 2.229 6.511 2.229 12c0 5.489.013 5.898.072 7.178.059 1.277.365 2.447 1.334 3.416.969.969 2.139 1.275 3.416 1.334C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.059 2.447-.365 3.416-1.334.969-.969 1.275-2.139 1.334-3.416.059-1.28.072-1.689.072-7.178s-.013-5.898-.072-7.178c-.059-1.277-.365-2.447-1.334-3.416-.969-.969-2.139-1.275-3.416-1.334C15.668.013 15.259 0 12 0z" />
            <path d="M12 5.838A6.162 6.162 0 005.838 12 6.162 6.162 0 0012 18.162 6.162 6.162 0 0018.162 12 6.162 6.162 0 0012 5.838zm0 10.123A3.962 3.962 0 018.038 12 3.962 3.962 0 0112 8.038 3.962 3.962 0 0115.962 12 3.962 3.962 0 0112 15.961z" />
            <circle cx="18.406" cy="5.594" r="1.44" />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
