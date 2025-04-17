//handles all the containers for user's own events, joined events, and current evetns
import DivContainer from "../../components/containers";
import { Event } from "../types/eventTypes";
import * as estyle from "../styles/eventStyle";

interface EventSectionProps {
  title: string;
  events: Event[];
  onDelete?: (index: number) => void;
  onLeave?: (index: number) => void;
  onJoin?: (index: number) => void;
  isPopular?: boolean;
}

export default function EventSection({ title,
events,onDelete,
  onLeave,onJoin,isPopular = false,
}: EventSectionProps) {
  return (
    <DivContainer padding="15px" margin="20px 0" backgroundColor="#f9f9f9" borderRadius="8px">


    <h2 style={estyle.headerStyle}>{title}</h2>
    
    {events.length === 0 ?
     (<p style={estyle.defaultText}>No events available.</p>) :
     
     (<div style={isPopular ? { 
        maxHeight: '400px', 
        overflowY: 'auto',
        paddingRight: '8px'
      } : {}}>



        {events.map((event, index) => (
          <DivContainer key={`${event.title}-${index}`} style={estyle.container}>
            
            
            <div>

              <h3 style={{ margin: '2px 0 5px 0', color: '#333', display: 'inline-block' }}> {event.title}</h3>

              <p style={{ color: '#555', margin: '8px 0', fontSize: '14px' }}>{event.description}</p>

              <p style={{ color: '#666', fontSize: '13px', margin: '5px 0' }}>
                <strong>Interested:</strong> {event.totalInterested} </p>

            </div>


            <div style={{ display: 'flex', gap: '10px' }}>
              
              {isPopular && onJoin && (
                <button  style={estyle.joinButton} onClick={() => onJoin(index)}>
                  Join
                </button>
              )}

             
              {!isPopular && (
                 <button style={title === "Joined Events" ? {
                    ...estyle.cancelButton,
                    backgroundColor: '#ffc107'
                  } : 
                    estyle.cancelButton}
                    onClick={() => 
                    title === "Joined Events" ? onLeave?.(index) : onDelete?.(index)
                  }>

                  {title === "Joined Events" ? "Leave" : "Delete"}
                </button>
              )}
            </div>
          </DivContainer>
        ))}
        </div>
    )}
    </DivContainer>
  );
}