import {Stack} from "@mui/material";
import {Chart} from "react-google-charts";
import {
    createDistrictAverageACTScoreData,
    createDistrictScoreData,
    createDistrictOnTimeGraduationRateData
} from "../../Charts/chartFunctions.js";
import {options, optionsLegend,
} from "../../Charts/chartOptions";

const DistrictAcademicPerformance = ({district}) => {
    return (
        <Stack>
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
                    data={createDistrictScoreData(district, "Reading")}
                    options={optionsLegend}
                />
                <Chart
                    chartType="ColumnChart"
                    width="300px"
                    height="50%"
                    data={createDistrictScoreData(district, "Math")}
                    options={options}
                />
                <Chart
                    chartType="ColumnChart"
                    width="300px"
                    height="50%"
                    data={createDistrictScoreData(district, "Science")}
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
                    data={createDistrictOnTimeGraduationRateData(district)}
                    options={options}
                />
                <Chart
                    chartType="ColumnChart"
                    width="300px"
                    height="50%"
                    data={createDistrictAverageACTScoreData(district)}
                    options={options}
                />
            </Stack>
       </Stack>
    )
}

export default DistrictAcademicPerformance