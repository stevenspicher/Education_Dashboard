import {Stack} from "@mui/material";
import {allSchools, selectedDistrict} from "../../../store/signalStore.js";
import {schoolScoreDataChart} from "../../../components/Charts/Charts.jsx";

const DistrictAcademicPerformance = () => {
    const district = selectedDistrict.value



    return (
        <Stack>
            <h5 className={"chart-title"} style={{marginLeft:"100px", marginTop: "10px"}}>Academic Performance</h5>
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