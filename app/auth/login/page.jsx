"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">
          {isAdmin ? "Admin Login" : "Login"}
        </h1>

        {/* USER LOGIN */}
        {!isAdmin && (
          <>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
              id="email"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
              id="password"
            />

            <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
              Login
            </button>

            <div className="flex justify-between text-sm">
              <Link
                href="/auth/reset"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
              <Link
                href="/auth/signup"
                className="text-blue-600 hover:underline"
              >
                Create Account
              </Link>
            </div>
          </>
        )}

        {/* ADMIN LOGIN */}
        {isAdmin && (
          <>
            <input
              type="text"
              placeholder="Admin Username"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-400"
              id="admin-user"
            />
            <input
              type="password"
              placeholder="Admin Password"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-400"
              id="admin-pass"
            />

            <Link
              href="/admin/dashboard"
              onClick={async (e) => {
                e.preventDefault();

                const username = document.querySelector("#admin-user").value;
                const password = document.querySelector("#admin-pass").value;

                const res = await fetch("/api/auth/login", {
                  method: "POST",
                  body: JSON.stringify({ email: username, password }),
                });

                const data = await res.json();
                if (data.user?.role === "ADMIN") {
                  window.location.href = "/admin/dashboard";
                } else {
                  alert("You are not an admin");
                }
              }}
              className="w-full block bg-red-600 text-white text-center py-3 rounded-md hover:bg-red-700"
            >
              Enter Admin Dashboard
            </Link>
          </>
        )}

        {/* Toggle */}
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
          onClick={async () => {
            const email = document.querySelector("#email").value;
            const password = document.querySelector("#password").value;

            const res = await fetch("/api/auth/login", {
              method: "POST",
              body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (data.user?.role === "ADMIN") {
              window.location.href = "/admin/dashboard";
            } else if (data.user) {
              window.location.href = "/";
            } else {
              alert(data.error);
            }
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
