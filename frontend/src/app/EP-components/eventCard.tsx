import { FC } from 'react';

interface EventCardProps {
  title: string;
  description: string;
  totalInterested: string;
}

const EventCard: FC<EventCardProps> = ({ title, description, totalInterested }) => (
  <div style={styles.card}>
    <h1>{title}</h1>
    <small>{totalInterested}</small>
    <p>{description}</p>
  </div>
);

const styles = {
  card: {
    backgroundColor: "white",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    width: "100%",
  },
};

export default EventCard;
