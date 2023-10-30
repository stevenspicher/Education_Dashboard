import {Stack} from "@mui/material";
import {Chart} from "react-google-charts";
import {
    createAverageACTScoreData,
    createDistrictScoreData,
    createOnTimeGraduationRateData, options
} from "../districtDataFunctions.js";

const DistrictAcademicPerformance = ({district}) => {
    return (
        <Stack>
            <h5>Academic Performance</h5>
            <Stack className="chart-container" direction={"row"}>
                <Chart
                    chartType="ColumnChart"
                    width="200px"
                    height="50%"
                    data={createDistrictScoreData(district, "Reading")}
                    options={options}
                />
                <Chart
                    chartType="ColumnChart"
                    width="200px"
                    height="50%"
                    data={createDistrictScoreData(district, "Math")}
                    options={options}
                />
                <Chart
                    chartType="ColumnChart"
                    width="200px"
                    height="50%"
                    data={createDistrictScoreData(district, "Science")}
                    options={options}
                />
            </Stack>
            <Stack className="chart-container" direction={"row"}>
                <Chart
                    chartType="ColumnChart"
                    width="200px"
                    height="50%"
                    data={createOnTimeGraduationRateData(district)}
                    options={options}
                />
                <Chart
                    chartType="ColumnChart"
                    width="200px"
                    height="50%"
                    data={createAverageACTScoreData(district)}
                    options={options}
                />
            </Stack>
       </Stack>
    )
}

export default DistrictAcademicPerformance