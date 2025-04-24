"use client";
import { useState } from 'react';
import { db } from '../../config/firebase';
import { Timestamp, getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import * as styles from '../styles/eventFormStyle';
import { Event } from '../types/eventTypes';
import { MapPopup } from './mappopup';

interface EventFormProps {
  onSave: (event: Omit<Event, 'id'>) => Promise<void> | void;
  onDelete: () => void;
  isSubmitting?: boolean;
}


const EventForm = ({ onSave,  onDelete, isSubmitting = false
}: EventFormProps) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState<Timestamp>(Timestamp.now());
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [error, setError] = useState<string | null>(null);
  const [showMapPopup, setShowMapPopup] = useState(false);

  const auth = getAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setError(null);
    
    const user = auth.currentUser;
    if (!user) {
      setError("You must be logged in to create an event.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      if (!userDocSnap.exists()) {
        setError("User profile not found.");
        return;
      }

      const userData = userDocSnap.data();
      const newEvent: Omit<Event, 'id'> = {  title, description,  coordinates, dateTime, totalInterested: 0, createdBy: userData.displayName,
        userid: user.uid,
      };

      await onSave(newEvent);
      
      setTitle("");
      setDescription("");
      setDateTime(Timestamp.now());
      setCoordinates({ lat: 0, lng: 0 });
      
    } catch  {
      alert("Error");
      setError("Failed to create event");
    }
  };


  //if they edit it
  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      setDateTime(Timestamp.fromDate(date));
    }
  };

 
  return (
    <div style={styles.overlay}>
      <form onSubmit={handleSubmit} style={styles.container}>
        <div style={styles.Titleheader}>Create New Event</div>
        
        {error && (
          <div style={{ color: 'red', margin: '10px 0' }}>
            {error}
          </div>
        )}

        <div style={styles.inputContainers}>
          <label>Title</label>
          <input  type="text"  value={title}  onChange={(e) => setTitle(e.target.value)} style={styles.input} required  disabled={isSubmitting}/>
        </div>

        <div style={styles.inputContainers}>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={styles.input} required disabled={isSubmitting}/>
        </div>

        <div style={styles.inputContainers}>
          <label>Date and Time</label>
          <input type="datetime-local"  value={dateTime.toDate().toISOString().slice(0, 16)} onChange={handleDateTimeChange} style={styles.input}
            required disabled={isSubmitting}/>
        </div>

        <div style={styles.inputContainers}>
          <label>Select Location (Coordinates)</label>
            <button 
                type="button" 
                className="bg-red-300 rounded-md hover:bg-red-400" 
                onClick={() => setShowMapPopup(true)}
                style={{ marginBottom: "10px" }}>
                Go to Map
            </button>
        </div>

        {location && (
          <div style={{ 
            margin: '10px 0',
            padding: '8px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            <label>Selected Location:</label><br />
            Latitude: {coordinates.lat.toFixed(5)}<br />
            Longitude: {coordinates.lng.toFixed(5)}
          </div>
          )}


        <div style={styles.buttonContainer}>
          <button  type="submit" style={styles.submitButton} disabled={isSubmitting} >
            {isSubmitting ? "Creating..." : "Create Event"}
          </button>

          <button type="button"  onClick={onDelete} style={styles.cancelButton} disabled={isSubmitting} >
            Cancel
          </button>

             
        </div>
      

      </form>
      {showMapPopup && (
        <MapPopup
          onClose={() => setShowMapPopup(false)}
          onCoordinatesSelect={(lat, lng) => {
            setCoordinates({ lat, lng });
            setShowMapPopup(false);
          }}
        />
      )} 
    </div>
  );
};

export default EventForm;