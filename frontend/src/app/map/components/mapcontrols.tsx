"use client";

import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import { Home } from "lucide-react";
import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; 
import L from "leaflet";

interface HomeButtonProps {
  center: [number, number];
  zoom: number;
}

// Type definitions for leaflet-control-geocoder
declare module 'leaflet' {
  interface ControlStatic {
    geocoder(options?: GeocoderOptions): GeocoderControl;
  }
}

interface GeocoderOptions {
  defaultMarkGeocode?: boolean;
  placeholder?: string;
  errorMessage?: string;
  showResultIcons?: boolean;
  expand?: 'touch' | 'click' | false;
  position?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
  [key: string]: unknown; // For any additional options
}

interface GeocodeResult {
  geocode: {
    center: L.LatLngLiteral;
    name: string;
    bbox?: L.LatLngBoundsLiteral;
    properties?: Record<string, unknown>;
  };
}

interface GeocoderControl extends L.Control {
  on(event: 'markgeocode', callback: (result: GeocodeResult) => void): this;
  on(event: string, callback: (event: unknown) => void, context?: unknown): this;
}

// Home Button Component
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
        zIndex: 1000
      }}
      aria-label="Center map to home position"
    >
      <Home size={24} />
    </button>
  );
};

// Search Bar Component
const SearchBar: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    const searchControl = L.Control.geocoder({
      defaultMarkGeocode: false,
      placeholder: 'Search Maps',
      errorMessage: 'Maps cannot find',
      showResultIcons: true,
    }) as GeocoderControl;

    const handleMarkGeocode = (e: GeocodeResult) => {
      const { center } = e.geocode;
      map.flyTo(center, 17);
      L.marker(center).addTo(map).bindPopup(e.geocode.name).openPopup();
    };

    searchControl.on("markgeocode", handleMarkGeocode);
    searchControl.addTo(map);

    return () => {
      map.removeControl(searchControl);
      searchControl.off("markgeocode", handleMarkGeocode);
    };
  }, [map]);

  return null;
};

export { HomeButton, SearchBar };