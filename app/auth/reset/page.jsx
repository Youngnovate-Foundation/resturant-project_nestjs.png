"use client";

import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6">

        <h1 className="text-2xl font-bold text-center">Reset Password</h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border rounded-md"
        />

        <button className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700">
          Send Reset Link
        </button>

        <p className="text-sm text-center">
          <Link href="/auth/login" className="text-blue-600">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
