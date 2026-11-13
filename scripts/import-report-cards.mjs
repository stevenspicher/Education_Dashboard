#!/usr/bin/env node
//// Imports one year of SC report card data into the dashboard.
////
////   node scripts/import-report-cards.mjs \
////        --researchers ReportCardData_forResearchers2026.xlsx \
////        --additional  ReportCardData_AdditionalInfo2026.xlsx [--publish]
////
//// Always writes   educationdashboard/src/dataImport/allSchoolsData<year>.json + stateData<year>.json
//// With --publish  also overwrites allSchoolsData.json + stateData.json (what the dashboard shows)
////
//// Sheets and columns are located by NAME, never by position, and the run stops with a
//// clear message if one is missing. A validation report is printed and saved next to this script.

import {createRequire} from "module";
import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";
import {buildHistory} from "./build-history.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(root, "educationdashboard/package.json"));
const XLSX = require("xlsx-js-style");
const dataDir = path.join(root, "educationdashboard/src/dataImport");

/* ---------- arguments ---------- */
const args = process.argv.slice(2);
const arg = (name) => {
    const index = args.indexOf(`--${name}`);
    return index === -1 ? undefined : args[index + 1];
};
const researchersPath = arg("researchers");
const additionalPath = arg("additional");
const publish = args.includes("--publish");
if (!researchersPath || !additionalPath) {
    console.error("Usage: node scripts/import-report-cards.mjs --researchers <xlsx> --additional <xlsx> [--publish]");
    process.exit(1);
}

/* ---------- reading workbooks ---------- */
const NOT_REPORTED = "*";
const norm = (text) => String(text).replace(/[^a-z0-9%]/gi, "").toLowerCase();
const schoolId = (value) => String(value).trim().padStart(7, "0");
const problems = [];

//// {sheetKey: pattern matched against the normalised sheet name}
const RESEARCHER_SHEETS = {
    main: /mainpage/,
    ratings: /reportcardratings/,
    elemMid: /achievprepsuccesselem/,
    high: /achievprepsuccesshigh/,
    gradRate: /gradrate/,
    collegeCareer: /collegecareer/,
};
const ADDITIONAL_SHEETS = {
    gradRatePage: /gradratepage/,
    act: /ccrpageactsat/,
    chronic: /chronicabs/,
    classroom: /classroomenvironment/,
    safety: /schoolsafety/,
    finance: /financialdata/,
};

//// Known renames between years. Add a line here when the state renames a column.
const COLUMN_ALIASES = [
    [/^reportcardtype/, "schooltypecd"], // 2025 main page: "Report Card Type (P,E,M,H,D)"
];
const alias = (column) => COLUMN_ALIASES.find(([pattern]) => pattern.test(column))?.[1] ?? column;

//// Returns {rowsById: {id: [row, ...]}, columns: Set} with every column name normalised
const readSheet = (workbook, fileLabel, key, pattern) => {
    const name = workbook.SheetNames.find((sheetName) => pattern.test(norm(sheetName)));
    if (!name) {
        throw new Error(`${fileLabel}: no sheet matching ${pattern} (looking for "${key}").\n  Sheets found: ${workbook.SheetNames.join(", ")}`);
    }
    const grid = XLSX.utils.sheet_to_json(workbook.Sheets[name], {header: 1, defval: ""});
    const headerIndex = grid.slice(0, 15).findIndex((row) => row.some((cell) => norm(cell) === "schoolid"));
    if (headerIndex === -1) throw new Error(`${fileLabel} / ${name}: could not find a header row containing SCHOOLID`);
    const header = grid[headerIndex].map(norm).map(alias);
    const idColumn = header.indexOf("schoolid");
    const rowsById = {};
    grid.slice(headerIndex + 1).forEach((cells) => {
        if (cells[idColumn] === "" || cells[idColumn] === undefined) return;
        const row = {};
        header.forEach((column, index) => {
            if (column) row[column] = cells[index];
        });
        (rowsById[schoolId(cells[idColumn])] ??= []).push(row);
    });
    return {name, fileLabel, rowsById, columns: new Set(header)};
};

const readWorkbook = (filePath, label, sheetPatterns) => {
    const workbook = XLSX.read(fs.readFileSync(filePath), {type: "buffer"});
    return Object.fromEntries(Object.entries(sheetPatterns)
        .map(([key, pattern]) => [key, readSheet(workbook, label, key, pattern)]));
};

