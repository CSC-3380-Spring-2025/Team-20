import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

import styles from "../../bio/styles/profile.module.css";

interface InterestsSectionProps {
  interest: string[];
  setInterest: (interests: string[]) => void;
  userId: string;
}

const InterestsSection: React.FC<InterestsSectionProps> = ({ 
  interest, 
  setInterest,
  userId
}) => {
  const [editInterests, setEditInterests] = useState(false);

  const handleEditInterests = (index: number) => {
    const updateInterests = interest.filter((_, i) => i !== index);
    setInterest(updateInterests);
  };

  const handleSaveInterests = async () => {
    try {
      await setDoc(doc(db, "users", userId), { interests: interest }, { merge: true });
      setEditInterests(false);
    } catch {
      alert("Error editing interests");
    }
  };

  return (
    <div className={styles.interestsContainer}>
      <label className="labelNames grid">Current Interest(s)</label>

      <div className="mb-3 gap-1">

        {!editInterests ? (
          <button onClick={() => setEditInterests(true)} className="bg-blue-400 text-white rounded px-3 py-2 hover:bg-blue-600">
            Edit
          </button>
        ) : (
          <button onClick={handleSaveInterests} className="bg-blue-400 text-white rounded px-3 py-2 hover:bg-blue-600">
            Save Changes
          </button>
        )}

      </div>


      {interest.length > 0 ? (


        <ul className={styles.interestsList}>

          {interest.map((item, index) => (
            <li key={index} className={styles.interestsBox} style={{ position: 'relative' }}>
              {item}
              {editInterests && (
                <button
                  onClick={() => handleEditInterests(index)}
                  className="flex absolute items-center justify-center top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs transform translate-x-1/2 -translate-y-1/2 hover:bg-red-700"
                >
                  ✖
                </button>
              )}
            </li>

          ))}

        </ul>

      ) : (

        <p className="text-gray-600">No interests selected yet.</p>
        
      )}
    </div>
  );
};

export default InterestsSection;