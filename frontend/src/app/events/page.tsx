'use client';
import { useState } from "react"; 
import Button from "../components/button";
import Header from "../components/header";
import DivContainer from "../components/containers";
import EventSection from "./EP-components/EventSection";
import EventForm from "./EP-components/eventForm";
import useEvents from "../events/hooks/useEvents";
import Link from "next/link";
import * as styles from "./styles/eventstyle";
import { Event } from "./types/eventTypes";

export default function Events() {
  const { 
    myEvents, 
    popularEvents, 
    joinedEvents, 
    addEvent, 
    deleteMyEvent, 
    joinEvent, 
    leaveEvent 
  } = useEvents();
  
  const [showForm, setShowForm] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleAddEvent = () => setShowForm(true);
  const handleCancelEvent = () => setShowForm(false);

  const handleSubmitEvent = (event: Event) => {
    addEvent(event);
    setShowForm(false);
    setAlertMessage(`Created ${event.title}`);
    setTimeout(() => setAlertMessage(null), 2000);
  };

  const joinEventHandler = (index: number) => {
    const event = popularEvents[index];
    if (event) {
      joinEvent(index);
      setAlertMessage(`Joined ${event.title}`);
      setTimeout(() => setAlertMessage(null), 2000);
    }
  };

  const leaveEventHandler = (index: number) => {
    const event = joinedEvents[index];
    if (event) {
      leaveEvent(index);
      setAlertMessage(`Left ${event.title}`);
      setTimeout(() => setAlertMessage(null), 2000);
    }
  };

  const deleteEventHandler = (index: number) => {
    const event = myEvents[index];
    if (event) {
      deleteMyEvent(index);
      setAlertMessage(`Deleted ${event.title}`);
      setTimeout(() => setAlertMessage(null), 2000);
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
          backgroundColor="#24a0ed"
          color="white"
          padding="10px 20px"
          borderRadius="8px"
          fontSize="14px"
          fontWeight="bold"
          boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
          transition="opacity 0.5s ease-in-out"
          zIndex="10000"
        >
          {alertMessage}
        </DivContainer>
      )}

      <DivContainer padding="2px" width="100%">
        <DivContainer display="flex" justifyContent="space-between" padding="40px 20px 10px 10px" width="100%">
          <p style={styles.titleStyle}>Events</p>
          <Button
            backgroundColor="#24a0ed"
            color="white"
            fontSize="12px"
            padding="2px 10px"
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

        {/* My Events */}
        <EventSection
          title="My Events"
          events={myEvents}
          onDelete={deleteEventHandler}
        />

        {/* Joined Events*/}
        <EventSection
          title="Joined Events"
          events={joinedEvents}
          onLeave={leaveEventHandler}
        />

        {/* Current Events */}
        <EventSection
          title="Current Events"
          events={popularEvents}
          onJoin={joinEventHandler}
          isPopular={true}
        />
      </DivContainer>

      <Link href="/campus-outside">
        <p style={styles.linkStyle}>Leaving LSU?</p>
      </Link>
      
    </main>
  );
}