console.log("Reading workbooks ...");
const sheets = {
    ...readWorkbook(researchersPath, "Researchers file", RESEARCHER_SHEETS),
    ...readWorkbook(additionalPath, "Additional Info file", ADDITIONAL_SHEETS),
};

/* ---------- value helpers ---------- */
const number = (value) => {
    if (typeof value === "number") return Number.isFinite(value) ? value : null;
    if (typeof value !== "string") return null;
    const cleaned = value.replace(/[$,%\s]/g, "");
    if (cleaned === "" || Number.isNaN(Number(cleaned))) return null;
    return Number(cleaned);
};
const out = (value) => (value === null || value === undefined ? NOT_REPORTED : value);
const text = (value) => String(value ?? "").replace(/\s+/g, " ").trim();

//// Stops the import when a column the dashboard depends on has been renamed or removed
const requireColumn = (sheet, column) => {
    if (!sheet.columns.has(norm(column))) {
        const hint = [...sheet.columns].filter((name) => name.includes(norm(column).slice(0, 6))).slice(0, 8);
        throw new Error(`${sheet.fileLabel} / ${sheet.name}: column "${column}" not found.` +
            (hint.length ? `\n  Similar columns: ${hint.join(", ")}` : ""));
    }
};

const LEVEL_ORDER = ["P", "E", "M", "H"];
const TYPE_NAMES = {P: "Primary", E: "Elementary", M: "Middle", H: "High", D: "District", S: "State"};

//// First reported value for a school in a sheet. Schools with several report cards
//// (e.g. a 6-12 school has an M and an H row) are checked highest level first.
const pick = (sheet, id, column, {raw = false} = {}) => {
    const rows = (sheet.rowsById[id] ?? []).slice().sort((a, b) =>
        LEVEL_ORDER.indexOf(b.schooltypecd) - LEVEL_ORDER.indexOf(a.schooltypecd));
    for (const row of rows) {
        const value = raw ? row[norm(column)] : number(row[norm(column)]);
        if (raw ? (value !== "" && value !== undefined) : value !== null) return value;
    }
    return null;
};

//// Percent meeting/exceeding for elementary + middle grades. When a school has both an E and an
//// M report card the two are combined, weighted by the number of students behind each.
const elemMidScore = (id, prefix) => {
    const rows = sheets.elemMid.rowsById[id] ?? [];
    const parts = rows.map((row) => ({
        pct: number(row[norm(`${prefix}_PctME`)]),
        total: number(row[norm(`${prefix}_NbrTOT`)]),
    })).filter((part) => part.pct !== null);
    if (parts.length === 0) return null;
    if (parts.length === 1 || parts.some((part) => !part.total)) return parts[0].pct;
    const total = parts.reduce((sum, part) => sum + part.total, 0);
    return Math.round(parts.reduce((sum, part) => sum + part.pct * part.total, 0) / total * 10) / 10;
};

/* ---------- required columns ---------- */
const mainRows = Object.values(sheets.main.rowsById).flat();
const year = number(mainRows[0].reportcardyear);
if (!year) throw new Error("Could not read ReportCardYear from the main page");
const gradRateColumn = `GRADRATE${String(year).slice(2)}`;

[
    [sheets.main, ["SchoolNm", "DistrictNm", "SCHOOLTYPECD", "street", "city", "zip", "Enrollment", "hdphone", "URL", "TeacherCount"]],
    [sheets.elemMid, ["E_PctME", "M_PctME", "SC_PctME", "E_NbrTOT", "M_NbrTOT", "SC_NbrTOT"]],
    [sheets.high, ["E_PctABC", "M_PctABC", "SC_PctABC"]],
    [sheets.gradRate, [gradRateColumn]],
    [sheets.collegeCareer, ["PctCollege", "PctCareer"]],
    [sheets.ratings, ["RATE_OVERALL"]],
    [sheets.gradRatePage, ["DropoutRateCurrYr"]],
    [sheets.act, ["ACT_Avg_CompositeScore"]],
    [sheets.chronic, ["PctChronic_ALL", "NTotal_ALL", "NTotal_AA", "NTotal_AP", "NTotal_AI", "NTotal_HI", "NTotal_CA", "NTotal_EL", "NTotal_DI"]],
    [sheets.classroom, ["TCHSALARY_AvgCurrYr", "TCHSALARY_AvgLastYr", "TCHRETURN3yrAvg_PctCurrYr"]],
    [sheets.safety, ["PAR_ChildFeelsSafe", "TCH_IFeelSafe", "OCR_BullyHarass"]],
    [sheets.finance, ["StudentsinPoverty_PctCurrYr"]],
].forEach(([sheet, columns]) => columns.forEach((column) => requireColumn(sheet, column)));

