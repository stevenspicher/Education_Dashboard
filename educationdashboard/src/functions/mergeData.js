import {createFullDataObject} from "./functions";


export function mergeData (reportCardData, additionalInfoData, setSchoolData) {
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
    const cleanedSchoolData = {};
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
                let districtSchoolList = [];
                let academicPerformanceDistrict = {}
                let academicPerformance = {}
                let demographics = {};
                let demographicsDistrict = {};

        let district;
        let districtId;
    Object.keys(combined).map((schoolId) => {
        let type;

        district = Object.values(combined).find((district) => district["SchoolNm"] === combined[schoolId]["DistrictNm"]);
        if (district !== undefined) {
            districtId = district["SCHOOLID"]
            if (districtId.toString().length === 6) {
                districtId = "0" + districtId.toString()
            }
            academicPerformanceDistrict = {
                positiveReadingScoreAvgDistrict: combined[districtId]["E_PctABC"],
                positiveMathScoreAvgDistrict: combined[districtId]["M_PctABC"],
                positiveScienceScoreAvgDistrict: combined[districtId]["SC_PctABC"],
            };
            demographicsDistrict = {
            studentsInPovertyDistrict: Number(combined[districtId]["NTotal_ED"])/Number(combined[districtId]["NTotal_ALL"]),
            studentsWithDisabilitiesDistrict: combined[districtId]["NTotal_DI"]/combined[districtId]["NTotal_ALL"],
            ELLStudentsDistrict: combined[districtId]["NTotal_EL"]/combined[districtId]["NTotal_ALL"],
            studentsWhiteDistrict: combined[districtId]["NTotal_CA"]/combined[districtId]["NTotal_ALL"],
            studentsBlackDistrict: combined[districtId]["NTotal_AA"]/combined[districtId]["NTotal_ALL"],
            studentsOtherDistrict: (combined[districtId]["NTotal_AP"] ?? 0 + combined[districtId]["NTotal_AI"] ?? 0 + combined[districtId]["NTotal_HI"] ?? 0)/combined[districtId]["NTotal_ALL"],
            }
        }
    let year = combined[schoolId]["ReportCardYear"].toString().slice(2)
        academicPerformance = {
            positiveReadingScoreAvg: combined[schoolId]["E_PctME"],
            positiveMathScoreAvg: combined[schoolId]["M_PctME"],
            positiveScienceScoreAvg: combined[schoolId]["SC_PctME"],
            positiveReadingScoreAvgState: combined[9999999]["E_PctME"],
            positiveMathScoreAvgState: combined[9999999]["M_PctME"],
            positiveScienceScoreAvgState: combined[9999999]["SC_PctME"],
        };


        demographics = {
            studentsInPoverty: Number(combined[schoolId]["NTotal_ED"])/Number(combined[schoolId]["NTotal_ALL"]),
            studentsWithDisabilities: combined[schoolId]["NTotal_DI"]/combined[schoolId]["NTotal_ALL"],
            ELLStudents: combined[schoolId]["NTotal_EL"]/combined[schoolId]["NTotal_ALL"],
            studentsWhite: combined[schoolId]["NTotal_CA"]/combined[schoolId]["NTotal_ALL"],
            studentsBlack: combined[schoolId]["NTotal_AA"]/combined[schoolId]["NTotal_ALL"],
            studentsOther: (combined[schoolId]["NTotal_AP"] ?? 0 + combined[schoolId]["NTotal_AI"] ?? 0 + combined[schoolId]["NTotal_HI"] ?? 0)/combined[schoolId]["NTotal_ALL"],
            studentsInPovertyState: Number(combined[9999999]["NTotal_ED"])/Number(combined[9999999]["NTotal_ALL"]),
            studentsWithDisabilitiesState: combined[9999999]["NTotal_DI"]/combined[9999999]["NTotal_ALL"],
            ELLStudentsState: combined[9999999]["NTotal_EL"]/combined[9999999]["NTotal_ALL"],
            studentsWhiteState: combined[9999999]["NTotal_CA"]/combined[9999999]["NTotal_ALL"],
            studentsBlackState: combined[9999999]["NTotal_AA"]/combined[9999999]["NTotal_ALL"],
            studentsOtherState: (combined[9999999]["NTotal_AP"] ?? 0 + combined[9999999]["NTotal_AI"] ?? 0 + combined[9999999]["NTotal_HI"] ?? 0)/combined[9999999]["NTotal_ALL"],
        };
        switch (combined[schoolId]["SCHOOLTYPECD"]) {
            case 'M':
                type = "Middle School";

                academicPerformance = {
                   ...academicPerformance,
                    ...academicPerformanceDistrict

                };
                demographics = {
                    ...demographics,
                    ...demographicsDistrict
                }

                break;
            case 'E':
                type = "Elementary School";
                    academicPerformance = {
                        ...academicPerformance,
                        ...academicPerformanceDistrict
                    };
                    demographics = {
                        ...demographics,
                        ...demographicsDistrict
                    }
                break;
            case 'H':
                type = "High School";

                academicPerformance = {
                    ...academicPerformance,
                    positiveReadingScoreAvg: combined[schoolId]["E_PctABC"],
                    positiveMathScoreAvg: combined[schoolId]["M_PctABC"],
                    positiveScienceScoreAvg: combined[schoolId]["SC_PctABC"],

                    dropoutRate: combined[schoolId]["DropoutRateCurrYr"],
                    collegeReady: combined[schoolId]["PctCollege"],
                    careerReady: combined[schoolId]["PctCareer"],
                    ...academicPerformanceDistrict,


                    dropoutRateState: combined[9999999]["DropoutRateCurrYr"],
                    collegeReadyState: combined[9999999]["PctCollege"],
                    careerReadyState: combined[9999999]["PctCareer"],
                };

                demographics = {
                    ...demographics,
                    ...demographicsDistrict
                }

                break;
            case 'D':
                type = "District";
                districtSchoolList = [];
                Object.keys(combined).forEach((school) => {
                const query = combined[school]["DistrictNm"]
                    if (query === combined[schoolId]["DistrictNm"])
                    districtSchoolList.push([{"schoolName": combined[school]["SchoolNm"], "id": school, "type": combined[school]["SCHOOLTYPECD"]}])
                })
                academicPerformance = {
                    ...academicPerformance,
                    positiveReadingScoreAvg: combined[schoolId]["E_PctABC"],
                    positiveMathScoreAvg: combined[schoolId]["M_PctABC"],
                    positiveScienceScoreAvg: combined[schoolId]["SC_PctABC"],
                    gradRate: combined[schoolId][`GRADRATE${year}`],
                    gradRateState: combined[9999999][`GRADRATE${year}`],
                    ACTCompositeState: combined[9999999]["ACT_Avg_CompositeScore"],
                    positiveReadingScoreAvgState: combined[9999999]["E_PctABC"],
                    positiveMathScoreAvgState: combined[9999999]["M_PctABC"],
                    positiveScienceScoreAvgState: combined[9999999]["SC_PctABC"],
                };
                break;
            case 'P':
                type = "Primary School";
                academicPerformance = {
                  ...academicPerformance,
                    ...academicPerformanceDistrict
                };
                demographics = {
                    ...demographics,
                    ...demographicsDistrict
                }
                break;
            default:
                type = "N/A";
        }

        cleanedSchoolData[schoolId] = {
            schoolType: type,
            schoolPhone: combined[schoolId]["SchoolNm"], //FIX
            schoolName: combined[schoolId]["SchoolNm"],
            districtName: combined[schoolId]["DistrictNm"],
            academicPerformance: academicPerformance,
            demographics: demographics,
            districtSchoolList: combined[schoolId]["SCHOOLTYPECD"] === "D" ?  districtSchoolList : [],
            avgTeacherSalary: combined[schoolId]["TCHSALARY_AvgCurrYr"],
            teacherReturnRate: combined[schoolId]["TCHRETURN3yrAvg_PctCurrYr"],
            city: combined[schoolId]["city"],
            state: combined[schoolId]["state"],
            street: combined[schoolId]["street"],
            zip: combined[schoolId]["zip"],
            url: combined[schoolId]["URL"],
            totalStudents: combined[schoolId]["Enrollment"],
            teacherCount: combined[schoolId]["TeacherCount"],
            teacherFeelsSafe: combined[schoolId]["TCH_IFeelSafe"],
            parentFeelsSafe: combined[schoolId]["PAR_ChildFeelsSafe"],
            bullyAndHarass: combined[schoolId]["OCR_BullyHarass"],
            studentsInPovertyCurrentYear: combined[schoolId]["StudentsinPoverty_PCTCurrYr"],
        }
    })
    console.log(cleanedSchoolData)

    setSchoolData(cleanedSchoolData)
}

