import { Event } from '../types/eventTypes'; // Import the correct type
import DivContainer from './containers';
import { headerStyle } from '../styles/eventstyle';
import * as styles from "../styles/eventformstyle";

const EventSection = ({
  title,
  events,
  deleteEvent,
  isPopular,
  joinEvent,
}: {
  title: string;
  events: Event[];
  deleteEvent: (index: number) => void;
  isPopular: boolean;
  joinEvent: (index: number) => void; 
}) => (
  <DivContainer padding="2px" width="100%" marginTop="10px">
    <DivContainer display="flex" justifyContent="space-between" padding="40px 20px 10px 10px" width="100%">
      <p style={headerStyle}>{title}</p>
    </DivContainer>

    <DivContainer width="100%" backgroundColor="#F2F2F7" marginTop="10px" borderRadius="10px" height="300px" overflowY="auto">
      <DivContainer width="100%" padding="6px">
        {events.map((event, index) => (
          <DivContainer
            key={index}
            style={{
              backgroundColor: 'white',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              position: 'relative',
            }}
          >
            {/* Delete button for non-popular events */}
            {!isPopular && (
              <button
                onClick={() => deleteEvent(index)} 
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#ff0000',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  padding: '0',
                }}
              >
                × 
              </button>
            )}

           
            <DivContainer display="flex" justifyContent="space-between" alignItems="center">
              <h1>{event.title}</h1>
              {isPopular && (
                <button
                  onClick={() => joinEvent(index)} 
                  style={styles.joinButton}
                >
                  Join
                </button>
              )}
            </DivContainer>

            <small>{event.totalInterested} people interested</small>
            <p>{event.description}</p>
          </DivContainer>
        ))}
      </DivContainer>
    </DivContainer>
  </DivContainer>
);

export default EventSection;
