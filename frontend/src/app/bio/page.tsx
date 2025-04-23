"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth-context";
import { useRouter } from "next/navigation";
import { db } from "@/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

import styles from "../bio/styles/profile.module.css";
import Header from "../components/header";
import ProfileImageUpload from "./components/ImageUpload";
import BioSection from "./components/BioSection";
import SocialAccountsSection from "./components/SocialAccounts";
import InterestsSection from "./components/InterestsSection";
import SaveButton from "./components/SaveButton";
import EventsSection from "./components/EventsSection";


const Profile: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();


  //look at bio/components. passing in profile image, name, bio, social accounts, interests, and the option for them to ssave it or not
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [socialAccounts, setSocialAccounts] = useState<string[]>(["", "", ""]);
  const [interest, setInterest] = useState<string[]>([]);
  const [events, setEvents] = useState<string[]>([]);
  const [saveStatus, setSaveStatus] = useState<{ success: boolean; error: boolean }>({ 
    success: false, 
    error: false 
  });

  // Fetch user data on component mount
  useEffect(() => {
    if (!user) return; // makes sure update occurs

    //retrieval function
    const getUserData = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          
          const userData = docSnap.data();
          setBio(docSnap.data().bio || "");
          setDisplayName(docSnap.data().displayName || "");
          setSocialAccounts(docSnap.data().socialAccounts || ["", "", ""]);
          setInterest(docSnap.data().interests || []);
          setProfileImage(docSnap.data().profileImage || null);

          
          if ((userData.interests?? []).length === 0 ){
            const anyinterests = localStorage.getItem("selectedInterests");
            if (anyinterests){
              setInterest(JSON.parse(anyinterests));
            }
          }


        } else {
          //in the case that they are actually new 
          await setDoc(docRef, { 
            bio: "", 
            socialAccounts: ["", "", ""], 
            interests: [], 
            displayName: "", 
            profileImage: null 
          });
        }


      } catch {
        alert("Error getting data");
      }
    };

    getUserData();
    
  }, [user]);

  // Handle save functionality
  const handleSave = async () => {
    if (!user?.uid) {
      alert("User not logged in");
      return;
    }

    try {
      await setDoc(doc(db, "users", user.uid), {
        bio,
        socialAccounts,
        interests: interest,
        events: events,
        displayName,
        profileImage,
      }, { merge: true });

      setSaveStatus({ success: true, error: false });  // debugging . useful if it doesn't save full data
    } catch (error) {
      setSaveStatus({ success: false, error: true });
      alert(error);
    }
  };
//just if the user trys to bypass any of the pages. 
  if (!user || !user.uid) {
    return (
      <div>
        <h2>You need to log in to access this page.</h2>
        <button
          className="bg-green-500 border-r-5 font-serif hover:bg-green-300"
          onClick={() => router.push("/auth/login")}
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <Header />
      
      <ProfileImageUpload  profileImage={profileImage}  setProfileImage={setProfileImage} userId={user.uid}/>

      <div className="absolute top-20 right-4">
        <SaveButton 
          onSave={handleSave} 
          saveStatus={saveStatus} 
        />
      </div>
      


      <label className={styles.labelNames}>Name</label>
      
      <div className={styles.nameContainer}>
      <input className={styles.nameInput}type="text" placeholder="Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
      </div>



      <div className="flex flex-col md:flex-row gap-6 mt-6">

      <div className="flex-1">
        <BioSection bio={bio} setBio={setBio} maxLength={160} />
      </div>

      <div className="flex-1">
        <InterestsSection interest={interest}  setInterest={setInterest} userId={user.uid}/>
      </div>
      <div className="flex-1">
        <EventsSection event={events} setEvent={setEvents} userId={user.uid} />
    </div>

    </div>

    <SocialAccountsSection  socialAccounts={socialAccounts} setSocialAccounts={setSocialAccounts} 
    />


  </div>
  
  );
  
};

export default Profile;