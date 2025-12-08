"use client"
import Link from "next/link";
import { useState } from "react";


export default function ResetPasswordPage() {
 
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const sendLink = async () => {
      const res = await fetch("/api/auth/reset/request", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message);
    };

    
     return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6">

        <h1 className="text-2xl font-bold text-center">Reset Password</h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-400"
        />

        <button
          onClick={sendLink}
         className="w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700 transition">
          Send Reset Link
        </button>

        {message && <p className="text-green-600 text-center">{message}</p>}
        
        <p className="text-sm text-center">
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
