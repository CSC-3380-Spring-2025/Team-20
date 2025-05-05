"use client";

"use client";

import React, { useState } from "react";
import Header from "../components/header";
import * as styles from "../outsideCampus/styles/ocstyle";
import { useHover } from "../outsideCampus/hooks/usehover";
import OptionsBar from "../outsideCampus/components/optionsbar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import EventCard from './EventCard';




type InterestCategory =
  | "Restaurants"
  | "Bars and Cafes"
  | "Parks and Recreation"
  | "Arcades"
  | "Monthly Events"
  | "City Life Calendar";

type Tag =
  | "music"
  | "blues"
  | "family-friendly"
  | "outdoor"
  | "flowers"
  | "art"
  | "food"
  | "free"
  | "community"
  | "theater"
  | "drama"
  | "indoor"
  | "easter"
  | "kids"
  | "sports"
  | "basketball"
  | "youth"
  | "tournament"
  | "environment"
  | "sustainability"
  | "concert"
  | "21+"
  |"haunted house" 
  |"Halloween"
  |"October"
  |"thrill"
  |"run" 
  |"family"
  |"Thanksgiving"
  |"fitness"
  |"Christmas"
  |"holiday"
  | "lights"
  |"family";
type EventCard = {
  name: string;
  link: string;
  location: string;
  tags: Tag[];
  interest: InterestCategory;
  image: string;
};

// Dummy events
const mockCards: EventCard[] = [
  {
    name: "Baton Rouge Blues Festival",
    link: "https://www.visitbatonrouge.com/blog/post/festival-season-is-upon-us/",
    location: "Downtown Baton Rouge",
    tags: ["music", "blues", "family-friendly", "outdoor"],
    interest: "Monthly Events",
    image:"",
  },
  {
    name: "Live After Five – April 4",
    link: "https://www.visitbatonrouge.com/blog/post/festival-season-is-upon-us/",
    location: "North Boulevard Town Square",
    tags: ["music", "free", "outdoor", "community"],
    interest: "Bars and Cafes",
    image:"",
  },
  {
    name: "Live After Five – April 11",
    link: "https://www.visitbatonrouge.com/blog/post/festival-season-is-upon-us/",
    location: "North Boulevard Town Square",
    tags: ["music", "free", "outdoor", "community"],
    interest: "Bars and Cafes",
    image:"",
  },
  {
    name: "Live After Five – April 25",
    link: "https://www.visitbatonrouge.com/blog/post/festival-season-is-upon-us/",
    location: "North Boulevard Town Square",
    tags: ["music", "free", "outdoor", "community"],
    interest: "Bars and Cafes",
    image:"",
  },
  {
    name: "Chicken Wagon",
    link: "https://www.chickenwagon.us",
    location: "1955 Staring Ln Ste A",
    tags: ["food"],
    interest: "Restaurants",
    image:"/assets/chickenwagon.jpg.avif",
  },
  {
    name: "Eggstravaganza at Independence Community Park",
    link: "https://www.visitbatonrouge.com/blog/post/things-to-do-in-baton-rouge-this-month/",
    location: "Independence Community Park",
    tags: ["easter", "family-friendly", "outdoor", "kids"],
    interest: "Parks and Recreation",
    image:"",
  },
  {
    name: "Red Storm Spring Break Bash 2025",
    link: "https://basketball.exposureevents.com/231377/red-storm-spring-break-bash-2025",
    location: "Team Sportsplex",
    tags: ["sports", "basketball", "youth", "tournament"],
    interest: "Arcades",
    image:"",
  },
  {
    name: "Earth Day Baton Rouge 2025",
    link: "https://www.eventbrite.com/e/earth-day-baton-rouge-2025-tickets-1260338379019",
    location: "Rhorer Plaza",
    tags: ["environment", "sustainability", "family-friendly", "outdoor"],
    interest: "Parks and Recreation",
    image:"",
  },
  {
    name: "Crawfish On The Geaux",
    link: "https://crawfishonthegeaux.com",
    location: "3655 Perkins Road",
    tags: ["food"],
    interest: "Restaurants",
    image:"/assets/crawfishonthegeaux.webp",
  },
  {
    name: "Spanish Town Mardi Gras Parade",
    link: "https://mardigrasspanishtown.com",
    location: "Main Street Baton Rouge",
    tags: ["art", "community", "family-friendly"],
    interest: "City Life Calendar",
    image: "/assets/spanishtown.jpg",
  },
  {
    name: "The Flower Fest",
    link: "https://www.visitbatonrouge.com/blog/post/festival-season-is-upon-us/",
    location: "Downtown Baton Rouge",
    tags: ["flowers", "art", "outdoor"],
    interest: "City Life Calendar",
    image: "/assets/flowerfest.jpeg",
  },
  {
    name: "Blue Bayou Water Park & Dixie Landin",
    link: "https://www.bluebayou.com",
    location: "18142 Perkins Rd E, Baton Rouge",
    tags: ["outdoor"],
    interest: "City Life Calendar",
    image: "/assets/waterpark.jpg",
  },
  {
    name: "Fireworks On The Mississippi",
    link: "https://www.visitbatonrouge.com/events/annual-events-festivals/fourth-of-july/",
    location: "Downtown Baton Rouge",
    tags: ["music", "community", "food", "outdoor"],
    interest: "City Life Calendar",
    image:"/assets/fireworks.jpg",
  },
  {
    name: "13th Gate Haunted House",
    link: "https://13thgate.com/",
    location: "832 St. Philip Street, Baton Rouge, LA",
    tags: ["haunted house", "Halloween", "October", "thrill"],
    interest: "City Life Calendar",
    image: "assets/13gate.jpg.webp.jpeg",
  },
  {
    name: "Turkey Trot Baton Rouge",
    link: "https://turkeytrotbr.com/",
    location: "Downtown Baton Rouge",
    tags: ["run", "family", "Thanksgiving", "fitness"],
    interest: "City Life Calendar",
    image: "/assets/turkeytrot.jpg",
  },
  {
    name: "Louisiana Light Show",
    link: "https://www.louisianalights.com/",
    location: "BREC’s State Fairgrounds, Baton Rouge, LA",
    tags: ["Christmas", "holiday", "lights", "family"],
    interest: "City Life Calendar",
    image: "/assets/lalights.jpg",
  },
  {
    name: "Aztecas Taco Truck",
    link: "https://www.facebook.com/SomosAztecas16/",
    location: "9414 Florida Blvd",
    tags: ["food"],
    interest: "Restaurants",
    image: "/assets/Aztecastaco.jpg",
  },
   {
      name: "Gunpowder Indian Cuisine",
      link: "http://www.gunpowderindiancuisine.com",
      location: "4410 Highland Rd",
      tags: ["food"],
      interest: "Restaurants",
      image: "/assets/gunpowder.webp",
    },
    {
      name: "Drunken Fish",
      link: "https://order.toasttab.com/online/drunken-fish-4410-highland-rd",
      location: "4410 Highland Rd",
      tags: ["food"],
      interest: "Restaurants",
      image: "/assets/drunkenfish.jpg",
    },
    {
      name: "Louie's Cafe",
      link: "https://louiescafe.com",
      location: "3322 Lake St",
      tags: ["food"],
      interest: "Restaurants",
      image: "/assets/louiescafe.jpg",
    },
    {
      name: "Prima Apres",
      link: "https://primaapres.com/",
      location: "4225 Nicholson Dr",
      tags: ["food"],
      interest: "Restaurants",
      image: "/assets/primaapres.jpg",
    },
    {
      name: "Roul's Deli",
      link: "https://roulsdeli.com",
      location: "3327 Highland Rd",
      tags: ["food"],
      interest: "Restaurants",
      image: "/assets/roulsdeli.jpg"
    },
  
    {
      name: "Seoul Stop",
      link: "https://www.instagram.com/seoulstopusa/",
      location: "7920 Florida Blvd",
      tags: ["food"],
      interest: "Restaurants",
      image: "/assets/seoulstop.jpg",
    },
  
];

