import {Chart} from "react-google-charts";
import {
    createELLStudentData, createStudentEthnicityData,
    createStudentsInPovertyData,
    createStudentsWithDisabilitiesData,
    options
} from "../schoolDataFunctions.js";
import {Stack} from "@mui/material";

const Demographics = ({school}) => {
    return (
       <Stack>

                <h5 className={"chart-title"} style={{marginLeft:"100px"}}>Demographics</h5>
           <Stack
               className="chart-container"
               direction="row"
               justifyContent="space-evenly"
               alignItems="center"
           >

                        <Chart
                            chartType="ColumnChart"
                            // width="300px"
                            // height="70%"
                            data={createStudentsInPovertyData(school)}
                            options={options}
                        />
                        <Chart
                            chartType="ColumnChart"
                            // width="300px"
                            // height="70%"
                            data={createStudentsWithDisabilitiesData(school)}
                            options={options}
                        />

                        <Chart
                            chartType="ColumnChart"
                            width="200px"
                            height="50%"
                            data={createELLStudentData(school)}
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
                            // width="200px"
                            height="100%"
                            data={createStudentEthnicityData(school, "White")}
                            options={options}
                        />
                        <Chart
                            chartType="ColumnChart"
                            // width="200px"
                            height="100%"
                            data={createStudentEthnicityData(school, "Black")}
                            options={options}
                        />
                        <Chart
                            chartType="ColumnChart"
                            // width="200px"
                            height="100%"
                            data={createStudentEthnicityData(school, "Other")}
                            options={options}
                        />
           </Stack>
       </Stack>
    )
}
export default Demographics