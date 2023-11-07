import {MapContainer, TileLayer, GeoJSON} from "react-leaflet";
import district_geoData from "../../../dataImport/district_geoData.json"
import districtsData from "../../../dataImport/districtsData.json"
import DistrictsMapLegend from "./DistrictsMapLegend.jsx";



const LiveMap = (props) => {
// let showMap = true
// let districtResultsArr = [];
    let district = district_geoData.features;
//     props.districtResults.map((districtSearchResult) => {
//         let dResult = district.filter((dist) => (
//             dist.properties.district_id.includes(districtSearchResult.id)
//         ))
//         if (dResult)
//         districtResultsArr.push(...dResult)
//     })
//     if (districtResultsArr[0] === undefined) {
//         district = district
//     } else {district = districtResultsArr}




    const districtName = (id) => {
        if (districtsData[id] !== undefined)
        {
        return (
            `<a href="/district/${[id]}">${districtsData[id].schoolName}</a>`
        )
        } else {return ""}
    }
    const districtGradRate = (id) => {
        if (districtsData[id] !== undefined)
        {
            return ("    Graduation Rate: " + districtsData[id].gradRate)
        } else {return ""}
    }

    const districtAvgActScore = (id) => {
        if (districtsData[id] !== undefined)
        {
            return "    Average ACT Score: " + districtsData[id].ACTCompositeAVG
        } else {return ""}
    }

    const districtAvgTeacherSalary = (id) => {
        if (districtsData[id] !== undefined)
        {
            return "    Average Teacher Salary: " + districtsData[id].avgTeacherSalary
        } else {return ""}
    }

    const districtTeacherRetention = (id) => {
        if (districtsData[id] !== undefined)
        {
            return "    3-Yr Teacher Retention: " + districtsData[id].teacherReturnRate
        } else {return ""}
    }

    const style=
        {
            fillColor:"blue",
            weight: 2,
            color: "white",
            dashArray: 5
        }


        const onEachDistrict = (district, layer) => {
        let id = district.properties.district_id
        layer.bindPopup(districtName(id)
            // + districtGradRate(id) + districtAvgActScore(id) + districtAvgTeacherSalary(id))
        ).openPopup();

        layer.options.fillColor = "green"
        layer.options.weight = "5"
        layer.options.dashArray = "6"

        }

        // if (showMap) {
            return (

                <MapContainer id={"map"} center={[33.7, -81.1]} zoom={8} scrollWheelZoom={false}
                              style={{height: "100%"}}>
                    <TileLayer
                        attribution=' Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <DistrictsMapLegend/>
                    <GeoJSON
                        key={JSON.stringify(district[0])} //to cause rerender when district list is updated
                        style={style}
                        data={district}
                        onEachFeature={onEachDistrict}/>
                </MapContainer>

            )
        // } else {
        //
        // return (<></>)
        // }

};
export default LiveMap;