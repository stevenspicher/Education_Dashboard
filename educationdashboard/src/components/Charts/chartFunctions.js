import districts from "../../dataImport/districtsData.json";
import state from "../../dataImport/stateData.json";



const schoolScoreCheck = (school, district, state) => {
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

const districtScoreCheck = (districtScore, stateScore) => {
    if (Number.isNaN(districtScore) || districtScore === undefined || districtScore === "*") {
        districtScore = 0;
    }
    if (Number.isNaN(stateScore) || stateScore === undefined || stateScore === "*") {
        stateScore = 0;
    }
    return {districtScore, stateScore}
}
///School chart functions

export const createSchoolScoreData = (school, subject, code) => {
    let scores = schoolScoreCheck(
        school[`positive${subject}ScoreAvg`],
        districts[school["districtId"]][`positive${subject}ScoreAvg_${code}`],
        state[`positive${subject}ScoreAvg_E`]
    )
    return [["", school.schoolName, "District Average", "State Average"],
        [`Students with Positive ${subject} Score`, scores.school, scores.district, scores.state]]
};
export const createSchoolOnTimeGraduationRateData = (school) => {
    let scores = schoolScoreCheck(
        school.gradRate,
        districts[school["districtId"]].gradRate,
        state.gradRate
    )
    return [["", school.schoolName, "District Average", "State Average"],
        ["On-time graduation rate", scores.school, scores.district, scores.state]]
};

export const createSchoolDropoutPercentageData = (school) => {
    let scores = schoolScoreCheck(
        school.dropoutRate,
        districts[school["districtId"]].dropoutRate,
        state.dropoutRate
    )
    return [["", school.schoolName, "District Average", "State Average"],
        ["Dropout Percentage", scores.school, scores.district, scores.state]]
};
export const createSchoolAverageACTScoreData = (school) => {
    let scores = schoolScoreCheck(
        school.ACTCompositeAVG,
        districts[school["districtId"]].ACTCompositeAVG,
        state.ACTCompositeAVG
    )
    return [["", school.schoolName, "District Average", "State Average"],
        ["Average Act Score - fix!!", scores.school, scores.district, scores.state]]
};

export const createSchoolCollegeReadyDiplomaEarnersData = (school) => {
    let scores = schoolScoreCheck(
        school.collegeReady,
        districts[school["districtId"]].collegeReady,
        state.collegeReady
    )
    return [["", school.schoolName, "District Average","State Average"],
        ["College-Ready Diploma Earners", scores.school, scores.district, scores.state]]
};
export const createSchoolCareerReadyDiplomaEarnersData = (school) => {
    let scores = schoolScoreCheck(
        school.careerReady,
        districts[school["districtId"]].careerReady,
        state.careerReady
    )
    return [["", school.schoolName, "District Average", "State Average"],
        ["Career-Ready Diploma Earners", scores.school, scores.district, scores.state]]
};

export const createSchoolStudentsInPovertyData = (school) => {
    let scores = schoolScoreCheck(
        school.studentsInPoverty,
        districts[school["districtId"]].studentsInPoverty,
        state.studentsInPoverty
    )
    return [["", school.schoolName, "District Average", "State Average"],
        ["Percentage of Students In Poverty", scores.school, scores.district, scores.state,]]
};

export const createSchoolStudentsWithDisabilitiesData = (school) => {

    let scores = schoolScoreCheck(
        school.studentsWithDisabilities,
        districts[school["districtId"]].studentsWithDisabilities,
        state.studentsWithDisabilities
    )
    return [["", school.schoolName, "District Average", "State Average"],
        ["Percentage of Students With Disabilities", scores.school, scores.district, scores.state,]]
};
///TODO - Add ELL data to object
export const createSchoolELLStudentData = (school) => {

    let scores = schoolScoreCheck(
        school.ELLStudents,
        districts[school["districtId"]].ELLStudents,
        state.ELLStudents
    )
    return [["", school.schoolName, "District Average", "State Average"],
        ["English Language Learning Students", scores.school, scores.district, scores.state,]]
};

export const createSchoolStudentEthnicityData = (school, type) => {
    let scores = schoolScoreCheck(
        school[`students${type}`],
        districts[school["districtId"]][`students${type}`],
        state[`students${type}`]
    )
    return [["", school.schoolName, "District Average", "State Average"],
        [type, scores.school, scores.district, scores.state],]
};

///District functions
export const createDistrictScoreData = (district, subject) => {
    let scores = districtScoreCheck(
        district[`positive${subject}ScoreAvg_E`],
        state[`positive${subject}ScoreAvg_E`]
    )
    return [["",  district.schoolName,  "State Average"],
        [`Students with positive ${subject} Score`, scores.districtScore, scores.stateScore]]
}
export const createDistrictOnTimeGraduationRateData = (district) => {
    let scores = districtScoreCheck(
        district.gradRate,
        state.gradRate
    )
    return [["",  district.schoolName, "State Average"],
        ["On-time graduation rate", scores.districtScore, scores.stateScore]]
};
export const createDistrictAverageACTScoreData = (district) => {
    let scores = districtScoreCheck(
        district.ACTCompositeAVG,
        state.ACTCompositeAVG
    )
    return [["",  district.schoolName, "State Average"],
        ["Average Act Score", scores.districtScore, scores.stateScore]]
};



export const createDistrictStudentsInPovertyData = (district) => {
    return [["",  district.schoolName, "State Average"],
        ["Percentage of Students in Poverty",  district.studentsInPoverty,  state.studentsInPoverty]]
};

export const createDistrictStudentsWithDisabilitiesData = (district) => {
    return [["",  district.schoolName, "State Average"],
        ["Percentage of Students with Disabilities", district.studentsWithDisabilities, state.studentsWithDisabilities,]]
};


export const createDistrictWhiteData = (district) =>
{
    return [["", district.schoolName, "State Average"],
        ["White", district.studentsWhite, state.studentsWhite],]
};

export const createDistrictBlackData = (district) =>
{
    return [["", district.schoolName, "State Average"],
        ["Black", district.studentsBlack, state.studentsBlack],]
};

export const createDistrictOtherData = (district) =>
{
    return [["", district.schoolName, "State Average"],
        ["Other", district.studentsOther, state.studentsOther],]
};



///shared functions