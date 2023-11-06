import {Link} from "@mui/material";
import {useNavigate} from "react-router-dom";

const SchoolHeader = ({school}) => {
    const navigate = useNavigate();
    return (
        <div style={{textAlign: "center", padding: "10px"}}>
            <div className={"h1"}>{school.schoolName}</div>
            <div>
                <div className={"h4"}>{school.totalStudents} students, {school.teacherCount} teachers</div>
            </div>
            <div className={"h4"}>{school.street}, {school.city}</div>
            <div className={"h4"}>
                <Link onClick={() => {
                    navigate(`/district/${school.districtId}`)
                }}>
                    {school.districtName}
                </Link>
            </div>
        </div>
    )
}

export default SchoolHeader