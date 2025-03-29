"use client";
import React from "react";
import Header from "./oc-components/header";
import * as styles from "./styles/oc-style";
import { useHover } from "./hooks/useHover";
import { OptionsBar } from "./oc-components/options-bar";
import Link from "next/link";

export default function Home() {
  const [Hovered, listener] = useHover();


  return (
    <>
      <Header />

      <main>
        <div style={styles.container}>
          <Link href="/events-page">  <button
              style={{...styles.backbutton,
                textDecoration: Hovered ? "underline" : "none",}}{...listener}>
              ← Events
            </button></Link>
        </div>

        <OptionsBar/>
       

      </main>

    
    </>
  );
}
