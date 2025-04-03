import { useState } from "react";
import { useAuth } from "../auth-context";
import Image from "next/image";
import UserCard from "./userCard"; // Import UserCard from same directory

export default function Login() {
  const { user, signInWithGoogle, signInWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmail(email, password);
    } catch {
      setError("Login failed. Check your credentials.");
    }
  };

  // If user exists, show UserCard instead
  if (user) {
    return <UserCard />;
    
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      
      <form onSubmit={handleEmailLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.submitButton}>
          Sign In
        </button>
      </form>

      <button 
        onClick={signInWithGoogle} 
        style={styles.googleButton}
      >
        <Image 
          src="https://www.svgrepo.com/show/475656/google-color.svg" 
          alt="Google logo" 
          width={20} 
          height={20} 
        />
        <span>Continue with Google</span>
      </button>
    </div>
  );
}

// Explicitly typing styles as React.CSSProperties
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
  },
  header: {
    fontSize: "2rem",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  submitButton: {
    backgroundColor: "#3498db",
    color: "white",
    fontWeight: "bold",
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    width: "100%",
  },
  googleButton: {
    backgroundColor: "#db4437",
    color: "white",
    fontWeight: "bold",
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    marginTop: "15px",
    width: "100%",
  },
  error: {
    color: "red",
    marginBottom: "15px",
  },
  welcome: {
    fontSize: "1.2rem",
    color: "#333",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#3498db",
    color: "white",
    fontWeight: "bold",
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};
