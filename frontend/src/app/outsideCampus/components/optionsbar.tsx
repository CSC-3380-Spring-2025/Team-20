"use client";

import React, { useState } from "react";
import { useHover } from "../hooks/usehover";
import * as styles from "../styles/ocstyle";

const options = [ "Restaurants", "Bars and Cafes", "Parks and Recreation", "Arcades", "Monthly Events", "City Life Calendar",] as const;


//passes an index value of our options. easier to maneuver
export type InterestsIndex = typeof options[number];

// Create a HoverButton component to handle the hover functionality
const HoverButton = (
  { option, isEventSelected, onClick }:
  { option: string, isEventSelected:boolean; onClick: () => void }
) => {
  const [Hovered, listener] = useHover();

  return (
    <button
      onClick={onClick}
      
      style={{...styles.optionButton, backgroundColor: 
          Hovered ? "lightblue" : "#f1f0ef",}}
          {...listener} // Apply the hover listeners 
      >

      {option.charAt(0).toUpperCase() + option.slice(1)}
    </button>
  );
};

  function OptionsBar(
      { selectedOption, setSelectedOption,}: 
      { selectedOption: "" | InterestsIndex; setSelectedOption: (interest: "" | InterestsIndex) => void; }
  ) {


  return (
    <>
      <div  style={styles.optionsContainer}>


      {options.map((option, index) => (


        <HoverButton
          key={index} option={option} isEventSelected={selectedOption === option}
          onClick={() => setSelectedOption(option)} />


      ))}


    </div>
    </>
  );
}

export default OptionsBar;