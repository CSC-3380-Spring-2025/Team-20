"use client";

import React from "react";
import { useHover } from "../hooks/usehover";

const options = ["Restaurants", "Bars and Cafes", "Parks and Recreation", "Arcades", "Monthly Events"] as const;

export type InterestsIndex = typeof options[number];

const HoverButton = (
  { option, isEventSelected, onClick }:
  { option: string, isEventSelected: boolean; onClick: () => void }
) => {
  const [Hovered, listener] = useHover();

  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 mx-1 rounded-lg font-medium transition-all duration-200
        ${isEventSelected ? 
          'bg-purple-700 text-white shadow-md' : 
          Hovered ? 
            'bg-purple-400 text-purple-900 shadow-sm' : 
            'bg-purple-100 text-purple-800'
        }
        ${Hovered && !isEventSelected ? 'transform -translate-y-0.5' : ''}
      `}
      {...listener}
    >
      {option.charAt(0).toUpperCase() + option.slice(1)}
    </button>
  );
};

function OptionsBar(
  { selectedOption, setSelectedOption }:
  { selectedOption: "" | InterestsIndex; setSelectedOption: (interest: "" | InterestsIndex) => void; }
) {
  return (
    <div className="bg-yellow-100 p-4 rounded-xl max-w-4xl mx-auto my-2 shadow-inner">
      <div className="flex flex-wrap justify-center gap-2">
        {options.map((option, index) => (
          <HoverButton
            key={index}
            option={option}
            isEventSelected={selectedOption === option}
            onClick={() => setSelectedOption(selectedOption === option ? "" : option)}
          />
        ))}
      </div>
    </div>
  );
}

export default OptionsBar;