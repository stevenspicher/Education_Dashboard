export const readingScoreData = [
  ["", "Chapman High School", "District Average", "State Average"],
  ["Students with Positive Reading Score", 67, 67, 55],

];

export const options = {
  // title: "Age vs. Weight comparison",
  // hAxis: { title: "Students with Positive Reading Score", viewWindow: { min: 0, max: 0 } },
  // vAxis: { title: "", viewWindow: { min: 10, max: 100 } },
  backgroundColor: "#f3f4f2",
  legend: "none",
  height: "100%",
  width: "100%"
};

export const createDistrictMathScoreData = (dataFile) => {
  return [["", dataFile.schoolName, "State Average"],
      ["Students with positive Math Score", dataFile.academicPerformance.positiveMathScoreAvg, dataFile.academicPerformance.positiveMathScoreAvgState]]
}
export const createDistrictReadingScoreData = (dataFile) => {
  return [["", dataFile.schoolName, "State Average"],
    ["Students with positive Reading Score", dataFile.academicPerformance.positiveReadingScoreAvg, dataFile.academicPerformance.positiveReadingScoreAvgState]]
}
export const createDistrictScienceScoreData = (dataFile) => {
  return [["", dataFile.schoolName, "State Average"],
    ["Students with positive Science Score", dataFile.academicPerformance.positiveScienceScoreAvg, dataFile.academicPerformance.positiveScienceScoreAvgState]]
}

export const createOnTimeGraduationRateData = (dataFile) => {
  return [["", dataFile.schoolName, "State Average"],
    ["On-time graduation rate", dataFile.academicPerformance.gradRate, dataFile.academicPerformance.gradRateState]]
};
export const createAverageACTScoreData = (dataFile) => {
  return [["", dataFile.schoolName, "State Average"],
    ["Average Act Score - fix!!", dataFile.academicPerformance.ACTCompositeState, dataFile.academicPerformance.ACTCompositeState]]
  //TODO: fix ACTComposite
};



export const createStudentsInPovertyData = (dataFile) => {
  return [["", dataFile.schoolName, "State Average"],
    ["Students in Poverty", dataFile.demographics.studentsInPoverty, dataFile.demographics.studentsInPovertyState]]
};

export const createStudentsWithDisabilitiesData = (dataFile) => {
  return [["", dataFile.schoolName, "State Average"],
    ["Students with Disabilities", dataFile.demographics.studentsWithDisabilities, dataFile.demographics.studentsWithDisabilitiesState],]
};


export const createWhiteData = (dataFile) =>
{
  return [["", dataFile.schoolName, "State Average"],
    ["White", dataFile.demographics.studentsWhite, dataFile.demographics.studentsWhiteState],]
};

export const createBlackData = (dataFile) =>
{
  return [["", dataFile.schoolName, "State Average"],
    ["Black", dataFile.demographics.studentsBlack, dataFile.demographics.studentsBlackState],]
};

export const createOtherData = (dataFile) =>
{
  return [["", dataFile.schoolName, "State Average"],
    ["Other", dataFile.demographics.studentsOther, dataFile.demographics.studentsOtherState],]
};

export const storedReportObject = {}
