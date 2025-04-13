//eventpage-extended;
import React, { useState } from 'react';

type InterestCategory =
  | 'restaurants'
  | 'bars and cafes'
  | 'parks and recreation'
  | 'arcades'
  | 'monthly';

type Tag =
  | 'music'
  | 'blues'
  | 'family-friendly'
  | 'outdoor'
  | 'flowers'
  | 'art'
  | 'food'
  | 'free'
  | 'community'
  | 'theater'
  | 'drama'
  | 'indoor'
  | 'easter'
  | 'kids'
  | 'sports'
  | 'basketball'
  | 'youth'
  | 'tournament'
  | 'environment'
  | 'sustainability'
  | 'concert'
  | '21+';

type EventCard = {
  name: string;
  link: string;
  location: string;
  tags: Tag[];
  interest: InterestCategory;
};

const mockCards: EventCard[] = [
  {
    name: 'Baton Rouge Blues Festival',
    link: 'https://www.visitbatonrouge.com/blog/post/festival-season-is-upon-us/',
    location: 'Downtown Baton Rouge',
    tags: ['music', 'blues', 'family-friendly', 'outdoor'],
    interest: 'monthly'
  },
  {
    name: 'The Flower Fest',
    link: 'https://www.visitbatonrouge.com/blog/post/festival-season-is-upon-us/',
    location: 'Downtown Baton Rouge',
    tags: ['flowers', 'art', 'food', 'outdoor'],
    interest: 'monthly'
  },
  {
    name: 'Live After Five – April 4',
    link: 'https://www.visitbatonrouge.com/blog/post/festival-season-is-upon-us/',
    location: 'North Boulevard Town Square',
    tags: ['music', 'free', 'outdoor', 'community'],
    interest: 'bars and cafes'
  },
  {
    name: 'Live After Five – April 11',
    link: 'https://www.visitbatonrouge.com/blog/post/festival-season-is-upon-us/',
    location: 'North Boulevard Town Square',
    tags: ['music', 'free', 'outdoor', 'community'],
    interest: 'bars and cafes'
  },
  {
    name: 'Live After Five – April 25',
    link: 'https://www.visitbatonrouge.com/blog/post/festival-season-is-upon-us/',
    location: 'North Boulevard Town Square',
    tags: ['music', 'free', 'outdoor', 'community'],
    interest: 'bars and cafes'
  },
  {
    name: 'Little Women at Theatre Baton Rouge',
    link: 'https://www.visitbatonrouge.com/blog/post/things-to-do-in-baton-rouge-this-month/',
    location: 'Theatre Baton Rouge',
    tags: ['theater', 'drama', 'indoor', 'art'],
    interest: 'restaurants'
  },
  {
    name: 'Eggstravaganza at Independence Community Park',
    link: 'https://www.visitbatonrouge.com/blog/post/things-to-do-in-baton-rouge-this-month/',
    location: 'Independence Community Park',
    tags: ['easter', 'family-friendly', 'outdoor', 'kids'],
    interest: 'parks and recreation'
  },
  {
    name: 'Red Storm Spring Break Bash 2025',
    link: 'https://basketball.exposureevents.com/231377/red-storm-spring-break-bash-2025',
    location: 'Team Sportsplex',
    tags: ['sports', 'basketball', 'youth', 'tournament'],
    interest: 'arcades'
  },
  {
    name: 'Earth Day Baton Rouge 2025',
    link: 'https://www.eventbrite.com/e/earth-day-baton-rouge-2025-tickets-1260338379019',
    location: 'Rhorer Plaza',
    tags: ['environment', 'sustainability', 'family-friendly', 'outdoor'],
    interest: 'parks and recreation'
  },
  {
    name: 'KC and The Sunshine Band Concert',
    link: 'https://www.axs.com/events/766308/kc-and-the-sunshine-band-21-event-tickets',
    location: "L'Auberge Casino & Hotel",
    tags: ['music', 'concert', '21+', 'indoor'],
    interest: 'restaurants'
  }
];

const interestOptions: InterestCategory[] = [
  'restaurants',
  'bars and cafes',
  'parks and recreation',
  'arcades',
  'monthly'
];

export function EventSelector() {
  const [selectedInterest, setSelectedInterest] = useState<InterestCategory | ''>('');
  const [events, setEvents] = useState<EventCard[]>(mockCards);

  const handleCardClick = (index: number) => {
    const newEvents = [...filteredEvents];
    const [selected] = newEvents.splice(index, 1);
    setEvents([selected, ...events.filter((e) => e.name !== selected.name)]);
  };

  const filteredEvents = selectedInterest
    ? events.filter((e) => e.interest === selectedInterest)
    : events;

  return (
    <div className="p-6 bg-orange-100 rounded-xl max-w-4xl mx-auto">
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Choose Interest
        </label>
        <select
          value={selectedInterest}
          onChange={(e) =>
            setSelectedInterest(e.target.value as InterestCategory | '')
          }
          className="w-full p-2 rounded-md border border-gray-300"
        >
          <option value="">-- Show All --</option>
          {interestOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredEvents.map((event, index) => (
          <div
            key={event.name}
            className="bg-white shadow rounded-lg p-4 cursor-pointer hover:bg-orange-50"
            onClick={() => handleCardClick(index)}
          >
            <h3 className="text-lg font-semibold text-blue-600">
              <a href={event.link} target="_blank" rel="noopener noreferrer">
                {event.name}
              </a>
            </h3>
            <p className="text-sm text-gray-600">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  event.location
                )}`}
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
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
