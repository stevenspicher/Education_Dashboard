import {Stack} from "@mui/material";
import {selectedSchool} from "../../../store/signalStore.js";
import {schoolScoreDataChart} from "../../../components/Charts/Charts.jsx";

const SchoolDemographics = () => {
    const school = selectedSchool.value
    console.log(school)
    return (
        <Stack>
            <h5 style={{marginLeft: "100px", marginTop: "10px"}} className={"chart-title"}>Demographics</h5>
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
                {schoolScoreDataChart(school, "studentsInPovertyPct", school.code)}
                {schoolScoreDataChart(school, "studentsWithDisabilities", school.code)}
            </Stack>
            <Stack
                className="chart-container"
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                {schoolScoreDataChart(school, "studentsWhite", school.code, )}
                {schoolScoreDataChart(school, "studentsBlack", school.code, )}
                {schoolScoreDataChart(school, "studentsOther", school.code, )}

            </Stack>
        </Stack>
    )
}
export default SchoolDemographics