"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useAuth } from "../context/auth-context";
import { useRouter } from "next/navigation";
import { db } from "@/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"; // Import Firebase Storage

import styles from "../bio/styles/profile.module.css";
import Header from "../components/header";

const Profile: React.FC = () => {
  const { user } = useAuth(); // Get the current user
  const router = useRouter(); // Router for navigation

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const maxLength = 160;
  const [bio, setBio] = useState("");
  const [socialAccounts, setSocialAccounts] = useState<string[]>(["", "", ""]);
  const [save, setSave] = useState(false);
  const [saveError, setSaveError] = useState(false);


  //interests
  const [interest, setInterest] = useState<string[]>([]);
  const [editInterests, setEditInterests] = useState(false);





  // Handle file drop for profile image upload
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    handleImageUpload(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  // Handle bio change
  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  // Handle social account changes
  const handleSocialAccountChange = (index: number, value: string) => {
    const newSocialAccounts = [...socialAccounts];
    newSocialAccounts[index] = value;
    setSocialAccounts(newSocialAccounts);
  };

  // Handle image upload
  const handleImageUpload = async (file: File) => {
    if (!user?.uid) {
      console.error("User not logged in");
      return;
    }

    const storage = getStorage(); // Initialize Firebase Storage
    const storageRef = ref(storage, `profileImages/${user.uid}`); // Use user.uid here directly, not optional chaining

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      () => {
        // You can handle progress here if needed
      },
      async () => {
        alert("Error uploading image.");
      },
      async () => {
        const downloadURL = await getDownloadURL(storageRef);
        setProfileImage(downloadURL);
        await setDoc(doc(db, "users", user.uid), { profileImage: downloadURL }, { merge: true });
      }
    );
  };



  //editing and removing interests
  const handleEditInterests = (indexes : number) => {
    //retrieves all current interests and then filters them
    const updateInterests = interest.filter((_, index) =>  index != indexes);

    setInterest(updateInterests);
  }

  const handleSaveInterests = async () => {
    if (!user?.uid) return; 
    try {
      await setDoc(doc(db, "users", user.uid), {interests: interest}, {merge: true});
      setEditInterests(false);

    }catch {
      alert("Error editing interests: "); 
    }
  }

  // Handle save functionality for profile data
  const handleSave = async () => {
    if (!user?.uid) {
      console.error("User not logged in");
      return;
    }

    try {
      // Update the user's document with the profile data
      await setDoc(doc(db, "users", user.uid), {
        bio: bio,
        socialAccounts: socialAccounts,
        interests: interest,
        displayName: displayName,
        profileImage: profileImage,
      }, { merge: true });

      setSave(true);
      setSaveError(false);
    } catch (error) {
      setSaveError(true);
      console.error("Error saving data: ", error);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    if (!user) return;

    //debugging
    console.log("User UID:", user.uid);

    const getUserData = async () => {
      try {
        const docRef = doc(db, "users", user.uid); // Use user.uid directly, no need for optional chaining
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Document exists, populate the form with the data
          setBio(docSnap.data().bio || "");
          setDisplayName(docSnap.data().displayName || "");
          setSocialAccounts(docSnap.data().socialAccounts || ["", "", ""]);
          setInterest(docSnap.data().interests || []);
          setProfileImage(docSnap.data().profileImage || null);
        } else {
          // No document found, create the document with the default fields when user first logs in
          await setDoc(docRef, { bio: "", socialAccounts: ["", "", ""], interests: [], displayName: "", profileImage: null });
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
  }, [user]); // Only rerun if user.uid changes

  // Display loading if no user or uid
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
      {/* Header */}
      <Header />

      {/* Profile Image Upload */}
      <div {...getRootProps()} className={styles.dropzoneContainer}>
        <input {...getInputProps()} />
        {profileImage ? (
          <img src={profileImage} alt="Profile" className={styles.profileImageUpload} />
        ) : isDragActive ? (
          <p>Drop your Profile Image Here...</p>
        ) : (
          <p>Change Profile Image</p>
        )}
      </div>

      {/* Display Name */}
      <label className={styles.labelNames}>Name</label>
      <div className={styles.nameContainer}>
        <input
          className={styles.nameInput}
          type="text"
          placeholder="Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>

      {/* Bio Descrip*/}
      <label className={styles.labelNames}>Bio</label>
      <div className={styles.bioContainer}>
        <textarea
          className={styles.bioInput}
          placeholder="Add a bio"
          value={bio}
          onChange={handleBioChange}
          maxLength={maxLength}
          rows={6}
        />
      </div>

      {/* Three  Social Accounts */}
      <div>
        <label className={styles.labelNames}>Social Accounts</label>
        {socialAccounts.map((account, index) => (
          <div key={index} className={styles.socialAccountsContainer}>
            <input
              className={styles.socialAccountsInput}
              type="text"
              placeholder={`Link to social profile ${index + 1}`}
              value={account}
              onChange={(e) => handleSocialAccountChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button onClick={handleSave} className={styles.saveButton}>
        Save
      </button>
      {save && <div>Profile saved successfully!</div>}
      {saveError && <div>Error saving profile. Please try again.</div>}



      {/* Interests */}
      <div className={styles.interestsContainer}>
        <label className="labelNames grid">Current Interest(s)</label>

        <div className="mb-3 gap-1">
          {!editInterests? (
            <button onClick={() => setEditInterests(true)}
              className="bg-blue-400 text-white rounded px-3 py-2 hover:bg-blue-600"
            
            >
              Edit 
            </button>

          ): (
            <button onClick={handleSaveInterests } className="bg-blue-400 text-white rounded px-3 py-2 hover:bg-blue-600">
              Save Changes

            </button>
          )

        }
        </div>


        {interest.length > 0 ? (
          <ul className={styles.interestsList}>
            {interest.map((item, index) => (
              <li key={index} className={styles.interestsBox} style={{ position: 'relative' }}>    {item} {editInterests && (
                  <button onClick={() => handleEditInterests(index)} className=" flex absolute items-center justify-center top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs transform translate-x-1/2 -translate-y-1/2 hover:bg-red-700"
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




    </div>
  );
};

export default Profile;