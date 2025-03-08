"use client"; 

import { useState } from "react";

export default function MapControls() {
  const [zoom, setZoom] = useState<number>(1);
  const [showPopup, setShowPopup] = useState<boolean>(false); // Add state for popup

  const togglePopup = () => setShowPopup(!showPopup); // Function to toggle popup

  return (
    <div className="relative w-full h-screen bg-gray-500 flex flex-col items-center justify-center">
      <p className="text-lg text mb-4">{zoom}</p>

      {/* Button in Top Right Corner */}
      <div className="absolute top-12 right-4 flex flex-col space-y-3">
        <button
          className="text-xl"
          onClick={togglePopup} // Toggle popup on click
        > 
        🔗
        </button>
        {showPopup && ( // Conditionally render popup
          <div className="absolute top-16 right-0 bg-white p-4 rounded shadow-md" style={{ width: '300px', height: '200px' }}>
            <p>SHARE LOCATION</p>
            <button onClick={togglePopup}>Close</button>
          </div>
        )}
      </div>

      {/* Buttons in Bottom Right Corner */}
      <div className="absolute bottom-12 right-4 flex flex-col space-y-3">
        <button
          className="bg-white text-gray-500 w-10 h-10 rounded shadow-md text-xl"
          onClick={() => setZoom(1)}
        >
          🏠
        </button>
        <button
          className="bg-white text-gray-bold-500 w-10 h-10 rounded shadow-md text-xl"
          onClick={() => setZoom((z) => Math.min(z + 1, 20))} // Max zoom 20
        >
          +
        </button>
        <button
          className="bg-white text-gray-bold-500 w-10 h-10 rounded shadow-md text-xl"
          onClick={() => setZoom((z) => Math.max(z - 1, 1))} // Min zoom 1
        >
          −
        </button>

        <button
          className="bg-white text-gray-500 w-10 h-10 rounded shadow-md text-xl"
        > 
        🧍
        </button>
      </div>
    </div>
  );
}