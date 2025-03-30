export const container = {
    display: 'flex',
    flexDirection:  "column" as 'column',
    padding: '25px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    zIndex: 10000, 
    position: "fixed" as "fixed" | "relative" | "absolute" | "static" | "sticky",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  };

  export const header = {
    fontWeight: "bold",
    fontSize: "20px",
  }
  
  export const overlay = {
    position: "fixed" as "fixed" | "relative" | "absolute" | "static" | "sticky",
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: 9999, 
  };
  
  export const subtitleHeaders = {
    marginTop: '20px',
  }


  export const input = {
    marginBottom: '10px',
   
    padding: '20px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  };
  
  export const buttonContainer = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px',
  };
  
  export const submitButton = {
    padding: '10px 20px',
    backgroundColor: 'lightgreen',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };
  
  export const cancelButton = {
    padding: '10px 20px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  }

  export const joinButton = {
    padding: '2px 10px',
    backgroundColor: 'lightgreen',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  }