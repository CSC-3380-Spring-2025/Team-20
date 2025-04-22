import { CSSProperties } from 'react';

//cool background when the user clicks this
export const overlay: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.2)',
  zIndex: 9,
};

//eventform container
export const container: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',

  padding: '30px',
  borderRadius: '12px',
  
  
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '450px',
  maxHeight: '90%',

 
  backgroundColor: '#ffffff',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',

  zIndex: 10,
};

//header
export const Titleheader: CSSProperties = {
  textAlign: 'center',
  marginBottom: '20px',
  fontWeight: 'bold',
  fontSize: '24px',

};

//input containers
export const inputContainers: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '20px',
};


//the actual label text
export const label: CSSProperties = {
  marginBottom: '6px',
  fontSize: '14px',
  fontWeight: '600',
  color: '#333',
};

//input areas
export const input: CSSProperties = {
  padding: '12px 15px',
  fontSize: '14px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  outline: 'none',
};

//create and cancel containers
export const buttonContainer: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '25px',
};

export const submitButton: CSSProperties = {
  flex: 1,

  border: 'none',
  borderRadius: '6px',

  cursor: 'pointer',
  fontWeight: 'bold',

  marginRight: '10px',
  backgroundColor: ' #FDD023',
  color: 'white',
  transition: 'background-color 0.3s ease',
};

export const cancelButton: CSSProperties = {
  flex: 1,
  padding: '12px',
  borderRadius: '6px',


  backgroundColor: '#461D7C',
  color: 'white',
  border: 'none',
  fontWeight: 'bold',
 
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};


