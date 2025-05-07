
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
          coordinates: [-91.11398, 30.41315]
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
          coordinates: [-91.17832, 30.40974]
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
          coordinates: [-91.18037, 30.41620]
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
          coordinates: [-91.09515, 30.35694]
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
          coordinates: [-91.18208, 30.41533]
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
          coordinates: [-91.18539, 30.41327]
        },
        properties: {
          name: "LSU Sport Shop",
          description: "...",
          category: "sportshop",               
          subcategory: "pointsofinterest",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17708, 30.41287]
        },
        properties: {
          name: "LSU Student Union",
          description: "...",
          category: "union",               
          subcategory: "pointsofinterest",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17781, 30.41451]
        },
        properties: {
          name: "LSU War Memorial",
          description: "...",
          category: "warmemorial",               
          subcategory: "pointsofinterest",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17692, 30.41193]
        },
        properties: {
          name: "Memorial Oak Grove",
          description: "...",
          category: "oakgrove",               
          subcategory: "pointsofinterest",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17891, 30.41453]
        },
        properties: {
          name: "Memorial Tower",
          description: "...",
          category: "memorialtower",               
          subcategory: "pointsofinterest",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18506, 30.41348]
        },
        properties: {
          name: "Mike the Tiger's Habitat",
          description: "...",
          category: "mikethetiger",               
          subcategory: "pointsofinterest",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.19591, 30.41285]
        },
        properties: {
          name: "Mississippi River Levee Bike Path and Overlook",
          description: "...",
          category: "mississippiriver",               
          subcategory: "pointsofinterest",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17729, 30.41465]
        },
        properties: {
          name: "Parade Ground",
          description: "...",
          category: "paradeground",               
          subcategory: "pointsofinterest",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18199, 30.40991]
        },
        properties: {
          name: "T-33 Aircraft",
          description: "...",
          category: "t-33",               
          subcategory: "pointsofinterest",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18005, 30.41322]
        },
        properties: {
          name: "The Quad",
          description: "...",
          category: "quad",               
          subcategory: "pointsofinterest",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18052, 30.41301]
        },
        properties: {
          name: "William R. Dodson Auditorium",
          description: "...",
          category: "dodsonauditorium",               
          subcategory: "pointsofinterest",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18751, 30.41350]
        },
        properties: {
          name: "Retail Center at Nicholson Gatway",
          description: "...",
          category: "retail",               
          subcategory: "pointsofinterest",               
        }
      },
      //Places to Eat
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17428, 30.41064]
        },
        properties: {
          name: "459 Commons",
          description: "...",
          category: "459",               
          subcategory: "dining", 
          subsubcategory: "eating",              
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18186, 30.41742]
        },
        properties: {
          name: "The Five",
          description: "...",
          category: "five",               
          subcategory: "dining",  
          subsubcategory: "eating",             
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17860, 30.40738]
        },
        properties: {
          name: "Business Education Complex",
          description: "...",
          category: "businessed",               
          subcategory: "fastcasual",
          subsubcategory: "eating",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17832, 30.40974]
        },
        properties: {
          name: "Dairy Store",
          description: "...",
          category: "dairy",               
          subcategory: "fastcasual",
          subsubcategory: "eating",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18015, 30.41546]
        },
        properties: {
          name: "Foster Hall",
          description: "...",
          category: "foster",               
          subcategory: "fastcasual",
          subsubcategory: "eating",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17498, 30.41471]
        },
        properties: {
          name: "Law Center",
          description: "...",
          category: "law",               
          subcategory: "fastcasual",
          subsubcategory: "eating",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17547, 30.41286]
        },
        properties: {
          name: "LSU Bookstore",
          description: "...",
          category: "bookstore",               
          subcategory: "fastcasual",
          subsubcategory: "eating",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18001, 30.41464]
        },
        properties: {
          name: "LSU Library",
          description: "...",
          category: "middleton",               
          subcategory: "fastcasual",
          subsubcategory: "eating",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17708, 30.41286]
        },
        properties: {
          name: "LSU Student Union",
          description: "...",
          category: "union",               
          subcategory: "fastcasual",
          subsubcategory: "eating",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17945, 30.40799]
        },
        properties: {
          name: "Panera Bread",
          description: "...",
          category: "panera",               
          subcategory: "fastcasual",
          subsubcategory: "eating",               
        }
      },

      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18186, 30.41742]
        },
        properties: {
          name: "The Five",
          description: "...",
          category: "five",               
          subcategory: "fastcasual",
          subsubcategory: "eating",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.19353, 30.41374]
        },
        properties: {
          name: "Veterinary Medicine",
          description: "...",
          category: "veterinarymedicine",               
          subcategory: "fastcasual",
          subsubcategory: "eating",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18751, 30.41350]
        },
        properties: {
          name: "Retail Center at Nicholson Gatway",
          description: "...",
          category: "retail",               
          subcategory: "fastcasual",
          subsubcategory: "eating",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17708, 30.41286]
        },
        properties: {
          name: "LSU Student Union",
          description: "...",
          category: "union",               
          subcategory: "fine",
          subsubcategory: "eating",               
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17586, 30.41365]
        },
        properties: {
          name: "The Club at Union Square",
          description: "...",
          category: "club",               
          subcategory: "fine",
          subsubcategory: "eating",               
        }
      },
      //LSU Athletics
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18755, 30.40678]
        },
        properties: {
          name: "Alex Box Stadium",
          description: "...",
          category: "alexbox",               
          subcategory: "baseball",
          subsubcategory: "athletics",            
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18383, 30.41206]
        },
        properties: {
          name: "Tiger Stadium",
          description: "...",
          category: "tigerstadium",               
          subcategory: "football",
          subsubcategory: "athletics",            
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.11907, 30.31456]
        },
        properties: {
          name: "Golf Team Clubhouse",
          description: "...",
          category: "golfclubhouse",               
          subcategory: "golf",
          subsubcategory: "athletics",            
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.11916, 30.31898]
        },
        properties: {
          name: "University Club",
          description: "...",
          category: "univeristyclub",               
          subcategory: "golf",
          subsubcategory: "athletics",            
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18433, 30.41577]
        },
        properties: {
          name: "Gymnastics Training Center",
          description: "...",
          category: "gymnasticscenter",               
          subcategory: "gymnastics",
          subsubcategory: "athletics",            
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18450, 30.41460]
        },
        properties: {
          name: "Pete Maravich Assembly Center",
          description: "...",
          category: "petemaravich",               
          subcategory: "gymnastics",
          subsubcategory: "athletics",            
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18450, 30.41460]
        },
        properties: {
          name: "Pete Maravich Assembly Center",
          description: "...",
          category: "petemaravich",               
          subcategory: "mensbasketball",
          subsubcategory: "athletics",            
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.19149, 30.40926]
        },
        properties: {
          name: "LSU Soccer Stadium",
          description: "...",
          category: "soccerstadium",               
          subcategory: "soccer",
          subsubcategory: "athletics",            
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.19267, 30.41051]
        },
        properties: {
          name: "Tiger Park",
          description: "...",
          category: "tigerpark",               
          subcategory: "softball",
          subsubcategory: "athletics",            
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18565, 30.41727]
        },
        properties: {
          name: "Natatorium",
          description: "...",
          category: "natatorium",               
          subcategory: "swimming",
          subsubcategory: "athletics",            
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.19041, 30.40466]
        },
        properties: {
          name: "LSU Tennis Complex",
          description: "...",
          category: "tenniscomplex",               
          subcategory: "tennis",
          subsubcategory: "athletics",            
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18594, 30.41453]
        },
        properties: {
          name: "Bernie Moore Track & Field Stadium",
          description: "...",
          category: "trackstadium",               
          subcategory: "track&field",
          subsubcategory: "athletics",            
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18572, 30.41610]
        },
        properties: {
          name: "Carl Maddox Field House",
          description: "...",
          category: "carlmaddox",               
          subcategory: "track&field",
          subsubcategory: "athletics",            
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18450, 30.41460]
        },
        properties: {
          name: "Pete Maravich Assembly Center",
          description: "...",
          category: "petemaravich",               
          subcategory: "volleyball",
          subsubcategory: "athletics",            
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18450, 30.41460]
        },
        properties: {
          name: "Pete Maravich Assembly Center",
          description: "...",
          category: "petemaravich",               
          subcategory: "womensbasketball",
          subsubcategory: "athletics",            
        }
      },
      //Event & Performance Venues
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.09492, 30.35629]
        },
        properties: {
          name: "Imo Brown Complex",
          description: "...",
          category: "imobrown",               
          subcategory: "event&performance",        
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17326, 30.40772]
        },
        properties: {
          name: "Livestock Exhibit Building",
          description: "...",
          category: "livestockexhibit",               
          subcategory: "event&performance",        
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.16993, 30.41357]
        },
        properties: {
          name: "Lod and Carole Cook Conference Center",
          description: "...",
          category: "cookconference",               
          subcategory: "event&performance",        
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.16912, 30.41386]
        },
        properties: {
          name: "Lod Cook Alumni Center",
          description: "...",
          category: "cookalumni",               
          subcategory: "event&performance",        
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17708, 30.41286]
        },
        properties: {
          name: "LSU Student Union",
          description: "...",
          category: "union",               
          subcategory: "event&performance",        
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17415, 30.40683]
        },
        properties: {
          name: "Mini Farm",
          description: "...",
          category: "minifarm",               
          subcategory: "event&performance",        
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17956, 30.41653]
        },
        properties: {
          name: "Music & Dramatic Arts Building",
          description: "...",
          category: "music&dramaticarts",               
          subcategory: "event&performance",        
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17839, 30.41686]
        },
        properties: {
          name: "Music Building",
          description: "...",
          category: "music",               
          subcategory: "event&performance",        
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17367, 30.40532]
        },
        properties: {
          name: "Nelson Memorial",
          description: "...",
          category: "nelsonmem",               
          subcategory: "event&performance",        
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17446, 30.40751]
        },
        properties: {
          name: "Parker Coliseum",
          description: "...",
          category: "parkercol",               
          subcategory: "event&performance",        
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17738, 30.40806]
        },
        properties: {
          name: "Reilly Theatre",
          description: "...",
          category: "reillytheatre",               
          subcategory: "event&performance",        
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18900, 30.44745]
        },
        properties: {
          name: "Shaw Center for the Arts",
          description: "...",
          category: "shawcenter",               
          subcategory: "event&performance",        
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17784, 30.41294]
        },
        properties: {
          name: "Union Theater",
          description: "...",
          category: "uniontheatre",               
          subcategory: "event&performance",        
        }
      },
      //Buildings
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17489, 30.40662]
        },
        properties: {
          name: "Agricultural Chemistry Building",
          description: "...",
          category: "agriculturalchemistry",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17862, 30.40876]
        },
        properties: {
          name: "Agriculture Metal Building",
          description: "...",
          category: "agriculturemetal",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18085, 30.41390]
        },
        properties: {
          name: "Allen Hall",
          description: "...",
          category: "allen",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17900, 30.41046]
        },
        properties: {
          name: "Animal and Food Science Laboratory",
          description: "...",
          category: "animal&foodscience",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18084, 30.41137]
        },
        properties: {
          name: "Art Building",
          description: "...",
          category: "art",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17999, 30.41216]
        },
        properties: {
          name: "Atkinson Hall",
          description: "...",
          category: "atkinson",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18075, 30.41275]
        },
        properties: {
          name: "Audubon Hall",
          description: "...",
          category: "audubon",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18208, 30.41057]
        },
        properties: {
          name: "Audubon Sugar Factory",
          description: "...",
          category: "audubonsugar",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17995, 30.41143]
        },
        properties: {
          name: "Barnes Ogden Art & Design Complex",
          description: "...",
          category: "barnesogden",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17859, 30.40738]
        },
        properties: {
          name: "Business Education Complex",
          description: "...",
          category: "businessedu",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.11778, 30.43201]
        },
        properties: {
          name: "CAMD",
          description: "...",
          category: "CAMD",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18244, 30.40901]
        },
        properties: {
          name: "Center for Wetland Resources",
          description: "...",
          category: "wetlandres",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17906, 30.41327]
        },
        properties: {
          name: "Charles E. Coates Hall",
          description: "...",
          category: "coates",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17662, 30.41057]
        },
        properties: {
          name: "Chemistry & Materials Building",
          description: "...",
          category: "chemistry&materials",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17724, 30.41053]
        },
        properties: {
          name: "Choppin Hall",
          description: "...",
          category: "choppin",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17775, 30.40839]
        },
        properties: {
          name: "Clyde Ingram Hall",
          description: "...",
          category: "clyde",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17666, 30.40385]
        },
        properties: {
          name: "Cotton Fiber Lab",
          description: "...",
          category: "cottonfiber",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17961, 30.41065]
        },
        properties: {
          name: "Dalrymple Memorial Building",
          description: "...",
          category: "dalrymplememorial",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17818, 30.40906]
        },
        properties: {
          name: "E.B. Doran Hall",
          description: "...",
          category: "ebdoran",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18041, 30.41066]
        },
        properties: {
          name: "Electrical Engineering Building",
          description: "...",
          category: "eleceng",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18352, 30.40888]
        },
        properties: {
          name: "Energy, Coast & Environment Building",
          description: "...",
          category: "enecoast",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18161, 30.40789]
        },
        properties: {
          name: "Engineering Laboratory Annex Building",
          description: "...",
          category: "englab",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18090, 30.40957]
        },
        properties: {
          name: "Engineering Research & Development Building",
          description: "...",
          category: "engres",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17880, 30.41064]
        },
        properties: {
          name: "Food Science Building",
          description: "...",
          category: "foodscience",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17924, 30.41077]
        },
        properties: {
          name: "Francioni Hall",
          description: "...",
          category: "francioni",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17559, 30.41108]
        },
        properties: {
          name: "French House",
          description: "...",
          category: "french",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17691, 30.40896]
        },
        properties: {
          name: "Harry D. Wilson Laboratories",
          description: "...",
          category: "harryd",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18214, 30.41233]
        },
        properties: {
          name: "Hatcher Hall",
          description: "...",
          category: "hatcher",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18145, 30.41442]
        },
        properties: {
          name: "Hill Memorial Library",
          description: "...",
          category: "hillmemorial",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.09515, 30.35694]
        },
        properties: {
          name: "Hilltop Arboretum",
          description: "...",
          category: "hilltop",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18245, 30.41297]
        },
        properties: {
          name: "Hodges Hall",
          description: "...",
          category: "hodges",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17118, 30.41354]
        },
        properties: {
          name: "Horticulture Teaching Facility",
          description: "...",
          category: "horticulture",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17860, 30.41192]
        },
        properties: {
          name: "Howe-Russell Kniffen Geosciences Building",
          description: "...",
          category: "howe-russell",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18297, 30.41500]
        },
        properties: {
          name: "Huey P. Long Field House",
          description: "...",
          category: "hueyp",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17826, 30.41071]
        },
        properties: {
          name: "Human Ecology Building",
          description: "...",
          category: "humaneco",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17640, 30.40835]
        },
        properties: {
          name: "J.C. Miller",
          description: "...",
          category: "jc",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18210, 30.41062]
        },
        properties: {
          name: "Jesse Coates Hall",
          description: "...",
          category: "jesscoates",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18187, 30.41176]
        },
        properties: {
          name: "Johnston Hall",
          description: "...",
          category: "johnston",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18277, 30.41361]
        },
        properties: {
          name: "Journalism Building",
          description: "...",
          category: "journalism",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18093, 30.41189]
        },
        properties: {
          name: "Julian T. White Hall",
          description: "...",
          category: "juliant",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17667, 30.40982]
        },
        properties: {
          name: "Knapp Hall",
          description: "...",
          category: "knapp",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17842, 30.40429]
        },
        properties: {
          name: "La. Transportation Research Center",
          description: "...",
          category: "latransport",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18787, 30.40482]
        },
        properties: {
          name: "LaHouse",
          description: "...",
          category: "lahouse",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17498, 30.41472]
        },
        properties: {
          name: "Law Center",
          description: "...",
          category: "law",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.13977, 30.36035]
        },
        properties: {
          name: "LBTC Building 3000",
          description: "...",
          category: "lbtc",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17719, 30.41109]
        },
        properties: {
          name: "Life Sciences",
          description: "...",
          category: "lifesci",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17667, 30.41103]
        },
        properties: {
          name: "Life Sciences Annex",
          description: "...",
          category: "lifesciann",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18175, 30.41339]
        },
        properties: {
          name: "Lockett Hall",
          description: "...",
          category: "lockett",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.19252, 30.41486]
        },
        properties: {
          name: "Louisiana Animal Disease Diagnostic Laboratory",
          description: "...",
          category: "laanimal",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17240, 30.40756]
        },
        properties: {
          name: "Louisiana Digital Media Center",
          description: "...",
          category: "ladigital",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17178, 30.40749]
        },
        properties: {
          name: "Louisiana Emerging Technologies Center",
          description: "...",
          category: "latech",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18010, 30.41448]
        },
        properties: {
          name: "LSU Library",
          description: "...",
          category: "middleton",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18011, 30.40960]
        },
        properties: {
          name: "Manship Research Facility",
          description: "...",
          category: "manship",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18187, 30.40977]
        },
        properties: {
          name: "Military Science-Aerospace Studies Building",
          description: "...",
          category: "militarysci",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17956, 30.41653]
        },
        properties: {
          name: "Music & Dramatic Arts Building",
          description: "...",
          category: "music&drama",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17839, 30.41686]
        },
        properties: {
          name: "Music Building",
          description: "...",
          category: "music",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17899, 30.41251]
        },
        properties: {
          name: "Nicholson Hall",
          description: "...",
          category: "nicholson",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18083, 30.41138]
        },
        properties: {
          name: "Nuclear Science Building",
          description: "...",
          category: "nuclearsci",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18071, 30.41112]
        },
        properties: {
          name: "Nuclear Science Shop",
          description: "...",
          category: "nuclearscishop",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17997, 30.40779]
        },
        properties: {
          name: "Patrick F. Taylor Hall",
          description: "...",
          category: "pft",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18068, 30.41507]
        },
        properties: {
          name: "Peabody Hall",
          description: "...",
          category: "peabody",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.19107, 30.40604]
        },
        properties: {
          name: "PERTT Lab",
          description: "...",
          category: "pertt",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.19108, 30.40613]
        },
        properties: {
          name: "Petroleum Engineering Lab",
          description: "...",
          category: "petroleum",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18079, 30.41359]
        },
        properties: {
          name: "Prescott Hall",
          description: "...",
          category: "prescott",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17618, 30.40662]
        },
        properties: {
          name: "Renewable Natural Resources Building",
          description: "...",
          category: "renewresou",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17851, 30.40825]
        },
        properties: {
          name: "Research Lab and Motor Pool",
          description: "...",
          category: "res&pool",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18932, 30.43570]
        },
        properties: {
          name: "River Modeling Center",
          description: "...",
          category: "rivermodel",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18244, 30.40857]
        },
        properties: {
          name: "Sea Grant Building",
          description: "...",
          category: "sea",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18375, 30.40930]
        },
        properties: {
          name: "Sea Grant Shop",
          description: "...",
          category: "seashop",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18047, 30.41339]
        },
        properties: {
          name: "Stubbs Hall",
          description: "...",
          category: "stubbs",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17690, 30.40739]
        },
        properties: {
          name: "Sturgis Hall",
          description: "...",
          category: "sturgis",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17301, 30.41031]
        },
        properties: {
          name: "Sweet Potato Lab",
          description: "...",
          category: "potato",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17926, 30.42026]
        },
        properties: {
          name: "Tiger Band Hall",
          description: "...",
          category: "tigerband",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      //Continue Here..................................
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17915, 30.40971]
        },
        properties: {
          name: "Tureaud Hall",
          description: "...",
          category: "tureaud",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17302, 30.41476]
        },
        properties: {
          name: "University Laboratory School",
          description: "...",
          category: "univlab",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.19353, 30.41375]
        },
        properties: {
          name: "Veterinary Medicine",
          description: "...",
          category: "vetmed",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17993, 30.41006]
        },
        properties: {
          name: "Veterinary Science Animal Parasite Building",
          description: "...",
          category: "vetsciani",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17992, 30.41057]
        },
        properties: {
          name: "Veterinary Science Annex",
          description: "...",
          category: "vetsciann",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17995, 30.41030]
        },
        properties: {
          name: "Veterinary Science Poultry Building",
          description: "...",
          category: "vetscipou",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17767, 30.41056]
        },
        properties: {
          name: "Virginia Rice Williams Hall",
          description: "...",
          category: "virginiarice",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18091, 30.41237]
        },
        properties: {
          name: "Woodin Hall",
          description: "...",
          category: "woodin",               
          subcategory: "academic&research",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18145, 30.41442]
        },
        properties: {
          name: "Hill Memorial Library",
          description: "...",
          category: "hillmemorial",               
          subcategory: "libraries",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.18010, 30.41448]
        },
        properties: {
          name: "LSU Library",
          description: "...",
          category: "middleton",               
          subcategory: "libraries",  
          subsubcategory: "buildings",      
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-91.17767, 30.41056]
        },
        properties: {
          name: "Virginia Rice Williams Hall",
          description: "...",
          category: "virginiarice",               
          subcategory: "libraries",  
          subsubcategory: "buildings",      
        }
      },
    ]
};
