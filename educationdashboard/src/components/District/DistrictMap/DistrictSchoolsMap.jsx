import {MapContainer, TileLayer, GeoJSON, Marker, Popup,} from "react-leaflet";
import Legend from "../../Legend.jsx"
import schoolGeoData from"../../../dataImport/schoolGeoData.json"
import {Link} from "@mui/material";
import {useNavigate} from "react-router-dom";

const DistrictSchoolsMap = ({district}) => {
    const navigate = useNavigate();
    console.log(district)

    const districtSchooListGeodata = district.map((school, index) => {
        if (schoolGeoData[school[0].id]  !== undefined) {
            if (schoolGeoData[school[0].id].lat !== "no_result"
               ) {

                return (
                    <Marker key ={index} position={[schoolGeoData[school[0].id].lat, schoolGeoData[school[0].id].lon]}>
                        <Popup>
                            <Link onClick={() => {
                                navigate(`/school/${school[0].id}+${school[0].type}`)
                            }}>
                                {school[0].schoolName}
                            </Link>
                        </Popup>
                    </Marker>
                )
            }
        }
    })
    console.log(schoolGeoData[district[0][0].id])
    return (

    <MapContainer id={"map"} center={schoolGeoData[district[0][0].id]} zoom={9} scrollWheelZoom={true} >
        <TileLayer
            attribution=' Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Legend/>
        {/*<GeoJSON  />*/}
        {/*<GeoJSON data={district_geoData} />*/}
        {/*<Marker position={[schoolGeoData[0].lat, schoolGeoData[0].long]}>*/}
        {/*    <Popup>*/}
        {/*        {"schoolGeoData[0]"}*/}
        {/*    </Popup>*/}
        {/*</Marker>*/}
        {districtSchooListGeodata }
    </MapContainer>
        )
};

export default DistrictSchoolsMap;