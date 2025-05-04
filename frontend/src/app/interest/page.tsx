'use client';

import { useState, useEffect } from 'react';

export default function Home() {
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

  // Add a list of trending items for each category
  const trendingItems = {
    Hobbies: ["Reading", "Gaming", "Photography"],
    Sports: ["Soccer", "Basketball", "Tennis"],
    Food: ["Pizza", "Sushi", "Burgers"],
    Movies: ["Action", "Comedy", "Horror"],
    Colors: ["Red", "Blue", "Green"],
    Animals: ["Dogs", "Cats", "Birds"],
    Career: ["Engineering", "Medicine", "Art"],
    Fashion: ["Streetwear", "Casual", "Luxury"],
    Personality: ["Introvert", "Extrovert", "Optimist"],
    Music: ["Rock", "Pop", "Hip-Hop"],
    Books: ["Fiction", "Non-Fiction", "Biography"],
    Travel: ["Beach", "Mountains", "City"]
  };

  const categoryNames = Object.keys(categories);
  const MAX_SELECTION = 20;

  const [selectedButtons, setSelectedButtons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedSelections = localStorage.getItem("selectedInterests");
    if (savedSelections) {
      setSelectedButtons(JSON.parse(savedSelections));
    }
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
  };

  const handleButtonClick = (buttonName) => {
    if (selectedButtons.length >= MAX_SELECTION && !selectedButtons.includes(buttonName)) {
      alert("You have reached the maximum number of selections (20). Please deselect some before selecting more.");
      return;
    }

    setSelectedButtons((prevState) => {
      const newSelected = prevState.includes(buttonName)
        ? prevState.filter(name => name !== buttonName)
        : [...prevState, buttonName];

      localStorage.setItem("selectedInterests", JSON.stringify(newSelected));

      return newSelected;
    });
  };

  const filteredButtons = searchQuery
    ? Object.entries(categories).flatMap(([category, items]) =>
        items
          .filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(item => ({ name: item, category }))
      )
    : selectedCategory
    ? [
        ...trendingItems[selectedCategory].map(item => ({ name: item, category: selectedCategory })),
        ...categories[selectedCategory].filter(item => !trendingItems[selectedCategory].includes(item))
          .map(item => ({ name: item, category: selectedCategory }))
      ]
    : categoryNames.map(name => ({ name, category: null }));

  const handleSave = () => {
    setSavedMessage("Your interests have been saved!");
    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-300 pb-36">
      <header className="bg-blue-300 text-gray-500 py-4 shadow-md">
        <div className="flex justify-between items-center px-8">
          <div className="text-left text-3xl font-semibold">UniFriendSync</div>
          <nav className="flex space-x-9">
            {["Home", "Events", "Map", "Interests", "Mini Games"].map((item, index) => (
              <a key={index} href={`#${item.toLowerCase()}`} className="text-2xl font-semibold hover:text-gray-800">
                {item}
              </a>
            ))}
          </nav>
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

      <div className="flex justify-center px-8 mt-4">
        <div className="text-xl font-semibold">
          {selectedButtons.length}/{MAX_SELECTION} selected
        </div>
      </div>

      {selectedButtons.length >= MAX_SELECTION && (
        <div className="flex justify-center px-8 mt-2">
          <div className="text-red-600 font-semibold">You have reached the maximum of 20 selections!</div>
        </div>
      )}

      <main className="flex-grow flex justify-center items-center">
        <div className="grid grid-cols-3 gap-4">
          {filteredButtons.length > 0 ? (
            filteredButtons.map(({ name, category }, index) => (
              <button
                key={index}
                onClick={() => selectedCategory ? handleButtonClick(name) : handleCategoryClick(name)}
                className={`bg-blue-500 text-white px-12 py-10 text-lg rounded-md shadow-lg hover:bg-blue-700 ${
                  selectedButtons.includes(name) ? "bg-blue-700" : ""
                }`}
                disabled={selectedButtons.length >= MAX_SELECTION && !selectedButtons.includes(name)}
              >
                {name} {category && <span className="text-sm text-gray-300">({category})</span>}
              </button>
            ))
          ) : (
            <p className="text-white text-lg col-span-3">No results found</p>
          )}
        </div>
      </main>

      <footer className="bg-blue-400 py-4 fixed bottom-0 left-0 w-full shadow-md">
        <div className="flex flex-wrap justify-center items-center gap-2 px-4">
          {selectedButtons.length > 0 ? (
            selectedButtons.map((name, index) => (
              <span
                key={index}
                className="bg-white text-blue-500 px-4 py-2 rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
                onClick={() => handleButtonClick(name)}
              >
                {name} ✖
              </span>
            ))
          ) : (
            <span className="text-white text-lg">No buttons selected</span>
          )}
        </div>
      </footer>
    </div>
  );
}