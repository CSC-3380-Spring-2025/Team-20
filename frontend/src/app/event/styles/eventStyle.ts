// Shared styles can be placed here as simple JavaScript/TypeScript objects

import { CSSProperties } from 'react';

export const titleStyle: CSSProperties = {
    fontSize: '30px',
    padding: '1px 12px',
    fontWeight: 'bold',
  };
  
export const linkStyle: CSSProperties = {
  fontSize: '30px',
  marginTop: '50px',
  color: 'black',
  padding: '1px 12px',
  fontWeight: 'bold',
};


export const headerStyle: CSSProperties = {
  fontSize: '25px',
  padding: '1px 12px',
  fontWeight: 'bold',

}

export const descriptionStyle: CSSProperties = {
  color: '#555',
  margin: '8px 0',
  fontSize: '14px'
};

export const interestedStyle: CSSProperties = {
  color: '#666',
  fontSize: '13px',
  margin: '5px 0'
};


export const joinButton: CSSProperties = {
  padding: '2px 10px',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
};



export const cancelButton: CSSProperties = {
  padding: '2px 10px',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

export const container: CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '10px',
  margin: '10px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  borderLeft: '4px solid #24a0ed',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start'
}

export const defaultText: CSSProperties = {
  color: '#888', 
  fontStyle: 'italic',
  paddingLeft: '10px',
  marginTop: '8px' 
}


export const eventCard: CSSProperties = {
      backgroundColor: "white",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "5px",
      width: "100%",
}

export const loadingContainer: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
};

export const loginContainer: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  gap: '20px'
};

export const buttonLoadingText: CSSProperties = {
  display: 'inline-block',
  minWidth: '80px'
};

export const linkButton: CSSProperties = {
  ...linkStyle,
  display: 'block',
  margin: '20px auto',
  textAlign: 'center'
};

export const mainContainer: CSSProperties = {
  marginBottom: '40px',
  position: 'relative'
};

export const contentContainer: CSSProperties = {
  padding: '2px',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto'
};

export const alertContainer: CSSProperties = {
  position: 'fixed',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'blue',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 'bold',
  zIndex: 1000
};

export const pageContainer: CSSProperties = {
  padding: "2px", 
  width: "100%"
};

export const headerContainer: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "40px 20px 10px 10px",
  width: "100%"
};

export const addButton: CSSProperties = {
  ...joinButton,
  backgroundColor: 'purple',
};