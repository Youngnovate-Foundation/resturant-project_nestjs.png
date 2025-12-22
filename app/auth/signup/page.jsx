"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext"; // ✅ import UserContext

export default function SignupPage() {
  const router = useRouter();
  const { setCurrentUser } = useUser(); // ✅ setter for global user

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Signup request
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      // 2️⃣ Auto-login after signup
      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginRes.json();

      if (loginRes.ok) {
        // ✅ Set the logged-in user globally
        setCurrentUser({
          id: loginData.user.id,
          name: loginData.user.name,
          email: loginData.user.email,
        });

        router.push("/shop"); // navigate to shop
      } else {
        router.push("/auth/login"); // fallback
      }
    } catch (err) {
      console.error(err);
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
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
          We serve freshly prepared meals, refreshing drinks, and delightful treats. Sign up to order easily, track your meals, and enjoy quality service.
        </p>
      </div>

      {/* RIGHT: Signup Form */}
      <div className="flex flex-col items-center justify-center p-6">
        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6">
          <h1 className="text-2xl font-bold text-center">Create Account</h1>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-md"
          />

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
            onClick={handleSubmit}
            disabled={loading || !name || !email || !password}
            className="w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <Link
          href="/"
          className="mt-6 text-sm text-gray-600 hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
