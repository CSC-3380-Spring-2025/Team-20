
import {Timestamp } from "firebase/firestore";

export interface Event {
  id? : string,
  title: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  }
  dateTime: Timestamp;
  createdBy: string;
  totalInterested: number;
  eventType: "own" | "current" | "joined";
}
