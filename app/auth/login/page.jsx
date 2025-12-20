"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext"; // ✅ import context

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentUser } = useUser(); // ✅ get setter from context

  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const login = async (email, password) => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        return;
      }

      // ✅ Set the logged-in user globally
      setCurrentUser({ id: data.user.id, name: data.user.name, email: data.user.email });

      if (data.user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/shop");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-100">
      {/* LEFT: Branding */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gray-100">
        <h1 className="text-5xl font-extrabold text-emerald-600 mb-4">
          Ceccy Ann Restaurant
        </h1>
        <p className="text-gray-600 text-lg max-w-md">
          Order freshly prepared meals, refreshing drinks, and delightful treats. Login to continue and enjoy quality service.
        </p>
      </div>

      {/* RIGHT: Login Form */}
      <div className="flex flex-col items-center justify-center p-6">
        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6">
          <h1 className="text-2xl font-bold text-center">
            {isAdmin ? "Admin Login" : "User Login"}
          </h1>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

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
                disabled={!email || !password}
                className="w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700 disabled:opacity-50"
              >
                Login
              </button>

              <div className="flex text-sm text-center justify-center space-x-2">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-orange-600">
                  Sign Up
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
                disabled={!adminUser || !adminPass}
                className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 disabled:opacity-50"
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

        <Link href="/" className="mt-6 text-sm text-gray-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
