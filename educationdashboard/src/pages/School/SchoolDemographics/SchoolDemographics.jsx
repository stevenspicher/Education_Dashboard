import {Stack} from "@mui/material";
import {selectedSchool} from "../../../store/signalStore.js";
import {schoolScoreDataChart} from "../../../components/Charts/Charts.jsx";
import SchoolLegend from "../../../components/Legends/SchoolLegend.jsx";

const SchoolDemographics = () => {
    const school = selectedSchool.value
    console.log(school)
    return (
        <Stack>
            <h5 style={{marginLeft: "100px", marginTop: "10px"}} className={"chart-title"}>Demographics</h5>
        <SchoolLegend school={school}/>
            <Stack
                className="chart-container"
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                {schoolScoreDataChart(school, "studentsInPovertyPct", school.code)}
                {schoolScoreDataChart(school, "studentsWithDisabilities", school.code)}
            </Stack>
            <Stack
                className="chart-container"
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                {schoolScoreDataChart(school, "studentsWhite", school.code, )}
                {schoolScoreDataChart(school, "studentsBlack", school.code, )}
                {schoolScoreDataChart(school, "studentsOther", school.code, )}

            </Stack>
        </Stack>
    )
}
export default SchoolDemographics