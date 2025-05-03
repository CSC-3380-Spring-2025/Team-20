"use client";

import React from "react";
import { useMap } from "react-leaflet";
import { Home } from "lucide-react";

interface HomeButtonProps {
  center: [number, number];
  zoom: number;
}

const HomeButton: React.FC<HomeButtonProps> = ({ center, zoom }) => {
  const map = useMap();

  const handleClick = () => {
    map.flyTo(center, zoom);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: "absolute",
        top: "50px",
        right: "10px",
        height: "33px",
        width: "33px",
        backgroundColor: "white",
        padding: "5px",
        border: "1px solid gray",
        borderRadius: "5px",
        zIndex: 1000
      }}
    >
      <Home size={22} />
    </button>
  );
};

export default HomeButton;