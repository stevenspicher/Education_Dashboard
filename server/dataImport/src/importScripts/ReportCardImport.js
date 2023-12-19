import XLSX from "xlsx-js-style";


export const ReportCardImport = async (data, setReport, setCurrentYear, setReportCardVerified) => {
    const fileNameWithYear = data.name.split('.')[0];
    const currentYear = fileNameWithYear.slice(-4);
    const fileName = fileNameWithYear.split(currentYear)[0];
    setCurrentYear(currentYear.split("0")[1])
    if (fileName === "ReportCardData_forResearchers") {setReportCardVerified(true)}
    const file = await data.arrayBuffer();
    const wb = XLSX.readFile(file)
    const ratingsWS = wb.Sheets[wb.SheetNames[1]];
    const mainPageWS = wb.Sheets[wb.SheetNames[3]];
    const achievePrepSuccessElemMid = wb.Sheets[wb.SheetNames[4]];
    const achievePrepSuccessHighWS = wb.Sheets[wb.SheetNames[5]];
    const participationWS = wb.Sheets[wb.SheetNames[6]];
    const participationBySubjectWS = wb.Sheets[wb.SheetNames[7]];
    const gradRateWS = wb.Sheets[wb.SheetNames[9]];
    const collegeAndCareerReadinessWS = wb.Sheets[wb.SheetNames[10]];
    const ratingsData = XLSX.utils.sheet_to_json(ratingsWS, {
        header: 1,
        defval: ""
    })
    const gradRateData = XLSX.utils.sheet_to_json(gradRateWS, {
        header: 1,
        defval: ""
    })
    const mainPageData = XLSX.utils.sheet_to_json(mainPageWS, {
        header: 1,
        defval: ""
    })
    const achievePrepSuccessElemMidData = XLSX.utils.sheet_to_json(achievePrepSuccessElemMid, {
        header: 1,
        defval: ""
    })
    const achievePrepSuccessHighData = XLSX.utils.sheet_to_json(achievePrepSuccessHighWS, {
        header: 1,
        defval: ""
    })
    const participationData = XLSX.utils.sheet_to_json(participationWS, {
        header: 1,
        defval: ""
    })
    const participationBySubjectData = XLSX.utils.sheet_to_json(participationBySubjectWS, {
        header: 1,
        defval: ""
    })
    const collegeAndCareerReadinessData = XLSX.utils.sheet_to_json(collegeAndCareerReadinessWS, {
        header: 1,
        defval: ""
    })
    setReport({
        ratings:ratingsData.slice(2),
        gradRate: gradRateData,
        mainPage: mainPageData,
        achievePrepSuccessHigh: achievePrepSuccessHighData,
        achievePrepSuccessElemMid: achievePrepSuccessElemMidData,
        participationBySubject: participationBySubjectData,
        participation: participationData,
        collegeAndCareerReadiness: collegeAndCareerReadinessData
    })

};