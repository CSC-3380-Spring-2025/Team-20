import "leaflet/dist/leaflet.css"; 
import style from "../../styles/home.module.css";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import { useState } from "react";

import HomeButton from "./mapcontrols";

export default function Map() {
  const position: [number, number] = [30.412035, -91.183815];
  const [pin, setPin] = useState<{ x: number; y: number; coords: [number, number] }[]>([]);

  // Used to Customize Building Shape
  interface BuildingShape {
    name: string;
    description: string;
  }

  //Coordinates Starts from the Top Left to the Right, then Right Down to Left

  //Buildings On Campus
  const buildingBlueprint: GeoJSON.FeatureCollection<GeoJSON.Geometry, BuildingShape> = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [-91.180616, 30.414672],[-91.179581, 30.414708],[-91.179552, 30.414168],[-91.180589, 30.414131],[-91.180616, 30.414672]
            ]
          ]
        },
        "properties": {
          "name": "Middleton Library",
          "description": "https://lib.lsu.edu/sites/default/files/2024-01/ccs_coffee_first_floor.jpg"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [-91.179668, 30.413655],[-91.179463, 30.41366],[-91.179453, 30.41344],[-91.179151, 30.413451],[-91.179145, 30.413354],
              [-91.178929, 30.413363],[-91.178936, 30.41346],[-91.178638, 30.413474],[-91.178631, 30.413348],[-91.178681, 30.413347],
              [-91.178665, 30.413035],[-91.178611, 30.413037],[-91.178606, 30.412924],[-91.178901, 30.412913],[-91.178906, 30.413015],
              [-91.179125, 30.413006],[-91.179119, 30.412904],[-91.179426, 30.412893],[-91.179416, 30.412674],[-91.17962, 30.412666],
              [-91.179668, 30.413655]
            ]
          ]
        },
        "properties": {
          "name": "Coates Hall",
          "description": "https://www.hollyandsmith.com/wp-content/uploads/portfolio/LSU%20Coates%20Hall%20Interior%20Renovation_x_Floorplan%20-%20LSU%20Coates%20Hall-scaled.jpg"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [-91.180341, 30.408311],[-91.180253, 30.408287],[-91.180248, 30.408301],[-91.180193, 30.408285],[-91.180175, 30.408336],
              [-91.180045, 30.408301],[-91.180064, 30.408251],[-91.179974, 30.408226],[-91.179963, 30.408253], [-91.179928, 30.408244],
              [-91.179876, 30.408386],[-91.179075, 30.408171],

              [-91.179118, 30.408053],[-91.179068, 30.408039],[-91.179094, 30.407964],[-91.179109, 30.407968],[-91.179223, 30.407655],
              [-91.179197, 30.407647],[-91.179269, 30.407453],[-91.179301, 30.40746],[-91.179309, 30.407433],[-91.179281, 30.407424],
              [-91.179350, 30.407231],[-91.179378, 30.40724],[-91.179388, 30.407212],[-91.17936, 30.407203],[-91.179429, 30.407012],

              [-91.179672, 30.407078],[-91.179655, 30.407131],[-91.179683, 30.407138],[-91.179688, 30.407124],[-91.180057, 30.407223],
              [-91.180052, 30.40724],[-91.180084, 30.407249],[-91.180106, 30.407191],[-91.180347, 30.407258],[-91.180341, 30.407275],
              [-91.180406, 30.407292],[-91.180416, 30.407262],[-91.180455, 30.407272],[-91.180465, 30.407244],[-91.180658, 30.407298],

              [-91.180649, 30.407322],[-91.180667, 30.407327],[-91.180636, 30.407410],[-91.180666, 30.407418],[-91.180607, 30.407576],
              [-91.180671, 30.407595],[-91.180577, 30.407849],[-91.180516, 30.407832],[-91.180341, 30.408311]
            ]
          ]
        },
        "properties": {
          "name": "Patrick F. Taylor Hall",
          "description": "https://marvel-b1-cdn.bc0a.com/f00000000290274/www.lsu.edu/eng/images/selfguidedtourmp3sandimages/tour-final-version-1.jpg"
        }
      }
    ]
  };

  //Toggle Popup
  const buildingPopup = (feature: GeoJSON.Feature, layer: L.Layer) => {
    layer.on('click', () => {
      const { name, description } = feature.properties as BuildingShape;
      const map = (layer as any)._map;
      const center = (layer as L.Polygon).getBounds().getCenter();
      L.popup({
        maxWidth: 2200,
        maxHeight: 4400,
      })
      .setLatLng(center)
      .setContent(`
        <div style="position: relative; width: 500px; height: 300px;">
          <h3>${name}</h3>
          <p>Drag your pin to where you are!</p>
          <img src="${description}" alt="${name}" style="width: 80%; height: 80%; object-fit: contain;"/>
          <div id="pin" style="
            position: absolute; 
            width: 12px; 
            height: 12px; 
            top: 80px; 
            left: 450px;
            background-color: red; 
            border-radius: 100%; 
            cursor: grab;
          " draggable="true">
          </div>
        </div>
      `)
      .openOn(map);

      //Draggable Pin
      const pin = document.getElementById("pin");
      pin?.addEventListener("dragstart", (e) => {
        e.dataTransfer?.setData("text/plain", "");
      });
      document.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      document.addEventListener("drop", (e) => {
        e.preventDefault();
        const rect = pin!.parentElement!.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
    
    pin!.style.left = `${offsetX - 10}px`;
    pin!.style.top = `${offsetY - 10}px`;

    const x = (offsetX / rect.width) * 100;
    const y = (offsetY / rect.height) * 100;

    setPin((prevPin) => [
      ...prevPin,
      { x, y, coords: [center.lat, center.lng] }
    ]);
  });
  });
  };

  return (
    <MapContainer center={position} zoom={15} scrollWheelZoom={true} className={style.map}>
      
      {/* Display Home Button */}
      <HomeButton center={position} zoom={15} />

      {/* Display Map */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Display Building */}
      <GeoJSON
        data={buildingBlueprint}
        onEachFeature={buildingPopup}
        style={() => ({
          color: "purple",
          weight: 1,
          fillOpacity: 0.4
        })}
      />
    </MapContainer>
  );
}