import {Stack} from "@mui/material";
import {Chart} from "react-google-charts";
import {
    createSchoolAverageACTScoreData,
    createSchoolCareerReadyDiplomaEarnersData,
    createSchoolCollegeReadyDiplomaEarnersData,
    createSchoolDropoutPercentageData,
    createSchoolOnTimeGraduationRateData,
    createSchoolScoreData,

} from "../../Charts/chartFunctions.js";
import {options, optionsLegend} from "../../Charts/chartOptions";
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
                        data={createSchoolScoreData(school, "Reading", "E")}
                        options={optionsLegend}
                    />
                    <Chart
                        chartType="ColumnChart"
                        width="300px"
                        height="50%"
                        data={createSchoolScoreData(school, "Math", "E")}
                        options={options}
                    />
                    {school.schoolType === "High School" ?
                    <Chart
                        chartType="ColumnChart"
                        width="300px"
                        height="50%"
                        data={createSchoolAverageACTScoreData(school)}
                        options={options}
                    /> :
                        <Chart
                            chartType="ColumnChart"
                            width="300px"
                            height="50%"
                            data={createSchoolScoreData(school, "Science", "E")}
                            options={options}
                        />
                    }
                </Stack>
                {school.schoolType === "High School" ?
                    <>
                    <Stack
                        className="chart-container"
                        direction={"row"}
                        justifyContent="space-evenly"
                        alignItems="center">
                        <Chart
                            chartType="ColumnChart"
                            width="300px"
                            height="50%"
                            data={createSchoolOnTimeGraduationRateData(school)}
                            options={options}
                        />
                        <Chart
                            chartType="ColumnChart"
                            width="300px"
                            height="50%"
                            data={createSchoolDropoutPercentageData(school)}
                            options={options}
                        />
                    </Stack>
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
                        data={createSchoolCollegeReadyDiplomaEarnersData(school)}
                        options={options}
                    />
                    <Chart
                        chartType="ColumnChart"
                        width="300px"
                        height="50%"
                        data={createSchoolCareerReadyDiplomaEarnersData(school)}
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