"use client";

import React from "react";
import Login from "./login";

export default function Home() { 

 

  
  return (
    <div style={styles.divContainer}>
      <h3>Login Website</h3>
      <Login/>
    </div>
  );

  
}


const styles = {
  divContainer: {
    width: "500px",
    margin: "0 auto",
    paddingTop: "30px",
  },
};
