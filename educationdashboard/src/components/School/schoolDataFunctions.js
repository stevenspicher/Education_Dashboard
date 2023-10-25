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
export const createScoreData = (dataFile, subject) => {
    let scores = scoreCheck(
        dataFile.academicPerformance[`positive${subject}ScoreAvg`],
        dataFile.academicPerformance[`positive${subject}ScoreAvgDistrict`],
        dataFile.academicPerformance[`positive${subject}ScoreAvgState`]
    )
    return [["", dataFile.schoolName, "District Average", "State Average"],
        [`Students with Positive ${subject} Score`, scores.school, scores.district, scores.state]]
}

export const createOnTimeGraduationRateData = (dataFile) => {
    let scores = scoreCheck(
        dataFile.academicPerformance.gradRate,
        dataFile.academicPerformance.gradRate,
        dataFile.academicPerformance.gradRate
    )
    return [["", dataFile.schoolName, "District Average", "State Average"],
        ["On-time graduation rate", scores.school, scores.district, scores.state]]
};

export const createDropoutPercentageData = (dataFile) => {
    let scores = scoreCheck(
        dataFile.academicPerformance.dropoutRate,
        dataFile.academicPerformance.dropoutRateDistrict,
        dataFile.academicPerformance.dropoutRateState
    )
    return [["", dataFile.schoolName, "District Average", "State Average"],
        ["Dropout Percentage", scores.school, scores.district, scores.state]]
};
export const createAverageACTScoreData = (dataFile) => {
    let scores = scoreCheck(
        dataFile.academicPerformance.ACTCompositeAVG,
        dataFile.academicPerformance.ACTCompositeAVGDistrict,
        dataFile.academicPerformance.ACTCompositeAVG
    )
    return [["", dataFile.schoolName, "District Average", "State Average"],
        ["Average Act Score - fix!!", scores.school, scores.district, scores.state]]
};

export const createCollegeReadyDiplomaEarnersData = (dataFile) => {
    let scores = scoreCheck(
        dataFile.academicPerformance.collegeReady,
        dataFile.academicPerformance.collegeReadyDistrict,
        dataFile.academicPerformance.collegeReadyState
    )
    return [["", dataFile.schoolName, "District Average","State Average"],
        ["College-Ready Diploma Earners", scores.school, scores.district, scores.state]]
};
export const createCareerReadyDiplomaEarnersData = (dataFile) => {
    let scores = scoreCheck(
        dataFile.academicPerformance.careerReady,
        dataFile.academicPerformance.careerReadyDistrict,
        dataFile.academicPerformance.careerReadyState
    )
    return [["", dataFile.schoolName, "District Average", "State Average"],
        ["Career-Ready Diploma Earners", scores.school, scores.district, scores.state]]
};

export const createStudentsInPovertyData = (dataFile) => {
    let scores = scoreCheck(
        dataFile.demographics.studentsInPoverty,
        dataFile.demographics.studentsInPovertyDistrict,
        dataFile.demographics.studentsInPovertyState
    )
    return [["", dataFile.schoolName, "District Average", "State Average"],
        ["Percentage of Students In Poverty", scores.school, scores.district, scores.state,]]
};

export const createStudentsWithDisabilitiesData = (dataFile) => {

    let scores = scoreCheck(
        dataFile.demographics.studentsWithDisabilities,
        dataFile.demographics.studentsWithDisabilitiesDistrict,
        dataFile.demographics.studentsWithDisabilitiesState
    )
    return [["", dataFile.schoolName, "District Average", "State Average"],
        ["Percentage of Students With Disabilities", scores.school, scores.district, scores.state,]]
};
///TODO - Add ELL data to object
export const createELLStudentData = (dataFile) => {

    let scores = scoreCheck(
        dataFile.academicPerformance.ELLStudents,
        dataFile.academicPerformance.ELLStudentsDistrict,
        dataFile.academicPerformance.ELLStudentsState
    )
    return [["", dataFile.schoolName, "District Average", "State Average"],
        ["English Language Learning Students", scores.school, scores.district, scores.state,]]
};

export const createStudentEthnicityData = (dataFile, type) => {
    let scores = scoreCheck(
        dataFile.demographics[`students${type}`],
        dataFile.demographics[`students${type}District`],
        dataFile.demographics[`students${type}State`]
    )
    return [["", dataFile.schoolName, "District Average", "State Average"],
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
