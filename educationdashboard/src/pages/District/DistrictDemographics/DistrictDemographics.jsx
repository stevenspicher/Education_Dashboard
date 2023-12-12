
import {Stack} from "@mui/material";
import {selectedDistrict} from "../../../store/signalStore.js";
import {schoolScoreDataChart} from "../../../components/Charts/Charts.jsx";
import state from "../../../dataImport/stateData.json"
import DistrictLegend from "../../../components/Legends/DistrictLegend.jsx";
const DistrictDemographics = () => {
    const district = selectedDistrict.value

    return (

        <Stack>
            <h5 className="chart-title" style={{marginLeft: "100px", marginTop: "10px"}}>Demographics</h5>
            <DistrictLegend district={district}/>

            <Stack
                className="chart-container"
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                {schoolScoreDataChart(district, "studentsInPovertyPct", "D")}
                {schoolScoreDataChart(district, "studentsWithDisabilities", "D")}

            </Stack>
            <Stack
                className="chart-container"
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >

            </Stack>
            <Stack
                className="chart-container"
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                {schoolScoreDataChart(district, "studentsWhite", "D")}
                {schoolScoreDataChart(district, "studentsBlack", "D")}
                {schoolScoreDataChart(district, "studentsOther", "D" )}

            </Stack>

        </Stack>

    )
}
export default DistrictDemographics