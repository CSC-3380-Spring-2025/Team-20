'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const categories = {
    Hobbies: ["Reading", "Gaming", "Painting", "Knitting", "Gardening", "Photography", "Writing", "Fishing", "Cycling", "Birdwatching", "Woodworking", "Calligraphy", "Pottery", "Scrapbooking", "Cooking", "Baking", "Chess", "Puzzles", "Origami", "Magic Tricks", "Yoga"],
    Sports: ["Soccer", "Basketball", "Tennis", "Baseball", "Football", "Swimming", "Running", "Cycling", "Boxing", "Martial Arts", "Wrestling", "Volleyball", "Golf", "Table Tennis", "Hockey", "Badminton", "Skiing", "Snowboarding", "Rock Climbing", "Surfing", "Track and Field"],
    Food: ["Pizza", "Sushi", "Burgers", "Pasta", "Steak", "Seafood", "Salad", "Sandwiches", "BBQ", "Ice Cream", "Chocolate", "Tacos", "Curry", "Dumplings", "Ramen", "Cheese", "Bread", "Vegan Dishes", "Fried Chicken", "Smoothies", "Soups"],
    Movies: ["Action", "Comedy", "Horror", "Drama", "Sci-Fi", "Fantasy", "Thriller", "Romance", "Animated", "Documentary", "Mystery", "Crime", "Musical", "Historical", "Superhero", "Western", "Indie", "Foreign Films", "Biopics", "Psychological Thriller", "Experimental"],
    Colors: ["Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Black", "White", "Gray", "Teal", "Magenta", "Cyan", "Brown", "Maroon", "Navy", "Turquoise", "Lavender", "Gold", "Silver", "Beige"],
    Animals: ["Dogs", "Cats", "Birds", "Horses", "Elephants", "Dolphins", "Lions", "Tigers", "Bears", "Penguins", "Giraffes", "Zebras", "Kangaroos", "Pandas", "Snakes", "Frogs", "Wolves", "Owls", "Butterflies", "Foxes", "Rabbits"],
    Career: ["Engineering", "Medicine", "Art", "Law", "Education", "Business", "Finance", "Tech", "Science", "Psychology", "Marketing", "Journalism", "Architecture", "Music", "Acting", "Politics", "Writing", "Nursing", "Military", "Entrepreneurship", "Social Work"],
    Fashion: ["Streetwear", "Formal", "Casual", "Vintage", "Bohemian", "Punk", "Gothic", "Chic", "Athleisure", "Preppy", "Hipster", "Grunge", "Minimalist", "Kawaii", "Y2K", "Cottagecore", "Techwear", "High Fashion", "Denim", "Monochrome", "Classic"],
    Personality: ["Introvert", "Extrovert", "Ambivert", "Optimist", "Pessimist", "Realist", "Adventurous", "Creative", "Empathetic", "Logical", "Charismatic", "Independent", "Determined", "Spontaneous", "Analytical", "Easygoing", "Humble", "Generous", "Courageous", "Loyal", "Resilient"]
  };

  const categoryNames = Object.keys(categories);
  const MAX_SELECTION = 20;

  const [selectedButtons, setSelectedButtons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const savedSelections = localStorage.getItem("selectedButtons");
    if (savedSelections) {
      setSelectedButtons(JSON.parse(savedSelections));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedButtons", JSON.stringify(selectedButtons));
  }, [selectedButtons]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
  };

  const handleButtonClick = (buttonName) => {
    setSelectedButtons((prevState) => {
      if (prevState.includes(buttonName)) {
        return prevState.filter(name => name !== buttonName);
      } else {
        return prevState.length < MAX_SELECTION ? [...prevState, buttonName] : prevState;
      }
    });
  };

  const handleSaveProfile = () => {
    localStorage.setItem("profileSelections", JSON.stringify(selectedButtons));
    setSaveMessage("Your selections have been saved to your profile!");
    setTimeout(() => setSaveMessage(""), 3000);
  };
  const getTrendingButtons = (category) => {
    const categoryButtons = categories[category] || [];
    return [...categoryButtons].sort((a, b) => (clickCounts[b] || 0) - (clickCounts[a] || 0)).slice(0, 3);
  };

  const filteredButtons = selectedCategory
    ? categories[selectedCategory].filter(name =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categoryNames.filter(name =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="min-h-screen flex flex-col bg-blue-300 pb-32">
      <header className="bg-blue-300 text-gray-500 py-4 shadow-md">
        <div className="flex justify-between items-center px-8">
          <div className="text-left text-3xl font-semibold">UniFriendSync</div>
          <nav className="flex space-x-9">
            {["Home", "Events", "Map", "Interests", "Mini Games", "Profile"].map((item, index) => (
              <a key={index} href={`#${item.toLowerCase()}`} className="text-2xl font-semibold hover:text-gray-800">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="flex justify-between px-8 mt-4 items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64 p-2 border border-gray-400 rounded-lg shadow-md text-gray-900"
        />
        <button onClick={handleSaveProfile} className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-700">
          Save to Profile
        </button>
      </div>
      {saveMessage && <p className="text-center text-white mt-2">{saveMessage}</p>}

      {selectedCategory && (
        <div className="flex justify-start px-8 mt-4">
          <button onClick={() => setSelectedCategory(null)} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800">
            ← Back to Categories
          </button>
        </div>
      )}

      <div className="text-center mt-4 text-white text-lg">
        {selectedButtons.length} / {MAX_SELECTION} selected
      </div>
      {selectedButtons.length >= MAX_SELECTION && (
        <div className="text-center text-red-500 font-bold mt-2">
          You have reached the maximum of 20 selections!
        </div>
      )}

      <main className="flex-grow flex justify-center items-center">
        <div className="grid grid-cols-3 gap-4">
          {filteredButtons.length > 0 ? (
            filteredButtons.map((name, index) => (
              <button
                key={index}
                onClick={() => selectedCategory ? handleButtonClick(name) : handleCategoryClick(name)}
                className={`bg-blue-500 text-white px-12 py-10 text-lg rounded-md shadow-lg hover:bg-blue-700 ${
                  selectedButtons.includes(name) ? "bg-blue-700" : ""
                }`}
                disabled={!selectedButtons.includes(name) && selectedButtons.length >= MAX_SELECTION}
              >
                {name}
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
}cd 