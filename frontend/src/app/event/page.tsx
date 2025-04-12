//event's page
"use client";
import { useState } from "react"; 
import Button from "../EP-components/button";
import Header from "../header";
import DivContainer from "../EP-components/containers";
import EventSection from "./components/eventSection";
import EventForm from "./components/eventForm";
import useEvents from "./hooks/useEvents";
import * as styles from "./styles/eventStyle";
import { Event } from "./types/eventTypes";
import { useRouter } from "next/navigation";

export default function Events() {
  const [showForm, setShowForm] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const router = useRouter();

  const { myEvents, popularEvents, joinedEvents, 
    addEvent, deleteMyEvent, joinEvent, leaveEvent } = useEvents();
    
  const handleAddEvent = () => setShowForm(true);
  const handleCancelEvent = () => setShowForm(false);


  {/**alert that shows if user joined, left; added or deleted individual events*/}
  const handleSubmitEvent = (event: Event) => {
    addEvent(event);
    setShowForm(false);

    setAlertMessage(`Created ${event.title}`);
    setTimeout(() => setAlertMessage(null));
  };

  const deleteEventHandler = (index: number) => {
    const event = myEvents[index];

    if (event) {
      deleteMyEvent(index);
      setAlertMessage(`Deleted ${event.title}`);
      setTimeout(() => setAlertMessage(null));
    }

  };

  const joinEventHandler = (index: number) => {
    const event = popularEvents[index];

    if (event) {
      joinEvent(index);
      setAlertMessage(`Joined ${event.title}`);
      setTimeout(() => setAlertMessage(null));
    }

  };

  const leaveEventHandler = (index: number) => {
    const event = joinedEvents[index];
    if (event) {
      leaveEvent(index);
      setAlertMessage(`Left ${event.title}`);
      setTimeout(() => setAlertMessage(null));
    }
  };

  return (
    <main style={{marginBottom: '40px'}}>
      <Header />

      {/* Alert message */}
      {alertMessage && (
        <DivContainer
          position="fixed"
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
          zIndex="10001"
        >
          {alertMessage}
        </DivContainer>
      )}

      <DivContainer padding="2px" width="100%">


        <DivContainer display="flex" justifyContent="space-between" padding="40px 20px 10px 10px" width="100%">
          <p style={styles.titleStyle}>Events</p>
          <Button backgroundColor="blue" color="white" fontSize="14px" padding="2px 8px" borderRadius="5px" fontWeight="bold" onClick={handleAddEvent}>
            ➕ Add Event
          </Button>
        </DivContainer>

        {showForm && (<EventForm onSave={handleSubmitEvent} onDelete={handleCancelEvent} />)}

        {/* My Events */}
        <EventSection title="My Events" events={myEvents} onDelete={deleteEventHandler}/>

        {/* Joined Events*/}
        <EventSection title="Joined Events" events={joinedEvents} onLeave={leaveEventHandler}/>

        {/* Current Events */}
        <EventSection title="Current Events" events={popularEvents} onJoin={joinEventHandler} isPopular={true}/>

      </DivContainer>

      <button style={styles.linkStyle} onClick={() =>   router.push("/campus-outside")}>
        Leaving LSU?
      </button>
      
    </main>
  );
}