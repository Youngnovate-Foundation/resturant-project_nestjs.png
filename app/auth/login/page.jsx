"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [isAdmin, setIsAdmin] = useState(false);

  // USER login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ADMIN login state
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");

  const loginUser = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.user?.role === "ADMIN") {
      router.push("/admin/dashboard");
    } else if (data.user) {
      router.push("/");
    } else {
      alert(data.error || "Invalid credentials");
    }
  };

  const loginAdmin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: adminUser, password: adminPass }),
    });

    const data = await res.json();

    if (data.user?.role === "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      alert("You are not an admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">
          {isAdmin ? "Admin Login" : "User Login"}
        </h1>

        {/* USER LOGIN */}
        {!isAdmin && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={loginUser}
              className="w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700 cursor-grab"
            >
              Login
            </button>

            <div className="flex justify-between text-sm">
              <Link href="/auth/reset" className="text-blue-600 hover:underline">
                Forgot Password?
              </Link>
              <Link href="/auth/signup" className="text-orange-600 hover:underline">
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
              value={adminUser}
              onChange={(e) => setAdminUser(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-400"
            />

            <input
              type="password"
              placeholder="Admin Password"
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-400"
            />

            <button
              onClick={loginAdmin}
              className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 cursor-grab"
            >
              Enter Admin Dashboard
            </button>
          </>
        )}

        {/* SWITCH MODE */}
        <button
          className="w-full bg-gray-200 py-2 rounded-md"
          onClick={() => setIsAdmin(!isAdmin)}
        >
          {isAdmin ? "Login as User" : "Login as Admin"}
        </button>
      </div>
    </div>
  );
}
