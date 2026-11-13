import {Chart} from "react-google-charts";
import {
    createSchoolScoreData,
} from "../../utils/chartFunctions.js";
import {optionsLegend, optionsACT} from "./chartOptions.js";
import {NOT_REPORTED} from "../../utils/values.js";

export const schoolScoreDataChart = (school, subject, code) => {
    const chart = createSchoolScoreData(school, subject, code);

    if (!chart.reported) {
        return (
            <div style={{
                width: "300px",
                height: "250px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "20px",
            }}>
                <div style={{fontSize: "18px", color: "#757575"}}>{NOT_REPORTED}</div>
                <div style={{fontSize: "15px", marginTop: "10px"}}>{chart.title}</div>
            </div>
        )
    }

    return (
        <Chart
            chartType="ColumnChart"
            width="300px"
            height="50%"
            data={chart.data}
            options={subject === "ACTCompositeAVG" ? optionsACT : optionsLegend}
        />
    )
}
