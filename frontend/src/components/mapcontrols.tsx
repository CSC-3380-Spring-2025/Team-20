"use client"; 

import { useState } from "react";

export default function MapControls() {
  const [zoom, setZoom] = useState<number>(1);
  const [popup, setPopup] = useState<boolean>(false);

  const togglePopup = () => setPopup(!popup); 

  return (
    <div className="relative w-full h-screen">

      {/* Button in Top Right Corner */}
      <div className="absolute top-5 right-4 text-xl">
        <button
          className="text-xl"
          onClick={togglePopup}
        > 
        🔗
        </button>

        {/* Popup */}
        {popup && (
          <div className="absolute top-16 right-0 bg-white p-4 rounded" style={{ width: '400px', height: '300px' }}>
            <p 
            className="text-black rounded text-xl"
            >
              Share Location
            </p>
            <button onClick={togglePopup}>
              X
            </button>
          </div>
        )}
      </div>

      {/* Buttons in Bottom Right Corner */}
      <div className="absolute bottom-12 right-4 flex flex-col space-y-3">
        <button
          className="bg-white text-gray-500 w-10 h-10 rounded text-xl"
          onClick={() => setZoom(1)}
        >
          🏠
        </button>
        <button
          className="bg-white text-gray-500 w-10 h-10 rounded text-xl"
          onClick={() => setZoom((z) => Math.min(z + 1, 10))}
        >
          +
        </button>
        <button
          className="bg-white text-gray-500 w-10 h-10 rounded text-xl"
          onClick={() => setZoom((z) => Math.max(z - 1, 1))}
        >
          -
        </button>
        <button
          className="bg-white text-gray-500 w-10 h-10 rounded text-xl"
        > 
        🧍
        </button>
      </div>
    </div>
  );
}