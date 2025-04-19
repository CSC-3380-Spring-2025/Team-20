"use client";
import { FC, useState } from "react";
import * as styles from "../styles/eventFormStyle";
import { Event } from "../types/eventTypes";
import { MapPopup } from "./mappopup";

interface EventForm {
    onSave: (event: Event) => void;
    onDelete: () => void;
}

const EventForm: FC<EventForm> = ({ onSave, onDelete }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [showMapPopup, setShowMapPopup] = useState(false);
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const newEvent: Event = {
            title: title.trim(),
            description: description.trim(),
            totalInterested: 0,
            ...(location && { location }),
        };
        onSave(newEvent);
        setTitle("");
        setDescription("");
        setLocation(null);
    };

    return (
        <div style={{ position: 'relative' }}>
            {/* Main Form */}
            <form onSubmit={handleSave} style={styles.container}>
                <p style={styles.header}>Your New Event</p>

                <label htmlFor="title" style={styles.subtitleHeaders}>Title of Event</label>
                <input 
                    type="text" 
                    id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    style={styles.input}
                    required
                />

                <label htmlFor="description" style={styles.subtitleHeaders}>Description</label>
                <input 
                    type="text" 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    style={styles.input}
                />

                <label htmlFor="Map" style={styles.subtitleHeaders}>Add Location</label>
                <button 
                    type="button" 
                    className="bg-red-300 rounded-md hover:bg-red-400" 
                    onClick={() => setShowMapPopup(true)}
                    style={{ marginBottom: "10px" }}
                >
                    Go to Map
                </button>

                {/* Selected Coordinates */}
                {location && (
                    <div style={{ 
                        margin: '10px 0',
                        padding: '8px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '4px',
                        fontSize: '14px'
                    }}>
                        <label>Selected Location:</label><br />
                        Latitude: {location.lat.toFixed(5)}<br />
                        Longitude: {location.lng.toFixed(5)}
                    </div>
                )}

                <div style={styles.buttonContainer}>
                    <button type="submit" style={styles.submitButton}>Submit</button>
                    <button type="button" onClick={onDelete} style={styles.cancelButton}>Cancel</button>
                </div>
            </form>
            
            {showMapPopup && (
                <MapPopup 
                    onClose={() => setShowMapPopup(false)}
                    onLocationSelect={(lat, lng) => {
                        setLocation({ lat, lng });
                        setShowMapPopup(false);
                    }}
                />
            )}
        </div>
    );
};

export default EventForm;