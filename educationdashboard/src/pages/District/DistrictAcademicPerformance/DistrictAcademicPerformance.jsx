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
            <h6 className={"chart-title"} style={{textAlign: "center", marginTop: "10px"}}>Elementary &amp; Middle Schools</h6>
            <Stack
                className="chart-container"
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                {schoolScoreDataChart(district, "positiveMathScoreAvg", "E")}
                {schoolScoreDataChart(district, "positiveReadingScoreAvg", "E")}
                {schoolScoreDataChart(district, "positiveScienceScoreAvg", "E")}

            </Stack>
            <h6 className={"chart-title"} style={{textAlign: "center", marginTop: "10px"}}>High Schools</h6>
            <Stack
                className="chart-container"
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                {schoolScoreDataChart(district, "positiveMathScoreAvg", "H")}
                {schoolScoreDataChart(district, "positiveReadingScoreAvg", "H")}
                {schoolScoreDataChart(district, "positiveScienceScoreAvg", "H")}

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