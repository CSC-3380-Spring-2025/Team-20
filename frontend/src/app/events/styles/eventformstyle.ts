import { CSSProperties } from 'react';

export const container: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  padding: '25px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  zIndex: 10000, 
  position: 'fixed', // no need for the "as" cast here
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
};

export const header: CSSProperties = {
  fontWeight: 'bold',
  fontSize: '20px',
};

export const overlay: CSSProperties = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  zIndex: 9999, 
};

export const subtitleHeaders: CSSProperties = {
  marginTop: '20px',
};

export const input: CSSProperties = {
  marginBottom: '10px',
  padding: '20px',
  fontSize: '16px',
  borderRadius: '4px',
  border: '1px solid #ddd',
};

export const buttonContainer: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '30px',
};

export const submitButton: CSSProperties = {
  padding: '10px 20px',
  backgroundColor: 'lightgreen',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

export const cancelButton: CSSProperties = {
  padding: '10px 20px',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
};



