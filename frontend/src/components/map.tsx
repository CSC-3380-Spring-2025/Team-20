import "leaflet/dist/leaflet.css"; 
import style from "../../styles/home.module.css";
import { MapContainer, TileLayer } from "react-leaflet";

export default function Map() {
    return (
        <MapContainer center={[30.412035, -91.183815]} zoom={15} scrollWheelZoom={true} className ={style.map}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            
        </MapContainer>
    );
}

