"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useCallback, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

// INTERNAL IMPORT
import { HomeButton, SearchBar } from "../../map/components/mapcontrols";

interface MapPopupProps {
  onClose: () => void;
  onCoordinatesSelect: (lat: number, lng: number) => void;
}

export function MapPopup({ onClose, onCoordinatesSelect }: MapPopupProps) {
  const [position, setPosition] = useState<[number, number]>([30.413436, -91.180144]);

  const pinIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  function DraggableMarker() {
    const [draggable, setDraggable] = useState(false);
    const markerRef = useRef<L.Marker | null>(null);

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            const latlng = marker.getLatLng();
            setPosition([latlng.lat, latlng.lng]);
          }
        },
      }),
      []
    );

    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d);
    }, []);

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        icon={pinIcon}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? "Pin is currently draggable"
              : "Click the popup to make pin draggable"}
          </span>
        </Popup>
      </Marker>
    );
  }

  const handleSelectCoordinates = () => {
    onCoordinatesSelect(position[0], position[1]);
    onClose();
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "#000000aa",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        width: "80%",
        height: "80%",
        display: "flex",
        flexDirection: "column",
      }}>
        <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
          <h2>Share Your Location</h2>
          <button onClick={onClose} style={{ padding: "5px 10px" }}>Close</button>
        </div>
        
        <div style={{ flex: 1, position: "relative" }}>
          <MapContainer
            center={position}
            zoom={17}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%", zIndex: 1001 }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <DraggableMarker />
            <HomeButton center={position} zoom={17} />
            <SearchBar />
          </MapContainer>
        </div>
        
        <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
          <div>
            Latitude: {position[0].toFixed(5)}, Longitude: {position[1].toFixed(5)}
          </div>
          <button 
            onClick={handleSelectCoordinates}
            style={{ 
              padding: "8px 16px",
              backgroundColor: "#4CAF50",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Select Location
          </button>
        </div>
      </div>
    </div>
  );
}