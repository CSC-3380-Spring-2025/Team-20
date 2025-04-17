"use client";

//react components
import { useState } from "react";


//components
import Button from "../components/button";
import Header from "../components/header";
import DivContainer from "../components/containers";
import EventSection from "./components/eventSection";
import EventForm from "./components/eventForm";
import useEvents from "./hooks/useEvents";

//styles
import * as styles from "./styles/eventStyle";
import { Event } from "./types/eventTypes";

//router and navigation
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

//database
//import { collection, getDocs, query, where, DocumentData } from "firebase/firestore";
//import { db } from "../config/firebase";

export default function Events() {
  //event form
  const [showForm, setShowForm] = useState(false);

  //alert when joined, add, delete, leave
  const [alertMessage, setAlertMessage] = useState<string | null>(null);


  //default. DELETE LATER

  //const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { user } = useAuth();

  const {
    myEvents,
    popularEvents,
    joinedEvents,
    addEvent,
    deleteMyEvent,
    joinEvent,
    leaveEvent
  } = useEvents();

  



  //handleEvents

  const handleAddEvent = () => setShowForm(true);

  const handleCancelEvent = () => setShowForm(false);

  const handleSubmitEvent = (event: Event) => {
    //functionality (add the event then show it for around 2000 and create the event)
    addEvent(event);
    setShowForm(false);

    setAlertMessage(`Created ${event.title}`);
    setTimeout(() => setAlertMessage(null), 1000);
  };

  const deleteEventHandler = (index: number) => {
    const event = myEvents[index];

    //only if there's an option 
    if (event) {
      deleteMyEvent(index);
      setAlertMessage(`Deleted ${event.title}`);
      setTimeout(() => setAlertMessage(null), 1000);
    }


  };

  const joinEventHandler = (index: number) => {

    //joined events. 
    const event = popularEvents[index];
    if (event) {
      joinEvent(index);
      setAlertMessage(`Joined ${event.title}`);
      setTimeout(() => setAlertMessage(null), 1000);
    }
  };


  const leaveEventHandler = (index: number) => {

    //leave events. 
    const event = joinedEvents[index];

    if (event) {
      leaveEvent(index);
      setAlertMessage(`Left ${event.title}`);
      setTimeout(() => setAlertMessage(null), 1000);
    }
  };

  
  


  // must do this before creating
  if (!user) {
    return (
      <div>
        <h2>You need to log in to access this page.</h2>
        <button
          className="bg-green-500 border-r-5 font-serif hover:bg-green-300"
          onClick={() => router.push("/auth/login")}
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (

    <main style={{ marginBottom: "40px" }}>
      <Header />


      

      {alertMessage && (
        <DivContainer position="fixed"
          top="20px"
          left="50%"
          transform="translateX(-50%)"
          backgroundColor="blue"
          color="white"
          padding="10px 20px"
          borderRadius="8px"
          fontSize="14px"
          fontWeight="bold"
          boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
          transition="opacity 0.5s ease-in-out"
          zIndex="1000"
        >
          {alertMessage}
        </DivContainer>
      )}

      <DivContainer padding="2px" width="100%">
        <DivContainer
          display="flex"
          justifyContent="space-between"
          padding="40px 20px 10px 10px"
          width="100%"
        >
          <p style={styles.titleStyle}>Events</p>
          <Button
            backgroundColor="blue"
            color="white"
            fontSize="14px"
            padding="2px 8px"
            borderRadius="5px"
            fontWeight="bold"
            onClick={handleAddEvent}
          >
            ➕ Add Event
          </Button>
        </DivContainer>

        {showForm && (
          <EventForm onSave={handleSubmitEvent} onDelete={handleCancelEvent} />
        )}

        <EventSection title="My Events" events={myEvents} onDelete={deleteEventHandler} />
        <EventSection title="Joined Events" events={joinedEvents} onLeave={leaveEventHandler} />
        <EventSection title="Current Events" events={popularEvents} onJoin={joinEventHandler} isPopular={true} />
      </DivContainer>

      <button style={styles.linkStyle} onClick={() => router.push("/outsideCampus")}>
        Leaving LSU?

        
      </button>
    </main>
  );
}
