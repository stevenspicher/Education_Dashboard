import {Stack} from "@mui/material";

import {selectedDistrict} from "../../../store/signalStore.js";
import {schoolScoreDataChart} from "../../../components/Charts/Charts.jsx";

const DistrictAcademicPerformance = () => {
    const district = selectedDistrict.value
    return (
        <Stack>
            <h5 className={"chart-title"} style={{marginLeft:"100px", marginTop: "10px"}}>Academic Performance</h5>
            <Stack
                className="chart-container"
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                // spacing={4}
            >
                {schoolScoreDataChart(district, "positiveReadingScoreAvg", "D")}
                {schoolScoreDataChart(district, "positiveMathScoreAvg", "D")}
                {schoolScoreDataChart(district, "positiveScienceScoreAvg", "D")}

            </Stack>
            <Stack
                className="chart-container"
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                {schoolScoreDataChart(district, "gradRate", "D")}

                {schoolScoreDataChart(district, "ACTCompositeAVG", "D")}

            </Stack>
       </Stack>
    )
}

export default DistrictAcademicPerformance