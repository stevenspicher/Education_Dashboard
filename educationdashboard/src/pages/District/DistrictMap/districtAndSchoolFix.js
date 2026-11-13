import {allSchools, selectedSchoolId} from "../../../store/signalStore.js";
import district_geoData from "../../../dataImport/district_geoData.json";
import schoolGeoData from "../../../dataImport/schoolGeodata.json";

// to correct match errors between geodataset and district data
export  const districtFix = (districtgeo) => {
    // Barnwell 19, 29 (Williston) and 45 consolidated into Barnwell County School District (0601999)
    if (["0619999", "0629999", "0645999"].includes(districtgeo.properties.district_id)
        && allSchools.value["0601999"] !== undefined) {
        return "0601999"
    }
    if (districtgeo.properties.district_full_name.includes("Bamberg")) {
        return "0503999"
    } else if (districtgeo.properties.district_id === "3803999"
        || districtgeo.properties.district_id ==="3804999"
        || districtgeo.properties.district_id === "3805999") { //OrangeBurg
        return "3809999"}
    else if (districtgeo.properties.district_full_name.includes("Barnwell School District 45")
    ){
        return "0645999"
    }
    else if (districtgeo.properties.district_id === "1401999" ||
        districtgeo.properties.district_id === "1402999" ||
        districtgeo.properties.district_id === "1403999") //Clarendon
    {
        return "1406999"
    }
    else if (districtgeo.properties.district_full_name.includes("Barnwell School District 19") ||
        districtgeo.properties.district_full_name.includes("Williston School District (Barnwell 29)"))
    {
        return "0648999"
    }

    else if (districtgeo.properties.district_id === "2104999") //FLorence 4
    {
        return "2101999"
    }
    else if (districtgeo.properties.district_full_name.includes("Hampton") ) {
        return "2503999"

    } else if (districtgeo.properties.district_full_name.includes("Richland School District Two") )
    {
        return districtgeo.properties.district_id
    }
    else {return districtgeo.properties.district_id}
}

export const schoolFix = (schoolID) => {
    let newSchoolID = schoolID;
    // Barnwell County schools were renumbered when the districts consolidated
    const barnwell = {
        "0601001": "0619001", // Blackville-Hilda High School
        "0601003": "0619003", // Macedonia Elementary Middle School
        "0601006": "0629006", // Williston-Elko High School
        "0601007": "0629007", // Kelly Edwards Elementary School
        "0601009": "0645009", // Barnwell High School
        "0601010": "0645010", // Guinyard Butler Middle School
        "0601012": "0645012", // Barnwell Elementary School
    }
    if (barnwell[schoolID.toString()] !== undefined) {
        return barnwell[schoolID.toString()]
    }
    if (schoolID.toString() === "0503001") { // Bamberg-Ernhardt High School
        newSchoolID = "0501002"
    }
    if (schoolID.toString() === "0503002") {
        newSchoolID = "0501002" // Bamberg-Ernhardt Middle School
    }
    if (schoolID.toString() === "0503006") {
        newSchoolID = "0501006" //Richard Carrol Elementary
    }
    if (schoolID.toString() === "0503007") {
        newSchoolID = "0502007" // Denmark Olar High School
    }
    if (schoolID.toString() === "0503008") {
        newSchoolID = "0502008" // Denmark Olar Middle School
    }
    if (schoolID.toString() === "0503010") {
        newSchoolID = "0502010" // Denmark Olar Elementary School
    }
    if (schoolID.toString() === "0648007") {
        newSchoolID = "0629007" // Kelly Edwards Elementary School
    }
    if (schoolID.toString() === "0648003") {
        newSchoolID = "0619003" // Macedonia Elementary/Middle School
    }
    if (schoolID.toString() === "0648006") {
        newSchoolID = "0629006" // Williston-Elko High School
    }
    if (schoolID.toString() === "0648001") {
        newSchoolID = "0619001" // Blackville-Hilda High School
    }
    if (schoolID.toString() === "5209999") {
        newSchoolID = "0619001" // Palmetto
    }
    return newSchoolID
}

export const getCenter = () => {
    let centerLatLong;
    if (selectedSchoolId.value === "0501999" || selectedSchoolId.value === "0502999" || selectedSchoolId.value === "0503999") {centerLatLong = ["33.3024", "-81.023791"]}
    else if (selectedSchoolId.value === "0601999" ) {centerLatLong = ["33.3", "-81.35"]} //Barnwell County
    else if (selectedSchoolId.value === "0648999" ) {centerLatLong = ["33.241161", "-81.35504"]}
    else if (selectedSchoolId.value === "3809999" ) {centerLatLong = ["33.241161", "-81.35504"]} //OrangeBurg County
    else if (selectedSchoolId.value === "2503999" ) {centerLatLong = ["33.241161", "-81.35504"]} //Hampton
    else if (selectedSchoolId.value === "1406999" ) {centerLatLong = ["33.89193", "-81.011801"]} //Clarendon
    else if (selectedSchoolId.value === "5209999" ) {centerLatLong = ["33.89193", "-81.011801"]} //Palmetto
    else if (selectedSchoolId.value === "4701999" ) {centerLatLong = ["33.89193", "-81.011801"]} //SOUTH CAROLINA PUBLIC CHARTER
    else {
        let lat = district_geoData.features.filter(dist => dist.properties.district_id === selectedSchoolId.value)[0].properties.Lat
        let long = district_geoData.features.filter((dist) => dist.properties.district_id === selectedSchoolId.value)[0].properties.Long
        centerLatLong = [lat, long]}
    return centerLatLong
}
