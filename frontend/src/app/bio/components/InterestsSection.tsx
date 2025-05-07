
"use client";

import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";  // add getDoc here
import { db } from "../../config/firebase";
import styles from "../../bio/styles/profile.module.css";

interface InterestsSectionProps {
  interest: string[];
  setInterest: (interests: string[]) => void;
  userId: string;
}

const InterestsSection: React.FC<InterestsSectionProps> = ({  interest, setInterest, userId }) => {
//users have the option to edit their own interests
  const [editInterests, setEditInterests] = useState(false);


  //logic. first take whatever they currently have as their interests (connected to user page and set it as that. if they are new handles that too as empty list)
  useEffect(() => {

    const fetchInterests = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", userId));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setInterest(userData?.interests || []); 

        } else {
          setInterest([]);
        }

      } catch (error) {
        alert(error);
        //still will set interest as 0 if anything occurs
        setInterest([]); 
      }
    };
  
    fetchInterests();
  }, [userId, setInterest]);
  

//if they have added interests again from intersts page only consideres the set() of it
  const handleEditInterests = (index: number) => {
    const updatedInterests = interest.filter((_, i) => i !== index);
    setInterest(updatedInterests);
  };


//saves it to database
  const handleSaveInterests = async () => {

    try {
      await setDoc(doc(db, "users", userId), { interests: interest }, { merge: true });
      setEditInterests(false);

    } catch {
      alert("Error editing interests");
    }

  };

  return (
    <div className={`w-full ${styles.interestsContainer} p-4`}>


      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between mb-3 gap-3">
        <label className="labelNames"><strong>Interests</strong></label>
        {!editInterests ? ( 
            <button  onClick={() => setEditInterests(true)} 
            className="bg-purple-800 text-white rounded px-3 py-2 hover:bg-purple-600">
                Edit
            </button>
        ) : (
          <button onClick={handleSaveInterests} className="bg-purple-400 text-white rounded px-3 py-2 hover:bg-purple-600">
            Save Changes
          </button>
        )}
      </div>

      {interest.length > 0 ? (

        <ul className={styles.interestsList}>

          {interest.map((item, index) => (

            <li key={index} className={`${styles.interestsBox} relative mb-2`}>
              {item}

              {editInterests && (
                <button onClick={() => handleEditInterests(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs transform translate-x-1/2 -translate-y-1/2">
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