export default function OutsideCampus() {
  const [Hovered, listener] = useHover();
  const router = useRouter();
  const [selectedInterest, setSelectedInterest] = useState<InterestCategory | "">("");
  const [events, setEvents] = useState<EventCard[]>(mockCards);

  const {user} = useAuth();
  if (!user) {
    return (
      <div>
        <h2>You need to log in to access this page.</h2>
        <button
          className="bg-green-500 border-r-5 font-serif hover:bg-green-300"
          onClick={() => router.push("/auth/login")}
        >
          Return to Login
        </button>
      </div>
    );
  }


  const handleCardClick = (index: number) => {
    const selectedEvent = filteredEvents[index];
  
    // Reorder only within the same category
    const reordered = [
      selectedEvent,
      ...filteredEvents.filter((e) => e.name !== selectedEvent.name),
    ];
  
    // Update the full event list to reflect this reordering
    const remainingEvents = events.filter((e) => e.interest !== selectedEvent.interest);
    setEvents([...remainingEvents, ...reordered]);
  };
  
  
  
  const filteredEvents = selectedInterest
    ? events.filter((e) => e.interest === selectedInterest)
    : events;
  
  return (
    <>
      <Header />
      <main>
      <div className="bg-orange-100 px-5 py-5 relative">
  {/* Left-aligned button */}
  <button
    style={{
      ...styles.backbutton,
      textDecoration: Hovered ? "underline" : "none",
    }}
    {...listener}
    onClick={() => router.push("/event")}
  >
    ← Events
  </button>

  {/* Centered text */}
  <p className="absolute inset-0 flex justify-center items-center pointer-events-none text-3xl font-bold text-purple-800 italic">
    Where the function at? 👀
  </p>
</div>

       

        {/* Options bar with hover buttons */}
        <OptionsBar
          selectedOption={selectedInterest}
          setSelectedOption={setSelectedInterest}
        />
  
  <div className="w-full px-6 py-10" style={{ backgroundColor: "#EDD03F" }}>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mx-auto max-w-[1600px]">
    {filteredEvents.map((event, index) => (
      <EventCard
        key={event.name}
        eventData={event}
        onCardClick={() => handleCardClick(index)}
      />
    ))}
  </div>
</div>

      </main>
    </>
  );
  }
  