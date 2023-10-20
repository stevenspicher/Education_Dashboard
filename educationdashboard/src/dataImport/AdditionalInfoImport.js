import XLSX from "xlsx-js-style";


export const AdditionalInfoImport = async (data, setReport, currentYear, setYearVerified, setAdditionalInfoVerified ) => {
const fileNameWithYear = data.name.split('.')[0];
    const additionalInfoCurrentYear = fileNameWithYear.slice(-4);
    if (additionalInfoCurrentYear === currentYear) {setYearVerified(true)}
    const fileName = fileNameWithYear.split(additionalInfoCurrentYear)[0];
    if (fileName === "ReportCardData_AdditionalInfo") {setAdditionalInfoVerified(true)}


    const file = await data.arrayBuffer();
    const wb = XLSX.readFile(file)
    const gradRateWS = wb.Sheets[wb.SheetNames[4]];
    const collegeReadinessWS = wb.Sheets[wb.SheetNames[5]];
    const careerReadinessWS = wb.Sheets[wb.SheetNames[6]];
    const schoolClimateChronicAbsenceWS = wb.Sheets[wb.SheetNames[9]];
    const classroomEnvironmentWS = wb.Sheets[wb.SheetNames[10]];
    const schoolSafetyWS = wb.Sheets[wb.SheetNames[11]];
    const financialDataWS = wb.Sheets[wb.SheetNames[12]];
    const collegeReadinessData = XLSX.utils.sheet_to_json(collegeReadinessWS, {
        header: 1,
        defval: ""
    })
    const schoolSafetyData = XLSX.utils.sheet_to_json(schoolSafetyWS, {
        header: 1,
        defval: ""
    })
    const gradRateData = XLSX.utils.sheet_to_json(gradRateWS, {
        header: 1,
        defval: ""
    })
    const schoolClimateChronicAbsenceData = XLSX.utils.sheet_to_json(schoolClimateChronicAbsenceWS, {
        header: 1,
        defval: ""
    })
    const classroomEnvironmentData = XLSX.utils.sheet_to_json(classroomEnvironmentWS, {
        header: 1,
        defval: ""
    })
    const financialDataData = XLSX.utils.sheet_to_json(financialDataWS, {
        header: 1,
        defval: ""
    })

    const careerReadinessData = XLSX.utils.sheet_to_json(careerReadinessWS, {
        header: 1,
        defval: ""
    })

    setReport({
        careerReadiness: careerReadinessData,
        gradRate: gradRateData,
        finance: financialDataData,
        classroomEnvironment: classroomEnvironmentData,
        safety: schoolSafetyData,
        collegeReadiness: collegeReadinessData,
        schoolClimateChronicAbsence: schoolClimateChronicAbsenceData
    })
};