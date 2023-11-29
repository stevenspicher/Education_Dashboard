import {Link} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {selectedSchool, selectedSchoolId, selectedSchoolCode} from "../../../store/signalStore"
import {navigateToPage} from "../../../utils/functions.js";

const SchoolHeader = () => {
    const school = selectedSchool.value;
    const navigate = useNavigate();
    return (
        <div style={{textAlign: "center", padding: "10px"}}>
            <div className={"h1"}>{school.schoolName}</div>
            <div className={"h5"}>{school.street}, {school.city} | {school.totalStudents} students |   {school.teacherCount} teachers</div>
                <div className={"h5"}></div>

            <div className={"h5"}>
                <Link onClick={() => {
                 navigateToPage({schoolCode: "D", schoolId: school.districtId}, navigate)
                }}>
                    {school.districtName}
                </Link>
            </div>
        </div>
    )
}

export default SchoolHeader