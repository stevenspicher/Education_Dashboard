import {useNavigate} from "react-router-dom";
import {selectedDistrict} from "../../../store/signalStore.js";
import {navigateToPage} from "../../../utils/functions.js";
import {Link} from "@mui/material";

//// Schools in the district, shown as one always-visible column per level.
//// Primary schools sit with elementary; a school with more than one report card
//// (e.g. grades 6-12) is listed under each of its levels.
const LEVELS = [
    {code: "E", title: "Elementary"},
    {code: "M", title: "Middle"},
    {code: "H", title: "High"},
];

// roughly 15 schools before a column scrolls (vertically only)
const COLUMN_MAX_HEIGHT = "460px";

const DistrictSchoolList = () => {
    const district = selectedDistrict.value
    const navigate = useNavigate();

    const schools = district.districtSchoolList
        .map((entry) => entry[0])
        .slice()
        .sort((a, b) => a.schoolName.localeCompare(b.schoolName));

    const columns = LEVELS.map((level) => ({
        ...level,
        schools: schools.filter((school) =>
            (school.codes ?? [school.code]).map((code) => (code === "P" ? "E" : code)).includes(level.code)),
    })).filter((column) => column.schools.length > 0);

    return (
        <div style={{padding: "10px 30px 20px"}}>
            <h5 className={"chart-title"} style={{marginLeft: "70px", marginTop: "10px"}}>
                Schools in this district ({schools.length})
            </h5>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "24px",
                marginTop: "10px",
            }}>
                {columns.map((column) => (
                    <div key={column.code} style={{minWidth: 0}}>
                        <div style={{
                            fontWeight: "bold",
                            borderBottom: "2px solid black",
                            paddingBottom: "4px",
                            marginBottom: "6px",
                        }}>
                            {column.title} ({column.schools.length})
                        </div>
                        <div style={{maxHeight: COLUMN_MAX_HEIGHT, overflowY: "auto", overflowX: "hidden"}}>
                            {column.schools.map((school) => (
                                <div key={school.id} style={{padding: "3px 0", overflowWrap: "anywhere"}}>
                                    <Link
                                        component="button"
                                        style={{textAlign: "left"}}
                                        onClick={() => {
                                            navigateToPage({schoolId: school.id, schoolCode: school.code}, navigate)
                                        }}>
                                        {school.schoolName}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DistrictSchoolList;
