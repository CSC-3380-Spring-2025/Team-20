"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet/dist/images/marker-icon.png";

// Used to Customize Building Shape
interface BuildingShape {
  name: string;
  description: string;
}

var l = 'hello';

// Coordinates Start from the Top Left to the Right, then Right Down to Left
// Buildings On Campus

//this new sdfwefawf


const buildingBlueprint: GeoJSON.FeatureCollection<
  GeoJSON.Geometry,
  BuildingShape
> = {
  type: "FeatureCollection",
  features: [
{
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-91.180590, 30.414674],
        [-91.180564, 30.414139],
        [-91.179555, 30.414206],
        [-91.179624, 30.414689],
        [-91.180590, 30.414674],
    ],
  ],
  },
  properties: {
        name: "Middleton Library",
        description:
          "https://lib.lsu.edu/sites/default/files/2024-01/ccs_coffee_first_floor.jpg",
  },
},
{
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-91.179417, 30.413436],
        [-91.179410, 30.412894],
        [-91.179118, 30.412900],
        [-91.179111, 30.412997],
        [-91.178935, 30.412997],
        [-91.178915, 30.412909],
        [-91.178619, 30.412920],
        [-91.178622, 30.413043],
        [-91.178685, 30.413043],
        [-91.178695, 30.413347],
        [-91.178645, 30.413350],
        [-91.178635, 30.413468],
        [-91.178938, 30.413453],
        [-91.178931, 30.413353],
        [-91.179127, 30.413344],
        [-91.179137, 30.413453],
        [-91.179417, 30.413436]
      ]
      
    ],
  },
  properties: {
        name: "Coates Hall",
        description:
          "https://www.hollyandsmith.com/wp-content/uploads/portfolio/LSU%20Coates%20Hall%20Interior%20Renovation_x_Floorplan%20-%20LSU%20Coates%20Hall-scaled.jpg",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-91.180341, 30.408311],
            [-91.180253, 30.408287],
            [-91.180248, 30.408301],
            [-91.180193, 30.408285],
            [-91.180175, 30.408336],
            [-91.180045, 30.408301],
            [-91.180064, 30.408251],
            [-91.179974, 30.408226],
            [-91.179963, 30.408253],
            [-91.179928, 30.408244],
            [-91.179876, 30.408386],
            [-91.179075, 30.408171],
            [-91.179118, 30.408053],
            [-91.179068, 30.408039],
            [-91.179094, 30.407964],
            [-91.179109, 30.407968],
            [-91.179223, 30.407655],
            [-91.179197, 30.407647],
            [-91.179269, 30.407453],
            [-91.179301, 30.40746],
            [-91.179309, 30.407433],
            [-91.179281, 30.407424],
            [-91.17935, 30.407231],
            [-91.179378, 30.40724],
            [-91.179388, 30.407212],
            [-91.17936, 30.407203],
            [-91.179429, 30.407012],
            [-91.179672, 30.407078],
            [-91.179655, 30.407131],
            [-91.179683, 30.407138],
            [-91.179688, 30.407124],
            [-91.180057, 30.407223],
            [-91.180052, 30.40724],
            [-91.180084, 30.407249],
            [-91.180106, 30.407191],
            [-91.180347, 30.407258],
            [-91.180341, 30.407275],
            [-91.180406, 30.407292],
            [-91.180416, 30.407262],
            [-91.180455, 30.407272],
            [-91.180465, 30.407244],
            [-91.180658, 30.407298],
            [-91.180649, 30.407322],
            [-91.180667, 30.407327],
            [-91.180636, 30.40741],
            [-91.180666, 30.407418],
            [-91.180607, 30.407576],
            [-91.180671, 30.407595],
            [-91.180577, 30.407849],
            [-91.180516, 30.407832],
            [-91.180341, 30.408311],
          ],
        ],
      },
      properties: {
        name: "Patrick F. Taylor Hall",
        description:
          "https://marvel-b1-cdn.bc0a.com/f00000000290274/www.lsu.edu/eng/images/selfguidedtourmp3sandimages/tour-final-version-1.jpg",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-91.17806, 30.41298], 
            [-91.17670, 30.41307], 
            [-91.17669, 30.41293],
            [-91.17655, 30.41293],
            [-91.17664, 30.41236],
            [-91.17652, 30.41237],
            [-91.17665, 30.41229],
            [-91.17685, 30.41227],
            [-91.17684, 30.41222],
            [-91.17738, 30.41221],
            [-91.17739, 30.41225],
            [-91.17760, 30.41225],
            [-91.17761, 30.41250],
            [-91.17757, 30.41250],
            [-91.17798, 30.41256], 
            [-91.17806, 30.41298],
          ],
        ],
      },
      properties: {
        name: "Student Union",
        description: "https://marvel-b1-cdn.bc0a.com/f00000000290274/www.lsu.edu/auxiliary-services/images/student-union-image2.jpeg",
          
      },
    },

      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-91.169989, 30.410885],
              [-91.169956, 30.410664],
              [-91.169560, 30.410766],
              [-91.169524, 30.410677],
              [-91.169686, 30.410637],
              [-91.169626, 30.410462],
              [-91.169703, 30.410427],
              [-91.169593, 30.410119],
              [-91.169541, 30.410132],
              [-91.169468, 30.409963],
              [-91.169273, 30.410014],
              [-91.169243, 30.409979],
              [-91.169085, 30.410021],
              [-91.169111, 30.410087],
              [-91.169033, 30.410103],
              [-91.169022, 30.410074],
              [-91.168430, 30.410244],
              [-91.168655, 30.410905],
              [-91.168809, 30.410873],
              [-91.168830, 30.410912],
              [-91.168915, 30.410883],
              [-91.168944, 30.410982],
              [-91.168422, 30.411232],
              [-91.168434, 30.411305],
              [-91.168288, 30.411348],
              [-91.168381, 30.411632],
              [-91.169087, 30.411435],
              [-91.169005, 30.411158],
              [-91.169989, 30.410885]
            ],
          ],
        },
        properties: {
          name: "UREC",
          description:"https://marvel-b1-cdn.bc0a.com/f00000000290274/www.lsu.edu/urec/images/urec-facility-space/urec-facility-front.jpg",
            
        },
      },

      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-91.185195, 30.412167],
              [-91.184866, 30.411399],
              [-91.184737, 30.411176],
              [-91.184601, 30.411020],
              [-91.184395, 30.410825],
              [-91.184253, 30.410892],
              [-91.184065, 30.410792],
              [-91.183775, 30.410792],
              [-91.183510, 30.410836],
              [-91.183200, 30.410920],
              [-91.182935, 30.411037],
              [-91.182722, 30.410964],
              [-91.182599, 30.411120],
              [-91.182470, 30.411399],
              [-91.182431, 30.411783],
              [-91.183019, 30.412997],
              [-91.183245, 30.412836],
              [-91.183329, 30.412919],
              [-91.183497, 30.412991],
              [-91.183678, 30.413064],
              [-91.183930, 30.413081],
              [-91.184175, 30.413042],
              [-91.184472, 30.412925],
              [-91.184653, 30.412797],
              [-91.184776, 30.412674],
              [-91.184892, 30.412418],
              [-91.184898, 30.412228],
              [-91.185195, 30.412167]
          ],
        ],
        },
      
        
        properties: {
          name: "Death Valley",
          description:"https://lsusports.net/imgproxy/AQV6twkKk7AYiwivgxZGQDoj45NPiM7odXkBU_mfIJM/fit/3840/2160/ce/0/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2xzdXNwb3J0cy1jb20vMjAyMS8xMS9iNjU3OGQ3MC1nb3ByMjgwMTIuanBn.png",
            
            
        },




    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            
            [-91.185043, 30.415089],
            [-91.185016, 30.414833],
            [-91.184947, 30.414828],
            [-91.185053, 30.414755],
            [-91.184915, 30.414599],
            [-91.185011, 30.414530],
            [-91.185106, 30.414407],
            [-91.185122, 30.414297],
            [-91.185128, 30.414155],
            [-91.185074, 30.414054],
            [-91.185011, 30.413953],
            [-91.184851, 30.413834],
            [-91.184697, 30.413779],
            [-91.184533, 30.413775],
            [-91.184352, 30.413797],
            [-91.184155, 30.413843],
            [-91.184060, 30.413898],
            [-91.183959, 30.413990],
            [-91.183900, 30.414068],
            [-91.183858, 30.414224],
            [-91.183874, 30.414375],
            [-91.183975, 30.414558],
            [-91.184166, 30.414677],
            [-91.184379, 30.414732],
            [-91.184426, 30.414727],
            [-91.184426, 30.414842],
            [-91.184294, 30.414851],
            [-91.184283, 30.414906],
            [-91.184155, 30.414920],
            [-91.184198, 30.415176],
            [-91.185043, 30.415089]
          ],
        ],
      },
      properties: {
        name: "PMAC",
        description: "https://marvel-b1-cdn.bc0a.com/f00000000290274/www.lsu.edu/auxiliary-services/images/student-union-image2.jpeg",
          
      },
    },
  ],
};

