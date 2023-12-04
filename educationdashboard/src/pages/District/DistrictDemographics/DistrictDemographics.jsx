
import {Stack} from "@mui/material";
import {selectedDistrict} from "../../../store/signalStore.js";
import {schoolScoreDataChart} from "../../../components/Charts/Charts.jsx";
import state from "../../../dataImport/stateData.json"
const DistrictDemographics = () => {
    const district = selectedDistrict.value
    console.log(district)
    console.log(state)
    return (

        <Stack>
            <h5 className="chart-title" style={{marginLeft: "100px", marginTop: "10px"}}>Demographics</h5>
            {/*Legend*/}
            <div style={{
                margin: "auto",
                width: "75%",
                padding: "10px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Stack direction={"row"}>

                    <div style={{
                        // padding: "10px",
                        width: "200px",
                        fontWeight: "bold",
                        backgroundColor: "#3366cc",
                        textAlign: "center"
                        // border: '1px solid black',
                    }}>
                        {district.schoolName}
                    </div>
                    <div style={{
                        fontWeight: "bold",
                        // padding: "10px",
                        width: "200px",
                        textAlign: "center",
                        // border: '1px solid black',
                        backgroundColor: "#dc3911"
                    }}>
                        State
                    </div>
                </Stack>
            </div>
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