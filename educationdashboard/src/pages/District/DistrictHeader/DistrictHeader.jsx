import { selectedDistrict} from "../../../store/signalStore.js";

const DistrictHeader = () => {

    const district = selectedDistrict.value
    return (
        <div style={{textAlign: "center", padding: "10px"}}>
            <div className={"h1"}>{district.schoolName}</div>
            <div className={"h3"}>{district.totalStudents} students</div>
            <div className={"h4"}>{district.street}, {district.city}</div>
            <div className={"h4"}>{district.schoolPhone}</div>
            <div className={"h4"}> <a href={district.url} target="_blank">{district.url}</a></div>
        </div>
    )
}

export default DistrictHeader