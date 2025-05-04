import React, { useState } from "react";
import { useHover } from "../hooks/useHover"; // Keep the custom hook here
import * as styles from "../styles/oc-style";

// Define the options
const options = [
  "Restaurants",
  "Bars and Cafes",
  "Parks and Recreation",
  "Arcades",
  "Monthly Events",
];

// Create a HoverButton component to handle the hover functionality
const HoverButton = ({ option, onClick }: { option: string, onClick: () => void }) => {
  const [Hovered, listener] = useHover();

  return (
    <button
      onClick={onClick}
      style={{
        ...styles.backbutton,
        backgroundColor: Hovered ? "lightblue" : "#f1f0ef",
      }}
      {...listener} // Apply the hover listeners
    >
      {option}
    </button>
  );
};

function OptionsBar() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelectedOption = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <>
      <div style={styles.optionsContainer}>
        {options.map((option, index) => (
          <HoverButton
            key={index}
            option={option}
            onClick={() => handleSelectedOption(option)} // Pass the option to the handler
          />
        ))}
      </div>

      {selectedOption && (
        <div style={{ ...styles.optionsContainer, backgroundColor: "white" }}>
          <p style={{ ...styles.optionsContainer, backgroundColor: "white" }}>
            No current events for {selectedOption}
          </p>
        </div>
      )}
    </>
  );
}

export default OptionsBar;
