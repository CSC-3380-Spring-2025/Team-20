"use client";
import React from "react";
import Header from "../components/header";
import * as styles from "./styles/oc-style";
import { useHover } from "./hooks/useHover";
import OptionsBar from "./oc-components/optionsBar";
import { useRouter } from "next/navigation";

export default function OutsideCampus() {
  const [Hovered, listener] = useHover();
  const router = useRouter();


  return (
    <>
      <Header />

      <main>
        <div style={styles.container}>
          <button
            style={{...styles.backbutton,textDecoration: Hovered ? "underline" : "none",}}{...listener} onClick={() => router.push("/events")}>
              ← Events
          </button>
        </div>

        <OptionsBar/>
       

      </main>

    
    </>
  );
}