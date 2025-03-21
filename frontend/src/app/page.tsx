"use client";

import React from "react";
import Login from "./login";

export default function Home() { 

  //i want on my screeen to display this number is greater than 2 else say it's not

  
  return (
    <div style={styles.divContainer}>
      <h3>Login Website</h3>
      <Login/>
    </div>
  );

  
}
/**
 *  return (
    <div style={styles.divContainer}>
      <h3>Login Website</h3>
      NII
    </div>
  );
 */

const styles = {
  divContainer: {
    width: "500px",
    margin: "0 auto",
    paddingTop: "30px",
  },
};
