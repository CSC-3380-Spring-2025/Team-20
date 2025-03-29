"use client";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

import * as styles from "../styles/header-style";

function Header() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  // Toggle hamburger menu visibility
  const toggleHamburger = () => {
    setIsHamburgerOpen(prevState => !prevState);
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

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <ul style={styles.navLeft}>
          <li style={styles.navItem}>
            <Link href="/bio-page">UNIFRIEND-SYNC</Link>
          </li>
        </ul>

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
            <Link href="/landing">Log Out</Link>
          </li>
        </ul>
      </nav>

      {isHamburgerOpen && (
        <div ref={mobileMenuRef} style={styles.mobileMenu}>
          <Link href="/bio-page" style={styles.mobileLink} aria-label="Go to my page">
            My Page
          </Link>
          <Link href="/" style={styles.mobileLink} aria-label="Go to events page">
            Events
          </Link>
          <Link href="/campus-map" style={styles.mobileLink} aria-label="Go to campus map">
            My Map
          </Link>
          <Link href="/interests" style={styles.mobileLink} aria-label="Go to interests page">
            Interests
          </Link>
          <Link href="/settings-page" style={styles.mobileLink} aria-label="Go to settings page">
            Settings
          </Link>
        </div>
      )}
    </header>
  );
}


export default Header;