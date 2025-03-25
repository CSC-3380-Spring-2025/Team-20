import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

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

// Updated styles based on Figma
const styles = {
  header: {
    backgroundColor: "purple",
    color: "white",
    padding: "10px 20px",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navLeft: {
    display: "flex",
    alignItems: "center",
    listStyleType: "none",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    listStyleType: "none",
  },
  navItem: {
    marginLeft: "15px",
  },
  hamburger: {
    background: "none",
    border: "none",
    fontSize: "30px",
    color: "white",
    cursor: "pointer",
  },
  mobileMenu: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "250px",
    height: "100vh",
    backgroundColor: "coral",
    padding: "20px 30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    zIndex: 1000,
  },
  mobileLink: {
    color: "white",
    margin: "20px 0",
    textDecoration: "none",
    fontSize: "18px",
  },
};

export default Header;
