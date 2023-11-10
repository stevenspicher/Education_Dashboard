import districts from "../dataImport/districtsData.json";
import state from "../dataImport/stateData.json";



export const createSchoolScoreData = (school, subject, code) => {

    let chartTitle = "Score Data for " + subject;
    let scores = schoolScoreCheck(school, subject, code)
    if (code === "D") {
        return [["", school.schoolName, "State Average"],
            [chartTitle, scores.school, scores.state]]
    } else {
        return [["", school.schoolName, "District Average", "State Average"],
            [chartTitle, scores.school, scores.district, scores.state]]
    }
};
const schoolScoreCheck = (school, subject, code) => {
    if (subject === "positiveReadingScoreAvg" ||
        subject === "positiveMathScoreAvg" ||
        subject === "positiveScienceScoreAvg")
//subjects requiring e/m/p/h distinction
    {
        if (districts[school["districtId"]] === undefined) {
            ///district page
            return {
                school: Number(school[`${subject}_E`]) ? Number(school[`${subject}_E`]) : 0,
                state: Number(state[`${subject}_E`]) ? Number(state[`${subject}_E`]) : 0
            }
        } else
            ///school page
            return {
                school: Number(school[subject]) ? Number(school[subject]) : 0,
                district: Number(districts[school["districtId"]][`${subject}_${code}`]) ? Number(districts[school["districtId"]][`${subject}_${code}`]) : 0,
                state: Number(state[`${subject}_E`]) ? Number(state[`${subject}_E`]) : 0
            }
    } else {
//subjects not requiring e/m/p/h distinction
        if (districts[school["districtId"]] === undefined) {
            ///district page
            return {
                school: Number(school[subject]) ? Number(school[subject]) : 0,
                state: Number(state[`${subject}`]) ? Number(state[`${subject}`]) : 0
            }
        } else
            ///school page
            return {
                school: Number(school[subject]) ? Number(school[subject]) : 0,
                district: Number(districts[school["districtId"]][`${subject}`]) ? districts[school["districtId"]][`${subject}`] : 0,
                state: Number(state[`${subject}`]) ? Number(state[`${subject}`]) : 0
            }
    }
}
