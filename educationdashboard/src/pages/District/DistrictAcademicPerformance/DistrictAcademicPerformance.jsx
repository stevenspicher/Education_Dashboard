import {selectedDistrict} from "../../../store/signalStore.js";
import {Stack} from "@mui/material";
import {schoolScoreDataChart} from "../../../components/Charts/Charts.jsx";
import DistrictLegend from "../../../components/Legends/DistrictLegend.jsx";

const DistrictAcademicPerformance = () => {
    const district = selectedDistrict.value

    return (
        <Stack>
            <h5 className={"chart-title"} style={{marginLeft: "100px", marginTop: "10px"}}>Academic Performance</h5>
            <DistrictLegend district={district}/>
            <Stack
                className="chart-container"
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                // spacing={4}
            >
                {schoolScoreDataChart(district, "positiveMathScoreAvg", "D")}
                {schoolScoreDataChart(district, "positiveReadingScoreAvg", "D")}
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