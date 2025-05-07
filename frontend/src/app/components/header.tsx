"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import * as styles from "../styles/headerstyle";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

function Header() {
  const { user, logOut } = useAuth();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const router = useRouter();

  // Toggle hamburger menu visibility
  const toggleHamburger = () => {
    setIsHamburgerOpen((prevState) => !prevState);
  };

  // Reference for the mobile menu to handle clicks outside
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close the mobile menu if clicking outside of it
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
      setIsHamburgerOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleLogOut = async () => {
    await logOut();
    router.push("/landing");
  };

  useEffect(() => {
    if (!user) {
      router.push("/landing");
    }
  }, [user, router]);

  const handleTitlePage = async () => {
    if (user) {
      router.push("/bio");
    }
  };

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <ul style={styles.navLeft}>
          <li style={styles.navItem}>
            <button onClick={handleTitlePage}>UNIFRIEND-SYNC</button>
          </li>
        </ul>

        {user ? (
          <ul style={styles.navRight}>
            <li style={styles.navItem}>
              <button
                style={styles.hamburger}
                onClick={toggleHamburger}
                aria-label={isHamburgerOpen ? "Close menu" : "Open menu"}
              >
                &#9776;
              </button>
            </li>
            <li style={styles.navItem}>
              <button onClick={handleLogOut}>Log Out</button>
            </li>
          </ul>
        ) : (
          <div></div>
        )}
      </nav>

      {isHamburgerOpen && (
        <div ref={mobileMenuRef} style={styles.mobileMenu}>
          <button onClick={() => router.push("/bio")} style={styles.mobileLink} aria-label="Go to My Page">
            Profile
          </button>
          <button onClick={() => router.push("/friends")} style={styles.mobileLink} aria-label="Go to Find Friends Page">
            Find Friends
          </button>
          <button onClick={() => router.push("/event")} style={styles.mobileLink} aria-label="Go to Event Page">
            Events
          </button>
          <button onClick={() => router.push("/map")} style={styles.mobileLink} aria-label="Go to Map Page">
            Map
          </button>
          <button onClick={() => router.push("/interest")} style={styles.mobileLink} aria-label="Go to Interest Page">
            Interests
          </button>
          <button onClick={() => router.push("/game")} style={styles.mobileLink} aria-label="Go to Game Page">
            Game
          </button>
          <button onClick={() => router.push("/reference")} style={styles.mobileLink} aria-label="Go to Reference Page">
            reference.tsx
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
