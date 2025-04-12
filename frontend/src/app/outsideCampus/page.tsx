"use client";

import React from "react";
import Header from "../header";
import * as styles from "../outsideCampus/styles/ocstyle";
import { useHover } from "../outsideCampus/hooks/usehover";
import OptionsBar from "../outsideCampus/components/optionsbar";
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