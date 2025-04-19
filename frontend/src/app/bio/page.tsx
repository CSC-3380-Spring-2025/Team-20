"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Link from "next/link";

// INTERNAL IMPORT
import styles from "../../../styles/profile.module.css";
import Header from "../header";
import useEvents from "../event/hooks/useEvents";

const Profile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const maxLength = 160; //Maximum length for bio
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

  //Need To Add Functionality To Save Profile Changes
  const handleSave = () => {
    setSave(true);
  };

  //Connects Interest Sections To Profile
  useEffect(() => {
    const savedInterests = localStorage.getItem("selectedInterests");
    if (savedInterests) {
      setInterest(JSON.parse(savedInterests));
    }
  }, []);

  //Fetch User's Created Events
  const {myEvents} = useEvents();

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
      {save && (
        <div>
          Profile saved!
        </div>
      )}

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

      {/* Created Events */}
      <div className={styles.eventContainer}>
        <div className={styles.eventBox}>
          <h3> My Created Events </h3>
          {myEvents.length > 0 ? (
            <ul className={styles.eventList}>
              {myEvents.map((event, index) => (
                <li key={index} className={styles.eventItem}>
                  <Link href={`/events/${encodeURIComponent(event.title)}`}>
                    {event.title} (Description: {event.description})
                    {event.title} ({event.totalInterested} interested)
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noEvents}>No events are created yet</p>
          )}
      </div>
    </div>
  </div>
  );
};

export default Profile;