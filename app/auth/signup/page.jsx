"use client";

import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6">
        
        <h1 className="text-2xl font-bold text-center">Create Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded-md"
        />

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

        <button className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700">
          Sign Up
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
