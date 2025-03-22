import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./map'), {
  ssr: false
});

const styles = {
  clickableHome: {
    position: "absolute",
    top: "80px",
    left: "10px",
    height: "35px",
    width: "35px",  
    backgroundColor: "white",
    padding: "5px",
    border: "1px solid gray",
    borderRadius: "5px",
    zIndex: 1000
  }
}

export default Map;
