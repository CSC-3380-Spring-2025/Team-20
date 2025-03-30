// useEvents.ts
import { useState } from "react";
import { Event } from "../types/eventTypes";
const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([
    { title: "No Items Available", description: "", totalInterested: 0 },
  ]);

  const addEvent = (newEvent: Event) => {
    setEvents((prevState) => [...prevState, newEvent]);
  };

  const deleteEvent = (index: number) => {
    setEvents((prevState) => prevState.filter((_, i) => i !== index));
  };

  const joinEvent = (index: number) => {
    const updatedEvents = [...events];
    updatedEvents[index].totalInterested += 0;
    setEvents(updatedEvents);
  };


  return {
    events,
    addEvent,
    deleteEvent,
    joinEvent,
  };
};

export default useEvents;
