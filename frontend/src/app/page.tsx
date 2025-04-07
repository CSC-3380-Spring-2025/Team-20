"use client";

import { useAuth } from "@/app/context/auth-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Landing() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user,router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">UNI-Friend Sync</h1>
      <div className="flex gap-4 mt-6">
        <button   className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => router.push("/auth/login")}>Log In</button>
        <button  className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => router.push("/auth/signup")}>Sign Up</button>
      </div>
    </main>
  );
}
