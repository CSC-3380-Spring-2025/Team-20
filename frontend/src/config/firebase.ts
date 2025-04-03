import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// 🔒 Firebase configuration (DO NOT expose these keys in public repos)
const firebaseConfig = {
    apiKey: "AIzaSyD3N-Uf-5qqe2VnZSmwIeU6EqbXoe2s61o",
    authDomain: "unifriend-sync-b73cd.firebaseapp.com",
    projectId: "unifriend-sync-b73cd",
    storageBucket: "unifriend-sync-b73cd.firebasestorage.app",
    messagingSenderId: "469605020222",
    appId: "1:469605020222:web:aacb6a21eb4ff0e5bc576f",
    measurementId: "G-R4NHKZ6M99"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ✅ Google Authentication
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign Out Error:", error);
  }
};
