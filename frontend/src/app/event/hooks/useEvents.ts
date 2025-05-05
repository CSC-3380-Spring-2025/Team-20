//hook to handle all functionality like add events, delete, join, leave, and fetching all of this to distinguish between sections

import { useState, useEffect } from "react";
import { Event } from "../types/eventTypes";

import { db } from "@/config/firebase";
import {collection, doc, addDoc, deleteDoc, updateDoc, getDocs, getDoc, GeoPoint, Timestamp, increment} from "firebase/firestore";
import { useAuth } from "../../context/auth-context";

export default function useEvents() {
  //user's own, joined and then current stored as an object array
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [joinedEvents, setJoinedEvents] = useState<Event[]>([]);
  const [popularEvents, setPopularEvents] = useState<Event[]>([]);

  //retrieve  + auth
  const eventsCollectionRef = collection(db, "events");
  const { user } = useAuth();

  //helper to display user's name. h
  const fetchUserDisplayName = async (uid: string): Promise<string> => {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);
    return userDocSnap.exists() ? userDocSnap.data()?.displayName || "" : "";
  };

  //validating coordinates are actual numbers. will fix later for map function
  const areCoordinatesValid = (
    coordinates: { lat: number; lng: number } | undefined | null): boolean => {
    return coordinates !== undefined && coordinates !== null && typeof coordinates.lat === "number" && typeof coordinates.lng === "number";
  };



  //fetching events
  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user]);

  //my fetch events (this took so long). 
  //explanation:
    //handling only if this user signed in. implemetned try catch for easy debugging
   
  const fetchEvents = async () => {
    if (!user) return;

   
  
    try {

      const eventData = await getDocs(eventsCollectionRef);

      const events = await Promise.all(
        eventData.docs.map(async (docSnap) => {
          const event = docSnap.data() as Event;

          // Handle coordinates. change with map 
          if (event.coordinates instanceof GeoPoint) {
            event.coordinates = {
              lat: event.coordinates.latitude,
              lng: event.coordinates.longitude,
            };
          } else if (!areCoordinatesValid(event.coordinates)) {
            event.coordinates = { lat: 0, lng: 0 };
          }

          // Handle createdBy displayName
          let createdByDisplayName = "";
          let createdByUid = "";

          if (event.createdBy) {
            createdByUid = event.createdBy;
            createdByDisplayName = await fetchUserDisplayName(createdByUid) || createdByUid;
          }

          return {
            ...event,
            createdBy: createdByDisplayName,
            createdByUid,
            id: docSnap.id,
          };
        })
      );


      //after retireving 
      const myOwnEvents = events.filter((e) => e.userid === user.uid);
      const othersEvents = events.filter((e) => e.userid !== user.uid);
    
    // Events you've joined (from other users)
      const myJoinedEvents = othersEvents.filter((e) => e.totalInterested && e.totalInterested > 0);
    
    // Events you CAN join (not yours, not already joined)
      const popularEvents = othersEvents.filter(e => 
        !myJoinedEvents.some(je => je.id === e.id)
      );

      setMyEvents(myOwnEvents);
      setJoinedEvents(myJoinedEvents);
      setPopularEvents(popularEvents);


   
  
    } catch {
      console.log("Error fetching events:");
    }
  };


  //make sure to have add evnet to 




  const addEvent = async (newEvent: Omit<Event, "id" | "createdBy" | "totalInterested">) => {
    if (!user) return;

    try {

      //change with map function
      if (!areCoordinatesValid(newEvent.coordinates)) {
        alert("Invalid coordinates provided for event:");
        return;
      }

      const displayName = await fetchUserDisplayName(user.uid);

      const eventToAdd = {
        ...newEvent,
        coordinates: new GeoPoint(newEvent.coordinates.lat, newEvent.coordinates.lng),
        createdBy: displayName,
        totalInterested: 0,
        dateTime: Timestamp.fromDate(new Date()),
        userid: user.uid,
      };

      const docRef = await addDoc(eventsCollectionRef, eventToAdd);
      const uiEvent: Event = {
        ...eventToAdd,
        id: docRef.id,
        coordinates: { lat: eventToAdd.coordinates.latitude, lng: eventToAdd.coordinates.longitude },
      };

      setMyEvents((prev) => [...prev, uiEvent]);
    } catch {
      console.log("Error adding event");
    }
  };




//join and leave both increment and decrement totalinterested. then refresh
  const joinEvent = async (eventId: string) => {
    if (!user) return;

    try {
      const eventDocRef = doc(db, "events", eventId);
      await updateDoc(eventDocRef, {
        totalInterested: increment(1),
      });

      fetchEvents();
    } catch {
      console.log("Error joining event:");
    }
  };


  const leaveEvent = async (eventId: string) => {
    if (!user) return;

    try {
      const eventDocRef = doc(db, "events", eventId);
      await updateDoc(eventDocRef, {
        totalInterested: increment(-1),
      });

      fetchEvents();
    } catch {
      console.log("Error adding event");
    }
  };

  const deleteMyEvent = async (eventId: string) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, "events", eventId));
      setMyEvents((prev) => prev.filter((event) => event.id !== eventId));
      fetchEvents();
    } catch {
      console.log("Error adding event");
    }
  };



//page.tsx
  return {
    myEvents,
    popularEvents,
    joinedEvents,
    addEvent,
    deleteMyEvent,
    joinEvent,
    leaveEvent,
    fetchEvents
  };

}
