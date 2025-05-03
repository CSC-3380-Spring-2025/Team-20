"use client";

import "leaflet/dist/leaflet.css";

export interface LocationFeatureCollection {
    type: "FeatureCollection";
    features: Array<{
      type: "Feature";
      geometry: {
        type: "Point";
        coordinates: [number, number]; //[longitude, latitude]
      };
      properties: {
        name: string;
        description: string;
        category: string;       
        subcategory?: string;   
        subsubcategory?: string; 
      };
    }>;
}
  
export const LocationContent: LocationFeatureCollection = {
    type: "FeatureCollection",
    features: [
      //Points of Interest
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.11388, 30.41276]
        },
        properties: {
          name: "Burden Museum & Gardens",
          description: "...",
          category: "burdenmuseum",
          subcategory: "pointsofinterest",
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17833, 30.40966]
        },
        properties: {
          name: "Dairy Store",
          description: "...",
          category: "dairy",               
          subcategory: "pointsofinterest",                
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18037, 30.41609]
        },
        properties: {
          name: "Greek Theatre",
          description: "...",
          category: "greektheatre",               
          subcategory: "pointsofinterest",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.09490, 30.35729]
        },
        properties: {
          name: "Hilltop Arboretum",
          description: "...",
          category: "hilltop",               
          subcategory: "pointsofinterest",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18191, 30.41575]
        },
        properties: {
          name: "Indian Mounds (LSU Campus Mounds)",
          description: "...",
          category: "indian",               
          subcategory: "pointsofinterest",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18539, 30.41322]
        },
        properties: {
          name: "LSU Sport Shop",
          description: "...",
          category: "sportshop",               
          subcategory: "pointsofinterest",               
        }
      },
      //Proceed To Add More Locations...
    ]
};