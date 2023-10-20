import {Link} from "@mui/material";
import {useNavigate} from "react-router-dom";

const DistrictSchoolList = (props) => {
    const navigate = useNavigate();
    const displaySchoolInfo = (school, type) => {
        if (school.type === type) {
            return (
                <Link onClick={() => {
                    navigate(`/school/${school.id}`)
                }}>
                    {school.schoolName}
                </Link>
            )
        }
    }
    return (
        <div>
            <h4>Schools in this district</h4>
            <div className="inner-text">
                <ul>Elementary Schools</ul>
                {props.list.map((school, index) => {
                    return (
                        <div key={index}>
                            {displaySchoolInfo(school[0], "E")}
                        </div>
                    )
                })
                }


                <ul>Middle Schools</ul>
                <ul>
                    {props.list.map((school, index) => {
                        return (
                            <div key={index}>
                                {displaySchoolInfo(school[0], "M")}
                            </div>
                        )
                    })
                    }
                </ul>
                <ul>High Schools</ul>
                <ul>
                    {props.list.map((school, index) => {
                        return (
                            <div key={index}>
                                {displaySchoolInfo(school[0], "H")}
                            </div>
                        )
                    })
                    }
                </ul>
            </div>
        </div>

    )
}

export default DistrictSchoolList;