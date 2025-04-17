//this is landing
"use client"
import { useRouter } from "next/navigation";
export default function LandingPage() {
  let showDescription = false;
  const router = useRouter();

  function toggleDescription() {
    const para = document.getElementById("description");
    if (para) {
      showDescription = !showDescription;
      para.style.display = showDescription ? "block" : "none";
    }
  }

  return (
    <div style={{
      backgroundColor: "#fccab2",
      minHeight: "100vh",
      padding: "2rem",
      boxSizing: "border-box",
      fontFamily: "sans-serif"
    }}>
      {/*Header*/} 
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap"
      }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
          <b>Uni-Friend sync</b>
        </h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "1rem" }}>
          <p style={{ margin: 0, cursor: "pointer" }}onClick={()=>router.push("/about")}>About</p>
          <p style={{ margin: 0, cursor: "pointer" }}onClick={()=>router.push("/login")}>Join</p>
        </div>
      </div>

      {/**Login */}
      <div style={{
        textAlign: "center",
        marginTop: "10vh",
        padding: "0 1rem"
      }}>
        <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", fontWeight: "bold" }}>
          <span style={{ color: "#8b5cf6" }}>INTEREST</span> BASED CONNECTIONS
        </h2>
        <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", fontWeight: "bold" }}>
          WITH CLASSMATES
        </h2>
        <p style={{ fontSize: "clamp(0.9rem, 2vw, 1.2rem)", marginTop: "1rem" }}>
          FIND FRIENDS ON CAMPUS
        </p>
        <p style={{ fontSize: "clamp(0.9rem, 2vw, 1.2rem)" }}>
          TRY NEW ACTIVITIES TOGETHER
        </p>

        {/*Login Button*/}

        
          <button style={{
            backgroundColor: "#8b5cf6",
            color: "white",
            padding: "0.75rem 2rem",
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: "2rem",
            border: "none",
            marginTop: "2rem",
            boxShadow: "0px 5px 10px rgba(0,0,0,0.1)",
            cursor: "pointer"
          }} onClick={()=>router.push("/login")}>
            Login
          </button>
        

        {/*What is this?*/}
        <div style={{ marginTop: "2rem" }}>
          <button
            onClick={toggleDescription}
            style={{
              backgroundColor: "#fccab2",
              border: "1px solid #white",
              borderRadius: "1rem",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            What is this?
          </button>

          <p id="description" style={{
            display: "none",
            marginTop: "1rem",
            maxWidth: "90%",
            width: "600px",
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: "clamp(0.9rem, 2vw, 1.1rem)"
          }}>
            Uni-Friend Sync helps students connect with classmates based on shared interests.
            Whether you're looking for study buddies, event partners, or simply new friends on campus,
            this platform makes it easy to find your people and explore activities together.
          </p>
        </div>
      </div>
    </div>
  );
}

