import React from "react";
import { useMap } from "react-leaflet";
import { Home } from "lucide-react";

interface HomeButton {
  center: [number, number];
  zoom: number;
}

const HomeButton: React.FC<HomeButton> = ({ center, zoom }) => {
  const map = useMap();

  const clickableHome = () => {
    map.flyTo(center, zoom);
  };

  return (
    <button
      onClick={clickableHome}
      style={{
        position: "absolute",
        top: "80px",
        left: "10px",
        height: "35px",
        width: "35px",  
        backgroundColor: "white",
        padding: "5px",
        border: "1px solid gray",
        borderRadius: "5px",
        zIndex: 1000
      }}
    >
      <Home size={24} />
    </button>
  );
};

export default HomeButton;