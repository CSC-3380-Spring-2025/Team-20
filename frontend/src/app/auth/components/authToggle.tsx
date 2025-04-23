"use client";

import { useRouter } from "next/navigation";

export default function AuthToggle() {
  const router = useRouter();

  return (
    
    <div className="flex justify-center mb-4 space-x-4">
        <button className="px-6 py-3 rounded-lg font-semibold mb-8 hover:bg-gray-100" onClick={() => router.push("/")}>
            Back to Landing
        </button>
        <button
        className="px-6 py-3 rounded-lg font-semibold mb-8 bg-purple-500 text-white hover:bg-yellow-400 focus:outline-none"
        onClick={() => router.push("/auth/login")}
        >
        Login
        </button>

        <button
        className="px-6 py-3 rounded-lg font-semibold mb-8 bg-yellow-500 text-white hover:bg-yellow-400 focus:outline-none transition"
        onClick={() => router.push("/auth/signup")}
        >
        Sign Up
        </button>
    </div>
  );
}