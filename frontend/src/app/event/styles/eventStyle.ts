import { CSSProperties } from 'react';

export const titleStyle: CSSProperties = {
  fontSize: '30px',
  padding: '1px 12px',
  fontWeight: 'bold',
};

export const linkStyle: CSSProperties = {
  fontSize: '20px',
  
  color: 'black',
  padding: '4px 12px',
  fontWeight: 'bold',
  
 
};

export const headerStyle: CSSProperties = {
  fontSize: '25px',
  padding: '1px 12px',
  fontWeight: 'bold',
  marginBottom: '15px'
};


export const joinButton: CSSProperties = {
  padding: '6px 12px',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
  backgroundColor: ' dark purple',
  fontSize: '14px',
  minWidth: '70px'
};

export const cancelButton: CSSProperties = {
  padding: '6px 12px',
  backgroundColor: 'yellow',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '14px',
  minWidth: '70px'
};

export const linkButton: CSSProperties = {
  ...linkStyle,
  display: 'block',
  margin: '20px auto',
  textAlign: 'center'
};