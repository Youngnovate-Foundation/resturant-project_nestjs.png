"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");

  const login = async (email, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 🔑 important
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Invalid credentials");
      return;
    }

    if (data.user.role === "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">
          {isAdmin ? "Admin Login" : "User Login"}
        </h1>

        {!isAdmin && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-md"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-md"
            />

            <button
              onClick={() => login(email, password)}
              className="w-full bg-orange-600 text-white py-3 rounded-md"
            >
              Login
            </button>

            <div className="flex justify-between text-sm">
              <Link href="/auth/signup" className="text-orange-600">
                Create Account
              </Link>
            </div>
          </>
        )}

        {isAdmin && (
          <>
            <input
              type="email"
              placeholder="Admin Email"
              value={adminUser}
              onChange={(e) => setAdminUser(e.target.value)}
              className="w-full p-3 border rounded-md"
            />

            <input
              type="password"
              placeholder="Admin Password"
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              className="w-full p-3 border rounded-md"
            />

            <button
              onClick={() => login(adminUser, adminPass)}
              className="w-full bg-green-600 text-white py-3 rounded-md"
            >
              Enter Admin Dashboard
            </button>
          </>
        )}

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
