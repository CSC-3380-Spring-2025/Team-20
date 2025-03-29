"use client";

import React, { useState } from "react";
import {useHover} from "../hooks/useHover";
import * as styles from  "../styles/oc-style";

const options = [
    "Resturants",
    "Bars and Cafe's",
    "Parks and Recreation",
    "Arcades",
    "Monthly Events",
];

export function OptionsBar() {
    // Create a state to track the selected option
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
    // Handle selecting an option
    const handleSelectedOption = (option: string) => {
      setSelectedOption(option);
    };
  
    return (
      <>
        <div style={styles.optionsContainer}>
        {options.map((option, index) => {
          // Use the hook outside of the callback to prevent the error
          const [Hovered, listener] = useHover();
  
            return (
              <button
                key={index}
                onClick={() => handleSelectedOption(option)}
                style={{
                  ...styles.backbutton,
                  backgroundColor: Hovered ? "lightblue" : "#f1f0ef", 
                }}
                {...listener} 
              >
                {option}
              </button>
            );
          })}
        </div>
  
        {selectedOption && (
          <div style={{
            ...styles.optionsContainer, 
                backgroundColor: "white", }}>
            <p style={{
            ...styles.optionsContainer, 
                backgroundColor: "white", }}
                 >No current events for {selectedOption}</p> 
          </div> 
        )} 
      </>
    );
  }