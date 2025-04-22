import { useState, useEffect } from "react";
import { Event } from "../types/eventTypes";
import { db } from "@/config/firebase";
import { 
  collection, doc, addDoc, deleteDoc, updateDoc, getDocs, 
   arrayUnion, arrayRemove 
} from "firebase/firestore";
import { useAuth } from "../../context/auth-context";

export default function useEvents() {
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [popularEvents, setPopularEvents] = useState<Event[]>([]);
  const [joinedEvents, setJoinedEvents] = useState<Event[]>([]);
  
  const eventsCollectionRef = collection(db, "events");
  const { user } = useAuth();

  useEffect(() => {
    fetchEventsCollection();
  }, []);

  const fetchEventsCollection = async () => {
    try {
      const eventData = await getDocs(eventsCollectionRef);
      const events = eventData.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }) as Event);

      // Filter events based on type
      setPopularEvents(events.filter(e => e.eventType === "current"));
      setMyEvents(events.filter(e => e.eventType === "own" && e.createdBy === user?.displayName));
      setJoinedEvents(events.filter(e => e.eventType === "joined"));
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };


  //maybe taking in id causing issue
  const addEvent = async (newEvent: Omit<Event, 'id'>) => {
    if (!user) return;

    try {
      const docRef = await addDoc(eventsCollectionRef, {
        ...newEvent,
        createdBy: user.displayName, // Store displayName directly
        eventType: "own",
        totalInterested: 0 // Start with 0, creator isn't automatically interested
      });

      // Update user's createdEvents
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        createdEvents: arrayUnion(docRef.id)
      });

      fetchEventsCollection(); // Refresh all events
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const joinEvent = async (eventId: string) => {
    if (!user) return;

    try {
      const eventDocRef = doc(db, "events", eventId);
      await updateDoc(eventDocRef, {
        eventType: "joined",
        totalInterested: arrayUnion(user.uid) // Track interested users by UID
      });

      fetchEventsCollection();
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  const deleteMyEvent = async (eventId: string) => {
    if (!user) return;

    try {
      // Delete event
      await deleteDoc(doc(db, "events", eventId));

      // Remove from user's createdEvents
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        createdEvents: arrayRemove(eventId)
      });

      fetchEventsCollection();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const leaveEvent = async (eventId: string) => {
    if (!user) return;

    try {
      const eventDocRef = doc(db, "events", eventId);
      await updateDoc(eventDocRef, {
        eventType: "current",
        totalInterested: arrayRemove(user.uid)
      });

      fetchEventsCollection();
    } catch (error) {
      console.error("Error leaving event:", error);
    }
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