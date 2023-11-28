import {Stack} from "@mui/material";
import {selectedSchool} from "../../../store/signalStore.js";
import {climateCard} from "../../../components/Cards/Cards.jsx";

const SchoolClimateCards = () => {
const school = selectedSchool.value
    return (
        <Stack>
            <h5 className={"chart-title"} style={{marginLeft:"100px"}}>School Climate</h5>
            <Stack
                className="chart-container"
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                {climateCard(school, "bullyAndHarass")}
                {climateCard(school, "avgTeacherSalaryLastYr")}
                {climateCard(school, "teacherFeelsSafe")}

            </Stack>
            <Stack
                className="chart-container"
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                {climateCard(school, "parentFeelsSafe")}
                {climateCard(school, "violentAssaults")}

            </Stack>
        </Stack>

    )
}
export default SchoolClimateCards