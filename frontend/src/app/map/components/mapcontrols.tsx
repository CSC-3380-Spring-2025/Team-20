"use client";

import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import { Home } from "lucide-react";
import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import L, { Control, ControlOptions, Marker } from "leaflet";

// --- Augment Leaflet types properly ---
interface GeocoderOptions {
  defaultMarkGeocode?: boolean;
  placeholder?: string;
  errorMessage?: string;
  showResultIcons?: boolean;
}

declare module "leaflet" {
  namespace Control {
    function geocoder(options?: GeocoderOptions): Control;
  }
}

// --- Define correct event type ---
interface GeocodeResult {
  center: L.LatLng;
  name: string;
}

interface GeocodeEvent {
  geocode: GeocodeResult;
}

// --- HomeButton Component ---
interface HomeButtonProps {
  center: [number, number];
  zoom: number;
}

const HomeButton: React.FC<HomeButtonProps> = ({ center, zoom }) => {
  const map = useMap();

  const handleHomeClick = () => {
    map.flyTo(center, zoom);
  };

  return (
    <button
      onClick={handleHomeClick}
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
        zIndex: 1000,
      }}
    >
      <Home size={24} />
    </button>
  );
};

// --- SearchBar Component ---
const SearchBar: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    const searchControl = L.Control.geocoder({
      defaultMarkGeocode: false,
      placeholder: 'Search Maps',
      errorMessage: 'Maps cannot find',
      showResultIcons: true,
    })
      .on("markgeocode", (e: GeocodeEvent) => {
        const { center, name } = e.geocode;
        map.flyTo(center, 17);
        L.marker(center).addTo(map).bindPopup(name).openPopup();
      })
      .addTo(map);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
};

export { HomeButton, SearchBar };
