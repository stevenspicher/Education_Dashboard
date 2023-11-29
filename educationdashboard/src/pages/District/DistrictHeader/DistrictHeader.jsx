import {selectedSchool} from "../../../store/signalStore.js";

const DistrictHeader = () => {

    const district = selectedSchool.value
    return (
        <div style={{textAlign: "center", padding: "10px"}}>
            <div className={"h1"}>{district.schoolName}</div>
            <div className={"h5"}>{district.street}, {district.city}    |     Phone: {district.schoolPhone} | {district.totalStudents} students</div>
            <div className={"h5"}> <a href={district.url} target="_blank">{district.url}</a></div>
        </div>
    )
}

export default DistrictHeader