import {Stack} from "@mui/material";
import {selectedSchool} from "../../../store/signalStore.js";
import {schoolScoreDataChart} from "../../../components/Charts/Charts.jsx";

const SchoolDemographics = () => {
    const school = selectedSchool.value
    return (
        <Stack>
            <h5 style={{marginLeft: "100px"}}>Demographics</h5>
            <Stack
                className="chart-container"
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                {schoolScoreDataChart(school, "studentsInPoverty", school.code)}
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