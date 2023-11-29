import state from "../dataImport/stateData.json";
import {allSchools} from "../store/signalStore.js";



const schools = allSchools.value

export const createSchoolScoreData = (school, subject, code) => {
    let chartTitle = subject;

    switch (subject) {
        case "positiveReadingScoreAvg" :
            chartTitle = "Students with Positive Reading Score";
            break;
        case "positiveMathScoreAvg" :
            chartTitle = "Students with Positive Math Score";
            break;
        case "positiveScienceScoreAvg" :
            chartTitle = "Students with Positive Science Score";
            break;
        case "gradRate" :
            chartTitle = "On-time Graduation Rate";
            break;
        case "dropoutRate" :
            chartTitle = "Dropout Percentage";
            break;
        case "collegeReady" :
            chartTitle = "College-Ready Diploma Earners";
            break;
        case "careerReady" :
            chartTitle = "Career-Ready Diploma Earners";
            break;
        case "studentsInPoverty" :
            chartTitle = "Students in Poverty";
            break;
        case "studentsWithDisabilities" :
            chartTitle = "Students with Disabilities";
            break;
        case "studentsWhite" :
            chartTitle = "White";
            break;
        case "studentsBlack" :
            chartTitle = "Black";
            break;
        case "studentsOther" :
            chartTitle = "Other";
            break;
        case "ACTCompositeAVG" :
            chartTitle = "Average ACT Score";
            break;
    }

    let scores = schoolScoreCheck(school, subject, code)
    if (code === "D") {
        return [["", school.schoolName,{ role: 'annotation' }, "State Average",{ role: 'annotation' }],
            [chartTitle, scores.school, scores.school + "%", scores.state, scores.state + "%"]]
    } else {
        return [["", school.schoolName,{ role: 'annotation' }, "District Average", { role: 'annotation' }, "State Average", { role: 'annotation' }],
            [chartTitle, scores.school, scores.school+ "%", scores.district, scores.district+ "%", scores.state, scores.state+ "%"]]
    }
};
const schoolScoreCheck = (school, subject, code) => {
    if (subject === "positiveReadingScoreAvg" ||
        subject === "positiveMathScoreAvg" ||
        subject === "positiveScienceScoreAvg")
//subjects requiring e/m/p/h distinction
    {
        if (schools[school["districtId"]] === undefined) {
            ///district page
            return {
                school: Number(school[`${subject}_E`]) ? Number(school[`${subject}_E`]) : 0,
                state: Number(state[`${subject}_E`]) ? Number(state[`${subject}_E`]) : 0
            }
        } else
            ///school page
            return {
                school: Number(school[subject]) ? Number(school[subject]) : 0,
                district: Number(schools[school["districtId"]][`${subject}_${code}`]) ? Number(schools[school["districtId"]][`${subject}_${code}`]) : 0,
                state: Number(state[`${subject}_E`]) ? Number(state[`${subject}_E`]) : 0
            }
    } else {
//subjects not requiring e/m/p/h distinction
        if (schools[school["districtId"]] === undefined) {
            ///district page
            return {
                school: Number(school[subject]) ? Number(school[subject]) : 0,
                state: Number(state[`${subject}`]) ? Number(state[`${subject}`]) : 0
            }
        } else
            ///school page
            return {
                school: Number(school[subject]) ? Number(school[subject]) : 0,
                district: Number(schools[school["districtId"]][`${subject}`]) ? schools[school["districtId"]][`${subject}`] : 0,
                state: Number(state[`${subject}`]) ? Number(state[`${subject}`]) : 0
            }
    }
}
