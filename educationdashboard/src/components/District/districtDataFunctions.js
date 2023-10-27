import state from '../../dataImport/stateData.json'

export const options = {
  // title: "Age vs. Weight comparison",
  // hAxis: { title: "Students with Positive Reading Score", viewWindow: { min: 0, max: 0 } },
  // vAxis: { title: "", viewWindow: { min: 10, max: 100 } },
  backgroundColor: "#f3f4f2",
  legend: "none",
  height: "100%",
  width: "100%"
};


export const createDistrictScoreData = (district, subject) => {
  let scores = scoreCheck(
      district[`positive${subject}ScoreAvg_E`],
      state[`positive${subject}ScoreAvg_E`]
  )
  return [["",  district.schoolName,  "State Average"],
    [`Students with positive ${subject} Score`, scores.districtScore, scores.stateScore]]
}
export const createOnTimeGraduationRateData = (district) => {
  let scores = scoreCheck(
       district.gradRate,
      state.gradRate
  )
  return [["",  district.schoolName, "State Average"],
    ["On-time graduation rate", scores.districtScore, scores.stateScore]]
};
export const createAverageACTScoreData = (district) => {
  let scores = scoreCheck(
       district.ACTCompositeAVG,
       state.ACTCompositeAVG
  )
  return [["",  district.schoolName, "State Average"],
    ["Average Act Score", scores.districtScore, scores.stateScore]]
};



export const createStudentsInPovertyData = (district) => {
  return [["",  district.schoolName, "State Average"],
    ["Percentage of Students in Poverty",  district.studentsInPoverty,  state.studentsInPoverty]]
};

export const createStudentsWithDisabilitiesData = (district) => {
  return [["",  district.schoolName, "State Average"],
    ["Percentage of Students with Disabilities", district.studentsWithDisabilities, state.studentsWithDisabilities,]]
};


export const createWhiteData = (district) =>
{
  return [["", district.schoolName, "State Average"],
    ["White", district.studentsWhite, state.studentsWhite],]
};

export const createBlackData = (district) =>
{
  return [["", district.schoolName, "State Average"],
    ["Black", district.studentsBlack, state.studentsBlack],]
};

export const createOtherData = (district) =>
{
  return [["", district.schoolName, "State Average"],
    ["Other", district.studentsOther, state.studentsOther],]
};

const scoreCheck = (districtScore, stateScore) => {
  if (Number.isNaN(districtScore) || districtScore === undefined || districtScore === "*") {
    districtScore = 0;
  }
  if (Number.isNaN(stateScore) || stateScore === undefined || stateScore === "*") {
    stateScore = 0;
  }
  return {districtScore, stateScore}
}