const VIOLENT_COLUMNS = ["OCR_PhysAttachwWeapon", "OCR_PhysAttachNoWeapon", "OCR_PhysAttackwFirearm", "OCR_Rape",
    "OCR_SexAssault", "OCR_RobNoWeapon", "OCR_RobwWeapon", "OCR_RobwFirearm"];
VIOLENT_COLUMNS.forEach((column) => requireColumn(sheets.safety, column));

/* ---------- build records ---------- */
const STATE_ID = "9999999";

const website = (value) => {
    const url = text(value);
    if (url === "" || /^n\/?a/i.test(url)) return NOT_REPORTED;
    return /^https?:\/\//i.test(url) ? url : "https://" + url;
};

const buildRecord = (id) => {
    const rows = sheets.main.rowsById[id];
    const codes = [...new Set(rows.map((row) => text(row.schooltypecd)))]
        .sort((a, b) => LEVEL_ORDER.indexOf(a) - LEVEL_ORDER.indexOf(b));
    const code = codes[codes.length - 1]; // highest level is the primary one
    const isDistrict = code === "D" || code === "S";
    const hasHigh = isDistrict || codes.includes("H");
    const main = rows[0];

    const violent = VIOLENT_COLUMNS.map((column) => pick(sheets.safety, id, column));

    return {
        schoolName: text(main.schoolnm),
        schoolPhone: text(main.hdphone),
        schoolType: isDistrict ? TYPE_NAMES[code] : codes.map((c) => TYPE_NAMES[c]).join(" & ") + " School",
        schoolCode: code,
        schoolCodes: codes,
        schoolId: id,
        gradeSpan: text(main.gradespan),
        overallRating: isDistrict ? NOT_REPORTED : out(pick(sheets.ratings, id, "RATE_OVERALL", {raw: true})),
        gradRate: out(pick(sheets.gradRate, id, gradRateColumn)),
        avgTeacherSalaryCurrYr: out(pick(sheets.classroom, id, "TCHSALARY_AvgCurrYr")),
        avgTeacherSalaryLastYr: out(pick(sheets.classroom, id, "TCHSALARY_AvgLastYr")),
        teacherReturnRate: out(pick(sheets.classroom, id, "TCHRETURN3yrAvg_PctCurrYr")),
        dropoutRate: hasHigh ? out(pick(sheets.gradRatePage, id, "DropoutRateCurrYr")) : NOT_REPORTED,
        collegeReady: hasHigh ? out(pick(sheets.collegeCareer, id, "PctCollege")) : NOT_REPORTED,
        careerReady: hasHigh ? out(pick(sheets.collegeCareer, id, "PctCareer")) : NOT_REPORTED,
        ACTCompositeAVG: hasHigh ? out(pick(sheets.act, id, "ACT_Avg_CompositeScore")) : NOT_REPORTED,
        districtName: text(main.districtnm),
        districtId: NOT_REPORTED, // filled in below
        city: text(main.city),
        street: text(main.street),
        zip: out(number(main.zip)) === NOT_REPORTED ? text(main.zip) : number(main.zip),
        url: website(main.url),
        totalStudents: out(number(main.enrollment)),
        teacherCount: out(number(main.teachercount)),

        // demographics: enrolled-student counts from the chronic absenteeism page
        // (the participation page only counts students in tested grades)
        studentsInPovertyPct: out(pick(sheets.finance, id, "StudentsinPoverty_PctCurrYr")),
        chronicAbsenteeismRate: out(pick(sheets.chronic, id, "PctChronic_ALL")),
        demographicTotal: out(pick(sheets.chronic, id, "NTotal_ALL")),
        studentsWithDisabilities: out(pick(sheets.chronic, id, "NTotal_DI")),
        ELLStudents: out(pick(sheets.chronic, id, "NTotal_EL")),
        studentsWhite: out(pick(sheets.chronic, id, "NTotal_CA")),
        studentsBlack: out(pick(sheets.chronic, id, "NTotal_AA")),
        studentsAsianPacific: out(pick(sheets.chronic, id, "NTotal_AP")),
        studentsHispanic: out(pick(sheets.chronic, id, "NTotal_HI")),
        studentsAmericanIndian: out(pick(sheets.chronic, id, "NTotal_AI")),

        // cards
        bullyAndHarass: out(pick(sheets.safety, id, "OCR_BullyHarass")),
        parentFeelsSafe: out(pick(sheets.safety, id, "PAR_ChildFeelsSafe")),
        teacherFeelsSafe: out(pick(sheets.safety, id, "TCH_IFeelSafe")),
        violentAssaults: violent.every((value) => value === null)
            ? NOT_REPORTED : violent.reduce((sum, value) => sum + (value ?? 0), 0),

        // academic performance: elementary/middle (_E) and high school (_H)
        positiveReadingScoreAvg_E: out(elemMidScore(id, "E")),
        positiveMathScoreAvg_E: out(elemMidScore(id, "M")),
        positiveScienceScoreAvg_E: out(elemMidScore(id, "SC")),
        positiveReadingScoreAvg_H: out(pick(sheets.high, id, "E_PctABC")),
        positiveMathScoreAvg_H: out(pick(sheets.high, id, "M_PctABC")),
        positiveScienceScoreAvg_H: out(pick(sheets.high, id, "SC_PctABC")),
        districtSchoolList: [],
    };
};

