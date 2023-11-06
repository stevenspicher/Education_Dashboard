import {Chart} from "react-google-charts";

import {Stack} from "@mui/material";
import {
    createDistrictBlackData,
    createDistrictOtherData,
    createDistrictStudentsInPovertyData, createDistrictStudentsWithDisabilitiesData,
    createDistrictWhiteData
} from "../../Charts/chartFunctions.js";
import {options, optionsLegend} from "../../Charts/chartOptions";

const DistrictDemographics = ({district}) => {
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
                    width="300px"
                    // height="50%"
                    data={createDistrictStudentsInPovertyData(district)}
                    options={options}
                />
                <Chart
                    chartType="ColumnChart"
                    width="300px"
                    // height="50%"
                    data={createDistrictStudentsWithDisabilitiesData(district)}
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
                    width="300px"
                    // height="50%"
                    data={createDistrictWhiteData(district)}
                    options={options}
                />
                <Chart
                    chartType="ColumnChart"
                    width="300px"
                    // height="50%"
                    data={createDistrictBlackData(district)}
                    options={options}
                />
                <Chart
                    chartType="ColumnChart"
                    width="300px"
                    // height="50%"
                    data={createDistrictOtherData(district)}
                    options={options}
                />
            </Stack>

        </Stack>

    )
}
export default DistrictDemographics