// Toggle Popup & Pin, Save, Reset, & Share Buttons Styling/Position
const buildingPopup = (feature: GeoJSON.Feature, layer: L.Layer) => {
  layer.on("click", () => {
    const { name, description } = feature.properties as BuildingShape;
    const map = (layer as any)._map;
    const center = (layer as L.Polygon).getBounds().getCenter();
    L.popup({
      maxWidth: 200,
      maxHeight: 400,
    })
      .setLatLng(center)
      .setContent(`
        <div style="position: relative; width: 1000px; height: 300px; justify-content: center;">
          <h3>${name}</h3>
          <img src="${description}" alt="${name}" style="width: 50%; height: 80%; object-fit: contain;"/>

          <div style="margin-top: 20px;">
            <button id="saveButton" 
              style="padding: 10px 20px; 
              background-color: green; 
              color: white; 
              border: none; 
              border-radius: 5px; 
              cursor: pointer;">
              Save
            </button>

            <button id="resetButton" 
              style="padding: 10px 20px; 
              background-color: red; 
              color: white; 
              border: none; 
              border-radius: 5px; 
              cursor: pointer;">
              Reset
            </button>
          
            <button id="Share" 
              style="padding: 10px 20px; 
              background-color: blue; 
              color: white; 
              border: none; 
              border-radius: 5px; 
              cursor: pointer;">
              Share
            </button>
          </div>
        </div>
      `)
      .openOn(map);
  });
};

export { buildingBlueprint, buildingPopup };