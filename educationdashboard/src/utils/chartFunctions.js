import state from "../dataImport/stateData.json";
import {allSchools} from "../store/signalStore.js";
import {num} from "./values.js";

const schools = allSchools.value

const SUBJECTS = {
    positiveReadingScoreAvg: {title: "Students with Positive Reading Score", annotation: "%"},
    positiveMathScoreAvg: {title: "Students with Positive Math Score", annotation: "%"},
    positiveScienceScoreAvg: {title: "Students with Positive Science Score", annotation: "%"},
    gradRate: {title: "On-time Graduation Rate", annotation: "%"},
    dropoutRate: {title: "Dropout Percentage", annotation: "%"},
    collegeReady: {title: "College-Ready Diploma Earners", annotation: "%"},
    careerReady: {title: "Career-Ready Diploma Earners", annotation: "%"},
    studentsInPovertyPct: {title: "Students in Poverty", annotation: "%"},
    studentsWithDisabilities: {title: "Students with Disabilities", annotation: "%"},
    studentsWhite: {title: "White", annotation: "%"},
    studentsBlack: {title: "Black", annotation: "%"},
    studentsOther: {title: "Other", annotation: "%"},
    ACTCompositeAVG: {title: "Average ACT Score", annotation: ""},
};

//subjects reported separately for elementary/middle (_E) and high school (_H)
const LEVEL_SUBJECTS = ["positiveReadingScoreAvg", "positiveMathScoreAvg", "positiveScienceScoreAvg"];
const RACE_FIELDS = ["studentsWhite", "studentsBlack", "studentsAsianPacific", "studentsHispanic", "studentsAmericanIndian"];
const OTHER_FIELDS = ["studentsAmericanIndian", "studentsHispanic", "studentsAsianPacific"];

export const subjectTitle = (subject) => SUBJECTS[subject]?.title ?? subject;

const isDistrictRecord = (record) => record.schoolCode === "D" || schools[record.districtId] === undefined;

// demographicTotal is the enrolment the subgroup counts were taken from (2025 import onwards)
const percentOfEnrollment = (record, count) => {
    const total = num(record.demographicTotal) ?? num(record.totalStudents);
    if (!total || count === null) return null;
    return Math.round((count / total * 100) * 100) / 100
};

//the import stores 0 when a count was suppressed, so an all-zero set means "not reported"
const raceReported = (record) => RACE_FIELDS.some((field) => Number(record[field]) > 0);

//// Returns the number to chart for one record, or null when it was not reported
const subjectValue = (record, subject, level) => {
    if (record === undefined) return null;
    if (LEVEL_SUBJECTS.includes(subject)) {
        return num(record[`${subject}_${level}`]);
    }
    if (subject === "studentsWithDisabilities") {
        const count = num(record[subject]);
        return count ? percentOfEnrollment(record, count) : null;
    }
    if (subject === "studentsWhite" || subject === "studentsBlack") {
        return raceReported(record) ? percentOfEnrollment(record, num(record[subject]) ?? 0) : null;
    }
    if (subject === "studentsOther") {
        if (!raceReported(record)) return null;
        if (num(record.demographicTotal) !== null) {
            // everyone who is not counted as White or Black, so the three charts add up to 100%
            const rest = num(record.demographicTotal) - (num(record.studentsWhite) ?? 0) - (num(record.studentsBlack) ?? 0);
            return percentOfEnrollment(record, Math.max(rest, 0));
        }
        const other = OTHER_FIELDS.reduce((sum, field) => sum + (num(record[field]) ?? 0), 0);
        return percentOfEnrollment(record, other);
    }
    return num(record[subject]);
};

//// Returns {title, reported, data}. `reported` is false when the school/district itself has no value,
//// in which case the chart should be replaced with a "Not reported" placeholder.
//// `code` is the level to chart: "H" for high school scores, anything else for elementary/middle.
//// Districts chart high school scores unless "E" is passed.
export const createSchoolScoreData = (school, subject, code) => {
    const {title, annotation} = SUBJECTS[subject] ?? {title: subject, annotation: ""};
    const district = isDistrictRecord(school);
    const level = district ? (code === "E" ? "E" : "H") : (code === "H" ? "H" : "E");

    const cell = (value) => [value ?? 0, value === null ? "N/A" : value + annotation];
    const schoolValue = subjectValue(school, subject, level);
    const stateValue = subjectValue(state, subject, level);

    if (district) {
        return {
            title,
            reported: schoolValue !== null,
            data: [["", school.schoolName, {role: 'annotation'}, "State Average", {role: 'annotation'}],
                [title, ...cell(schoolValue), ...cell(stateValue)]]
        }
    }
    const districtValue = subjectValue(schools[school.districtId], subject, level);
    return {
        title,
        reported: schoolValue !== null,
        data: [["", school.schoolName, {role: 'annotation'}, "District Average", {role: 'annotation'}, "State Average", {role: 'annotation'}],
            [title, ...cell(schoolValue), ...cell(districtValue), ...cell(stateValue)]]
    }
};
