"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth-context";
import { useRouter } from "next/navigation";
import { db } from "@/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import useEvents from "../event/hooks/useEvents";

import Header from "../components/header";
import ProfileImageUpload from "./components/ImageUpload";
import BioSection from "./components/BioSection";
import SocialAccountsSection from "./components/SocialAccounts";
import InterestsSection from "./components/InterestsSection";
import SaveButton from "./components/SaveButton";
import EventSection from "../event/components/eventSection";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [socialAccounts, setSocialAccounts] = useState<string[]>(["", "", ""]);
  const [interest, setInterest] = useState<string[]>([]);
  const [pronouns, setPronouns] = useState("");
  const [saveStatus, setSaveStatus] = useState<{ success: boolean; error: boolean }>({ success: false, error: false });
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const { myEvents, joinedEvents, deleteMyEvent, leaveEvent, fetchEvents } = useEvents();

  useEffect(() => {
    if (!user || hasFetchedData) return;

    const getUserData = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setBio(data.bio || "");
          setDisplayName(data.displayName || "");
          setSocialAccounts(data.socialAccounts || ["", "", ""]);
          setInterest(data.interests || []);
          setProfileImage(data.selectedImage || null);
          setPronouns(data.pronouns || "");
        } else {
          await setDoc(docRef, { bio: "", socialAccounts: ["", "", ""], interests: [], displayName: "", profileImage: null, pronouns: "" });
        }
        setHasFetchedData(true);
      } catch {
        console.log("Error getting data");
      }
    };

    getUserData();
    fetchEvents();
  }, [user, hasFetchedData, fetchEvents]);

  const handleSave = async () => {
    if (!user?.uid) {
      alert("User not logged in");
      return;
    }

    try {
      await setDoc(doc(db, "users", user.uid), {
        bio, socialAccounts, interests: interest, displayName, profileImage, pronouns
      }, { merge: true });

      setSaveStatus({ success: true, error: false });
    } catch (error) {
      setSaveStatus({ success: false, error: true });
      console.log(error);
    }
  };

  if (!user || !user.uid) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-purple-50">
        <h2 className="text-xl font-bold mb-4 text-purple-900">You need to log in to access this page.</h2>
        <button
          className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors shadow-md"
          onClick={() => router.push("/auth/login")}
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (
    <div className="relative pb-12 bg-purple-50 min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 pt-6">
        {/* Profile Image and Save Button */}
        <div className="flex justify-between items-start mb-8">
          <ProfileImageUpload profileImage={profileImage} setProfileImage={setProfileImage} userId={user.uid} />
          <SaveButton onSave={handleSave} saveStatus={saveStatus} />
        </div>

        {/* Name and Pronouns */}
        <div className="mb-8 bg-white rounded-xl shadow-md p-6 border-0">
          <div className="mb-4">
            <label className="block text-purple-900 font-medium mb-2">Name</label>
            <div className="relative">
              <input 
                className="w-full p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                type="text" 
                placeholder="Name" 
                value={displayName} 
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-purple-900 font-medium mb-2">Pronouns</label>
            <div className="relative">
              <input 
                className="w-full p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                type="text" 
                placeholder="e.g she/her"  
                value={pronouns} 
                onChange={(e) => setPronouns(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Bio and Interests */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1 bg-white rounded-xl shadow-md p-6 border-0">
            <BioSection bio={bio} setBio={setBio} maxLength={160} />
          </div>
          <div className="flex-1 bg-white rounded-xl shadow-md p-6 border-0">
            <InterestsSection interest={interest} setInterest={setInterest} userId={user.uid} />
          </div>
        </div>

        {/* Social Accounts */}
        <div className="mb-8 bg-white rounded-xl shadow-md p-6 border-0">
          <SocialAccountsSection socialAccounts={socialAccounts} setSocialAccounts={setSocialAccounts} />
        </div>

        {/* Events Sections */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-0">
            <h2 className="text-xl font-bold mb-4 text-purple-900">My Created Events</h2>
            {myEvents.length > 0 ? (
              <EventSection title="" events={myEvents} onDelete={deleteMyEvent} userId={user.uid} />
            ) : (
              <p className="text-purple-700">No Events Created</p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-0">
            <h2 className="text-xl font-bold mb-4 text-purple-900">Joined Events</h2>
            {joinedEvents.length > 0 ? (
              <EventSection title="" events={joinedEvents} onLeave={leaveEvent} userId={user.uid} />
            ) : (
              <p className="text-purple-700">No Events Joined</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;