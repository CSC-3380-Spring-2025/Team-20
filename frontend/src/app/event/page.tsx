"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Timestamp } from "firebase/firestore";

// Components
import Header from "../components/header";
import DivContainer from "../components/containers";
import EventSection from "./components/eventSection";
import EventForm from "./components/EventForm";
import useEvents from "./hooks/useEvents";

// Styles
import * as styles from "./styles/eventStyle";

export default function Events() {
  const [showForm, setShowForm] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const { popularEvents, addEvent, joinEvent,} = useEvents();

  const handleAddEvent = () => setShowForm(true);
  const handleCancelEvent = () => setShowForm(false);

  const handleSubmitEvent = async (event: Parameters<typeof addEvent>[0]) => {
    if (isSubmitting) return; // Prevent duplicate submissions
    
    setIsSubmitting(true); // Start submission
    try {
      await addEvent({
        ...event,
        dateTime: event.dateTime instanceof Timestamp 
          ? event.dateTime 
          : Timestamp.fromDate(new Date(event.dateTime))
      });
      setShowForm(false);
      showTemporaryAlert(`Created ${event.title}`);
    } catch {
      alert("Failed to create event");
      showTemporaryAlert("Failed to create event");
    } finally {
      setIsSubmitting(false); // End submission
    }
  };

  const showTemporaryAlert = (message: string) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(null), 2000);
  };

 

  if (!user) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
        <h2 style={styles.headerStyle}>You need to log in to access this page.</h2>
        <button style={styles.cancelButton} onClick={() => router.push("/auth/login")}>
          Return to Login
        </button>
      </div>
    );
  }
  console.log("[DEBUG] joinEvent function:", joinEvent);
  return (
    <div style={{ marginBottom: "40px" }}>
      <Header />

      {alertMessage && (
        <DivContainer style={{position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'blue', color: 'white', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', zIndex: 1000}}>
          {alertMessage}
        </DivContainer>
      )}

      <DivContainer style={{ padding: "2px", width: "100%" }}>
        <DivContainer style={{display: "flex", justifyContent: "space-between",padding: "40px 20px 10px 10px",
           width: "100%"}}>

          <h1 style={styles.titleStyle}>Events</h1>
          <button  style={styles.joinButton} className=" bg-purple-950 hover:bg-purple-700" onClick={handleAddEvent} disabled={isSubmitting}>
            ➕ Add Event
          </button>
          
        </DivContainer>

    
        {showForm && (
          <EventForm onSave={handleSubmitEvent}  onDelete={handleCancelEvent} isSubmitting={isSubmitting}/>
        )

      
        }

        {user && (
          <>
            <EventSection  title="Current Events"  events={popularEvents}  onJoin={joinEvent} userId={user.uid}/>
          </>
        )}
           

      </DivContainer>

      <button style={styles.linkStyle} onClick={() => router.push("/outsideCampus")}>
        Leaving LSU?
      </button>
    </div>
  );
}