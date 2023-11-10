import {MapContainer, TileLayer, Marker, Popup,} from "react-leaflet";
import schoolGeoData from "../../../dataImport/schoolGeoData.json"
import {Link} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {selectedDistrict} from "../../../store/signalStore.js";
import {navigateToPage} from "../../../utils/functions.js";

const DistrictSchoolsMap = () => {
    const district = selectedDistrict.value.districtSchoolList
    const navigate = useNavigate();
    const districtSchooListGeodata = district.map((school, index) => {
        if (schoolGeoData[school[0].id]  !== undefined) {
            if (schoolGeoData[school[0].id].lat !== "no_result"
               ) {

                return (
                    <Marker key ={index} position={[schoolGeoData[school[0].id].lat, schoolGeoData[school[0].id].lon]}>
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
        }
    })
    return (
    <MapContainer style={{width:'60%'}} id={"map"} center={schoolGeoData[district[0][0].id]} zoom={9} scrollWheelZoom={false} >
        <TileLayer
            attribution=' Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {districtSchooListGeodata }
    </MapContainer>

        )
};

export default DistrictSchoolsMap;