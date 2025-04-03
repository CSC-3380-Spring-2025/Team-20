"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User,
    signInWithEmailAndPassword,  // already created user
    createUserWithEmailAndPassword // new user
} from "firebase/auth";
import { auth } from "../config/firebase";

interface AuthContextType {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      handleError(error);
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      handleError(error);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      handleError(error);
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      // General error case
      console.error("Error: ", error.message);
    } else if (error && typeof error === "object" && "code" in error && "message" in error) {
      // Firebase specific error case
      const firebaseError = error as { code: string; message: string };
      console.error("Firebase Error Code:", firebaseError.code);
      console.error("Firebase Error Message:", firebaseError.message);
    } else {
      console.error("Unknown error occurred");
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithEmail, signUpWithEmail, signInWithGoogle, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
