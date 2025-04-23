// bio/components/EventsSection.tsx
"use client";

import React from "react";
import styles from "../../bio/styles/profile.module.css";

interface EventsSectionProps {
  event: string[];
  setEvent: (newEvent: string[]) => void;
  userId: string;
}

const EventsSection: React.FC<EventsSectionProps> = ({ event, setEvent }) => {
  return (
    <div>
      <label className={styles.labelNames}>Events</label>
      <div className={styles.interestsContainer}>
        {event.map((e, index) => (
          <span key={index} className={styles.interestItem}>
            {e}
          </span>
        ))}
        {/* You can expand this with input logic if needed */}
      </div>
    </div>
  );
};

export default EventsSection;
