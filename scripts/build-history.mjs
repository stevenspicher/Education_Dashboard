#!/usr/bin/env node
//// Builds educationdashboard/src/dataImport/history.json from every allSchoolsData<year>.json /
//// stateData<year>.json in that folder. The dashboard's trend charts read this file.
//// Run on its own (node scripts/build-history.mjs) or automatically at the end of an import.
////
//// Shape: {years: [2022, ...], state: {metric: [value|null per year]}, records: {schoolId: {metric: [...]}}}

import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "educationdashboard/src/dataImport");

const value = (raw) => (typeof raw === "number" && Number.isFinite(raw) ? raw : null);

//// Metrics tracked over time. Demographic counts are left out on purpose: before 2025 they were
//// imported from a different (test-taker) source and are not comparable.
const SIMPLE_METRICS = ["gradRate", "ACTCompositeAVG", "teacherReturnRate", "studentsInPovertyPct", "totalStudents",
    "chronicAbsenteeismRate", "positiveReadingScoreAvg_E", "positiveMathScoreAvg_E",
    "positiveReadingScoreAvg_H", "positiveMathScoreAvg_H"];

export const buildHistory = () => {
    const years = fs.readdirSync(dataDir)
        .map((name) => name.match(/^allSchoolsData(\d{4})\.json$/)?.[1])
        .filter(Boolean).map(Number).sort();
    const read = (name) => {
        const file = path.join(dataDir, name);
        return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : undefined;
    };
    const byYear = Object.fromEntries(years.map((year) => [year, read(`allSchoolsData${year}.json`)]));
    const stateByYear = Object.fromEntries(years.map((year) => [year, read(`stateData${year}.json`) ?? {}]));

    //// one metric for one record in one year
    const metricValue = (record, nextYearRecord, metric) => {
        if (record === undefined) return null;
        if (metric === "avgTeacherSalary") {
            // the salary for a year is that year's "current" figure; when the state left it blank,
            // the following year's file carries it as "last year"
            return value(record.avgTeacherSalaryCurrYr) ?? value(nextYearRecord?.avgTeacherSalaryLastYr);
        }
        // the 2022 file predates the elementary/high split: its single score applies to non-high schools
        if (metric.endsWith("_E") && !(metric in record) && record.schoolCode !== "H" && record.schoolCode !== "D") {
            return value(record[metric.replace("_E", "")]);
        }
        return value(record[metric]);
    };

    const series = (getRecord, metric) => years.map((year, index) =>
        metricValue(getRecord(year), getRecord(years[index + 1]), metric));

    const build = (getRecord) => {
        const result = {};
        [...SIMPLE_METRICS, "avgTeacherSalary"].forEach((metric) => {
            const values = series(getRecord, metric);
            // only keep a metric when there is a trend to draw
            if (values.filter((entry) => entry !== null).length >= 2) result[metric] = values;
        });
        return result;
    };

    const latest = byYear[years[years.length - 1]];
    const records = {};
    Object.keys(latest).forEach((id) => {
        const history = build((year) => byYear[year]?.[id]);
        if (Object.keys(history).length) records[id] = history;
    });
    const history = {years, state: build((year) => stateByYear[year]), records};
    fs.writeFileSync(path.join(dataDir, "history.json"), JSON.stringify(history));
    return {years, recordCount: Object.keys(records).length, total: Object.keys(latest).length};
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const result = buildHistory();
    console.log(`history.json: years ${result.years.join(", ")} — ${result.recordCount} of ${result.total} records have at least one trend`);
}
