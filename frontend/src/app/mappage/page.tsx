"use client";

import Header from "../../components/header";
import SearchBar from "../../components/searchbar";
import MapControls from "../../components/mapcontrols";

export default function MapPage() {
  return (
    <div className="relative">
      <Header />
      <SearchBar />
      <MapControls />
    </div>
  );
}