import {Stack} from "@mui/material";
import {selectedSchool} from "../../../store/signalStore"
import {schoolScoreDataChart} from "../../../components/Charts/Charts.jsx";
import SchoolLegend from "../../../components/Legends/SchoolLegend.jsx";

const rowProps = {
    className: "chart-container",
    direction: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
};
const levelHeading = {textAlign: "center", marginTop: "10px"};

const AcademicPerformance = () => {
    const school = selectedSchool.value
    // a school can hold more than one report card (e.g. a 6-12 school is both middle and high)
    const codes = school.schoolCodes ?? [school.schoolCode]
    const hasHigh = codes.includes("H")
    const hasLower = codes.some((code) => code !== "H")
    const combined = hasHigh && hasLower

    return (
        <Stack>
            <h5 className={"chart-title"} style={{marginLeft: "100px",  marginTop: "10px"}}>Academic Performance</h5>
            <SchoolLegend school={school}/>
            {hasLower ?
                <>
                    {combined ? <h6 className={"chart-title"} style={levelHeading}>Elementary &amp; Middle Grades</h6> : <></>}
                    <Stack {...rowProps}>
                        {schoolScoreDataChart(school, "positiveMathScoreAvg", "E")}
                        {schoolScoreDataChart(school, "positiveReadingScoreAvg", "E")}
                        {schoolScoreDataChart(school, "positiveScienceScoreAvg", "E")}
                    </Stack>
                </>
                : <></>
            }
            {hasHigh ?
                <>
                    {combined ? <h6 className={"chart-title"} style={levelHeading}>High School Grades</h6> : <></>}
                    <Stack {...rowProps}>
                        {schoolScoreDataChart(school, "positiveMathScoreAvg", "H")}
                        {schoolScoreDataChart(school, "positiveReadingScoreAvg", "H")}
                        {schoolScoreDataChart(school, "ACTCompositeAVG", "H")}
                    </Stack>
                    <Stack {...rowProps}>
                        {schoolScoreDataChart(school, "gradRate", "H")}
                        {schoolScoreDataChart(school, "dropoutRate", "H")}
                    </Stack>
                    <Stack {...rowProps}>
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
