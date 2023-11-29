import {Stack} from "@mui/material";
import {selectedSchool} from "../../../store/signalStore"
import {schoolScoreDataChart} from "../../../components/Charts/Charts.jsx";
const AcademicPerformance = () => {
    const school = selectedSchool.value

    return (
        <Stack>
            <h5 className={"chart-title"} style={{marginLeft: "100px",  marginTop: "10px"}}>Academic Performance</h5>
            <div style={{border: '1px solid black', height: "20px", width: "25px", backgroundColor: "black"}}></div>
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