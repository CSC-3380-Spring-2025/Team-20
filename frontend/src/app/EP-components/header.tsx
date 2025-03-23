import Link from "next/link";
import { useState, useEffect, useRef } from "react";

function Header() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null); 


  const toggleHamburger = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsHamburgerOpen(false);
      }
    };

    
    document.addEventListener("mousedown", handleClickOutside);

    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <button style={styles.hamburger} onClick={toggleHamburger}>
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
          <Link href="/bio-page" style={styles.mobileLink}>
            My Page
          </Link>
          <Link href="/events-page" style={styles.mobileLink}>
            Events
          </Link>
          <Link href="/campus-map" style={styles.mobileLink}>
            My Map
          </Link>
          <Link href="/interests" style={styles.mobileLink}>
            Interests
          </Link>
          <Link href="/settings-page" style={styles.mobileLink}>
            Settings
          </Link>
        </div>
      )}
    </header>
  );
}

// Updated styles
const styles = {
  header: {
    backgroundColor: "purple",
    color: "white",
    padding: "10px 20px",
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
