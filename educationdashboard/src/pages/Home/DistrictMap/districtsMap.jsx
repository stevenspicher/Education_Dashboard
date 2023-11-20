import {MapContainer, TileLayer, GeoJSON} from "react-leaflet";
import district_geoData from "../../../dataImport/district_geoData.json"
import {
    districts,
    mapDataType, districtsMapKey, layerColor, mapScore
} from "../../../store/signalStore.js";
import DistrictsMapButtons from "./DistrictsMapButtons.jsx";
import DistrictsHeatMap from "./DistrictsHeatMap.jsx";




const DistrictsMap = () => {

    let districtsData = districts.value;
    let districtGeoData = district_geoData.features;
// console.log(districtsData)
//         console.log(districtGeoData)
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
            case "avgTeacherSalary":
                popUpText = "Teacher Salary: " + districtsData[id].avgTeacherSalary
                mapScore.value = districtsData[id].avgTeacherSalary.split("$")[1]
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
            fillOpacity: 2,
            weight: 4,
            dashArray: 1
        }

    const onEachDistrict = (districtgeo, layer) => {
        let id = districtgeo.properties.district_id
        layer.bindPopup(scorePopup(id)
        ).openPopup();
        console.log(layer.feature.properties)
        layer.options.fillColor = layerColor.value
        layer.options.weight = "2"
        layer.options.dashArray = "2"
        // layer.options.fillOpacity = "3",

    }

    return (

        <MapContainer id={"map"} center={[33.7, -81.1]} zoom={8} scrollWheelZoom={false}
                      style={{height: "100%"}}>
            <TileLayer
                attribution=' Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DistrictsMapButtons/>
            <DistrictsHeatMap/>
            <GeoJSON
                key={districtsMapKey.value} //to cause rerender when district list is updated
                style={style}
                data={districtGeoData}
                onEachFeature={onEachDistrict}/>
        </MapContainer>

    )
};
export default DistrictsMap;