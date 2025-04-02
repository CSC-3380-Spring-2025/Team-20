// replace whatever is in page.tsx inside this
import { FC, useState } from "react";
import * as styles from "../styles/eventformstyle";
import {Event} from "../types/eventTypes";

//listen to event from eventtypes

interface EventForm {
    onSave: (event: Event) => void;
    onDelete: () => void;
}
  

/**
 * 
 * export interface Event {
  title: string;
  description: string;
  totalInterested: string; 
}
 */
const EventForm: FC<EventForm> = ({onSave, onDelete}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        //use new event object when saved

        if (!title.trim() || !description.trim()) {
            return; 
        }

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

            

            <div style={styles.buttonContainer}>
                <button type="submit" style={styles.submitButton}>Submit</button>
                <button type="button" onClick={onDelete} style={styles.cancelButton}>Cancel</button>
            </div>

        </form>
        </>

    );

}

export default EventForm; 