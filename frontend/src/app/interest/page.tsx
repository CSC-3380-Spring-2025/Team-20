'use client';

import { useState, useEffect } from 'react';

import { db } from '@/config/firebase';
import {doc, setDoc, getDoc} from "firebase/firestore";

import Header from "../components/header";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

export default function Interest() {
  const {user} = useAuth();
  const router = useRouter();
  

  const categoryImages: Record<string, string>= {
    Animals: "/assets/animals.jpg",
    Books: "/assets/books.jpg",
    Career: "/assets/career.jpg",
    Colors: "/assets/colors.jpg",
    Food: "/assets/food.jpg",
    Hobbies: "/assets/hobbies.jpg",
    Personality: "/assets/personality.jpg",
    Movies: "/assets/movies.jpg",
    Music: "/assets/music.jpg",
    Travel: "/assets/travel.jpg",
    Sports: "/assets/sports.jpg",
    Fashion: "/assets/fashion.jpg",
    Technology: "/assets/technology.jpg",     
    Education: "/assets/education.jpg",   
    Wellness: "/assets/wellness.jpg", 
    Entertainment: "/assets/entertainment.jpg"
  };
  
  
  const categories = {
    Hobbies: [
      "Reading", "Gaming", "Painting", "Drawing", "Writing", "Photography", 
      "Cycling", "Cooking", "Gardening", "Knitting", "Pottery", "Woodworking",
      "Birdwatching", "Fishing", "Astronomy", "Scrapbooking", "Traveling"
    ],
    Sports: [
      "Soccer", "Basketball", "Tennis", "Baseball", "Cricket", "Rugby", 
      "Golf", "Swimming", "Boxing", "Cycling", "Running", "Badminton", 
      "Table Tennis", "Volleyball", "Handball", "Football"
    ],
    Food: [
      "Pizza", "Sushi", "Burgers", "Pasta", "Tacos", "Salads", "Burritos", 
      "Sushi", "Ramen", "Sandwiches", "Fried Chicken", "Steak", "Seafood", 
      "Ice Cream", "Chocolate", "Donuts", "Cakes", "Cookies", "Pastries"
    ],
    Movies: [
      "Action", "Comedy", "Horror", "Thriller", "Romance", "Sci-Fi", "Fantasy", 
      "Drama", "Animation", "Documentary", "Adventure", "Mystery", "Crime", 
      "Historical", "Musical", "Family"
    ],
    Colors: [
      "Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Black", 
      "White", "Gray", "Brown", "Cyan", "Magenta", "Beige", "Turquoise", "Ivory"
    ],
    Animals: [
      "Dogs", "Cats", "Birds", "Fish", "Lions", "Tigers", "Elephants", "Giraffes", 
      "Zebras", "Monkeys", "Bears", "Pandas", "Kangaroos", "Koalas", "Penguins", 
      "Snakes", "Lizards", "Horses"
    ],
    Career: [
      "Engineering", "Medicine", "Art", "Teaching", "Law", "Nursing", "Design", 
      "Marketing", "Finance", "Sales", "Journalism", "Psychology", "Architecture", 
      "Software Development", "Civil Engineering", "Education", "Business"
    ],
    Fashion: [
      "Streetwear", "Formal", "Casual", "Athleisure", "Vintage", "Bohemian", 
      "Business Casual", "Smart Casual", "Luxury", "Minimalist", "Preppy", "Trendy",
      "Gothic", "Punk", "Artsy", "Chic", "Hip-Hop"
    ],
    Personality: [
      "Introvert", "Extrovert", "Ambivert", "Optimist", "Pessimist", "Realist", 
      "Dreamer", "Perfectionist", "Leader", "Follower", "Thinker", "Feeler", 
      "Empath", "Analytical", "Creative", "Pragmatic", "Adventurous", "Sentimental"
    ],
    Music: [
      "Rock", "Pop", "Hip-Hop", "Classical", "Jazz", "Blues", "Reggae", "Country", 
      "Electronic", "R&B", "Indie", "Alternative", "Metal", "Folk", "Punk", "Disco", 
      "Soul", "Gospel", "Funk"
    ],
    Books: [
      "Fiction", "Non-Fiction", "Biography", "Science Fiction", "Fantasy", "Mystery", 
      "Thriller", "Romance", "Historical Fiction", "Horror", "Self-Help", "Philosophy", 
      "Poetry", "Cookbooks", "Travel", "Art", "Graphic Novels", "Adventure"
    ],
    Travel: [
      "Beach", "Mountains", "Desert", "City", "Countryside", "Island", "Cruise", 
      "Road Trip", "Camping", "Backpacking", "Sightseeing", "Hiking", "Nature", 
      "Adventure", "Luxury", "Budget Travel", "Cultural"
    ],
    Technology: [
      "AI", "Robotics", "Gaming Tech", "Smartphones", "Programming", "Cybersecurity",
      "Blockchain", "Gadgets", "Virtual Reality", "Web Development", "Space Tech",
      "Drones", "Home Automation", "3D Printing", "Cloud Computing"
    ],
    Education: [
      "Math", "Science", "History", "Literature", "Languages", "Philosophy",
      "Economics", "Political Science", "Psychology", "Art History", "Geography",
      "Sociology", "STEM", "Environmental Studies", "Ethics"
    ],
    Wellness: [
      "Yoga", "Meditation", "Fitness", "Healthy Eating", "Journaling", "Sleep Hygiene",
      "Breathwork", "Therapy", "Mindfulness", "Pilates", "Nature Walks",
      "Detox", "Massage", "Aromatherapy", "Stretching"
    ],
    Entertainment: [
      "TV Shows", "Podcasts", "Board Games", "Video Games", "Stand-Up Comedy",
      "YouTube", "Live Theater", "Concerts", "Magic Shows", "Musicals",
      "Streaming", "Karaoke", "Escape Rooms", "Improv", "Trivia Nights"
    ]
  };

  const categoryNames = Object.keys(categories);
  const MAX_SELECTION = 20;

  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof categories | null>(null);
  const [savedMessage, setSavedMessage] = useState("");
  const [clickCounts, setClickCounts] = useState<Record<string, number>>({});

  //load click counts from localStorage on page load **termparoy must fix
  useEffect(() => {
    const savedClicks = localStorage.getItem("clickCounts");
    if (savedClicks) {
      setClickCounts(JSON.parse(savedClicks));
    }
  }, []);

//handles redirect if bypassing auth
  if (!user) {
    return (
      <div>
        <h2>You need to log in to access this page.</h2>
        <button
          className="bg-purple-400 border-r-5 font-serif hover:bg-yellow-300"
          onClick={() => router.push("/auth/login")}
        >
          Return to Login
        </button>
      </div>
    );
  }

  // Handle category click to set the selected category
  const handleCategoryClick = (category: keyof typeof categories | null) => {
    setSelectedCategory(category);
    setSearchQuery("");
  };

  // Handle button click to select or deselect a button
  const handleButtonClick = (buttonName: string) => {
    setSelectedButtons((prevState) => {
      if (prevState.includes(buttonName)) {
        return prevState.filter((name) => name !== buttonName);
      } else {
        return prevState.length < MAX_SELECTION ? [...prevState, buttonName] : prevState;
      }
  });

    setClickCounts((prevCounts) => {
      const newCounts = { ...prevCounts, [buttonName]: (prevCounts[buttonName] || 0) + 1 };
      localStorage.setItem("clickCounts", JSON.stringify(newCounts));
      return newCounts;
    });
  };

  // Function to handle saving the selected interests to localStorage
  const handleSave = async () => {
    if (!user) return;

    try {
      const userDoc = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDoc);
  
      let existingInterests: string[] = [];
  
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        existingInterests = userData.interests || [];
      }
  
      // Merge existing and newly selected interests
      const updatedInterests = Array.from(new Set([...existingInterests, ...selectedButtons]));
  
      await setDoc(userDoc, { interests: updatedInterests }, { merge: true });
  
      setSavedMessage("Your interests have been saved!");
    } catch (error) {
      console.error(error);
      setSavedMessage("Failed to save interests. Try again!");
    }
  
    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  const getTrendingItemsByCategory = (category: keyof typeof categories) => {
    const categoryItems = categories[category] || [];
    const categoryClickCounts = categoryItems.reduce((acc: Record<string, number>, item: string) => {
      acc[item] = clickCounts[item] || 0;
      return acc;
  }, {});

    return Object.entries(categoryClickCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(item => item[0]);
  };

  interface FilteredButton {
    name: string;
    category: string | null;
  }

  const filteredButtons: FilteredButton[] = searchQuery
    ? Object.entries(categories).flatMap(([category, items]) =>
        items
          .filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(item => ({ name: item, category }))
      )
    : selectedCategory
    ? categories[selectedCategory].map(item => ({ name: item, category: selectedCategory }))
    : categoryNames.map(name => ({ name, category: null }));

  const trendingItems = selectedCategory ? getTrendingItemsByCategory(selectedCategory) : [];

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col bg-white pb-36">
        {/* Search & Save */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-8 mt-4 gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-2/3 p-2 border border-gray-400 rounded-lg shadow-md text-gray-900"
          />
          <button
            onClick={handleSave}
            className="bg-yellow-300 text-black px-6 py-2 rounded-md shadow-lg hover:bg-yellow-400"
          >
            Save Interests
          </button>
        </div>
  
        {/* Saved message */}
        {savedMessage && (
          <div className="flex justify-center mt-2">
            <div className="text-green-600 font-semibold">{savedMessage}</div>
          </div>
        )}
  
        {/* Back to Categories */}
        {selectedCategory && (
          <div className="flex justify-start px-8 mt-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
            >
              ← Back to Categories
            </button>
          </div>
        )}
  
        {/* Main Grid */}
        <main className="flex-grow flex justify-center items-center px-4 sm:px-8 mt-8">
          <div className="grid gap-4 w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
            {/* Trending Items */}
            {trendingItems.length > 0 &&
              trendingItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleButtonClick(item)}
                  className={`relative px-12 py-10 text-bold rounded-md shadow-lg ${
                    selectedButtons.includes(item)
                      ? "bg-purple-200 text-black"
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
                >
                  {item}
                  <span className="absolute top-2 right-2 bg-red-400 text-white text-xs px-2 py-1 rounded-full">
                    🔥Trending
                  </span>
                </button>
              ))}
  
            {/* Category / Interest Buttons */}
            {filteredButtons.length > 0 ? (
              filteredButtons.map(({ name, category }, index) => {
                const isCategory = category === null;
                const backgroundImage = isCategory
                  ? categoryImages[name as keyof typeof categoryImages]
                  : "";
  
                return (
                  <button
                    key={index}
                    onClick={() =>
                      isCategory
                        ? handleCategoryClick(name as keyof typeof categories)
                        : handleButtonClick(name)
                    }
                    className={`relative px-6 py-20 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200 ${
                      selectedButtons.includes(name) && !isCategory
                        ? "bg-yellow-100 text-black"
                        : isCategory 
                          ? "bg-white bg-opacity-50 hover:bg-opacity-60 text-black-300 mb-2" 
                          : "bg-white text-black hover:bg-gray-200" 
                    }`}
                    style={
                      isCategory
                        ? {
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${backgroundImage})`,
                            opacity: "revert",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            textShadow: "1px 1px 4px rgba(0,0,0,0.2)",
                            marginBottom: "1px"
                          }
                        : {}
                    }
                  >
                    {name}
                    {category && (
                      <span className="text-sm text-gray-300"> ({category})</span>
                    )}
                  </button>
                );
              })
            ) : (
              <p className="text-gray-700 text-lg col-span-3">No results found</p>
            )}
          </div>
        </main>
  
        {/* Footer with Selected Interests */}
        <footer className="fixed bottom-0 left-0 w-full bg-purple-800 text-white py-3 shadow-md">
          <div className="text-center">
            {selectedButtons.length >= MAX_SELECTION && (
              <p className="text-red-400 font-semibold">
                You can only select up to {MAX_SELECTION} interests.
              </p>
            )}
            <p className="text-lg">
              Selected Interests ({selectedButtons.length}/{MAX_SELECTION}):
            </p>
            <div className="flex flex-wrap justify-center mt-2 px-4">
              {selectedButtons.map((item, index) => (
                <span
                  key={index}
                  className="bg-white text-purple-600 px-3 py-1 rounded-full mx-1 my-1 cursor-pointer"
                  onClick={() => handleButtonClick(item)}
                >
                  {item} <span className="ml-2 text-red-500">x</span>
                </span>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}