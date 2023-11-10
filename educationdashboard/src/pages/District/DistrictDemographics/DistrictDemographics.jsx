
import {Stack} from "@mui/material";
import {selectedDistrict} from "../../../store/signalStore.js";
import {schoolScoreDataChart} from "../../../components/Charts/Charts.jsx";

const DistrictDemographics = () => {
    const district = selectedDistrict.value
    return (

        <Stack>
            <h5 style={{marginLeft: "100px"}}>Demographics</h5>
            <Stack
                className="chart-container"
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                {schoolScoreDataChart(district, "studentsInPoverty", "D")}
                {schoolScoreDataChart(district, "studentsWithDisabilities", "D")}

            </Stack>
            <Stack
                className="chart-container"
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >

            </Stack>

        </Stack>

    )
}
export default DistrictDemographics