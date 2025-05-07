"use client";

import React, { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css"

declare global {
  namespace L {
    namespace Control {
      function geocoder(options?: any): any;
    }
  }
}

const SearchBar: React.FC = () => {
  const map = useMap();
  const searchControlRef = useRef<any>(null);

  useEffect(() => {
    Promise.all([
      import("leaflet"),
      import("leaflet-control-geocoder")
    ]).then(([L, Geocoder]) => {
      if (searchControlRef.current) return;

      searchControlRef.current = L.Control.geocoder({
        defaultMarkGeocode: false,
        placeholder: "Search Maps",
        errorMessage: "Maps cannot find",
        showResultIcons: true,
      })
      .on("markgeocode", (e: any) => {
        const { center } = e.geocode;
        map.flyTo(center, 17);
        L.marker(center).addTo(map).bindPopup(e.geocode.name).openPopup();
      })
      .addTo(map);

      return () => {
        if (searchControlRef.current) {
          map.removeControl(searchControlRef.current);
          searchControlRef.current = null;
        }
      };
    });
  }, [map]);

  return null;
};

export default SearchBar; 