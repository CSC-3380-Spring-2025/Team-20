"use client";

import React, { useState} from "react";
import { MapPopup } from "@/event/components/mappopup";
import { FriendData } from "../type/friendtype";
import { Event } from "@/event/types/eventTypes";

interface PopupProps {
  isPopupOpen: boolean;
  onPopupClose: () => void;
  friendInfo: FriendData | null;
  events: Event[]; 
}

const MiniProfile: React.FC<PopupProps> = ({ friendInfo, events, isPopupOpen, onPopupClose }) => {
  const [showMapPopup, setShowMapPopup] = useState<boolean>(false);
  const [selectedEventCoordinates, setSelectedEventCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  if (!friendInfo || !isPopupOpen) return null;

  const filteredEvents = events.filter((event) => event.id === friendInfo.id);


  const handleShowMapPopup = (lat: number, lng: number) => {
    setSelectedEventCoordinates({ lat, lng });
    setShowMapPopup(true);
  };

  const handleCloseMapPopup = () => {
    setShowMapPopup(false);
    setSelectedEventCoordinates(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative animate-fade-in">
        <button
          onClick={onPopupClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-1">{friendInfo.name}</h2>
        <p className="text-sm text-gray-600 mb-4">
          Interests: {friendInfo.interests?.join(", ") || "None listed"}
        </p>

        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Upcoming Events</h3>
          {filteredEvents.length > 0 ? (
            <ul className="space-y-2 max-h-40 overflow-y-auto">
              {filteredEvents.map((event, i) => (
                <li
                  key={i}
                  className="border p-2 rounded bg-gray-50 shadow-sm cursor-pointer hover:bg-gray-100"
                  onClick={() => handleShowMapPopup(event.coordinates.lat, event.coordinates.lng)}
                >
                  {event.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No upcoming events</p>
          )}
        </div>

        {showMapPopup && selectedEventCoordinates && (
          <div className="mb-4">
            <MapPopup
              onClose={handleCloseMapPopup}
              onCoordinatesSelect={() => {}}
              initialCoordinates={[selectedEventCoordinates.lat, selectedEventCoordinates.lng]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniProfile;
