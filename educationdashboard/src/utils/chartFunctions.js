import state from "../dataImport/stateData.json";
import {allSchools} from "../store/signalStore.js";



const schools = allSchools.value

export const createSchoolScoreData = (school, subject, code) => {
    let chartTitle = subject,
        annotation


    switch (subject) {
        case "positiveReadingScoreAvg" :
            chartTitle = "Students with Positive Reading Score";
            annotation = "%"
            break;
        case "positiveMathScoreAvg" :
            chartTitle = "Students with Positive Math Score";
            annotation = "%";
            break;
        case "positiveScienceScoreAvg" :
            chartTitle = "Students with Positive Science Score";
            annotation = "%";
            break;
        case "gradRate" :
            chartTitle = "On-time Graduation Rate";
            annotation = "%";
            break;
        case "dropoutRate" :
            chartTitle = "Dropout Percentage";
            annotation = "%";
            break;
        case "collegeReady" :
            chartTitle = "College-Ready Diploma Earners";
            annotation = "%";
            break;
        case "careerReady" :
            chartTitle = "Career-Ready Diploma Earners";
            annotation = "%";
            break;
        case "studentsInPovertyPct" :
            chartTitle = "Students in Poverty";
            annotation = "%";
            break;
        case "studentsWithDisabilities" :
            chartTitle = "Students with Disabilities";
            annotation = "%";
            break;
        case "studentsWhite" :
            chartTitle = "White";
            annotation = "%";
            break;
        case "studentsBlack" :
            chartTitle = "Black";
            annotation = "%";
            break;
        case "studentsOther" :
            chartTitle = "Other";
            annotation = "%";
            break;
        case "ACTCompositeAVG" :
            chartTitle = "Average ACT Score";
            annotation = "";
            break;
    }

    let scores = schoolScoreCheck(school, subject, code)
    if (code === "D") {
        return [["", school.schoolName,{ role: 'annotation' }, "State Average",{ role: 'annotation' }],
            [chartTitle, scores.school, scores.school + annotation, scores.state, scores.state + annotation]]
    } else {
        return [["", school.schoolName, {role: 'annotation'}, "District Average", {role: 'annotation'}, "State Average", {role: 'annotation'}],
            [chartTitle, scores.school, scores.school + annotation, scores.district, scores.district + annotation, scores.state, scores.state + annotation]]
    }
};
    let schoolSubjectAvg = 0,
        districtSubjectAvg= 0,
        stateSubjectAvg = 0;
const schoolScoreCheck = (school, subject, code) => {
    if (subject === "positiveReadingScoreAvg" ||
        subject === "positiveMathScoreAvg" ||
        subject === "positiveScienceScoreAvg")
//subjects requiring e/m/p/h distinction
    {
        if (schools[school["districtId"]] === undefined) {
            ///district page
            return {
                school: Number(school[`${subject}_H`]) ? Number(school[`${subject}_H`]) : 0,
                state: Number(state[`${subject}_H`]) ? Number(state[`${subject}_H`]) : 0
            }
        } else
            ///school page

            return {
                school: Number(school[`${subject}_${code}`]) ? Number(school[`${subject}_${code}`]) : 0,
                district: Number(schools[school["districtId"]][`${subject}_${code}`]) ? Number(schools[school["districtId"]][`${subject}_${code}`]) : 0,
                state: Number(state[`${subject}_${code}`]) ? Number(state[`${subject}_${code}`]) : 0
            }
//disabilties and ethnicity
    } else if (subject === "studentsWithDisabilities" ||
        subject === "studentsWhite" ||
        subject === "studentsBlack"
    ) {
        schoolSubjectAvg = Math.round((school[subject]/school["totalStudents"] * 100) * 100) / 100
        stateSubjectAvg = Math.round((state[subject]/state["totalStudents"] * 100) * 100) / 100
        districtSubjectAvg = schools[school["districtId"]] !== undefined ?
            Math.round((schools[school["districtId"]][subject]/schools[school["districtId"]]["totalStudents"]* 100) * 100) / 100 : 0
        if (schools[school["districtId"]] === undefined) {
            ///district page
            return {
                school: schoolSubjectAvg,
                state: stateSubjectAvg,
            }
        } else
            ///school page
            return {
                school: schoolSubjectAvg,
                district: districtSubjectAvg,
                state: stateSubjectAvg,
            }
        // "other
    } else if (subject === "studentsOther") {
        let schoolTotalOther = school.studentsAmericanIndian + school.studentsHispanic + school.studentsAsianPacific
        let stateTotalOther = state.studentsAmericanIndian + state.studentsHispanic + state.studentsAsianPacific
        let districtTotalOther = schools[school["districtId"]] !== undefined ? schools[school["districtId"]].studentsAmericanIndian + schools[school["districtId"]].studentsHispanic + schools[school["districtId"]].studentsAsianPacific : 0
        schoolSubjectAvg = Math.round((schoolTotalOther/school["totalStudents"] * 100) * 100) / 100
        stateSubjectAvg = Math.round((stateTotalOther/state["totalStudents"] * 100) * 100) / 100
        districtSubjectAvg = schools[school["districtId"]] !== undefined ?
            Math.round((districtTotalOther/schools[school["districtId"]]["totalStudents"]* 100) * 100) / 100 : 0
        if (schools[school["districtId"]] === undefined) {
            ///district page
            return {
                school: schoolSubjectAvg,
                state: stateSubjectAvg,
            }
        } else
            ///school page
            return {
                school: schoolSubjectAvg,
                district: districtSubjectAvg,
                state: stateSubjectAvg,
            }
    }
    else {
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
