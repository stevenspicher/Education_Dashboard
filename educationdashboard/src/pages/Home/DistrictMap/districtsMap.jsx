import {MapContainer, TileLayer, GeoJSON} from "react-leaflet";
import district_geoData from "../../../dataImport/district_geoData.json"
import {
    allSchools,
    mapDataType, districtsMapKey, topSearchResultsObj, searchQuery,
} from "../../../store/signalStore.js";
import DistrictsMapButtons from "./DistrictsMapButtons.jsx";
import DistrictsHeatMap from "./DistrictsHeatMap.jsx";
import { districtFix} from "../../District/DistrictMap/districtAndSchoolFix.js";
import {formatMetric, getScale, metricLabel, metricValue} from "../../../utils/mapScale.js";
import {getSalary} from "../../../utils/values.js";

const DistrictsMap = () => {
    // while a search is active only the matching districts are drawn
    const districtsData = searchQuery.value.trim() !== "" ? topSearchResultsObj.value : allSchools.value;
    const metric = mapDataType.value;
    const scale = getScale(metric, allSchools.value);
    const districtGeoData = district_geoData.features;

    const scorePopup = (district) => {
        let label = metricLabel(metric);
        if (metric === "avgTeacherSalaryLastYr" && getSalary(district).priorYear) {
            label += " (prior year)"
        }
        return (
            `<a href="/district/${district.schoolId}">${district.schoolName}</a>
                <p>${label}: ${formatMetric(metric, metricValue(district, metric))}</p>`
        )
    }

    const districtStyle = (districtgeo) => {
        const district = districtsData[districtFix(districtgeo)];
        if (district === undefined) {
            return {weight: 0, fillOpacity: 0}
        }
        return {
            fillColor: scale.colorFor(metricValue(district, metric)),
            fillOpacity: 1,
            weight: 2,
            dashArray: "2",
        }
    }

    const onEachDistrict = (districtgeo, layer) => {
        const district = districtsData[districtFix(districtgeo)];
        if (district !== undefined) {
            layer.bindPopup(scorePopup(district));
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
                key={districtsMapKey.value} //to cause rerender when district list or metric is updated
                style={districtStyle}
                data={districtGeoData}
                onEachFeature={onEachDistrict}
            />
        </MapContainer>

    )
};
export default DistrictsMap;
