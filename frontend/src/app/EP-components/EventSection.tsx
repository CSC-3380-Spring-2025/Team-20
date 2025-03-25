import { EventCardProps } from '../types/eventTypes'; // Import the correct type
import DivContainer from './containers';
import {headerStyle} from '../styles/eventstyle'

const EventSection = ({
  title,
  events,
  deleteEvent,
}: {
  title: string;
  events: EventCardProps[];
  deleteEvent: (index: number) => void;
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
            {/* Delete Button (x) */}
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

            <h1>{event.title}</h1>
            <small>{event.totalInterested}</small> 
            <p>{event.description}</p>
          </DivContainer>
        ))}
      </DivContainer>
    </DivContainer>
  </DivContainer>
);

export default EventSection;
