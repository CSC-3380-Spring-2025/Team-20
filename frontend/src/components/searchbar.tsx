"use client"; 

import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
       <div className="absolute top-16 left-0 bg-blue-500 p-4 rounded shadow-md" style={{ width: '500px', height: '50px' }}>
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search"
              className="w-full h-full bg-transparent text"
            />
          </div>
    </div>
  );
}