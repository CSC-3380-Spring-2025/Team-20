import DivContainer from "../../components/containers";
import { Event } from "../types/eventTypes";
import * as estyle from "../styles/eventStyle";

interface EventSectionProps {
  title: string;
  events: Event[];
  onDelete?: (id: string) => void;
  onLeave?: (id: string) => void;
  onJoin?: (id: string) => void;
}

export default function EventSection({
  title,
  events,
  onDelete,
  onLeave,
  onJoin,
}: EventSectionProps) {
  return (
    <DivContainer padding="15px" margin="20px 0" backgroundColor="#f9f9f9" borderRadius="8px">
      <h2 style={estyle.headerStyle}>{title}</h2>

      {events.length === 0 ? (
        <p style={estyle.defaultText}>No events available.</p>
      ) : (
        <div>
          {events.map((event) => {
            // Safe type assertion since we know id exists for rendered events
            const eventId = event.id as string;
            
            return (
              <DivContainer key={eventId} style={{ ...estyle.container, padding: "16px" }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 4px 0", color: "#222", fontSize: "18px" }}>
                    {event.title}
                  </h3>
                  
                  <div style={{ color: "#666", fontSize: "13px", marginBottom: "8px" }}>
                    <span style={{ display: "block" }}>
                      <strong>When:</strong> {event.dateTime.toDate().toLocaleString()}
                    </span>
                    <span style={{ display: "block" }}>
                      <strong>Host:</strong> {event.createdBy}
                    </span>
                    <span style={{ display: "block" }}>
                      <strong>Location:</strong> {event.coordinates.lat}, {event.coordinates.lng}
                    </span>
                  </div>

                  <p style={{ color: "#444", margin: "0 0 12px 0" }}>
                    {event.description}
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#666" }}>
                      {event.totalInterested} interested
                    </span>
                    
                    <div>
                      {event.eventType === "current" && onJoin && (
                        <button 
                          style={estyle.joinButton} 
                          onClick={() => onJoin(eventId)}
                        >
                          Join
                        </button>
                      )}
                      
                      {event.eventType === "joined" && onLeave && (
                        <button 
                          style={estyle.cancelButton} 
                          onClick={() => onLeave(eventId)}
                        >
                          Leave
                        </button>
                      )}
                      
                      {event.eventType === "own" && onDelete && (
                        <button 
                          style={estyle.cancelButton} 
                          onClick={() => onDelete(eventId)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </DivContainer>
            );
          })}
        </div>
      )}
    </DivContainer>
  );
}