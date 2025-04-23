import { useState } from "react";
import { Event } from "../types/eventTypes";

interface EventSectionProps {
  title: string;
  events: Event[];
  onDelete?: (id: string) => void;
  onLeave?: (id: string) => void;
  onJoin?: (id: string) => void;
  userId: string;
}

export default function EventSection({ title, events, onDelete, onLeave, onJoin, userId,}  : EventSectionProps) {


  const [dropDown, setDropDown] = useState<Record<string, boolean>>({});
  const toggleExpand = (id: string) => {setDropDown((prev) => ({ ...prev, [id]: !prev[id] }));};


  return (

    <div className="p-4 my-5 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-bold px-3 py-1 mb-4">{title}</h2>

      {events.length === 0 ? (<p className="text-gray-400 pl-3 mt-2">No events available.</p>) : (

        <div>
          {events.map((event) => {


            //filter each event
            const eventId = event.id;
            const expanded = dropDown[eventId as string];

            //below inclues the title of event, then the creator and button option (depending on event type) and then the the dropdown functionality

            return (

              <div  key={eventId}  className="bg-white rounded-lg p-4 my-3 shadow-sm border-l-4 border-blue-400">

                <div className="flex justify-between items-center">

                  <div>
                    <h3 className="m-0 text-gray-800 text-lg font-bold">{event.title}</h3>

                    <p className="mt-1 text-gray-500 text-sm">
                      <span className="font-semibold"> Creator:</span> 
                      {event.createdBy}
                    </p>


                  </div>
                  

                  <div className="flex items-center gap-2">
                    <div className="flex gap-2">

                      {onJoin && userId !== event.createdBy && (

                        <button className="px-3 py-1.5 bg-purple-600 text-white rounded font-bold text-sm min-w-[70px]" onClick={() => onJoin(eventId as string)}>
                          Join
                        </button>

                      )}

                      {onLeave && userId !== event.createdBy && (
                        <button  className="px-3 py-1.5 bg-yellow-300 text-white rounded font-bold text-sm min-w-[70px]" onClick={() => onLeave(eventId as string)}>
                          Leave
                        </button>
                      )}


                      {onDelete && userId !== event.createdBy && (
                        <button className="px-3 py-1.5 bg-yellow-300 text-white rounded font-bold text-sm min-w-[70px]" onClick={() => onDelete(eventId as string)}>
                          Delete
                        </button>
                      )}


                    </div>
                    
                    <button className="px-3 py-1.5 bg-gray-200 rounded font-bold text-sm min-w-[80px]" onClick={() => toggleExpand(eventId as string)} >
                      {expanded ? "Hide " : "Show"}
                    </button>


                  </div>
                </div>



                {expanded && (


                  <div className="mt-3 p-4 bg-gray-50 rounded text-sm w-full">


                      <div className="flex-1">

                        <p className="block">
                          <span className="font-semibold">When:</span> {event.dateTime.toDate().toLocaleString()}
                        </p>

                        <p className="block">
                          <span className="font-semibold">Location:</span> {event.coordinates.lat}, {event.coordinates.lng}
                        </p>

                      </div>
                      
                      <div className="flex-1">

                        <p className="text-gray-700">{event.description}</p>
                        <p className="mt-2 text-gray-500">
                          {event.totalInterested} interested
                        </p>

                      </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}