const allSchools = {};
let state;
Object.keys(sheets.main.rowsById).sort().forEach((id) => {
    const record = buildRecord(id);
    if (id === STATE_ID) state = record;
    else allSchools[id] = record;
});
if (!state) throw new Error(`State row (SCHOOLID ${STATE_ID}) not found on the main page`);

// link schools to their district
const districtByName = {};
Object.values(allSchools).filter((record) => record.schoolCode === "D")
    .forEach((district) => districtByName[norm(district.districtName)] = district);
Object.values(allSchools).filter((record) => record.schoolCode !== "D").forEach((school) => {
    const district = districtByName[norm(school.districtName)];
    if (!district) {
        problems.push(`No district record for "${school.schoolName}" (district name "${school.districtName}")`);
        return;
    }
    school.districtId = district.schoolId;
    // shape kept from the previous import: a list of single-item lists
    district.districtSchoolList.push([{
        schoolName: school.schoolName,
        id: school.schoolId,
        code: school.schoolCode,
        codes: school.schoolCodes,
    }]);
});

const stateData = Object.fromEntries(Object.entries(state).filter(([key]) => ![
    "schoolName", "schoolPhone", "schoolType", "schoolCode", "schoolCodes", "schoolId", "gradeSpan", "overallRating",
    "districtName", "districtId", "city", "street", "zip", "url", "districtSchoolList",
    "avgTeacherSalaryCurrYr", "avgTeacherSalaryLastYr", "teacherReturnRate",
    "bullyAndHarass", "parentFeelsSafe", "teacherFeelsSafe", "violentAssaults",
].includes(key)));
stateData.reportCardYear = year;

/* ---------- validation report ---------- */
const report = [];
const line = (message = "") => report.push(message);
const reported = (value) => value !== NOT_REPORTED && value !== null && value !== undefined && value !== "";
const records = Object.values(allSchools);
const schools = records.filter((record) => record.schoolCode !== "D");
const districts = records.filter((record) => record.schoolCode === "D");

line(`Report card import — ${year}`);
line(`  Researchers file:     ${path.basename(researchersPath)}`);
line(`  Additional Info file: ${path.basename(additionalPath)}`);
line();
line(`Records: ${schools.length} schools, ${districts.length} districts, 1 state row`);
const byType = {};
schools.forEach((school) => byType[school.schoolType] = (byType[school.schoolType] ?? 0) + 1);
Object.entries(byType).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => line(`  ${String(count).padStart(5)}  ${type}`));
line(`  ${schools.filter((school) => school.schoolCodes.length > 1).length} schools had more than one report card and were merged into one record`);

// compare with whatever the dashboard currently shows
const previousPath = path.join(dataDir, "allSchoolsData.json");
const previous = fs.existsSync(previousPath) ? JSON.parse(fs.readFileSync(previousPath, "utf8")) : {};
const previousRecords = Object.values(previous).filter((record) => record.schoolCode !== "S");
const applies = (field, record) => {
    if (["gradRate", "dropoutRate", "collegeReady", "careerReady", "ACTCompositeAVG"].includes(field) || field.endsWith("_H")) {
        return record.schoolCode === "D" || record.schoolCode === "H" || record.schoolCodes?.includes("H");
    }
    if (field.endsWith("_E")) return record.schoolCode !== "H" || record.schoolCodes?.length > 1;
    return true;
};
const coverage = (list, field) => {
    const relevant = list.filter((record) => applies(field, record));
    if (relevant.length === 0) return null;
    return Math.round(relevant.filter((record) => reported(record[field])).length / relevant.length * 100);
};
const median = (list, field) => {
    const values = list.map((record) => record[field]).filter((value) => typeof value === "number").sort((a, b) => a - b);
    return values.length ? values[Math.floor(values.length / 2)] : null;
};

