import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";

import styles from "../../bio/styles/profile.module.css";

interface ProfileImageUploadProps {
  profileImage: string | null;
  setProfileImage: (url: string) => void;
  userId: string;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({ 
  profileImage, 
  setProfileImage,
  userId
}) => {
  const handleImageUpload = async (file: File) => {
    const storage = getStorage();
    const storageRef = ref(storage, `profileImages/${userId}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed", () => {},


      async () => {
        alert("Error uploading image.");
      },


      async () => {
        const downloadURL = await getDownloadURL(storageRef);
        setProfileImage(downloadURL);
        await setDoc(doc(db, "users", userId), { profileImage: downloadURL }, { merge: true });
      }
    );
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    handleImageUpload(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div {...getRootProps()} className={styles.dropzoneContainer}>

      <input {...getInputProps()} />

      {profileImage ? (<img src={profileImage} alt="Profile" className={styles.profileImageUpload} />
      ) 
      : isDragActive ? (
        <p>Drop your Profile Image Here...</p>
      ) : (
        <p>Change Profile Image</p>
      )}
    </div>
  );
};

export default ProfileImageUpload;