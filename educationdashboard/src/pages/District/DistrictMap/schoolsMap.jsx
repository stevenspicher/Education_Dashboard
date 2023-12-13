import {MapContainer, TileLayer, Marker, Popup,} from "react-leaflet";
import schoolGeoData from "../../../dataImport/schoolGeoData.json";
import {Link} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {selectedDistrict} from "../../../store/signalStore.js";
import {navigateToPage} from "../../../utils/functions.js";
import { getCenter, schoolFix} from "./districtAndSchoolFix.js";

const SchoolsMap = () => {

    const district = selectedDistrict.value.districtSchoolList
    const navigate = useNavigate();
    let centerLatLong = getCenter();
    const districtSchoolListGeodata = district.map((school, index) => {
        let schoolID = schoolFix([school[0].id])
        if (schoolGeoData[schoolID]  !== undefined) {
                return (
                    <Marker key ={index} position={[schoolGeoData[schoolID].lat, schoolGeoData[schoolID].lon]}>
                        <Popup>
                            <Link onClick={() => {
                                navigateToPage(school[0], navigate)
                            }}>
                                {school[0].schoolName}
                            </Link>
                        </Popup>
                    </Marker>
                )
        }
    })
    return (
    <MapContainer style={{width:'50%'}} id={"map"}
                  center={centerLatLong}
                  zoom={9} scrollWheelZoom={false} >
        <TileLayer
            attribution=' Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {districtSchoolListGeodata}
    </MapContainer>

        )
};

export default SchoolsMap;