"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6">
        
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {/* Login Form */}
        {!isAdmin && (
          <>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-md"
            />

            <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
              Login
            </button>

            <div className="flex justify-between text-sm">
              <Link href="/auth/reset" className="text-blue-600">
                Forgot Password?
              </Link>
              <Link href="/auth/signup" className="text-blue-600">
                Create Account
              </Link>
            </div>
          </>
        )}

        {/* Admin Login Section */}
        {isAdmin && (
          <>
            <h2 className="text-lg font-semibold text-center">Admin Login</h2>
            <input
              type="text"
              placeholder="Admin Username"
              className="w-full p-3 border rounded-md"
            />
            <input
              type="password"
              placeholder="Admin Password"
              className="w-full p-3 border rounded-md"
            />

            <Link
              href="/admin/dashboard"
              className="w-full block bg-red-600 text-white text-center py-3 rounded-md hover:bg-red-700"
            >
              Enter Admin Dashboard
            </Link>
          </>
        )}

        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className="w-full text-center text-sm text-gray-600 underline"
        >
          {isAdmin ? "Back to User Login" : "Login as Admin"}
        </button>
      </div>
    </div>
  );
}
