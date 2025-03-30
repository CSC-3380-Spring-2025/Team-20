'use client';
import Button from "../app/EP-components/button";
import Header from "../app/EP-components/header";
import DivContainer from "../app/EP-components/containers";
import EventSection from "../app/EP-components/EventSection";
import { titleStyle, linkStyle } from "../app/styles/eventstyle";
import useEvents from "../app/hooks/useEvents";
import Link from "next/link";
import popularEvents from "./types/populareventsTypes"; // Import the default popular events

export default function Home() {
  const { events, addEvent, deleteEvent } = useEvents();

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
            onClick={addEvent}
          >
            Add Event
          </Button>
        </DivContainer>

        <EventSection title="My Events" events={events} deleteEvent={deleteEvent} isPopular={false} /> 
      </DivContainer>

      <EventSection title="Popular Events" events={popularEvents} deleteEvent={deleteEvent} isPopular={true} />

      <Link href="/outside-campus">
        <p style={linkStyle}>Leaving LSU?</p>
      </Link>
    </main>
  );
}