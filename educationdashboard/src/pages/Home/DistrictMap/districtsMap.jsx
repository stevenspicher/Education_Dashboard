import {MapContainer, TileLayer, GeoJSON} from "react-leaflet";
import district_geoData from "../../../dataImport/district_geoData.json"
import {
    allSchools,
    mapDataType, districtsMapKey, layerColor, mapScore, topSearchResultsObj, topSearchResults,
} from "../../../store/signalStore.js";
import DistrictsMapButtons from "./DistrictsMapButtons.jsx";
import DistrictsHeatMap from "./DistrictsHeatMap.jsx";
import { districtFix} from "../../District/DistrictMap/districtAndSchoolFix.js";

const DistrictsMap = () => {
    let districtsData = topSearchResults.value.length !== 0 ? topSearchResultsObj.value :  allSchools.value;

    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    let districtGeoData = district_geoData.features;
        let salaryTitle = "Teacher's Salary: "
        let avgSalary;
    const scorePopup = (id) => {
        let popUpText = "Graduation Rate"
        if (districtsData[id].avgTeacherSalaryCurrYr !== "*" && districtsData[id].avgTeacherSalaryCurrYr !== undefined && districtsData[id].avgTeacherSalaryCurrYr !== null) {
            avgSalary = districtsData[id].avgTeacherSalaryCurrYr;
        } else
        if ( avgSalary !== undefined &&  districtsData[id].avgTeacherSalaryLastYr !== "*" && districtsData[id].avgTeacherSalaryLastYr !== undefined && districtsData[id].avgTeacherSalaryLastYr !== null) {
            avgSalary = districtsData[id].avgTeacherSalaryLastYr;
            salaryTitle = "Teachers's Salary (2022)"
        } else {avgSalary = "*"};
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
                popUpText = salaryTitle + USDollar.format(avgSalary)
                mapScore.value = avgSalary
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
    return (

        <MapContainer id={"map"} center={[33.65, -81.4]} zoom={8} scrollWheelZoom={false}
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
                onEachFeature={onEachDistrict}
            />
        </MapContainer>

    )
};
export default DistrictsMap;