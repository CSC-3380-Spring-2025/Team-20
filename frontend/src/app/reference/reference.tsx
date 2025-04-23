//"use client";

import Header from "@/components/header";

export default function ReferencePage() {
  return (
    <div>
      <Header />
      <div
        style={{
          backgroundColor: "#fff",
          minHeight: "100vh",
          padding: "2rem",
          boxSizing: "border-box",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginTop: "10vh",
            padding: "0 1rem",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              fontWeight: "bold",
            }}
          >
            <span style={{ color: "#9932CC" }}>RESOURCE</span>
          </h2>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 3rem)",
              fontWeight: "bold",
              color: "#000000",
            }}
          >
            LINKS & REFERENCES
          </h2>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              marginTop: "1rem",
              fontWeight: "bold",
              color: "#000000",
            }}
          >
            Tools and assets that helped shape UniFriend-Sync
          </p>

          {/* Reference List */}
          <div
            style={{
              marginTop: "3rem",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "left",
            }}
          >
            <ul style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: "2rem" }}>
              <li>
                <a
                  href="https://icons8.com/icons/set/--style-pulsar-gradient"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#9932CC", fontWeight: "bold" }}
                >
                  Pulsar Gradient Icons by Icons8
                </a>
              </li>
              {/* Add more references below if needed */}
              {/* <li>
                <a href="..." target="_blank" rel="noopener noreferrer">
                  Another Resource
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
