import {MapContainer, TileLayer, GeoJSON, } from "react-leaflet";
import etlData from "../mapping/etl_district_full_data_with_geometries.json"
import Legend from "../components/Legend"
const LiveMap = () => {

    return (

    <MapContainer id={"map"} center={[33.4, -81.1]} zoom={7} scrollWheelZoom={true} >
        <TileLayer
            attribution=' Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Legend/>
        <GeoJSON data={etlData} />
        {/*<GeoJSON data={districtData} />*/}
        {/*<Marker position={[33.4, -81.1]}>*/}
        {/*    <Popup>*/}
        {/*        A pretty CSS3 popup. <br /> Easily customizable.*/}
        {/*    </Popup>*/}
        {/*</Marker>*/}
    </MapContainer>
        )
};

export default LiveMap;