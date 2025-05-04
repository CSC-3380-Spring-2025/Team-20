
"use client";
import React from "react";
import Header from "./oc-components/header";
import * as styles from "./styles/oc-style";
import { useHover } from "./hooks/useHover";
import { OptionsBar } from "./oc-components/options-bar";
import Link from "next/link";

export default function Home() {
  const [Hovered, listener] = useHover();


  return (
    <>
      <Header />

      <main>
        <div style={styles.container}>
          <Link href="/events-page">  <button
              style={{...styles.backbutton,
                textDecoration: Hovered ? "underline" : "none",}}{...listener}>
              ← Events
            </button></Link>
        </div>

        <OptionsBar/>
       

      </main>

    
    </>
=======

"use client";

import Header from "../components/header";
import Map from "../components/map";

export default function MapPage() {
  return (
    <div>
      <Header />
      <Map />
    </div>
  );
}

'use client';

import { useState } from 'react';

export default function Home() {
  const buttonNames = [
    "Hobbies", "Sports", "Food",
    "Movies", "Colors", "Animals",
    "Career", "Fashion", "Personality"
  ];

  // State to track selected buttons
  const [selectedButtons, setSelectedButtons] = useState([]);

  // Toggle selection of a button
  const handleButtonClick = (buttonName) => {
    setSelectedButtons((prevState) => {
      if (prevState.includes(buttonName)) {
        // Remove the button if it's already selected
        return prevState.filter(name => name !== buttonName);
      } else {
        // Add the button if it's not selected
        return [...prevState, buttonName];
      }
    });
  };

  return (
    <div className="min-h-screen bg-blue-300">
      {/* Header Section */}
      <header className="bg-blue-300 text-gray-500 py-4 shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
        <div className="flex justify-between items-center px-8">
          {/* Stacked Logo */}
          <div className="text-left">
            <span className="block text-3xl font-semibold">Uni</span>
            <span className="block text-3xl font-semibold">Friend</span>
            <span className="block text-3xl font-semibold">Sync</span>
          </div>

          {/* Centered Navigation Menu */}
          <nav className="flex space-x-9 justify-center flex-grow">
            {["Home", "Events", "Map", "Interests", "Mini Games"].map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-2xl font-semibold hover:text-gray-800 transition duration-300"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Search Bar Section */}
      <div className="flex justify-end px-8 mt-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-64 p-2 border border-gray-400 rounded-lg shadow-md text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 3x3 Button Grid */}
      <main className="flex justify-center items-center min-h-[60vh]">
        <div className="grid grid-cols-3 gap-4">
          {buttonNames.map((name, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(name)} // Toggle button selection
              className={`bg-blue-500 text-white px-12 py-10 text-lg rounded-md shadow-lg hover:bg-blue-700 ${
                selectedButtons.includes(name) ? "bg-blue-700" : ""
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </main>

      {/* Counter Section */}
      <footer className="flex justify-center items-center py-1 mt-4">
        <span className="text-xl text-white">
          Buttons Selected: {selectedButtons.length}
        </span>
      </footer>
    </div>

  );
}




