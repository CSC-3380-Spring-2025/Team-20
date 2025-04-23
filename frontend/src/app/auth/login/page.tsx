"use client";

import { useState } from "react";
import { useAuth } from "../../context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react";


import { GoogleButton } from "../components/googleButton";
import AuthToggle from "../components/authToggle";

export default function Login() {
  const { user, signInWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const router = useRouter();

  

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmail(email, password);
      router.push("/bio");
    } catch {
      setError("Login failed. Check your credentials.");
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/bio");
    }
  }, [user, router]);

  

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
        <AuthToggle/>
        <h2 className="text-2xl font-semibold mb-5 text-black-800">Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleEmailLogin} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mb-5">
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-lg"
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-lg"
            />
            <button
            type="submit"
            className="w-full bg-purple-500 text-white font-bold py-2 rounded-lg transition hover:bg-yellow-400"
            >
            Sign In
            </button>
        </form>

        <GoogleButton text="Sign in with Google" />
        </div>
  );
}