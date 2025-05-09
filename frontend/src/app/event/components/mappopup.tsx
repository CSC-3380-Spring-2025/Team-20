"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import HomeButton from "../../map/components/homebutton";
import SearchBar from "../../map/components/searchbar";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface MapPopupProps {
  onClose: () => void;
  onCoordinatesSelect?: (lat: number, lng: number) => void;
  eventId?: string;
  initialCoordinates?: [number, number];
  coordinates?: { lat: number; lng: number };
  zoom?: number;
  viewOnly?: boolean;
}

export function MapPopup({
  onClose,
  onCoordinatesSelect,
  eventId,
  initialCoordinates,
  viewOnly = false,
}: MapPopupProps) {
  const defaultPosition: [number, number] = [30.413436, -91.180144];
  const [position, setPosition] = useState<[number, number]>(
    initialCoordinates || defaultPosition
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getPinIcon = () => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      return new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
    }
    return null;
  };

  const [pinIcon, setPinIcon] = useState<any>(null);

  useEffect(() => {
    if (isClient) {
      setPinIcon(getPinIcon());
    }
  }, [isClient]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (eventId) {
        const docRef = doc(db, "events", eventId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.lat && data.lng) {
            setPosition([data.lat, data.lng]);
          }
        }
      }
    };

    fetchCoordinates();
  }, [eventId]);

  function DraggableMarker() {
    const [draggable, setDraggable] = useState(true);
    const markerRef = useRef<any>(null);

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

    if (!isClient || !pinIcon) return null;

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        icon={pinIcon}
      >
      </Marker>
    );
  }

  const handleSelectCoordinates = () => {
    onCoordinatesSelect?.(position[0], position[1]);
    onClose();
  };

  if (!isClient) {
    return null;
  }

  return (
    <div
      style={{
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
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "80%",
          height: "80%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h2>Select Your Event Location</h2>
          <button onClick={onClose} style={{ padding: "5px 10px" }}>
            Close
          </button>
        </div>

        <div style={{ flex: 1, position: "relative" }}>
          {isClient && (
            <MapContainer
              center={position}
              zoom={16}
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
          )}
        </div>

        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            Latitude: {position[0].toFixed(5)}, Longitude: {position[1].toFixed(5)}
          </div>
          {!viewOnly && onCoordinatesSelect && (
          <button
            onClick={handleSelectCoordinates}
            style={{
              padding: "8px 16px",
              backgroundColor: "#4CAF50",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Select Event Location
          </button>
          )}
        </div>
      </div>
    </div>
  );
}