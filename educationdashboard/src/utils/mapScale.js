import {getSalary, num, formatDollars} from "./values.js";

//// Heat map scales are built from the district data itself (quintiles),
//// so the bins and legend follow the data each year instead of being hardcoded.

export const NO_DATA_COLOR = "#d9d9d9";

// light -> dark, five classes per metric
const METRICS = {
    gradRate: {
        label: "Graduation Rate",
        palette: ["#c1d3f7", "#85A6EC", "#6490e8", "#477CEE", "#1c51cb"],
        roundTo: 1,
        format: (value) => value + "%",
    },
    ACTCompositeAVG: {
        label: "AVG ACT Score",
        palette: ["#b6e7a7", "#90e077", "#5fc73f", "#44a620", "#0c9349"],
        roundTo: 0.5,
        format: (value) => String(value),
    },
    avgTeacherSalaryLastYr: {
        label: "Teacher Salary",
        palette: ["#fff33b", "#fdc70c", "#f3903f", "#ed683c", "#e93e3a"],
        roundTo: 500,
        format: (value) => formatDollars(value),
    },
    teacherReturnRate: {
        label: "Teacher Retention",
        palette: ["#f3e37c", "#f3d34a", "#f3a738", "#e8862a", "#c9601a"],
        roundTo: 1,
        format: (value) => value + "%",
    },
};

export const metricLabel = (metric) => METRICS[metric].label;
export const formatMetric = (metric, value) => (value === null ? "Not reported" : METRICS[metric].format(value));

//// The number a district is coloured by, or null when not reported
export const metricValue = (record, metric) => {
    if (record === undefined) return null;
    if (metric === "avgTeacherSalaryLastYr") return getSalary(record).value;
    return num(record[metric]);
};

const quantile = (sorted, q) => {
    const position = (sorted.length - 1) * q;
    const base = Math.floor(position);
    const rest = position - base;
    return sorted[base + 1] !== undefined ? sorted[base] + rest * (sorted[base + 1] - sorted[base]) : sorted[base];
};

const scaleCache = {};

//// Returns {breaks, colorFor(value), legend: [{label, color}]} for a metric,
//// computed across all districts.
export const getScale = (metric, allRecords) => {
    if (scaleCache[metric]) return scaleCache[metric];
    const {palette, roundTo, format} = METRICS[metric];
    const values = Object.values(allRecords)
        .filter((record) => record.schoolCode === "D")
        .map((record) => metricValue(record, metric))
        .filter((value) => value !== null)
        .sort((a, b) => a - b);

    // upper bounds of every class except the last, rounded to readable numbers and de-duplicated
    const breaks = [...new Set([0.2, 0.4, 0.6, 0.8]
        .map((q) => Math.round(quantile(values, q) / roundTo) * roundTo))]
        .filter((value) => !Number.isNaN(value));

    const classCount = breaks.length + 1;
    const colorAt = (index) => palette[classCount === 1 ? palette.length - 1 : Math.round(index * (palette.length - 1) / (classCount - 1))];

    const colorFor = (value) => {
        if (value === null || value === undefined) return NO_DATA_COLOR;
        let index = breaks.findIndex((upper) => value <= upper);
        if (index === -1) index = breaks.length;
        return colorAt(index);
    };

    // legend is listed highest class first
    const legend = [];
    for (let index = classCount - 1; index >= 0; index--) {
        let label;
        if (classCount === 1) label = "All districts";
        else if (index === classCount - 1) label = "Above " + format(breaks[index - 1]);
        else if (index === 0) label = format(breaks[0]) + " or below";
        else label = format(breaks[index - 1]) + " to " + format(breaks[index]);
        legend.push({label, color: colorAt(index)});
    }
    legend.push({label: "Not reported", color: NO_DATA_COLOR});

    scaleCache[metric] = {breaks, colorFor, legend};
    return scaleCache[metric];
};
