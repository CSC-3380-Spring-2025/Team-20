// replace whatever is in page.tsx inside this
"use client";
import { FC, useState } from "react";
import * as styles from "../styles/eventformstyle";
import {Event} from "../types/eventTypes";
import { useRouter } from "next/navigation";

//listen to event from eventtypes
interface EventForm {
    onSave: (event: Event) => void;
    onDelete: () => void;
}
  
const EventForm: FC<EventForm> = ({onSave, onDelete}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();
    

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        //use new event object when saved

    
        //creates new object of user's own event
        const newEvent: Event = {
            title: title.trim(),
            description: description.trim(),
            totalInterested:0,
          };

        //call the function
        onSave(newEvent);

        //reset. had issues when it would save previous input
        setTitle("");
        setDescription("");
        
    }

    
    return (
        //creating a new form
        <>
        <form onSubmit={handleSave} style={styles.container}>
            <p style={styles.header}>Your New Event</p>

            
            <label htmlFor="title" style={styles.subtitleHeaders}>Title of Event</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={styles.input}
            >
            </input>

            

            <label htmlFor="description"  style={styles.subtitleHeaders}>Description </label>
            <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.input}
            >
            </input>
           

            {/**TODO: Replace Link with Map*/}
            <label htmlFor="Map"  style={styles.subtitleHeaders}>Add Location </label>
            <button className="bg-red-300 rounded-md hover:bg-red-400" onClick={() => router.push("/campus-outside")}>
                Go to Map
            </button>

            <div style={styles.buttonContainer}>
                <button type="submit" style={styles.submitButton}>Submit</button>
                <button type="button" onClick={onDelete} style={styles.cancelButton}>Cancel</button>
            </div>

        </form>
        </>

    );

}

export default EventForm; 