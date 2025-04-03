"use client";

import React, { useState } from "react";
import Login from "./components/login";
import SignUp from "./components/signup";

export default function Home() { 
  const [choice, setChoice] = useState<string>("Sign In");

  const handleChoice = (option :string) => {
    setChoice(option);
  };
  

  
  return (
    <div className="flex flex-col items-right p-2 ">
      
      <div className="flex gap-4">
        <button
          onClick={() => handleChoice("Log In")}
          className="px-6 py-2 border border-gray-300 rounded-lg bg-white text-black hover:bg-gray-100 transition duration-150"
        >
          Log In
        </button>
        <button
          onClick={() => handleChoice("Sign Up")}
          className="px-6 py-2 border border-gray-300 rounded-lg bg-white text-black hover:bg-gray-100 transition duration-150"
        >
          Sign Up
        </button>
      </div>
      {choice === "Log In" ? <Login /> : <SignUp />} {/* Conditional rendering */}
    </div>
  );
}
