//this is landing
"use client"

import {useAuth} from "../context/auth-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/header";

export default function LandingPage() {


  const { user} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/bio");
    }
  }, [user, router]);
  
  let showDescription = false;

  function toggleDescription() {
    const para = document.getElementById("description");
    if (para) {
      showDescription = !showDescription;
      para.style.display = showDescription ? "block" : "none";
    }
  }

  return (
    <div>
    <Header/>
    <div style={{
      backgroundColor: "#fff",
      minHeight: "100vh",
      padding: "2rem",
      boxSizing: "border-box",
      fontFamily: "sans-serif"
    }}>

      {/**Login */}
      <div style={{
        textAlign: "center",
        marginTop: "10vh",
        padding: "0 1rem"
      }}>
        <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", fontWeight: "bold"}}>
          <span style={{ color: "#9932CC" }}>INTEREST</span> 
        </h2>
        <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)", fontWeight: "bold", color: "#000000" }}>
        BASED CONNECTIONS WITH CLASSMATES
        </h2>
        <p style={{ fontSize: "clamp(1.0rem, 2vw, 1.2rem)", marginTop: "1rem", fontWeight: "bold", color: "#000000" }}>
          FIND FRIENDS ON CAMPUS
        </p>
        <p style={{ fontSize: "clamp(1.0rem, 2vw, 1.2rem)", fontWeight: "bold", color: "#000000"}}>
          TRY NEW ACTIVITIES TOGETHER
        </p>

        {/*Login Button*/}
          <button   className="px-6 py-2 bg-purple-500 text-white rounded hover:bg-yellow-400 m-3" onClick={() => router.push("/auth/login/")}>Log In</button>
          
          <button  className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-400" onClick={() => router.push("/auth/signup/")}>Sign Up</button>
  

        {/*What is this?*/}
        <div style={{ marginTop: "2rem" }}>
          <button
            onClick={toggleDescription}
            style={{
              backgroundColor: "#DCDCDC",
              border: "1px solid #000000",
              borderRadius: "1rem",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            <strong>What is UniFriend-Sync?</strong>
          </button>

          <p id="description" style={{
            display: "none",
            marginTop: "1rem",
            maxWidth: "90%",
            width: "600px",
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
            color:"#000000"
          }}>
            Uni-Friend Sync helps students connect with classmates based on shared interests.
            Whether you`re looking for study buddies, event partners, or simply new friends on campus,
            this platform makes it easy to find your people and explore activities together. <strong>Sign Up to meet new people!
            </strong> </p>
        </div>
      </div>
    </div>
    </div>
  );
}