import state from "../../dataImport/stateData.json"
import districts from "../../dataImport/districtsData.json"

export const options = {
    // title: "Age vs. Weight comparison",
    // hAxis: { title: "Students with Positive Reading Score", viewWindow: { min: 0, max: 0 } },
    // vAxis: { title: "", viewWindow: { min: 10, max: 100 } },
    backgroundColor: "#f3f4f2",
    legend: "none",
    width:300,
    height:250,
    fontSize: "20px",
};

export  const optionsLegend = {

    backgroundColor: "#f3f4f2",
    legend:'top',
    // is3D:true,
    width:350,
    height:250


};
export const createScoreData = (school, subject, code) => {
    let scores = scoreCheck(
        school[`positive${subject}ScoreAvg`],
        districts[school["districtId"]][`positive${subject}ScoreAvg_${code}`],
        state[`positive${subject}ScoreAvg_E`]
    )
    return [["", school.schoolName, "District Average", "State Average"],
        [`Students with Positive ${subject} Score`, scores.school, scores.district, scores.state]]
}

export const createOnTimeGraduationRateData = (school) => {
    let scores = scoreCheck(
        school.gradRate,
        districts[school["districtId"]].gradRate,
        state.gradRate
    )
    return [["", school.schoolName, "District Average", "State Average"],
        ["On-time graduation rate", scores.school, scores.district, scores.state]]
};

export const createDropoutPercentageData = (school) => {
    let scores = scoreCheck(
        school.dropoutRate,
        districts[school["districtId"]].dropoutRate,
        state.dropoutRate
    )
    return [["", school.schoolName, "District Average", "State Average"],
        ["Dropout Percentage", scores.school, scores.district, scores.state]]
};
export const createAverageACTScoreData = (school) => {
    let scores = scoreCheck(
        school.ACTCompositeAVG,
        districts[school["districtId"]].ACTCompositeAVG,
        state.ACTCompositeAVG
    )
    return [["", school.schoolName, "District Average", "State Average"],
        ["Average Act Score - fix!!", scores.school, scores.district, scores.state]]
};

export const createCollegeReadyDiplomaEarnersData = (school) => {
    let scores = scoreCheck(
        school.collegeReady,
        districts[school["districtId"]].collegeReady,
        state.collegeReady
    )
    return [["", school.schoolName, "District Average","State Average"],
        ["College-Ready Diploma Earners", scores.school, scores.district, scores.state]]
};
export const createCareerReadyDiplomaEarnersData = (school) => {
    let scores = scoreCheck(
        school.careerReady,
        districts[school["districtId"]].careerReady,
        state.careerReady
    )
    return [["", school.schoolName, "District Average", "State Average"],
        ["Career-Ready Diploma Earners", scores.school, scores.district, scores.state]]
};

export const createStudentsInPovertyData = (school) => {
    let scores = scoreCheck(
        school.studentsInPoverty,
        districts[school["districtId"]].studentsInPoverty,
        state.studentsInPoverty
    )
    return [["", school.schoolName, "District Average", "State Average"],
        ["Percentage of Students In Poverty", scores.school, scores.district, scores.state,]]
};

export const createStudentsWithDisabilitiesData = (school) => {

    let scores = scoreCheck(
        school.studentsWithDisabilities,
        districts[school["districtId"]].studentsWithDisabilities,
        state.studentsWithDisabilities
    )
    return [["", school.schoolName, "District Average", "State Average"],
        ["Percentage of Students With Disabilities", scores.school, scores.district, scores.state,]]
};
///TODO - Add ELL data to object
export const createELLStudentData = (school) => {

    let scores = scoreCheck(
        school.ELLStudents,
        districts[school["districtId"]].ELLStudents,
        state.ELLStudents
    )
    return [["", school.schoolName, "District Average", "State Average"],
        ["English Language Learning Students", scores.school, scores.district, scores.state,]]
};

export const createStudentEthnicityData = (school, type) => {
    let scores = scoreCheck(
       school[`students${type}`],
        districts[school["districtId"]][`students${type}`],
        state[`students${type}`]
    )
    return [["", school.schoolName, "District Average", "State Average"],
        [type, scores.school, scores.district, scores.state],]
};


export const storedReportObject = {}

const scoreCheck = (school, district, state) => {
    if (Number.isNaN(school) || school === undefined || school === "*") {
        school = 0;
    }
    if (Number.isNaN(district) || district === undefined || district === "*") {
        district = 0;
    }
    if (Number.isNaN(state) || state === undefined || state === "*") {
        state = 0;
    }
    return {school, district, state}
}
