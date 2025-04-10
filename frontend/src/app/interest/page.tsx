'use client';

import { useState, useEffect } from 'react';

export default function Interest() {
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
    ]
  };

  const categoryNames = Object.keys(categories);
  const MAX_SELECTION = 20;

  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof categories | null>(null);
  const [savedMessage, setSavedMessage] = useState("");
  const [clickCounts, setClickCounts] = useState<Record<string, number>>({});

  // Load saved selections and click counts from localStorage on page load
  useEffect(() => {
    const savedSelections = localStorage.getItem("selectedInterests");
    const savedClicks = localStorage.getItem("clickCounts");
    if (savedSelections) {
      setSelectedButtons(JSON.parse(savedSelections));
    }
    if (savedClicks) {
      setClickCounts(JSON.parse(savedClicks));
    }
  }, []);

  // Handle category click to set the selected category
  const handleCategoryClick = (category: keyof typeof categories | null) => {
    setSelectedCategory(category);
    setSearchQuery("");
  };

  // Handle button click to select or deselect a button
  const handleButtonClick = (buttonName: string) => {
    setSelectedButtons((prevState: string[]) => {
      if (prevState.includes(buttonName)) {
        return prevState.filter(name => name !== buttonName);
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
  const handleSave = () => {
    localStorage.setItem("selectedInterests", JSON.stringify(selectedButtons)); // Save selected interests
    setSavedMessage("Your interests have been saved!");
    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  const getTrendingItemsByCategory = (category: keyof typeof categories) => {
      const categoryItems = categories[category] || [];
    const categoryClickCounts = categoryItems.reduce((acc: { [x: string]: number; }, item: string | number) => {
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
      <div className="min-h-screen flex flex-col bg-blue-300 pb-36">
      <header className="bg-blue-300 text-gray-500 py-4 shadow-md">
        <div className="flex justify-between items-center px-8">
          <div className="text-left text-3xl font-semibold">UniFriendSync</div>
        </div>
      </header>

      <div className="flex justify-start px-8 mt-4">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-8 py-2 rounded-md shadow-lg hover:bg-green-700"
        >
          Save Interests
        </button>
      </div>

      {savedMessage && (
        <div className="flex justify-center mt-2">
          <div className="text-green-600 font-semibold">{savedMessage}</div>
        </div>
      )}

      <div className="flex justify-end px-8 mt-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64 p-2 border border-gray-400 rounded-lg shadow-md text-gray-900"
        />
      </div>

      {selectedCategory && (
        <div className="flex justify-start px-8 mt-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            ← Back to Categories
          </button>
        </div>
      )}

      <main className="flex-grow flex justify-center items-center">
        <div className="grid grid-cols-3 gap-4">
          {/* Trending Items moved to the top */}
          {trendingItems.length > 0 && (
            trendingItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(item)}
                className={`relative bg-blue-500 text-white px-12 py-10 text-lg rounded-md shadow-lg hover:bg-blue-700 ${
                  selectedButtons.includes(item) ? "bg-blue-700" : ""
                }`}
              >
                {item}
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Trending
                </span>
              </button>
            ))
          )}

          {/* Other Category Buttons */}
          {filteredButtons.length > 0 ? (
            filteredButtons.map(({ name, category }, index) => (
              <button
                key={index}
                onClick={() => selectedCategory ? handleButtonClick(name) : handleCategoryClick(name as keyof typeof categories)}
                className={`relative bg-blue-500 text-white px-12 py-10 text-lg rounded-md shadow-lg hover:bg-blue-700 ${
                  selectedButtons.includes(name) ? "bg-blue-700" : ""
                }`}
              >
                {name} {category && <span className="text-sm text-gray-300">({category})</span>}
              </button>
            ))
          ) : (
            <p className="text-white text-lg col-span-3">No results found</p>
          )}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 w-full bg-blue-600 text-white py-3 shadow-md">
        <div className="text-center">
          {selectedButtons.length >= MAX_SELECTION && (
            <p className="text-red-400 font-semibold">You can only select up to {MAX_SELECTION} interests.</p>
          )}

          <p className="text-lg">Selected Interests ({selectedButtons.length}/{MAX_SELECTION}):</p>

          <div className="flex flex-wrap justify-center mt-2 px-4">
            {selectedButtons.map((item, index) => (
              <span
                key={index}
                className="bg-white text-blue-600 px-3 py-1 rounded-full mx-1 my-1 cursor-pointer"
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