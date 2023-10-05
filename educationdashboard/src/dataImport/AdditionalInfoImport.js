import XLSX from "xlsx-js-style";


export const AdditionalInfoImport = async (data, setReport, currentYear, setYearVerified, setAdditionalInfoVerified ) => {
const fileNameWithYear = data.name.split('.')[0];
    const additionalInfoCurrentYear = fileNameWithYear.slice(-4);
    if (additionalInfoCurrentYear === currentYear) {setYearVerified(true)}
    const fileName = fileNameWithYear.split(additionalInfoCurrentYear)[0];
    if (fileName === "ReportCardData_AdditionalInfo") {setAdditionalInfoVerified(true)}


    const file = await data.arrayBuffer();
    const wb = XLSX.readFile(file)
    const collegeReadinessWS = wb.Sheets[wb.SheetNames[5]];
    const schoolSafetyWS = wb.Sheets[wb.SheetNames[11]];
    const classroomEnvironmentWS = wb.Sheets[wb.SheetNames[10]];
    const financialDataWS = wb.Sheets[wb.SheetNames[12]];
    const chronicAbsenceWS = wb.Sheets[wb.SheetNames[9]];
    const careerReadinessWS = wb.Sheets[wb.SheetNames[6]];
    const collegeReadinessData = XLSX.utils.sheet_to_json(collegeReadinessWS, {
        header: 1,
        defval: ""
    })
    const schoolSafetyData = XLSX.utils.sheet_to_json(schoolSafetyWS, {
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
    const chronicAbsenceData = XLSX.utils.sheet_to_json(chronicAbsenceWS, {
        header: 1,
        defval: ""
    })
    const careerReadinessData = XLSX.utils.sheet_to_json(careerReadinessWS, {
        header: 1,
        defval: ""
    })

    setReport({
        careerReadiness: careerReadinessData,
        chronicAbsences: chronicAbsenceData,
        finance: financialDataData,
        classroomEnvironment: classroomEnvironmentData,
        safety: schoolSafetyData,
        collegeReadiness: collegeReadinessData
    })
};