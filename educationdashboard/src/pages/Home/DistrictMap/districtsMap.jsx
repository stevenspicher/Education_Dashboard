import {MapContainer, TileLayer, GeoJSON, Marker, Popup} from "react-leaflet";
import district_geoData from "../../../dataImport/district_geoData.json"
import {
    allSchools,
    mapDataType, districtsMapKey, layerColor, mapScore, topSearchResultsObj, topSearchResults, selectedDistrict,
} from "../../../store/signalStore.js";
import DistrictsMapButtons from "./DistrictsMapButtons.jsx";
import DistrictsHeatMap from "./DistrictsHeatMap.jsx";
import {districtFix, getCenter, schoolFix} from "../../District/DistrictMap/districtAndSchoolFix.js";
import {useNavigate} from "react-router-dom";
import schoolGeoData from "../../../dataImport/schoolGeodata.json";
import {Link} from "@mui/material";
import {navigateToPage} from "../../../utils/functions.js";




const DistrictsMap = () => {
    let districtsData = topSearchResults.value.length !== 0 ? topSearchResultsObj.value :  allSchools.value;

    let districtGeoData = district_geoData.features;
    const scorePopup = (id) => {
        let popUpText = "Graduation Rate"

        if (districtsData[id] !== undefined) {
        switch (mapDataType.value) {
            case "gradRate":
                popUpText = "Graduation Rate: " + districtsData[id].gradRate + "%"
                mapScore.value = districtsData[id].gradRate
                break;
            case "ACTCompositeAVG":
                popUpText = "AVG ACT Score: " + districtsData[id].ACTCompositeAVG
                mapScore.value = districtsData[id].ACTCompositeAVG
                break;
            case "avgTeacherSalaryLastYr":
                popUpText = "Teacher Salary: " + districtsData[id].avgTeacherSalaryLastYr
                mapScore.value = districtsData[id].avgTeacherSalaryLastYr
                break;
            case "teacherReturnRate":
                popUpText = "Teacher Retention: " + districtsData[id].teacherReturnRate  + "%"
                mapScore.value = districtsData[id].teacherReturnRate
                break;
        }
        }
        if (districtsData[id] !== undefined) {

            return (
                `<a href="/district/${[id]}">${districtsData[id].schoolName}</a>
                <p>${popUpText}</p>`
            )
        } else {
            return ""
        }
    }

    const style =
        {
            fillOpacity: 0,
            dashArray: 0
        }

    const onEachDistrict = (districtgeo, layer) => {
        let id = districtFix(districtgeo);
        layer.options.dashArray = "0"
        layer.options.weight = "0"
        if (districtsData[id] !== undefined) {
            layer.bindPopup(scorePopup(id)
            ).openPopup();
            layer.options.fillColor = layerColor.value
            layer.options.weight = "2"
            layer.options.dashArray = "2"
            layer.options.fillOpacity = "3"
        }
    }

    const district = selectedDistrict.value.districtSchoolList
    const navigate = useNavigate();

    const districtSchoolListGeodata = Object.entries(allSchools.value).map((school, index) => {
        let schoolID = schoolFix([school[1].schoolId])
        if (schoolGeoData[schoolID]  !== undefined) {
            return (
                <Marker key ={index} position={[schoolGeoData[schoolID].lat, schoolGeoData[schoolID].lon]}>
                    <Popup>
                        <Link onClick={() => {
                            navigateToPage(school[1], navigate)
                        }}>
                            {school[1].schoolName}
                        </Link>
                    </Popup>
                </Marker>
            )
        }
    })
    return (

        <MapContainer id={"map"} center={[33.65, -81.4]} zoom={8} scrollWheelZoom={false}
                      style={{height: "100%"}}>
            <TileLayer
                attribution=' Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DistrictsMapButtons/>
            {districtSchoolListGeodata}
            <DistrictsHeatMap/>
            <GeoJSON
                key={districtsMapKey.value} //to cause rerender when district list is updated
                style={style}
                data={districtGeoData}
                onEachFeature={onEachDistrict}
            />
        </MapContainer>

    )
};
export default DistrictsMap;