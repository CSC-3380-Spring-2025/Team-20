'use client';
 //please change when actually working on page .. move directory as such
 //transfer container styling to components. proceed to add event form
import Button from "../app/EP-components/button"; 
import Header from "../app/EP-components/header";
import DivContainer from "../app/EP-components/containers";
import { useState } from "react";
import Link from "next/link";

// Define types for events for better type safety
interface Event {
  title: string;
  description: string;
  total_interested: string;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([
    { title: "No Items Available", description: "", total_interested: "People Interested: 0" },
  ]);

  // Function to add a new event with random interest count
  const addEvent = () => {
    const newEvent = {
      title: "New Event",
      description: "Description for Event.",
      total_interested: `People Interested: ${Math.ceil(Math.random() * 10)}`, // Random number between 1 and 10
    };
    setEvents((prevState) => [...prevState, newEvent]); // Using functional update for state
  };

  // EventSection component that can be reused
  const EventSection = ({ title }: { title: string }) => (
    <DivContainer padding="2px" width="100%" marginTop="10px">
      <DivContainer display="flex" justifyContent="space-between" padding="40px 20px 10px 10px" width="100%">
        <p style={styles.Title1}>{title}</p>
      </DivContainer>

      <DivContainer
        width="100%"
        backgroundColor="#F2F2F7"
        marginTop="10px"
        borderRadius="10px"
        height="300px"
        overflowY="auto"
        position="relative"
      >
        <DivContainer width="100%" padding="6px" position="absolute">
          <DivContainer width="100%" padding="10px">
            {events.map((event, index) => (
              <DivContainer
                key={index}
                backgroundColor="white"
                padding="10px"
                marginBottom="20px"
                borderRadius="5px"
                width="100%"
              >
                <h1>{event.title}</h1>
                <small>{event.total_interested}</small>
                <p>{event.description}</p>
              </DivContainer>
            ))}
          </DivContainer>
        </DivContainer>
      </DivContainer>
    </DivContainer>
  );

  return (
    <main>
      <Header />

      <DivContainer padding="2px" width="100%">
        <DivContainer display="flex" justifyContent="space-between" padding="40px 20px 10px 10px" width="100%">
          <p style={styles.Title1}>My Events</p>
          {/** This button is currently placeholded as an automatic event adding. will be used later next week for actual form adding */}
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

        <DivContainer
          width="100%"
          backgroundColor="#F2F2F7"
          marginTop="10px"
          borderRadius="10px"
          height="300px"
          overflowY="auto"
          position="relative"
        >
          <DivContainer width="100%" padding="6px" position="absolute">
            <DivContainer width="100%" padding="10px">
              {events.map((event, index) => (
                <DivContainer
                  key={index}
                  backgroundColor="white"
                  padding="10px"
                  marginBottom="10px"
                  borderRadius="5px"
                  width="100%"
                >
                  <h1>{event.title}</h1>
                  <small>{event.total_interested}</small>
                  <p>{event.description}</p>
                </DivContainer>
              ))}
            </DivContainer>
          </DivContainer>
        </DivContainer>
      </DivContainer>

      <EventSection title="Popular Events" />

      <Link href="/EVENTLSU">
        <p style={{ ...styles.Title1, marginTop: "50px" }}>Leaving LSU?</p>
      </Link>
    </main>
  );
}

const styles = {
  Title1: {
    fontSize: "30px",
    padding: "1px 12px",
    fontWeight: "bold",
  },
};
