"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Header from "../components/header";
import HomeButton from "../map/components/homebutton";
import SearchBar from "../map/components/searchbar";
import { LocationContent } from "../map/components/popups";
import styles from "../map/styles/map.module.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const GeoJSON = dynamic(
  () => import("react-leaflet").then((mod) => mod.GeoJSON),
  { ssr: false }
);

const LayerGroup = dynamic(
  () => import("react-leaflet").then((mod) => mod.LayerGroup),
  { ssr: false }
);

const ZoomControl = dynamic(
    () => import("react-leaflet").then((mod) => mod.ZoomControl),
    { ssr: false }
  );  

const CustomGeoJSON = ({ data, visible, onEachFeature }: { 
    data: any, 
    visible: boolean, 
    onEachFeature: (feature: any, layer: any) => void 
  }) => {
    if (!visible) return null;
    
    return (
      <GeoJSON
        data={data}
        pointToLayer={(feature, latlng) => {
          const L = require("leaflet");
          return L.marker(latlng, {
            icon: L.icon({
              iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
              shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41],
            }),
          });
        }}
        onEachFeature={onEachFeature}
      />
    );
  };

interface Category {
  id: string;
  name: string;
  subcategories?: Category[];
}

export default function Map() {
  const position: [number, number] = [30.40797, -91.18549]; //Center of Map
  const [visibleCategories, setVisibleCategories] = useState<Record<string, boolean>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const categories: Category[] = [
    {
      id: "buildings",
      name: "Buildings",
      subcategories: [
        {
          id: "academic&research",
          name: "Academic & Research",
          subcategories: [
            { id: "agriculturalchemistry", name: "Agricultural Chemistry Building" },
            { id: "agriculturemetal", name: "Agriculture Metal Building" },
            { id: "allen", name: "Allen Hall" },
            { id: "animal&foodscience", name: "Animal and Food Science Laboratory" },
            { id: "art", name: "Art Building" },
            { id: "atkinson", name: "Atkinson Hall" },
            { id: "audubon", name: "Audubon Hall" },
            { id: "audubonsugar", name: "Audubon Sugar Factory" },
            { id: "barnesogden", name: "Barnes Ogden Art & Design Complex" },
            { id: "businessedu", name: "Business Education Complex" },
            { id: "CAMD", name: "CAMD" },
            { id: "wetlandres", name: "Center for Wetland Resources" },
            { id: "coates", name: "Charles E. Coates Hall" },
            { id: "chemistry&materials", name: "Chemistry & Materials Building" },
          ],
        },
        { id: "greek", name: "Greek Houses" },
        { id: "libraries", 
          name: "Libraries",
          subcategories: [
            { id: "hillmemorial", name: "Hill Memorial Library" },
            { id: "middleton", name: "LSU Library" },
            { id: "virginiarice", name: "Virginia Rice Williams Hall" },
          ]
        },
        { id: "operational", name: "Operational Offices" },
        { id: "worship", name: "Places of Worship" }
      ],
    },
    {
      id: "event&performance",
      name: "Event & Performance Venues",
      subcategories: [
        { id: "imobrown", name: "Imo Brown Complex" },
        { id: "livestockexhibit", name: "Livestock Exhibit Building" },
        { id: "cookconference", name: "Lod and Carole Cook Conference Center" },
        { id: "cookalumni", name: "Lod Cook Alumni Center" },
        { id: "union", name: "LSU Student Union" },
        { id: "minifarm", name: "Mini Farm" },
        { id: "music&dramaticarts", name: "Music & Dramatic Arts Building" },
        { id: "music", name: "Music Building" },
        { id: "nelsonmem", name: "Nelson Memorial" },
        { id: "parkercol", name: "Parker Coliseum" },
        { id: "reillytheatre", name: "Reilly Theatre" },
        { id: "shawcenter", name: "Shaw Center for the Arts" },
        { id: "uniontheatre", name: "Union Theater" },
      ],
    },
    {
      id: "athletics",
      name: "LSU Athletics",
      subcategories: [
        { id: "baseball", 
          name: "Baseball",
          subcategories: [
            { id: "alexbox", name: "Alex Box Stadium" }
          ] 
        },
        { id: "football", 
          name: "Football",
          subcategories: [
            { id: "tigerstadium", name: "Tiger Stadium" }
          ] 
         },
        { id: "golf", 
          name: "Golf",
          subcategories: [
            { id: "golfclubhouse", name: "Golf Team Clubhouse" },
            { id: "univeristyclub", name: "University Club" }
          ]
        },
        { id: "gymnastics",
          name: "Gymnastics",
          subcategories: [
            { id: "gymnasticscenter", name: "Gymnastics Training Center" },
            { id: "petemaravich", name: "Pete Maravich Assembly Center" }
          ]
        },
        { id: "mensbasketball", 
          name: "Men's Basketball",
          subcategories: [
            { id: "petemaravich", name: "Pete Maravich Assembly Center" }
          ]
        },
        { id: "soccer",
          name: "Soccer",
          subcategories: [
            { id: "soccerstadium", name: "LSU Soccer Stadium" }
          ]
        },
        { id: "softball",
          name: "Softball",
          subcategories: [
            { id: "tigerpark", name: "Tiger Park" }
          ]
        },
        { id: "swimming",
          name: "Swimming & Diving",
          subcategories: [
            { id: "natatorium", name: "Natatorium" }
          ]
        },
        { id: "tennis", 
          name: "Tennis",
          subcategories: [
            { id: "tenniscomplex", name: "LSU Tennis Complex" }
          ]
        },
        { id: "track&field", 
          name: "Track & Field",
          subcategories: [
            { id: "trackstadium", name: "Bernie Moore Track & Field Stadium" },
            { id: "carlmaddox", name: "Carl Maddox Field House" }
          ]
        },
        { id: "volleyball", 
          name: "Volleyball",
          subcategories: [
            { id: "petemaravich", name: "Pete Maravich Assembly Center" }
          ]
        },
        { id: "womensbasketball", 
          name: "Women's Basketball",
          subcategories: [
            { id: "petemaravich", name: "Pete Maravich Assembly Center" }
          ]
        },
      ],
    },
    { id: "museums&art", 
      name: "Museums & Art Galleries" },
    {
      id: "eating",
      name: "Places to Eat",
      subcategories: [
        { id: "dining", 
          name: "Dining Halls",
          subcategories: [
            { id: "459", name: "459 Commons" },
            { id: "five", name: "The Five" },
          ] 
        },
        { id: "fastcasual", 
          name: "Fast Casual",
          subcategories: [
            { id: "459", name: "459 Commons" },
            { id: "businessed", name: "Business Education Complex" },
            { id: "dairy", name: "Dairy Store" },
            { id: "foster", name: "Foster Hall" },
            { id: "law", name: "Law Center" },
            { id: "bookstore", name: "LSU Bookstore" },
            { id: "library", name: "LSU Library" },
            { id: "union", name: "LSU Student Union" },
            { id: "panera", name: "Panera Bread" },
            { id: "five", name: "The Five" },
            { id: "veterinarymedicine", name: "Veterinary Medicine" },
            { id: "retail", name: "Retail Center at Nicholson Gatway"},
          ]
        },
        { id: "fine", 
          name: "Fine Dining",
          subcategories: [
            { id: "union", name: "LSU Student Union" },
            { id: "club", name: "The Club at Union Square" },
          ] 
        },
      ],
    },
    {
      id: "pointsofinterest",
      name: "Points of Interest",
      subcategories: [
        { id: "burdenmuseum", name: "Burden Museum & Gardens" },
        { id: "dairy", name: "Dairy Store" },
        { id: "greektheatre", name: "Greek Theatre" },
        { id: "hilltop", name: "Hilltop Arboretum" },
        { id: "indian", name: "Indian Mounds (LSU Campus Mounds)" },
        { id: "sportshop", name: "LSU Sport Shop"},
        { id: "union", name: "LSU Student Union"},
        { id: "warmemorial", name: "LSU War Memorial"},
        { id: "oakgrove", name: "Memorial Oak Grove"},
        { id: "memorialtower", name: "Memorial Tower"},
        { id: "mikethetiger", name: "Mike the Tiger's Habitat"},
        { id: "mississippiriver", name: "Mississippi River Levee Bike Path and Overlook"},
        { id: "paradeground", name: "Parade Ground"},
        { id: "t-33", name: "T-33 Aircraft"},
        { id: "quad", name: "The Quad"},
        { id: "lakes", name: "University Lakes"},
        { id: "visitorreg", name: "Visitor Registration & Information Center"},
        { id: "dodsonauditorium", name: "William R. Dodson Auditorium"},
        { id: "retail", name: "Retail Center at Nicholson Gatway"}
      ],
    },
  ];

  //Toggle Category Visibility & Children
  const toggleCategory = (categoryId: string, checked?: boolean) => {
    const newChecked = checked !== undefined ? checked : !visibleCategories[categoryId];
    
    setVisibleCategories(prev => ({
      ...prev,
      [categoryId]: newChecked
    }));
    
    //Find Category in Tree
    const findAndUpdateChildren = (categories: Category[]): boolean => {
      for (const category of categories) {
        if (category.id === categoryId) {
          updateAllChildren(category, newChecked);
          return true;
        }
        if (category.subcategories) {
          const found = findAndUpdateChildren(category.subcategories);
          if (found) return true;
        }
      }
      return false;
    };
    
    findAndUpdateChildren(categories);
  };

  //Update All Children in Category
  const updateAllChildren = (category: Category, checked: boolean) => {
    if (category.subcategories) {
      category.subcategories.forEach(subcategory => {
        setVisibleCategories(prev => ({
          ...prev,
          [subcategory.id]: checked
        }));
        updateAllChildren(subcategory, checked);
      });
    }
  };

  //Toggle Category Expansion
  const toggleExpand = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  //Recursive Rendering 
  const CategoryItem = ({ category, level = 0 }: { category: Category, level?: number }) => {
    const hasChildren = !!category.subcategories;
    const isExpanded = expandedCategories[category.id];
    const isChecked = visibleCategories[category.id] || false;
    
    return (
      <div className={`${styles.categoryItem} ${level > 0 ? styles.nested : ''}`} style={{ marginLeft: `${level * 15}px` }}>
        <div className={styles.categoryHeader}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => toggleCategory(category.id)}
              className={styles.checkboxInput}
            />
            <span className={styles.checkboxCustom}></span>
            {category.name}
          </label>
          {hasChildren && (
            <button
              className={`${styles.expandButton} ${isExpanded ? styles.expanded : ''}`}
              onClick={() => toggleExpand(category.id)}
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? "▼" : "▶"}
            </button>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className={styles.subcategories}>
            {(category.subcategories ?? []).map(subcategory => (
              <CategoryItem key={subcategory.id} category={subcategory} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const onEachFeature = (feature: any, layer: any) => {
    layer.bindPopup(`
      <h3>${feature.properties.name}</h3>
      <p>${feature.properties.description}</p>
      <small>Category: ${feature.properties.category}</small>
    `);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mapWrapper}>
        {typeof window !== 'undefined' && (
          <MapContainer 
            center={position} 
            zoom={15} 
            scrollWheelZoom={true} 
            className={styles.map}
            zoomControl={false}
          >
            <HomeButton center={position} zoom={15} />
            <SearchBar />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <ZoomControl position="bottomright" />
            <LayerGroup>
              {LocationContent.features.map((building, index) => {
                const isVisible = building.properties?.category 
                  ? visibleCategories[building.properties.category] 
                  : false;
                
                return (
                  <CustomGeoJSON
                    key={index}
                    data={building}
                    visible={isVisible}
                    onEachFeature={onEachFeature}
                  />
                );
              })}
            </LayerGroup>
          </MapContainer>
        )}
        
        {/* Sidebar Styling */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarContent}>
              <h3 className={styles.categoriesTitle}>Locations</h3>
              <div className={styles.categoriesList}>
                {categories.map(category => (
                  <CategoryItem key={category.id} category={category} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    }