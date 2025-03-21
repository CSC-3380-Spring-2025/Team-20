"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import UserCard from "./userCard"

export default function Login() {
  // Get session from NextAuth
  const { data: session } = useSession();

  // Check if the user is logged in
  if (session) {
    return (
      <>
        <button style={styles.button} onClick={() => signOut()} type="button">
          Sign Out
        </button>
        <UserCard user={session?.user} />
      </>
    );
  } else {
    return (
      <>
        {/* Sign in button */}
        <button
          style={styles.button}
          onClick={() => signIn("google", { callbackUrl: "http://localhost:3004" })}
          type="button"
        >
          Sign in with Google
        </button>
      </>
    );
  }
}

const styles = {
    button: {
      backgroundColor: "#3498db",
      color: "white",
      fontWeight: "bold",
      padding: "10px 20px",
      borderRadius: "8px", 
      border: "none", 
      cursor: "pointer", 
      transition: "background-color 0.3s ease", 
    },
  };