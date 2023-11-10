import {Chart} from "react-google-charts";
import {
    createSchoolScoreData,
} from "../../utils/chartFunctions.js";
import {optionsLegend} from "./chartOptions.js";

export const schoolScoreDataChart = (school, subject, code) => {

    return (
        <Chart
            chartType="ColumnChart"
            width="300px"
            height="50%"
            data={createSchoolScoreData(school, subject, code)}
            options={optionsLegend}
        />
    )
}
