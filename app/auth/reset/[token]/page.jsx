"use client"
import { useState } from 'react'

export default function NewPasswordPage({ params }) {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const submit = async () => {
        const res = await fetch(`/api/auth/reset/${params.token}`, {
            method: 'POST',
            body: JSON.stringify({ password }),
        });

        const data = await res.json();
        setMessage(data.message || data.error);
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 p-6'>
        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6">

            <h1 className="text-2xl font-bold text-center">Set New Password</h1>

            <input
                type="password"
                placeholder="Enter your new password"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-400"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={submit}
                className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-orange-700 transition"
            >
                Change Password
            </button>

            {message && <p className="text-green-600 text-center">{message}</p>}

        </div>
        </div>
    );
}