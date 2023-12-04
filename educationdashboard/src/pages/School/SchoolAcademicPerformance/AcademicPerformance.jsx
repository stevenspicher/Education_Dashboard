import {Stack} from "@mui/material";
import {selectedSchool} from "../../../store/signalStore"
import {schoolScoreDataChart} from "../../../components/Charts/Charts.jsx";
const AcademicPerformance = () => {
    const school = selectedSchool.value

    return (
        <Stack>
            <h5 className={"chart-title"} style={{marginLeft: "100px",  marginTop: "10px"}}>Academic Performance</h5>
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
                    {school.schoolName}
                </div>
                <div style={{
                    fontWeight: "bold",
                    width: "200px",
                    textAlign: "center",
                    // border: '1px solid black',
                    backgroundColor: "#dc3911"
                }}>
                    District
                </div>
                <div style={{
                    fontWeight: "bold",
                    // padding: "10px",
                    width: "200px",
                    textAlign: "center",
                    // border: '1px solid black',
                    backgroundColor: "#ff9900"
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
                {schoolScoreDataChart(school, "positiveReadingScoreAvg", "E")}
                {schoolScoreDataChart(school, "positiveMathScoreAvg", "E")}

                {school.schoolType === "High School" ?
                    schoolScoreDataChart(school, "ACTCompositeAVG", "H")
                    :
                    schoolScoreDataChart(school, "positiveScienceScoreAvg", "E")

                }

            </Stack>
            {school.schoolType === "High School" ?
                <>
                    <Stack
                        className="chart-container"
                        direction={"row"}
                        justifyContent="space-evenly"
                        alignItems="center"
                    >
                        {schoolScoreDataChart(school, "gradRate", "H")}
                        {schoolScoreDataChart(school, "dropoutRate", "H")}
                    </Stack>
                    <Stack
                        className="chart-container"
                        direction={"row"}
                        justifyContent="space-evenly"
                        alignItems="center"
                    >
                        {schoolScoreDataChart(school, "collegeReady", "H")}
                        {schoolScoreDataChart(school, "careerReady", "H")}
                    </Stack>
                </>

                : <></>
            }


        </Stack>

    )
}

export default AcademicPerformance