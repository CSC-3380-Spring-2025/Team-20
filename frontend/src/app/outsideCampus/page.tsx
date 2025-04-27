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
    name: "The Flower Fest",
    link: "https://www.visitbatonrouge.com/blog/post/festival-season-is-upon-us/",
    location: "Downtown Baton Rouge",
    tags: ["flowers", "art", "outdoor"],
    interest: "Monthly Events",
    image: "https://batonrougefamilyfun.com/wp-content/uploads/2021/03/https___cdn.evbuc_.com_images_127474577_449775587308_1_original.jpeg",
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
    image:"https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/tfmqgwlo/828dce26-ed34-47b7-b027-b7bfb6fcac47.jpg",
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
    image:"https://img1.wsimg.com/isteam/ip/6e6b8138-52ed-4b34-bf81-e6ed5e8dfb9d/a0de3027-6fcc-4b12-8158-1bc9b54477ef.jpeg/:/",
  },
  {
    name: "Spanish Town Mardi Gras Parade",
    link: "https://mardigrasspanishtown.com",
    location: "Main Street Baton Rouge",
    tags: ["art", "community", "family-friendly"],
    interest: "City Life Calendar",
    image: "https://d1dxs113ar9ebd.cloudfront.net/225batonrouge/2023/12/DSC_3951-scaled.jpg?q=70&crop=faces&fit=crop&w=1300&h=600",
  },
  {
    name: "The Flower Fest",
    link: "https://www.visitbatonrouge.com/blog/post/festival-season-is-upon-us/",
    location: "Downtown Baton Rouge",
    tags: ["flowers", "art", "outdoor"],
    interest: "City Life Calendar",
    image: "https://batonrougefamilyfun.com/wp-content/uploads/2021/03/https___cdn.evbuc_.com_images_127474577_449775587308_1_original.jpeg",
  },
  {
    name: "Blue Bayou Water Park & Dixie Landin",
    link: "https://www.bluebayou.com",
    location: "18142 Perkins Rd E, Baton Rouge",
    tags: ["outdoor"],
    interest: "City Life Calendar",
    image: "https://static.wixstatic.com/media/dbb8f2_b16009d935ef429f9d3d03dd05fffd6f~mv2.jpg/v1/fill/w_1074,h_645,al_c,q_85/dbb8f2_b16009d935ef429f9d3d03dd05fffd6f~mv2.jpg",
  },
  {
    name: "Fireworks On The Mississippi",
    link: "https://www.visitbatonrouge.com/events/annual-events-festivals/fourth-of-july/",
    location: "Downtown Baton Rouge",
    tags: ["music", "community", "food", "outdoor"],
    interest: "City Life Calendar",
    image:"https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/batonrouge/Fireworks_at_Capitol_jpg_ae21bf6c-6575-4b8d-b632-0f257e305ebb.jpg",
  },
  {
    name: "13th Gate Haunted House",
    link: "https://13thgate.com/",
    location: "832 St. Philip Street, Baton Rouge, LA",
    tags: ["haunted house", "Halloween", "October", "thrill"],
    interest: "City Life Calendar",
    image: "https://townsquare.media/site/33/files/2023/10/attachment-Ghost-Manor.jpg"
  },
  {
    name: "Turkey Trot Baton Rouge",
    link: "https://turkeytrotbr.com/",
    location: "Downtown Baton Rouge",
    tags: ["run", "family", "Thanksgiving", "fitness"],
    interest: "City Life Calendar",
    image: "https://downtownbatonrouge.org/uploads/images/_1200x630_crop_center-center_82_none/turkeytrot.jpg?mtime=1700239288"
  },
  {
    name: "Louisiana Light Show",
    link: "https://www.louisianalights.com/",
    location: "BREC’s State Fairgrounds, Baton Rouge, LA",
    tags: ["Christmas", "holiday", "lights", "family"],
    interest: "City Life Calendar",
    image: "https://d1dxs113ar9ebd.cloudfront.net/225batonrouge/2024/10/LALIGHTS-19.jpg"
  }
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
        <div className="bg-orange-100 px-5 py-5 flex">
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
  
  <div
  className="p-4 rounded-xl max-w-3xl mx-auto mt-4"
  style={{ backgroundColor: "#EDD03F" }}
>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredEvents.map((event, index) => (
              <div
                key={event.name}
                className="bg-white shadow-lg rounded-2xl overflow-hidden transition hover:scale-105 hover:shadow-xl duration-300 cursor-pointer"
                onClick={() => handleCardClick(index)}
              >
                <img src={event.image} alt={event.name} className="w-full h-52 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-blue-700">{event.name}</h3>
                  <p className="text-sm text-gray-500">{event.location}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
  }
  