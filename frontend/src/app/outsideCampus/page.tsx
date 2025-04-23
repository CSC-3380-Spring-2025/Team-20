"use client";

"use client";

import React, { useState } from "react";
import Header from "../components/header";
import * as styles from "../outsideCampus/styles/ocstyle";
import { useHover } from "../outsideCampus/hooks/usehover";
import OptionsBar from "../outsideCampus/components/optionsbar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

type InterestCategory =
  | "Restaurants"
  | "Bars and Cafes"
  | "Parks and Recreation"
  | "Arcades"
  | "Monthly Events";

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
  | "21+";

type EventCard = {
  name: string;
  link: string;
  location: string;
  tags: Tag[];
  interest: InterestCategory;
};

// Dummy events
const mockCards: EventCard[] = [
  {
    name: "Baton Rouge Blues Festival",
    link: "https://www.visitbatonrouge.com/blog/post/festival-season-is-upon-us/",
    location: "Downtown Baton Rouge",
    tags: ["music", "blues", "family-friendly", "outdoor"],
    interest: "Monthly Events",
  },
  {
    name: "The Flower Fest",
    link: "https://www.visitbatonrouge.com/blog/post/festival-season-is-upon-us/",
    location: "Downtown Baton Rouge",
    tags: ["flowers", "art", "food", "outdoor"],
    interest: "Monthly Events",
  },
  {
    name: "Live After Five – April 4",
    link: "https://www.visitbatonrouge.com/blog/post/festival-season-is-upon-us/",
    location: "North Boulevard Town Square",
    tags: ["music", "free", "outdoor", "community"],
    interest: "Bars and Cafes",
  },
  {
    name: "Live After Five – April 11",
    link: "https://www.visitbatonrouge.com/blog/post/festival-season-is-upon-us/",
    location: "North Boulevard Town Square",
    tags: ["music", "free", "outdoor", "community"],
    interest: "Bars and Cafes",
  },
  {
    name: "Live After Five – April 25",
    link: "https://www.visitbatonrouge.com/blog/post/festival-season-is-upon-us/",
    location: "North Boulevard Town Square",
    tags: ["music", "free", "outdoor", "community"],
    interest: "Bars and Cafes",
  },
  {
    name: "Little Women at Theatre Baton Rouge",
    link: "https://www.visitbatonrouge.com/blog/post/things-to-do-in-baton-rouge-this-month/",
    location: "Theatre Baton Rouge",
    tags: ["theater", "drama", "indoor", "art"],
    interest: "Restaurants",
  },
  {
    name: "Eggstravaganza at Independence Community Park",
    link: "https://www.visitbatonrouge.com/blog/post/things-to-do-in-baton-rouge-this-month/",
    location: "Independence Community Park",
    tags: ["easter", "family-friendly", "outdoor", "kids"],
    interest: "Parks and Recreation",
  },
  {
    name: "Red Storm Spring Break Bash 2025",
    link: "https://basketball.exposureevents.com/231377/red-storm-spring-break-bash-2025",
    location: "Team Sportsplex",
    tags: ["sports", "basketball", "youth", "tournament"],
    interest: "Arcades",
  },
  {
    name: "Earth Day Baton Rouge 2025",
    link: "https://www.eventbrite.com/e/earth-day-baton-rouge-2025-tickets-1260338379019",
    location: "Rhorer Plaza",
    tags: ["environment", "sustainability", "family-friendly", "outdoor"],
    interest: "Parks and Recreation",
  },
  {
    name: "KC and The Sunshine Band Concert",
    link: "https://www.axs.com/events/766308/kc-and-the-sunshine-band-21-event-tickets",
    location: "L'Auberge Casino & Hotel",
    tags: ["music", "concert", "21+", "indoor"],
    interest: "Restaurants",
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
    const newEvents = [...filteredEvents];
    const [selected] = newEvents.splice(index, 1);
    setEvents([selected, ...events.filter((e) => e.name !== selected.name)]);
  };

  const filteredEvents = selectedInterest
    ? events.filter((e) => e.interest === selectedInterest)
    : events;

  return (
    <>
      <Header />
      <main>
        <div className="bg-yellow-100 px-5 py-5 flex" >

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
        </div>

        {/* Options bar with hover buttons */}
        <OptionsBar
          selectedOption={selectedInterest}
          setSelectedOption={setSelectedInterest}
        />

          <div className="p-4 bg-yellow-100 rounded-xl max-w-3xl mx-auto mt-4"> {/* mt-4 added */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredEvents.map((event, index) => (
              <div key={event.name} className="bg-white shadow rounded-lg p-4 cursor-pointer hover:bg-yellow-200" onClick={() => handleCardClick(index)}
            >
              <h3 className="text-lg font-semibold text-purple-600">
                <a href={event.link} target="_blank" rel="noopener noreferrer">
                  {event.name}
                </a>
              </h3>
                <p className="text-sm text-gray-600">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(event.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {event.location}
                  </a>
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
