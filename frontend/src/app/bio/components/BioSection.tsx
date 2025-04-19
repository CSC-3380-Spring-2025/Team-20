import React from "react";
import styles from "../../bio/styles/profile.module.css";


//basic object for biosection
interface BioSectionProps {
  bio: string;
  setBio: (bio: string) => void;
  maxLength: number;
}


//pass in bio object
const BioSection: React.FC<BioSectionProps> = ({ bio, setBio, maxLength }) => {

  
  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  return (
    <div>
      <label className={styles.labelNames}>Bio</label>
      <div className={styles.bioContainer}>
        <textarea className={styles.bioInput} placeholder="Add a bio" value={bio} onChange={handleBioChange} maxLength={maxLength} rows={6}/>
      </div>
    </div>


);
};

export default BioSection;