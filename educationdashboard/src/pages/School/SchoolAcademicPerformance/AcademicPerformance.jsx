import {Stack} from "@mui/material";
import {selectedSchool} from "../../../store/signalStore"
import {schoolScoreDataChart} from "../../../components/Charts/Charts.jsx";
import SchoolLegend from "../../../components/Legends/SchoolLegend.jsx";
const AcademicPerformance = () => {
    const school = selectedSchool.value

    return (
        <Stack>
            <h5 className={"chart-title"} style={{marginLeft: "100px",  marginTop: "10px"}}>Academic Performance</h5>
            {/*Legend*/}
            <SchoolLegend school={school}/>
            <Stack
                className="chart-container"
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >


                {school.schoolType === "High School" ?
                    <Stack
                        className="chart-container"
                        direction={"row"}
                        justifyContent="space-evenly"
                        alignItems="center"
                    >
                        {schoolScoreDataChart(school, "positiveMathScoreAvg", "H")}
                        {schoolScoreDataChart(school, "positiveReadingScoreAvg", "H")}
                        {schoolScoreDataChart(school, "ACTCompositeAVG", "H")}
                        </Stack>
                    :
                    <Stack
                        className="chart-container"
                        direction={"row"}
                        justifyContent="space-evenly"
                        alignItems="center"
                    >
                        {schoolScoreDataChart(school, "positiveMathScoreAvg", "E")}
                        {schoolScoreDataChart(school, "positiveReadingScoreAvg", "E")}
                        {schoolScoreDataChart(school, "positiveScienceScoreAvg", "E")}
                    </Stack>
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