import React, { useState } from "react";
import EventForm from "../event/components/EventForm";

interface EventCardProps {
  eventData: EventCard;
  onCardClick: () => void;
}

const EventCard = ({ eventData, onCardClick }: EventCardProps) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);

  const handlePopupToggle = (event: React.MouseEvent) => {
    event.stopPropagation();
    setPopupVisible(!isPopupVisible);
    const formatTime = (timestamp: any): string => {
        const date = timestamp.toDate();
        const now = new Date();
      
        const isToday = date.toDateString() === now.toDateString();
        const isTomorrow = new Date(now.getTime() + 86400000).toDateString() === date.toDateString();
      
        const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
      
        if (isToday) return `tonight at ${date.toLocaleTimeString([], options)}`;
        if (isTomorrow) return `tomorrow at ${date.toLocaleTimeString([], options)}`;
        return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], options)}`;
      };
      

  };

  return (
    <div
      className="bg-white shadow-lg rounded-2xl overflow-hidden transition hover:scale-105 hover:shadow-xl duration-300 cursor-pointer relative"
      onClick={onCardClick}
    >
      <img src={eventData.image} alt={eventData.name} className="w-full h-52 object-cover" />
      <div className="p-4">
      <h3 className="text-xl font-bold" style={{ color: "#461D7C" }}>
  {eventData.name}
</h3>

        <p className="text-sm text-gray-500">{eventData.location}</p>   
        {eventData.totalInterested > 0 && (
  <p className="text-sm text-green-700 mt-2 font-medium">
    🎉 {eventData.totalInterested} {eventData.totalInterested === 1 ? "person is" : "people are"} going {formatTime(eventData.dateTime)}
  </p>
)}

        <div className="mt-2 flex flex-wrap gap-2">
          {eventData.tags.map((tag) => (
            <span key={tag} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
git a
        <button
  onClick={handlePopupToggle}
  className="mt-2 underline"
  style={{ color: "#461D7C" }}
>
  {isPopupVisible ? "Close" : "Open"}
</button>


      </div>

      {isPopupVisible && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    onClick={() => {
      setPopupVisible(false);
      setShowEventForm(false);
    }}
  >
    <div
      className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full relative max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
    >
      <button
        onClick={() => {
          setPopupVisible(false);
          setShowEventForm(false);
        }}
        className="absolute top-2 right-4 text-gray-600 text-xl"
      >
        ✖
      </button>

      <h2 className="text-xl font-bold mb-2">{eventData.name}</h2>
      <p className="text-sm text-gray-500 mb-4">{eventData.location}</p>

      <a
        href={eventData.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline mb-4 inline-block"
      >
        Visit Website
      </a>

      <hr className="my-4" />

      {!showEventForm ? (
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => setShowEventForm(true)}
        >
          Start Your Own Function
        </button>
      ) : (
        <div className="mt-6 bg-gray-100 p-4 rounded-xl shadow-inner max-h-[70vh] overflow-y-auto">
          <EventForm
            event={null}
            onSave={(data) => {
              console.log("New event saved:", data);
              setShowEventForm(false);
            }}
            onDelete={() => setShowEventForm(false)}
          />
        </div>
      )}
    </div>
  </div>
)}

    </div>
  );
};

export default EventCard;
