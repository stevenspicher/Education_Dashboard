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
console.log(combined)
    // names of data files
    let state = {},
        allSchools = {},


        //  helpers
        districtSchoolList = [],
        type;
    //Map through full list to create smaller data files
    Object.keys(combined).map((schoolId) => {
        districtSchoolList = [];
        Object.keys(combined).forEach((school) => {
            const query = combined[school]["DistrictNm"]
            if (query === combined[schoolId]["DistrictNm"])
                districtSchoolList.push([{
                    "schoolName": combined[school]["SchoolNm"],
                    "id": school,
                    "code": combined[school]["SCHOOLTYPECD"]
                }])
        })

       const getNumberFromSalaryString = (salary) => {
           let dollarRemoved = salary.replace("$", '');
           let commaRemoved = dollarRemoved.replace(",","");
           return Number(commaRemoved)
       }

        // find year for gradrate
        let year = combined[schoolId]["ReportCardYear"].toString().slice(2)
        switch (combined[schoolId]["SCHOOLTYPECD"]) {
            case 'E':
                type = "Elementary School";
                break;
            case 'M':
                type = "Middle School";
                break;
            case 'P':
                type = "Primary School";
                break;
            case 'H':
                type = "High School";
                break;
            case 'D':
                type = "District";
                break;
        }

        allSchools[schoolId] = {
            schoolName: combined[schoolId]["SchoolNm"],
            schoolPhone: combined[schoolId]["hdphone"],
            schoolType: type,
            schoolCode: combined[schoolId]["SCHOOLTYPECD"],
            schoolId: schoolId,
            gradRate: combined[schoolId][`GRADRATE${year}`] ?? "*",
            avgTeacherSalaryCurrYr: combined[schoolId]["TCHSALARY_AvgCurrYr"] !== "N/AV" ? getNumberFromSalaryString(combined[schoolId]["TCHSALARY_AvgCurrYr"]) : "*",
            avgTeacherSalaryLastYr: combined[schoolId]["TCHSALARY_AvgLastYr"] !== "N/AV" ? getNumberFromSalaryString(combined[schoolId]["TCHSALARY_AvgLastYr"]) : "*",
            teacherReturnRate: combined[schoolId]["TCHRETURN3yrAvg_PctCurrYr"],
            dropoutRate: combined[schoolId]["DropoutRateCurrYr"],
            collegeReady: combined[schoolId]["PctCollege"],
            careerReady: combined[schoolId]["PctCareer"],
            ACTCompositeAVG: (type === "District" || type === "High School") ? combined[schoolId]["ACT_Avg_CompositeScore"] : "*",
            districtName: combined[schoolId]["DistrictNm"],
            districtId: type === "District" ? "*" : districtSearch(combined, schoolId),
            city: combined[schoolId]["city"],
            street: combined[schoolId]["street"],
            zip: combined[schoolId]["zip"],
            url: type !== "District" ? "*" :combined[schoolId]["URL"],
            totalStudents: combined[schoolId]["Enrollment"],
            teacherCount: combined[schoolId]["TeacherCount"],

            // demographics
            studentsInPovertyPct: combined[schoolId]["StudentsinPoverty_PctCurrYr"],
            studentsWithDisabilities:  combined[schoolId]["TotalN_Disabled"] !== "*" ? combined[schoolId]["TotalN_Disabled"] : 0,
            ELLStudents: combined[schoolId]["TotalN_English\r\nLearner"] !== "*" ? combined[schoolId]["TotalN_English\r\nLearner"] : 0,
            studentsWhite: combined[schoolId]["TotalN_Caucasian"] !== "*" ? combined[schoolId]["TotalN_Caucasian"] : 0,
            studentsBlack: combined[schoolId]["TotalN_African\r\nAmerican"] !== "*" ? combined[schoolId]["TotalN_African\r\nAmerican"] : 0,
            studentsAsianPacific: combined[schoolId]["TotalN_Asian\r\nPacific\r\nIslander"] !== "*" ? combined[schoolId]["TotalN_Asian\r\nPacific\r\nIslander"] : 0,
            studentsHispanic: combined[schoolId]["TotalN_Hispanic"] !== "*" ? combined[schoolId]["TotalN_Hispanic"] : 0,
            studentsAmericanIndian: combined[schoolId]["TotalN_American\r\nIndian"] !== "*" ? combined[schoolId]["TotalN_American\r\nIndian"] : 0,
            ///cards
            bullyAndHarass: combined[schoolId]["OCR_BullyHarass"],
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
            // academicPerformance
            positiveReadingScoreAvg: (type === "District" || type === "High School") ? combined[schoolId]["E_PctABC"] : combined[schoolId]["E_PctME"],
            positiveMathScoreAvg: (type === "District" || type === "High School") ? combined[schoolId]["M_PctABC"] : combined[schoolId]["M_PctME"],
            positiveScienceScoreAvg: (type === "District" || type === "High School") ? combined[schoolId]["SC_PctABC"] : combined[schoolId]["SC_PctME"],
            districtSchoolList: type === "District" ? districtSchoolList : [],
        }

        districtSchoolList = [];
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
            totalStudents: combined[9999999]["Enrollment"],
            teacherCount: combined[9999999]["TeacherCount"],
            studentsInPovertyPct: combined[9999999]["StudentsinPoverty_PctCurrYr"],
            studentsWithDisabilities:  combined[9999999]["TotalN_Disabled"] !== "*" ? combined[9999999]["TotalN_Disabled"] : 0,
            ELLStudents: combined[9999999]["TotalN_English\r\nLearner"] !== "*" ? combined[9999999]["TotalN_English\r\nLearner"] : 0,
            studentsWhite: combined[9999999]["TotalN_Caucasian"] !== "*" ? combined[9999999]["TotalN_Caucasian"] : 0,
            studentsBlack: combined[9999999]["TotalN_African\r\nAmerican"] !== "*" ? combined[9999999]["TotalN_African\r\nAmerican"] : 0,
            studentsAsianPacific: combined[9999999]["TotalN_Asian\r\nPacific\r\nIslander"] !== "*" ? combined[9999999]["TotalN_Asian\r\nPacific\r\nIslander"] : 0,
            studentsHispanic: combined[9999999]["TotalN_Hispanic"] !== "*" ? combined[9999999]["TotalN_Hispanic"] : 0,
            studentsAmericanIndian: combined[9999999]["TotalN_American\r\nIndian"] !== "*" ? combined[9999999]["TotalN_American\r\nIndian"] : 0,
        }
    })
console.log(allSchools)
console.log(state)
    setSchoolData({allSchools, state})
}

const districtSearch = (combined, schoolId) => {
    let districtId =  Object.values(combined).find((district) => (district["DistrictNm"] === combined[schoolId]["DistrictNm"] && district["SCHOOLTYPECD"] === "D"))["SCHOOLID"];
        if (districtId.toString().length === 6) {return "0" + districtId.toString() } else { return districtId}
}