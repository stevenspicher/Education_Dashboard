import {MapContainer, TileLayer, Marker, Popup,} from "react-leaflet";
import schoolGeoData from "../../../dataImport/schoolGeoData.json";
import district_geoData from "../../../dataImport/district_geoData.json";
import {Link} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {schools, selectedDistrict, selectedSchoolId} from "../../../store/signalStore.js";
import {navigateToPage} from "../../../utils/functions.js";

const SchoolsMap = () => {
    const district = selectedDistrict.value.districtSchoolList
    const navigate = useNavigate();
    let centerLatLong;
    district_geoData.features.map((districtOBJ) => {
        if (districtOBJ.properties.district_id === selectedSchoolId.value) {
            centerLatLong = [districtOBJ.properties.Lat.toString(), districtOBJ.properties.Long.toString()]
        } else if (districtOBJ.properties.district_id === "0501999" || districtOBJ.properties.district_id === "0502999" ) {
            centerLatLong = ["33.3024", "-81.023791"]
        }
    })
    const districtSchoolListGeodata = district.map((school, index) => {
        let schoolID = [school[0].id]
        if (schoolID.toString()  === "0503001") {
            schoolID = "0501002"
        }
            if (schoolID.toString()  === "0503002") {
                schoolID = "0501002" // Bamberg-Ernhardt Middle School
            }
        if (schoolID.toString()  === "0503006") {
            schoolID = "0501006" //Richard Carrol Elementary
        }
        if (schoolID.toString()  === "0503007") {
            schoolID = "0502007" // Denmark Olar High School
        }
        if (schoolID.toString()  === "0503008") {
            schoolID = "0502008" // Denmark Olar Middle School
        }
        if (schoolID.toString()  === "0503010") {
            schoolID = "0502010" // Denmark Olar Elementary School
        }
        // if (schoolID.toString()  === "0503010") {
        //     schoolID = "0502010" // Denmark Olar Elementary School
        // }
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
    <MapContainer style={{width:'60%'}} id={"map"}
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