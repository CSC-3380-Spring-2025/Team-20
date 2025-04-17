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

const Profile: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [socialAccounts, setSocialAccounts] = useState<string[]>(["", "", ""]);
  const [interest, setInterest] = useState<string[]>([]);
  const [saveStatus, setSaveStatus] = useState<{ success: boolean; error: boolean }>({ 
    success: false, 
    error: false 
  });

  // Fetch user data on component mount
  useEffect(() => {
    if (!user) return;

    const getUserData = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBio(docSnap.data().bio || "");
          setDisplayName(docSnap.data().displayName || "");
          setSocialAccounts(docSnap.data().socialAccounts || ["", "", ""]);
          setInterest(docSnap.data().interests || []);
          setProfileImage(docSnap.data().profileImage || null);
        } else {
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

    const savedInterests = localStorage.getItem("selectedInterests");
    if (savedInterests) {
      setInterest(JSON.parse(savedInterests));
    }
  }, [user]);

  // Handle save functionality
  const handleSave = async () => {
    if (!user?.uid) {
      console.error("User not logged in");
      return;
    }

    try {
      await setDoc(doc(db, "users", user.uid), {
        bio,
        socialAccounts,
        interests: interest,
        displayName,
        profileImage,
      }, { merge: true });

      setSaveStatus({ success: true, error: false });
    } catch (error) {
      setSaveStatus({ success: false, error: true });
      console.error("Error saving data: ", error);
    }
  };

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
    <div>
      <Header />
      
      <ProfileImageUpload 
        profileImage={profileImage} 
        setProfileImage={setProfileImage} 
        userId={user.uid}
      />
      
      <div className={styles.nameContainer}>
        <label className={styles.labelNames}>Name</label>
        <input
          className={styles.nameInput}
          type="text"
          placeholder="Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>

      <BioSection bio={bio} setBio={setBio} maxLength={160} />
      
      <SocialAccountsSection 
        socialAccounts={socialAccounts} 
        setSocialAccounts={setSocialAccounts} 
      />
      
      <InterestsSection 
        interest={interest} 
        setInterest={setInterest} 
        userId={user.uid}
      />
      
      <SaveButton 
        onSave={handleSave} 
        saveStatus={saveStatus} 
      />
    </div>
  );
};

export default Profile;