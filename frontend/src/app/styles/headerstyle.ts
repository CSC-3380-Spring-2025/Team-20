export const header  = {
    backgroundColor: "#461D7C",
    color: "white",
    padding: "17px 20px",
    fontWeight: "bold",
  };
  
  export const nav  = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  
  export const navLeft  = {
    display: "flex",
    alignItems: "center",
    listStyleType: "none",
  };
  
  export const navRight = {
    display: "flex",
    alignItems: "center",
    listStyleType: "none",
  };
  
  export const navItem  = {
    marginLeft: "15px",
  };
  
  export const hamburger = {
    background: "none",
    border: "none",
    fontSize: "30px",
    color: "#FDD023",
    cursor: "pointer",
  };
  
  export const mobileMenu = {
    position: "fixed" as "fixed" | "relative" | "absolute" | "static" | "sticky",
    top: 0,
    right: 0,
    width: "250px",
    height: "100vh",
    backgroundColor: "#FDD023",
    padding: "20px 30px",
    display: "flex",
    flexDirection:  "column" as 'column',
    alignItems: "flex-start",
    zIndex: 1000,
  };
  
  export const mobileLink = {
    color: "white",
    margin: "20px 0",
    textDecoration: "none",
    fontSize: "18px",
  };