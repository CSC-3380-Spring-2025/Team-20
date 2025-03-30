'use client';
import Button from "../app/EP-components/button";
import Header from "../app/EP-components/header";
import DivContainer from "../app/EP-components/containers";
import EventSection from "../app/EP-components/EventSection";
import EventForm from "./EP-components/eventForm";
import useEvents from "../app/hooks/useEvents";
import Link from "next/link";
import popularEvents from "./types/populareventsTypes";
import { useState } from "react";
import { titleStyle, linkStyle } from "../app/styles/eventstyle";
import { Event } from "./types/eventTypes";


export default function Home() {
  const { events, addEvent, deleteEvent } = useEvents();

  const [popularEventsState, setPopularEventsState] = useState<Event[]>(popularEvents);

  const [showForm, setShowForm] = useState(false);

  const handleAddEvent = () => {
    setShowForm(true);
  }

  const handleCancelEvent = () => {
    setShowForm(false);
  }

  const handleSubmitEvent = (event: Event) => {
    addEvent(event); 
    setShowForm(false); 
  }


  //will be VERY VERY important for the matching algorithm
  const joinEvent = (index: number) => {
    setPopularEventsState((prevState) => {
      const updatedEvents = [...prevState];
      const event = updatedEvents[index];
      event.totalInterested += 1;
      return updatedEvents;
    });
  };


  return (
    <main>
      <Header />

      <DivContainer padding="2px" width="100%">
        <DivContainer display="flex" justifyContent="space-between" padding="40px 20px 10px 10px" width="100%">
          <p style={titleStyle}>My Events</p>
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
          <EventForm
            onSave={handleSubmitEvent}
            onDelete={handleCancelEvent}
          />
        )}

        <EventSection title="My Events" events={events} deleteEvent={deleteEvent} isPopular={false} joinEvent = {joinEvent} /> 
      </DivContainer>

      <EventSection title="Popular Events" events={popularEventsState} deleteEvent={deleteEvent} isPopular={true} joinEvent={joinEvent} />

      <Link href="/outside-campus">
        <p style={linkStyle}>Leaving LSU?</p>
      </Link>
    </main>
  );
}