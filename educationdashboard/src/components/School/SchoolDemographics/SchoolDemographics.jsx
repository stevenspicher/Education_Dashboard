import {Chart} from "react-google-charts";
import {
    createSchoolELLStudentData, createSchoolStudentEthnicityData,
    createSchoolStudentsInPovertyData,
    createSchoolStudentsWithDisabilitiesData,

} from "../../Charts/chartFunctions.js";
import {options, optionsLegend} from "../../Charts/chartOptions";
import {Stack} from "@mui/material";

const SchoolDemographics = ({school}) => {
    return (
        <Stack>
            <h5 style={{marginLeft: "100px"}}>Demographics</h5>
            <Stack
                className="chart-container"
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >

                <Chart
                    chartType="ColumnChart"
                    width="400px"
                    // height="70%"
                    data={createSchoolStudentsInPovertyData(school)}
                    options={options}
                />
                <Chart
                    chartType="ColumnChart"
                    width="400px"
                    // height="70%"
                    data={createSchoolStudentsWithDisabilitiesData(school)}
                    options={options}
                />
            </Stack>
            <Stack
                className="chart-container"
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >

                         <Chart
                             chartType="ColumnChart"
                             width="400px"
                             // height="100%"
                             data={createSchoolStudentEthnicityData(school, "White")}
                             options={options}
                         />
                         <Chart
                             chartType="ColumnChart"
                             width="400px"
                             // height="100%"
                             data={createSchoolStudentEthnicityData(school, "Black")}
                             options={options}
                         />
                         <Chart
                             chartType="ColumnChart"
                             width="400px"
                             // height="100%"
                             data={createSchoolStudentEthnicityData(school, "Other")}
                             options={options}
                         />
            </Stack>
        </Stack>
    )
}
export default SchoolDemographics