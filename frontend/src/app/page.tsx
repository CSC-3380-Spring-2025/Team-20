
'use client';
//import DatePicker from "react-datepicker";
//import Navbar from "../app/EP-components/navbar"
import Button from "../app/EP-components/button"
import Header from "./EP-components/header";
//import { useState } from "react";

export default function Home() {
  //Buttons --> set Event 

  /**
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: " ",
    date: null,
    location: null, 
    description: " "
  })

  */
//insert navbar
  
  return (
     <main>
      <Header/>
      
      <div className="MyEvent-container">

      </div>
      <div className="Body">

        <Button backgroundColor="#24a0ed" color="white" fontSize="12px" padding="8px 20px" borderRadius="5px" fontWeight="bold" onClick={() =>alert("Standby, Add Event")}>
          Add Event
        </Button>
      </div>
  
      
     </main>
      
    
  );
}
