import {Link} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {selectedDistrict} from "../../../store/signalStore.js";
import {navigateToPage} from "../../../utils/functions.js";

const DistrictSchoolList = () => {
    const district = selectedDistrict.value
    const navigate = useNavigate();
    const displaySchoolInfo = (school, code) => {

        if (school.code === code) {
            school.schoolId = school.id
            return (
                <Link onClick={() => {
                    navigateToPage(school, navigate)
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
                {district.districtSchoolList.map((school, index) => {
                    return (
                        <div key={index}>
                            {displaySchoolInfo(school[0], "E")}
                        </div>
                    )
                })
                }


                <ul>Middle Schools</ul>
                <ul>
                    {district.districtSchoolList.map((school, index) => {
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
                    {district.districtSchoolList.map((school, index) => {
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