line();
line("Field coverage (share of applicable records with a value) and median, vs the data currently in the dashboard");
line("  field                          now   before   median now   median before");
const FIELDS = ["totalStudents", "teacherCount", "url", "overallRating", "gradRate", "ACTCompositeAVG", "dropoutRate", "collegeReady", "careerReady",
    "avgTeacherSalaryCurrYr", "avgTeacherSalaryLastYr", "teacherReturnRate", "studentsInPovertyPct", "chronicAbsenteeismRate",
    "demographicTotal", "studentsWithDisabilities", "ELLStudents", "studentsWhite", "studentsBlack", "studentsHispanic",
    "bullyAndHarass", "parentFeelsSafe", "teacherFeelsSafe", "violentAssaults",
    "positiveReadingScoreAvg_E", "positiveMathScoreAvg_E", "positiveScienceScoreAvg_E",
    "positiveReadingScoreAvg_H", "positiveMathScoreAvg_H", "positiveScienceScoreAvg_H"];
FIELDS.forEach((field) => {
    const now = coverage(records, field);
    const before = previousRecords.some((record) => field in record) ? coverage(previousRecords, field) : null;
    const flag = now === 0 ? "   <-- EMPTY" : (before !== null && now < before - 15 ? "   <-- dropped" : "");
    const show = (value) => (value === null ? "-" : String(value));
    line(`  ${field.padEnd(28)} ${(now + "%").padStart(5)}  ${(before === null ? "-" : before + "%").padStart(6)}   ` +
        `${show(median(records, field)).padStart(10)}   ${show(median(previousRecords, field)).padStart(13)}${flag}`);
    if (now === 0) problems.push(`Field "${field}" is empty for every record`);
});

const previousIds = new Set(previousRecords.map((record) => record.schoolId));
if (previousIds.size) {
    const added = records.filter((record) => !previousIds.has(record.schoolId));
    const removed = previousRecords.filter((record) => !allSchools[record.schoolId]);
    line();
    line(`Compared with the dashboard's current data: ${added.length} new, ${removed.length} no longer listed`);
    added.slice(0, 200).forEach((record) => line(`  + ${record.schoolId}  ${record.schoolName} (${record.schoolType})`));
    removed.slice(0, 200).forEach((record) => line(`  - ${record.schoolId}  ${text(record.schoolName)} (${record.schoolType})`));
}

const geoPath = path.join(dataDir, "schoolGeodata.json");
if (fs.existsSync(geoPath)) {
    const geo = JSON.parse(fs.readFileSync(geoPath, "utf8"));
    const missing = schools.filter((school) => !geo[school.schoolId]);
    line();
    line(`Map coordinates: ${missing.length} of ${schools.length} schools have no marker position (schoolGeodata.json)`);
}

line();
line(problems.length ? `Problems (${problems.length}):` : "Problems: none");
problems.forEach((problem) => line(`  ! ${problem}`));

/* ---------- write ---------- */
const write = (name, data) => fs.writeFileSync(path.join(dataDir, name), JSON.stringify(data));
write(`allSchoolsData${year}.json`, allSchools);
write(`stateData${year}.json`, stateData);
line();
line(`Wrote allSchoolsData${year}.json and stateData${year}.json`);
if (publish) {
    write("allSchoolsData.json", allSchools);
    write("stateData.json", stateData);
    line("Published: allSchoolsData.json and stateData.json now hold this year");
} else {
    line("Not published. Re-run with --publish to make this the year the dashboard shows.");
}

const historyResult = buildHistory();
line(`Rebuilt history.json for trend charts: years ${historyResult.years.join(", ")}`);

const reportPath = path.join(root, "scripts", `import-report-${year}.txt`);
fs.writeFileSync(reportPath, report.join("\n") + "\n");
console.log(report.join("\n"));
console.log(`\nReport saved to ${path.relative(root, reportPath)}`);
