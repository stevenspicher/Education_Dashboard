import {Stack} from "@mui/material";
import {Chart} from "react-google-charts";
import {
    createAverageACTScoreData,
    createCareerReadyDiplomaEarnersData,
    createCollegeReadyDiplomaEarnersData,
    createDropoutPercentageData,
    createOnTimeGraduationRateData,
    createScoreData,
    options,
    optionsLegend
} from "../schoolDataFunctions.js";

const AcademicPerformance = ({school}) => {
    return (

            <Stack >
                <h5 className={"chart-title"} style={{marginLeft:"100px"}}>Academic Performance</h5>
                <Stack
                    className="chart-container"
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    // spacing={4}
                >
                    <Chart
                        chartType="ColumnChart"
                        width="300px"
                        height="50%"
                        data={createScoreData(school, "Reading", "E")}
                        options={optionsLegend}
                    />
                    <Chart
                        chartType="ColumnChart"
                        width="300px"
                        height="50%"
                        data={createScoreData(school, "Math", "E")}
                        options={options}
                    />
                    {school.schoolType === "High School" ?
                    <Chart
                        chartType="ColumnChart"
                        width="300px"
                        height="50%"
                        data={createAverageACTScoreData(school)}
                        options={options}
                    /> :
                        <Chart
                            chartType="ColumnChart"
                            width="300px"
                            height="50%"
                            data={createScoreData(school, "Science", "E")}
                            options={options}
                        />
                    }
                </Stack>
                {school.schoolType === "High School" ?
                    <>
                    <Stack
                        className="chart-container"
                        direction={"row"}>
                        <Chart
                            chartType="ColumnChart"
                            width="400px"
                            height="50%"
                            data={createOnTimeGraduationRateData(school)}
                            options={options}
                        />
                        <Chart
                            chartType="ColumnChart"
                            width="400px"
                            height="50%"
                            data={createDropoutPercentageData(school)}
                            options={options}
                        />
                    </Stack>
                    <Stack
                        className="chart-container"
                        direction={"row"}>
                    <Chart
                        chartType="ColumnChart"
                        width="400px"
                        height="50%"
                        data={createCollegeReadyDiplomaEarnersData(school)}
                        options={options}
                    />
                    <Chart
                        chartType="ColumnChart"
                        width="400px"
                        height="50%"
                        data={createCareerReadyDiplomaEarnersData(school)}
                        options={options}
                    />
                </Stack>
                    </>

                    : <></>
                }


            </Stack>

    )
}

export default AcademicPerformance