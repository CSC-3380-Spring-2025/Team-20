'use client';

import { useState } from 'react';

export default function Home() {
  // Categories and their corresponding buttons
  const categories = {
    Hobbies: ["Reading", "Gaming", "Painting"],
    Sports: ["Soccer", "Basketball", "Tennis"],
    Food: ["Pizza", "Sushi", "Burgers"],
    Movies: ["Action", "Comedy", "Horror"],
    Colors: ["Red", "Blue", "Green"],
    Animals: ["Dogs", "Cats", "Birds"],
    Career: ["Engineering", "Medicine", "Art"],
    Fashion: ["Streetwear", "Formal", "Casual"],
    Personality: ["Introvert", "Extrovert", "Ambivert"]
  };

  const categoryNames = Object.keys(categories);

  // State variables
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchQuery(""); // Reset search when switching categories
  };

  // Handle button selection inside a category
  const handleButtonClick = (buttonName) => {
    setSelectedButtons((prevState) => {
      if (prevState.includes(buttonName)) {
        return prevState.filter(name => name !== buttonName);
      } else {
        return [...prevState, buttonName];
      }
    });
  };

  // Filter buttons based on search query
  const filteredButtons = selectedCategory
    ? categories[selectedCategory].filter(name =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categoryNames.filter(name =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="min-h-screen flex flex-col bg-blue-300">
      {/* Header Section */}
      <header className="bg-blue-300 text-gray-500 py-4 shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
        <div className="flex justify-between items-center px-8">
          <div className="text-left">
            <span className="block text-3xl font-semibold">Uni</span>
            <span className="block text-3xl font-semibold">Friend</span>
            <span className="block text-3xl font-semibold">Sync</span>
          </div>

          {/* Navigation Menu */}
          <nav className="flex space-x-9 justify-center flex-grow">
            {["Home", "Events", "Map", "Interests", "Mini Games"].map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-2xl font-semibold hover:text-gray-800 transition duration-300"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Search Bar Section */}
      <div className="flex justify-end px-8 mt-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64 p-2 border border-gray-400 rounded-lg shadow-md text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Back Button (only visible inside a category) */}
      {selectedCategory && (
        <div className="flex justify-start px-8 mt-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className="bg-gray-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-800 transition duration-300"
          >
            ← Back to Categories
          </button>
        </div>
      )}

      {/* Button Grid */}
      <main className="flex-grow flex justify-center items-center">
        <div className="grid grid-cols-3 gap-4">
          {filteredButtons.length > 0 ? (
            filteredButtons.map((name, index) => (
              <button
                key={index}
                onClick={() =>
                  selectedCategory ? handleButtonClick(name) : handleCategoryClick(name)
                }
                className={`bg-blue-500 text-white px-12 py-10 text-lg rounded-md shadow-lg hover:bg-blue-700 ${
                  selectedButtons.includes(name) ? "bg-blue-700" : ""
                }`}
              >
                {name}
              </button>
            ))
          ) : (
            <p className="text-white text-lg col-span-3">No results found</p>
          )}
        </div>
      </main>

      {/* Selected Buttons Section */}
      <footer className="bg-blue-400 py-4 fixed bottom-0 left-0 w-full shadow-[0_-4px_10px_rgba(0,0,0,0.5)]">
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
