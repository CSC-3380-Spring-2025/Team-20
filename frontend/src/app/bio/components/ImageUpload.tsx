"use client";

import React, { useState } from "react";
import { db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";

import styles from "../../bio/styles/profile.module.css";

//default images
const images = [
  "/assets/anime.png",
  "/assets/drooling.png",
  "/assets/female.png",
  "/assets/human-head.png",
  "/assets/jack-o'lantern.png",
  "/assets/pouting-face.png",
  "/assets/shocked.png"
];


//image profile upload 
interface ProfileImageUploadProps {
  profileImage: string | null;
  setProfileImage: (url: string) => void;
  userId: string;
}

//pass by object

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({ profileImage,setProfileImage, userId,}) => {


  //pop up for images 
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  //handles user choice it takes whatever image they want from the list above and sets it as it (toggles pop up)
  const handleSelectImage = async (imageUrl: string) => {

    setProfileImage(imageUrl);
    setIsPopupOpen(false);


    //add to the database. use try catch for all db stuff!
    try {
      await setDoc(doc(db, "users", userId), { selectedImage: imageUrl }, { merge: true });
    } catch (error) {
      console.error("Error saving selected image:", error);
      alert("Failed to save selected image.");
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileBubble} onClick={() => setIsPopupOpen(true)}>


        {profileImage ? (

          <img src={profileImage} alt="Profile" className={styles.profileImageBubble} />


        ) : (

          <div className={styles.placeholderBubble}>+
          </div>

        )}
      </div>

      {isPopupOpen && (

        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>

            <h3>Select Your Profile Picture!</h3>
            
            <div className={styles.imageOptions}>
              {images.map((imgUrl) => (
                  <img  key={imgUrl} src={imgUrl} alt="Profile option" className={styles.imageThumbnail} onClick={() => handleSelectImage(imgUrl)}/>
                )
              )
              
              }
            </div>
            <button onClick={() => setIsPopupOpen(false)} className={styles.closeButton}>
              Cancel
            </button>

          </div>
        </div>

      )}
    </div>
  );
};

export default ProfileImageUpload;