import { useState } from 'react';
import { Event } from '../types/eventTypes';

const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([
    { title: "No Items Available", description: "", totalInterested: "People Interested: 0" },
  ]);

  // Function to add a new event with random interest count
  const addEvent = () => {
    const newEvent = {
      title: "New Event",
      description: "Description for Event.",
      totalInterested: `People Interested: ${Math.ceil(Math.random() * 10)}`, // Use totalInterested
    };
    setEvents((prevState) => [...prevState, newEvent]);
  };

  // Function to delete an event by its index
  const deleteEvent = (index: number) => {
    setEvents((prevState) => prevState.filter((_, i) => i !== index)); // Removes event at the given index
  };

  return {
    events,
    addEvent,
    deleteEvent,
  };
};

export default useEvents;

