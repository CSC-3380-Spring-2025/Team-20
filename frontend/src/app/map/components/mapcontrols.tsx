// "use client";

// import React, { useEffect } from "react";
// import { useMap } from "react-leaflet";
// import { Home } from "lucide-react";
// import 'leaflet-control-geocoder';
// import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; 
// import L from "leaflet";

// interface HomeButton {
//   center: [number, number];
//   zoom: number;
// }

// //Home Button Component
// const HomeButton: React.FC<HomeButton> = ({ center, zoom }) => {
//   const map = useMap();

//   const clickableHome = () => {
//     map.flyTo(center, zoom);
//   };

//   return (
//     <button
//       onClick={clickableHome}
//       style={{
//         position: "absolute",
//         top: "80px",
//         left: "10px",
//         height: "35px",
//         width: "35px",  
//         backgroundColor: "white",
//         padding: "5px",
//         border: "1px solid gray",
//         borderRadius: "5px",
//         zIndex: 1000
//       }}
//     >
//       <Home size={24} />
//     </button>
//   );
// };

// declare module 'leaflet' {
//   namespace Control {
//     function geocoder(options?: any): any;
//   }
// }

// //Search Bar Component
// const SearchBar: React.FC = () => {
//   const map = useMap();

//   useEffect(() => {
//     const searchControl = L.Control.geocoder({
//       defaultMarkGeocode: false,
//       placeholder: 'Search Maps',
//       errorMessage: 'Maps cannot find',
//       showResultIcons: true,
//     })
//       .on("markgeocode", (e: any) => {
//         const { center } = e.geocode;
//         map.flyTo(center, 17); 
//         L.marker(center).addTo(map).bindPopup(e.geocode.name).openPopup();
//       })
//       .addTo(map);

//     return () => {
//       map.removeControl(searchControl);
//     };
//   }, [map]);

//   return null;
// };

// export { HomeButton, SearchBar };