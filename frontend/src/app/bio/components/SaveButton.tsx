
"use client";

import React from "react";
import styles from "../../bio/styles/profile.module.css";


//basic save button. will send to main page for it to update database and visual. 
interface SaveButtonProps {
  onSave: () => void;
  saveStatus: {
    success: boolean;
    error: boolean;
  };
}

const SaveButton: React.FC<SaveButtonProps> = ({ onSave, saveStatus }) => {
  return (
    <div>
      <button onClick={onSave} className={styles.saveButton}>
        Save
      </button>
      {saveStatus.success && <div>Profile saved successfully!</div>}
      {saveStatus.error && <div>Error saving profile. Please try again.</div>}
    </div>
  );
};

export default SaveButton;