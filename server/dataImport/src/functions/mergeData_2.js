import {createFullDataObject} from "./functions";


export function mergeData(reportCardData, additionalInfoData, setSchoolData) {
    const mainPage = createFullDataObject(reportCardData.mainPage);
    const achievePrepSuccessElemMid = createFullDataObject(reportCardData.achievePrepSuccessElemMid);
    const achievePrepSuccessHigh = createFullDataObject(reportCardData.achievePrepSuccessHigh);
    const schoolClimateChronicAbsence = createFullDataObject(additionalInfoData.schoolClimateChronicAbsence);
    const gradRate = createFullDataObject(reportCardData.gradRate);
    const gradRateAdditional = createFullDataObject(additionalInfoData.gradRate);
    const college = createFullDataObject(additionalInfoData.collegeReadiness);
    const teacher = createFullDataObject(additionalInfoData.classroomEnvironment);
    const safety = createFullDataObject(additionalInfoData.safety);
    const finance = createFullDataObject(additionalInfoData.finance);
    const ratings = createFullDataObject(reportCardData.ratings);
    const participation = createFullDataObject(reportCardData.participation);
    const participationBySubject = createFullDataObject(reportCardData.participationBySubject);
    const collegeAndCareerReadiness = createFullDataObject(reportCardData.collegeAndCareerReadiness);


    function objCombine(obj, variable) {
        let fixedKey;
        //obj = report, variable = created Object
        for (let key of Object.keys(obj)) {
            //key = school id
            if (key.length === 6) {
                fixedKey = "0" + key
                if (!variable[fixedKey]) variable[fixedKey] = {};
            } else {
                if (!variable[key]) variable[key] = {};
            }
            for (let innerKey of Object.keys(obj[key])) {
                if (key.length === 6) {
                    variable[fixedKey][innerKey] = obj[key][innerKey];
                } else {
                    variable[key][innerKey] = obj[key][innerKey];
                }
            }
        }
    }

    let combined = {};
    objCombine(mainPage, combined);
    objCombine(gradRate, combined);
    objCombine(gradRateAdditional, combined);
    objCombine(achievePrepSuccessElemMid, combined);
    objCombine(achievePrepSuccessHigh, combined);
    objCombine(college, combined);
    objCombine(teacher, combined);
    objCombine(schoolClimateChronicAbsence, combined);
    objCombine(ratings, combined);
    objCombine(participation, combined);
    objCombine(safety, combined);
    objCombine(participationBySubject, combined);
    objCombine(collegeAndCareerReadiness, combined);
    objCombine(finance, combined);
    //combined = all data (except for when createSpecificDataObject is used)

    // names of data files
    let h = {},
        e = {},
        m = {},
        p = {},
        state = {},
        districts = {},
        homeDistrictInfo = {},
        homeSchoolInfo = {},

        //  helpers
        districtSchoolList = [],
        type;
    //Map through full list to create smaller data files
    Object.keys(combined).map((schoolId) => {


        // find year for gradrate
        let year = combined[schoolId]["ReportCardYear"].toString().slice(2)

        state = {
            //Elem, Middle, Primary
            positiveReadingScoreAvg_E: combined[9999999]["E_PctME"],
            positiveMathScoreAvg_E: combined[9999999]["M_PctME"],
            positiveScienceScoreAvg_E: combined[9999999]["SC_PctME"],
            //High School
            positiveReadingScoreAvg_H: combined[9999999]["E_PctABC"],
            positiveMathScoreAvg_H: combined[9999999]["M_PctABC"],
            positiveScienceScoreAvg_H: combined[9999999]["SC_PctABC"],
            dropoutRate: combined[9999999]["DropoutRateCurrYr"],
            collegeReady: combined[9999999]["PctCollege"],
            careerReady: combined[9999999]["PctCareer"],
            ACTCompositeAVG: combined[9999999]["ACT_Avg_CompositeScore"],
            gradRate: combined[9999999][`GRADRATE${year}`],
            //demographics
            studentsInPoverty: combined[9999999]["NTotal_ED"] / combined[9999999]["NTotal_ALL"],
            studentsWithDisabilities: combined[9999999]["NTotal_DI"] / combined[9999999]["NTotal_ALL"],
            ELLStudents: combined[9999999]["NTotal_EL"] / combined[9999999]["NTotal_ALL"],
            studentsWhite: combined[9999999]["NTotal_CA"] / combined[9999999]["NTotal_ALL"],
            studentsBlack: combined[9999999]["NTotal_AA"] / combined[9999999]["NTotal_ALL"],
            studentsOther: (!Number.isNaN(combined[9999999]["NTotal_AP"]) ?? 0) + (!Number.isNaN(combined[9999999]["NTotal_AI"]) ?? 0) + (!Number.isNaN(combined[9999999]["NTotal_HI"]) ?? 0) / Number(combined[9999999]["NTotal_ALL"]),
        }

console.log(combined)
        switch (combined[schoolId]["SCHOOLTYPECD"]) {
            case 'M':
                type = "Middle School";


                homeSchoolInfo[schoolId] = {
                    schoolName: combined[schoolId]["SchoolNm"],
                    schoolType: type,
                    schoolCode: combined[schoolId]["SCHOOLTYPECD"],
                    schoolId: schoolId,
                    gradRate: combined[schoolId][`GRADRATE${year}`],
                    avgTeacherSalary: combined[schoolId]["TCHSALARY_AvgCurrYr"],
                    teacherReturnRate: combined[schoolId]["TCHRETURN3yrAvg_PctCurrYr"],
                    ACTCompositeAVG: combined[schoolId]["ACT_Avg_CompositeScore"],
                }


                m[schoolId] = {
                    schoolType: type,
                    schoolPhone: combined[schoolId]["SchoolNm"], //FIX
                    schoolName: combined[schoolId]["SchoolNm"],
                    districtName: combined[schoolId]["DistrictNm"],
                    districtId: districtSearch(combined, schoolId),
                    schoolId: schoolId,
                    city: combined[schoolId]["city"],
                    street: combined[schoolId]["street"],
                    totalStudents: combined[schoolId]["Enrollment"],
                    teacherCount: combined[schoolId]["TeacherCount"],

                    // demographics
                    studentsInPoverty: combined[schoolId]["StudentsinPoverty_PctCurrYr"],
                    studentsWithDisabilities: combined[schoolId]["NTotal_DI"] / combined[schoolId]["NTotal_ALL"],
                    ELLStudents: !(Number.isNaN(combined[schoolId]["NTotal_EL"]) ?? 0) / combined[schoolId]["NTotal_ALL"],
                    studentsWhite: combined[schoolId]["NTotal_CA"] / combined[schoolId]["NTotal_ALL"],
                    studentsBlack: combined[schoolId]["NTotal_AA"] / combined[schoolId]["NTotal_ALL"],
                    studentsOther: (!Number.isNaN(combined[schoolId]["NTotal_AP"]) ?? 0) + (!Number.isNaN(combined[schoolId]["NTotal_AI"]) ?? 0) + (!Number.isNaN(combined[schoolId]["NTotal_HI"]) ?? 0) / Number(combined[schoolId]["NTotal_ALL"]),
                    ///cards
                    bullyAndHarass: combined[schoolId]["OCR_BullyHarass"],
                    avgTeacherSalary: combined[schoolId]["TCHSALARY_AvgCurrYr"],
                    parentFeelsSafe: combined[schoolId]["PAR_ChildFeelsSafe"],
                    teacherFeelsSafe: combined[schoolId]["TCH_IFeelSafe"],
                    violentAssaults:
                        combined[schoolId]["OCR_PhysAttachwWeapon"] +
                        combined[schoolId]["OCR_PhysAttachNoWeapon"] +
                        combined[schoolId]["OCR_PhysAttackwFirearm"] +
                        combined[schoolId]["OCR_Rape"] +
                        combined[schoolId]["OCR_SexAssault"] +
                        combined[schoolId]["OCR_RobNoWeapon"] +
                        combined[schoolId]["OCR_RobwWeapon"] +
                        combined[schoolId]["OCR_RobwFirearm"],
                    // academicPerformance - E/M/P
                    positiveReadingScoreAvg: combined[schoolId]["E_PctME"],
                    positiveMathScoreAvg: combined[schoolId]["M_PctME"],
                    positiveScienceScoreAvg: combined[schoolId]["SC_PctME"],
                }
                // districtSearch = {};
                // districtId = "";
                break;
            case 'E':
                type = "Elementary School";
                // districtSearch = Object.values(combined).find((district) => district["SchoolNm"] === combined[schoolId]["DistrictNm"]);
                // if (districtSearch !== undefined) {
                //     districtId = districtSearch["SCHOOLID"]
                //     // if (districtId.toString().length === 6) {
                //     //     districtId = "0" + districtId.toString()
                //     // }
                // }

                homeSchoolInfo[schoolId] = {
                    schoolName: combined[schoolId]["SchoolNm"],
                    schoolType: type,
                    schoolCode: combined[schoolId]["SCHOOLTYPECD"],
                    schoolId: schoolId,
                    gradRate: combined[schoolId][`GRADRATE${year}`],
                    avgTeacherSalary: combined[schoolId]["TCHSALARY_AvgCurrYr"],
                    teacherReturnRate: combined[schoolId]["TCHRETURN3yrAvg_PctCurrYr"],
                    ACTCompositeAVG: combined[schoolId]["ACT_Avg_CompositeScore"],
                }

                e[schoolId] = {
                    schoolType: type,
                    schoolName: combined[schoolId]["SchoolNm"],
                    districtName: combined[schoolId]["DistrictNm"],
                    districtId: districtSearch(combined, schoolId),
                    schoolId: schoolId,
                    city: combined[schoolId]["city"],
                    street: combined[schoolId]["street"],
                    totalStudents: combined[schoolId]["Enrollment"],
                    teacherCount: combined[schoolId]["TeacherCount"],

                    // demographics
                    studentsInPoverty: combined[schoolId]["StudentsinPoverty_PctCurrYr"],
                    studentsWithDisabilities: combined[schoolId]["NTotal_DI"] / combined[schoolId]["NTotal_ALL"],
                    ELLStudents: (Number(combined[schoolId]["NTotal_EL"]) ?? 0) / combined[schoolId]["NTotal_ALL"],
                    studentsWhite: combined[schoolId]["NTotal_CA"] / combined[schoolId]["NTotal_ALL"],
                    studentsBlack: combined[schoolId]["NTotal_AA"] / combined[schoolId]["NTotal_ALL"],
                    studentsOther: (!Number.isNaN(combined[schoolId]["NTotal_AP"]) ?? 0) + (!Number.isNaN(combined[schoolId]["NTotal_AI"]) ?? 0) + (!Number.isNaN(combined[schoolId]["NTotal_HI"]) ?? 0) / Number(combined[schoolId]["NTotal_ALL"]),
                    ///cards
                    bullyAndHarass: combined[schoolId]["OCR_BullyHarass"],
                    avgTeacherSalary: combined[schoolId]["TCHSALARY_AvgCurrYr"],
                    parentFeelsSafe: combined[schoolId]["PAR_ChildFeelsSafe"],
                    teacherFeelsSafe: combined[schoolId]["TCH_IFeelSafe"],
                    violentAssaults:
                        combined[schoolId]["OCR_PhysAttachwWeapon"] +
                        combined[schoolId]["OCR_PhysAttachNoWeapon"] +
                        combined[schoolId]["OCR_PhysAttackwFirearm"] +
                        combined[schoolId]["OCR_Rape"] +
                        combined[schoolId]["OCR_SexAssault"] +
                        combined[schoolId]["OCR_RobNoWeapon"] +
                        combined[schoolId]["OCR_RobwWeapon"] +
                        combined[schoolId]["OCR_RobwFirearm"],
                    // academicPerformance - E/M/P
                    positiveReadingScoreAvg: combined[schoolId]["E_PctME"],
                    positiveMathScoreAvg: combined[schoolId]["M_PctME"],
                    positiveScienceScoreAvg: combined[schoolId]["SC_PctME"],
                }
                // districtSearch = {};
                // districtId = "";
                break;
            case 'P':
                type = "Primary School";
                // districtSearch = Object.values(combined).find((district) => district["SchoolNm"] === combined[schoolId]["DistrictNm"]);
                // if (districtSearch !== undefined) {
                //     districtId = districtSearch["SCHOOLID"]
                //     // if (districtId.toString().length === 6) {
                //     //     districtId = "0" + districtId.toString()
                //     // }
                // }

                homeSchoolInfo[schoolId] = {
                    schoolName: combined[schoolId]["SchoolNm"],
                    schoolCode: combined[schoolId]["SCHOOLTYPECD"],
                    schoolType: type,
                    schoolId: schoolId,
                    gradRate: combined[schoolId][`GRADRATE${year}`],
                    avgTeacherSalary: combined[schoolId]["TCHSALARY_AvgCurrYr"],
                    teacherReturnRate: combined[schoolId]["TCHRETURN3yrAvg_PctCurrYr"],
                    ACTCompositeAVG: combined[schoolId]["ACT_Avg_CompositeScore"],
                }

                p[schoolId] = {
                    schoolType: type,
                    schoolName: combined[schoolId]["SchoolNm"],
                    districtName: combined[schoolId]["DistrictNm"],
                    districtId: districtSearch(combined, schoolId),
                    schoolId: schoolId,
                    city: combined[schoolId]["city"],
                    street: combined[schoolId]["street"],
                    totalStudents: combined[schoolId]["Enrollment"],
                    teacherCount: combined[schoolId]["TeacherCount"],

                    // demographics
                    studentsInPoverty: combined[schoolId]["StudentsinPoverty_PctCurrYr"],
                    studentsWithDisabilities: combined[schoolId]["NTotal_DI"] / combined[schoolId]["NTotal_ALL"],
                    ELLStudents: combined[schoolId]["NTotal_EL"] / combined[schoolId]["NTotal_ALL"],
                    studentsWhite: combined[schoolId]["NTotal_CA"] / combined[schoolId]["NTotal_ALL"],
                    studentsBlack: combined[schoolId]["NTotal_AA"] / combined[schoolId]["NTotal_ALL"],
                    studentsOther: (!Number.isNaN(combined[schoolId]["NTotal_AP"]) ?? 0) + (!Number.isNaN(combined[schoolId]["NTotal_AI"]) ?? 0) + (!Number.isNaN(combined[schoolId]["NTotal_HI"]) ?? 0) / Number(combined[schoolId]["NTotal_ALL"]),
                    ///cards
                    bullyAndHarass: combined[schoolId]["OCR_BullyHarass"],
                    avgTeacherSalary: combined[schoolId]["TCHSALARY_AvgCurrYr"],
                    parentFeelsSafe: combined[schoolId]["PAR_ChildFeelsSafe"],
                    teacherFeelsSafe: combined[schoolId]["TCH_IFeelSafe"],
                    violentAssaults:
                        combined[schoolId]["OCR_PhysAttachwWeapon"] +
                        combined[schoolId]["OCR_PhysAttachNoWeapon"] +
                        combined[schoolId]["OCR_PhysAttackwFirearm"] +
                        combined[schoolId]["OCR_Rape"] +
                        combined[schoolId]["OCR_SexAssault"] +
                        combined[schoolId]["OCR_RobNoWeapon"] +
                        combined[schoolId]["OCR_RobwWeapon"] +
                        combined[schoolId]["OCR_RobwFirearm"],
                    // academicPerformance - E/M/P
                    positiveReadingScoreAvg: combined[schoolId]["E_PctME"],
                    positiveMathScoreAvg: combined[schoolId]["M_PctME"],
                    positiveScienceScoreAvg: combined[schoolId]["SC_PctME"],
                }
                // districtSearch = {};
                // districtId = "";
                break;
            case 'H':
                type = "High School";

                // districtSearch = Object.values(combined).find((district) => district["SchoolNm"] === combined[schoolId]["DistrictNm"]);
                // if (districtSearch !== undefined) {
                //     districtId = districtSearch["SCHOOLID"]
                //     // if (districtId.toString().length === 6) {
                //     //     districtId = "0" + districtId.toString()
                //     // }
                // }

                homeSchoolInfo[schoolId] = {
                    schoolName: combined[schoolId]["SchoolNm"],
                    schoolCode: combined[schoolId]["SCHOOLTYPECD"],
                    schoolType: type,
                    schoolId: schoolId,
                    gradRate: combined[schoolId][`GRADRATE${year}`],
                    avgTeacherSalary: combined[schoolId]["TCHSALARY_AvgCurrYr"],
                    teacherReturnRate: combined[schoolId]["TCHRETURN3yrAvg_PctCurrYr"],
                    ACTCompositeAVG: combined[schoolId]["ACT_Avg_CompositeScore"],
                }

                h[schoolId] = {
                    schoolType: type,
                    schoolName: combined[schoolId]["SchoolNm"],
                    districtName: combined[schoolId]["DistrictNm"],
                    districtId: districtSearch(combined, schoolId),
                    schoolId: schoolId,
                    city: combined[schoolId]["city"],
                    street: combined[schoolId]["street"],
                    totalStudents: combined[schoolId]["Enrollment"],
                    teacherCount: combined[schoolId]["TeacherCount"],

                    // demographics
                    studentsInPoverty: combined[schoolId]["StudentsinPoverty_PctCurrYr"],
                    studentsWithDisabilities: combined[schoolId]["NTotal_DI"] / combined[schoolId]["NTotal_ALL"],
                    ELLStudents: combined[schoolId]["NTotal_EL"] / combined[schoolId]["NTotal_ALL"],
                    studentsWhite: combined[schoolId]["NTotal_CA"] / combined[schoolId]["NTotal_ALL"],
                    studentsBlack: combined[schoolId]["NTotal_AA"] / combined[schoolId]["NTotal_ALL"],
                    studentsOther: (!Number.isNaN(combined[schoolId]["NTotal_AP"]) ?? 0) + (!Number.isNaN(combined[schoolId]["NTotal_AI"]) ?? 0) + (!Number.isNaN(combined[schoolId]["NTotal_HI"]) ?? 0) / Number(combined[schoolId]["NTotal_ALL"]),


                    ///cards
                    bullyAndHarass: combined[schoolId]["OCR_BullyHarass"],
                    avgTeacherSalary: combined[schoolId]["TCHSALARY_AvgCurrYr"],
                    parentFeelsSafe: combined[schoolId]["PAR_ChildFeelsSafe"],
                    teacherFeelsSafe: combined[schoolId]["TCH_IFeelSafe"],
                    violentAssaults:
                        combined[schoolId]["OCR_PhysAttachwWeapon"] +
                        combined[schoolId]["OCR_PhysAttachNoWeapon"] +
                        combined[schoolId]["OCR_PhysAttackwFirearm"] +
                        combined[schoolId]["OCR_Rape"] +
                        combined[schoolId]["OCR_SexAssault"] +
                        combined[schoolId]["OCR_RobNoWeapon"] +
                        combined[schoolId]["OCR_RobwWeapon"] +
                        combined[schoolId]["OCR_RobwFirearm"],
                    // academicPerformance - H
                    ACTCompositeAVG: combined[schoolId]["ACT_Avg_CompositeScore"],
                    gradRate: combined[schoolId][`GRADRATE${year}`],
                    dropoutRate: combined[schoolId]["DropoutRateCurrYr"],
                    positiveReadingScoreAvg: combined[schoolId]["E_PctABC"],
                    positiveMathScoreAvg: combined[schoolId]["M_PctABC"],
                    collegeReady: combined[schoolId]["PctCollege"],
                    careerReady: combined[schoolId]["PctCareer"],
                }
                // districtSearch = {};
                // districtId = "";
                break;
            case 'D':
                type = "District";
                districtSchoolList = [];
                Object.keys(combined).forEach((school) => {
                    const query = combined[school]["DistrictNm"]
                    if (query === combined[schoolId]["DistrictNm"])
                        districtSchoolList.push([{
                            "schoolName": combined[school]["SchoolNm"],
                            "id": school,
                            "type": combined[school]["SCHOOLTYPECD"]
                        }])
                })

                homeDistrictInfo[schoolId] = {
                    schoolName: combined[schoolId]["SchoolNm"],
                    schoolType: type,
                    schoolId: schoolId,
                    gradRate: combined[schoolId][`GRADRATE${year}`],
                    avgTeacherSalary: combined[schoolId]["TCHSALARY_AvgCurrYr"],
                    teacherReturnRate: combined[schoolId]["TCHRETURN3yrAvg_PctCurrYr"],
                    ACTCompositeAVG: combined[schoolId]["ACT_Avg_CompositeScore"],
                }
                districts[schoolId] = {
                    schoolType: type,
                    schoolPhone: combined[schoolId]["hdphone"],
                    schoolName: combined[schoolId]["SchoolNm"],
                    city: combined[schoolId]["city"],
                    state: combined[schoolId]["state"],
                    street: combined[schoolId]["street"],
                    zip: combined[schoolId]["zip"],
                    url: combined[schoolId]["URL"],
                    totalStudents: combined[schoolId]["Enrollment"],
                    teacherCount: combined[schoolId]["TeacherCount"],
                    districtSchoolList: districtSchoolList,
                    // academicPerformance
                    ACTCompositeAVG: combined[schoolId]["ACT_Avg_CompositeScore"],
                    positiveReadingScoreAvg_H: combined[schoolId]["E_PctABC"],
                    positiveMathScoreAvg_H: combined[schoolId]["M_PctABC"],
                    positiveScienceScoreAvg_H: combined[schoolId]["SC_PctABC"],
                    positiveReadingScoreAvg_E: combined[schoolId]["E_PctME"],
                    positiveMathScoreAvg_E: combined[schoolId]["M_PctME"],
                    positiveScienceScoreAvg_E: combined[schoolId]["SC_PctME"],
                    dropoutRate: combined[schoolId]["DropoutRateCurrYr"],
                    collegeReady: combined[schoolId]["PctCollege"],
                    careerReady: combined[schoolId]["PctCareer"],
                    gradRate: combined[schoolId][`GRADRATE${year}`],
                    // demographics
                    studentsInPoverty: combined[schoolId]["StudentsinPoverty_PctCurrYr"],
                    studentsWithDisabilities:   combined[schoolId]["NTotal_ALL"] / combined[schoolId]["NTotal_DI"],
                    ELLStudents: combined[schoolId]["NTotal_EL"] / combined[schoolId]["NTotal_ALL"],
                    studentsWhite: combined[schoolId]["NTotal_CA"] / combined[schoolId]["NTotal_ALL"],
                    studentsBlack: combined[schoolId]["NTotal_AA"] / combined[schoolId]["NTotal_ALL"],
                    studentsOther: (!Number.isNaN(combined[schoolId]["NTotal_AP"]) ?? 0) + (!Number.isNaN(combined[schoolId]["NTotal_AI"]) ?? 0) + (!Number.isNaN(combined[schoolId]["NTotal_HI"]) ?? 0) / Number(combined[schoolId]["NTotal_ALL"]),
                    avgTeacherSalary: combined[schoolId]["TCHSALARY_AvgCurrYr"],
                    teacherReturnRate: combined[schoolId]["TCHRETURN3yrAvg_PctCurrYr"],
                    teacherFeelsSafe: combined[schoolId]["TCH_IFeelSafe"],
                    parentFeelsSafe: combined[schoolId]["PAR_ChildFeelsSafe"],
                    bullyAndHarass: combined[schoolId]["OCR_BullyHarass"],
                    violentAssaults:
                        combined[schoolId]["OCR_PhysAttachwWeapon"] +
                        combined[schoolId]["OCR_PhysAttachNoWeapon"] +
                        combined[schoolId]["OCR_PhysAttackwFirearm"] +
                        combined[schoolId]["OCR_Rape"] +
                        combined[schoolId]["OCR_SexAssault"] +
                        combined[schoolId]["OCR_RobNoWeapon"] +
                        combined[schoolId]["OCR_RobwWeapon"] +
                        combined[schoolId]["OCR_RobwFirearm"],
                }
                districtSchoolList = [];
                break;
            default:
                type = "N/A";
        }
    })

    setSchoolData({homeSchoolInfo, homeDistrictInfo, h, e, m, p, districts, state})
}

const districtSearch = (combined, schoolId) => {
    let districtId =  Object.values(combined).find((district) => (district["DistrictNm"] === combined[schoolId]["DistrictNm"] && district["SCHOOLTYPECD"] === "D"))["SCHOOLID"];
        if (districtId.toString().length === 6) {return "0" + districtId.toString() } else { return districtId}
}