// "use client";

// import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
// import L from "leaflet";
// import { Marker, Popup } from "react-leaflet";
// import { useCallback, useMemo, useRef, useState } from "react";

// // INTERNAL IMPORT
// import Header from "../components/header";
// import { HomeButton, SearchBar } from "./components/mapcontrols";
// import { buildingBlueprint, buildingPopup } from "./components/popups";
// import styles from "../../../styles/map.module.css";

// export default function Map() {
//   const position: [number, number] = [30.413436, -91.180144];

//   const pin = {
//     lat: 30.413436,
//     lng: -91.180144,
//   };

//   const pinIcon = new L.Icon({
//     iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
//     shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });

//   function DraggableMarker() {
//     const [draggable, setDraggable] = useState(false);
//     const [position, setPosition] = useState(pin);
//     const markerRef = useRef<L.Marker | null>(null);

//     const eventHandlers = useMemo(
//       () => ({
//         drag(e: L.LeafletEvent) {
//           const marker = markerRef.current;
//           if (marker != null) {
//             const latlng = marker.getLatLng();
//             document.getElementById("coordinates")!.innerText = `Dragging: Lat ${latlng.lat.toFixed(
//               5
//             )}, Lng ${latlng.lng.toFixed(5)}`;
//           }
//         },
//         dragend() {
//           const marker = markerRef.current;
//           if (marker != null) {
//             const latlng = marker.getLatLng();
//             setPosition(latlng);
//             document.getElementById("coordinates")!.innerText = `Pin Location: Lat ${latlng.lat.toFixed(
//               5
//             )}, Lng ${latlng.lng.toFixed(5)}`;
//           }
//         },
//       }),
//       []
//     );

//     const toggleDraggable = useCallback(() => {
//       setDraggable((d) => !d);
//     }, []);

//     return (
//       <div>
//         <Marker
//           draggable={draggable}
//           eventHandlers={eventHandlers}
//           position={position}
//           ref={markerRef}
//           icon={pinIcon}
//         >
//           <Popup minWidth={90}>
//             <span onClick={toggleDraggable}>
//               {draggable 
//               ? "Pin is currently draggable"
//               : "Click the popup to make pin draggable"}
//             </span>
//           </Popup>
//         </Marker>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.headerstyle}>
//       <Header />
//       <MapContainer
//         center={position}
//         zoom={17}
//         scrollWheelZoom={true}
//         className={styles.map}
//       >
//         {/* Display Draggable Marker */}
//         <DraggableMarker />

//         {/* Display Coordinates */}
//         <div
//           id="coordinates"
//           style={{
//             position: "absolute",
//             bottom: "40px",
//             left: "10px",
//             zIndex: 1000,
//             backgroundColor: "white",
//             padding: "8px",
//             border: "1px solid gray",
//             borderRadius: "5px",
//           }}
//         ></div>

//         {/* Display Home Button */}
//         <HomeButton center={position} zoom={17} />

//         {/* Display Search Bar */}
//         <SearchBar />

//         {/* Display Map */}
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         />

//         {/* Display Building */}
//         <GeoJSON
//           data={buildingBlueprint}
//           onEachFeature={buildingPopup}
//           style={() => ({
//             color: "purple",
//             weight: 1,
//             fillOpacity: 0.4,
//           })}
//         />
//       </MapContainer>
//     </div>
//   );
// }