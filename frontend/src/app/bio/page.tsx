"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useAuth } from "../context/auth-context";
import { useRouter } from "next/navigation"; // Import useRouter for redirect
// INTERNAL IMPORT
import styles from "../bio/styles/profile.module.css";
import Header from "../components/header";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter(); // Used for navigation

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const maxLength = 160; // Maximum length for bio
  const [bio, setBio] = useState("");
  const [socialAccounts, setSocialAccounts] = useState<string[]>(["", "", ""]);
  const [save, setSave] = useState(false);
  const [interest, setInterest] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  const handleSocialAccountChange = (index: number, value: string) => {
    const newSocialAccounts = [...socialAccounts];
    newSocialAccounts[index] = value;
    setSocialAccounts(newSocialAccounts);
  };

  const handleSave = () => {
    setSave(true);
  };

  // Connects Interest Sections To Profile
  useEffect(() => {
    const savedInterests = localStorage.getItem("selectedInterests");
    if (savedInterests) {
      setInterest(JSON.parse(savedInterests));
    }
  }, []);

  // If no user, show the login message
  if (!user) {
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

      {/* Bio */}
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

      {/* Social Accounts */}
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
      {save && <div>Profile saved!</div>}

      {/* Interests */}
      <div className={styles.interestsContainer}>
        <label className="labelNames">Current Interest(s)</label>
        {interest.length > 0 ? (
          <ul className={styles.interestsList}>
            {interest.map((interest, index) => (
              <li key={index} className={styles.interestsBox}>
                {interest}
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
