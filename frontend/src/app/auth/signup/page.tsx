"use client";

import { useState } from "react";
import { useAuth } from "../../context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { GoogleButton } from "../components/googleButton";
import AuthToggle from "../components/authToggle";
import {setDoc, doc} from "firebase/firestore";
import { db } from "../../config/firebase";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUpWithEmail } = useAuth();
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signUpWithEmail(email, password, firstName, lastName);
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          name: `${firstName} ${lastName}`,
          email,
        });
        router.push("/bio");
      }
    } catch {
      setError("Failed to create an account. Check email and password.");
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
            
        <h1 className="text-2xl font-semibold text-gray-800 mb-5">Sign Up</h1>

        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
        >
            {error && <p className="text-red-500 mb-3 text-center">{error}</p>}

            <input
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            />
            <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            />
            <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            />
            <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            />

            <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition duration-300"
            >
            Sign Up
            </button>
        </form>

        <GoogleButton text="Sign up with Google" />
        </div>
  );
}