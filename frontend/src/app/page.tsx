"use client";

import React, { useState } from "react";
import Login from "./components/login";
import SignUp from "./components/signup";
import UserCard from "./components/userCard";
import { useAuth } from "./context/auth-context";

export default function Home() { 
  const [choice, setChoice] = useState<string>("Log In");
  const { user } = useAuth();

  const handleChoice = (option: string) => {
    setChoice(option);
  };

  return (
    <div className="flex flex-col items-center p-2">

      {/* Show UserCard if logged in */}
      {user ? (
        <UserCard />
      ) : (
        <>
          <div className="flex gap-3">


            <button onClick={() => handleChoice("Log In")}  className="px-6  border border-gray-300 rounded-lg bg-white text-black hover:bg-gray-100 transition duration-150">
              Log In
            </button>


            <button onClick={() => handleChoice("Sign Up")}className="px-6 py-2 border border-gray-300 rounded-lg bg-white text-black hover:bg-gray-100 transition duration-150">
              Sign Up
            </button>



          </div>

        
          {choice === "Log In" ? <Login /> : <SignUp />}
        </>
      )}
    </div>
  );
}
