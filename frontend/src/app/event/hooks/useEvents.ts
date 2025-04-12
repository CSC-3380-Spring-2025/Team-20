//handles all the functionalities/listeners for any event in general. 
import { useState } from "react";
import { Event } from "../types/eventTypes";

//dummy events. used in current events container, will be replaced with actual events people have created
const initialEvents: Event[] = [
  { title: "Yoga at U-Rec", description: "Join us for a 1 hour session! All are welcome :)", totalInterested: 12 },
  { title: "Music Fest with Classical Club", description: "Enjoy live performances from local bands and artists.", totalInterested: 6 },
  { title: "Hackathon 2025", description: "A 24-hour coding challenge with exciting prizes.", totalInterested: 3 },
  { title: "Board Game Night in Magnolia Room", description: "Join us for a fun evening of board games and snacks.", totalInterested: 5 },
  { title: "Hangout near Nicholson", description: "Anyone welcome!", totalInterested: 10 },
];


export default function useEvents() {

  //user has acess to their own events and current events (popular is interchangable).
  //current and joined events are interchangable. 
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [popularEvents, setPopularEvents] = useState<Event[]>(initialEvents);
  const [joinedEvents, setJoinedEvents] = useState<Event[]>([]);

  //add event function
  const addEvent = (newEvent: Event) => {
    if (newEvent.title && newEvent.description) {
      setMyEvents(prev => [...prev, newEvent]);
    }
  };

  //join event function
  const joinEvent = (index: number) => {
    const eventToJoin = popularEvents[index];
    const updatedPopularEvents = popularEvents.filter((_, i) => i !== index);
    
    setPopularEvents(updatedPopularEvents);
    setJoinedEvents(prev => [...prev, {
      ...eventToJoin,
      totalInterested: eventToJoin.totalInterested + 1
    }]);
  };

  //delete user's own event
  const deleteMyEvent = (index: number) => {
    setMyEvents(prev => prev.filter((_, i) => i !== index));
  };


  //leave joined event
  const leaveEvent = (index: number) => {
    const eventToLeave = joinedEvents[index];
    const updatedJoinedEvents = joinedEvents.filter((_, i) => i !== index);
    
    setJoinedEvents(updatedJoinedEvents);
    setPopularEvents(prev => [...prev, {
      ...eventToLeave,
      totalInterested: Math.max(0, eventToLeave.totalInterested - 1)
    }]);
  };

  return { 
    myEvents, 
    popularEvents, 
    joinedEvents, 
    addEvent, 
    deleteMyEvent, 
    joinEvent, 
    leaveEvent 
  };
}