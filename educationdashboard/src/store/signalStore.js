import {computed, effect, signal} from "@preact/signals-react";
import homePageSchoolsData from "../dataImport/homeSchoolData.json"
import middleData from "../dataImport/m.json"
import elementaryData from "../dataImport/e.json"
import primaryData from "../dataImport/p.json"
import highSchoolData from "../dataImport/h.json"
import districtsData from "../dataImport/districtsData.json"
import stateData from "../dataImport/stateData.json"
import allSchoolsData from "../dataImport/allSchoolsData.json"
import school from "../pages/School/School.jsx";

export const schools = signal(homePageSchoolsData);
export const districts = signal(districtsData);

export const allSchools = signal(allSchoolsData)
// export const districtsFromAllSchools = computed(Object.entries(allSchoolsData).filter((school => school[1].schoolCode === "D")));
// export const schoolsFromAllSchools = computed(Object.entries(allSchoolsData).filter(school => school.code !== "D"));

export const state = signal(stateData)
export const selectedSchoolId = signal(undefined);
export const selectedDistrictId = signal(undefined);
export const selectedSchoolCode = signal(undefined);
export const schoolCode = signal(undefined)
export const schoolId = signal(undefined)
export const districtId = signal(undefined)
effect(() => {
    if (selectedSchoolId.value !== undefined) {
        localStorage.setItem("id", JSON.stringify(selectedSchoolId.value));
        schoolId.value = selectedSchoolId.value
    } else if (
        localStorage.getItem("id") !== undefined
    ) {
        schoolId.value = JSON.parse(localStorage.getItem("id"))
    } else schoolId.value = undefined
})
effect(() => {
    if (selectedSchoolCode.value !== undefined) {
        localStorage.setItem("code", JSON.stringify(selectedSchoolCode.value))
        schoolCode.value = selectedSchoolCode.value
    } else if (
        localStorage.getItem("code") !== undefined
    ) {
        schoolCode.value = localStorage.getItem("code")
    } else schoolCode.value = undefined
})

export const selectedSchool = computed(() => {
        // if (elementaryData[schoolId.value] !== undefined) {
        //     return elementaryData[schoolId.value]
        // } else if (middleData[schoolId.value] !== undefined) {
        //     return middleData[schoolId.value]
        // } else if (highSchoolData[schoolId.value] !== undefined) {
        //     return highSchoolData[schoolId.value]
        // } else if (primaryData[schoolId.value] !== undefined) {
        //     return primaryData[schoolId.value]
        //
        // } else return undefined
    return allSchools.value[schoolId.value]
    }
)
export const selectedDistrict = computed(() => {
        // if (districts.value[Number(schoolId.value] !== undefined)
        return districts.value[schoolId.value]
        })

export const schoolTableSearchResults = signal([])
export const districtMapSearchResults = signal([])
export const topSearchResults = signal([])
export const fullSearchList = computed(() => {
    let list = [];
    Object.values(allSchools.value).map((school) => {

        list.push({name: school.schoolName, id: school.schoolId, code: school.schoolCode})
    })
    // Object.entries(districts.value).map((district) => {
    //     list.push({name: district[1].schoolName, id: district[0], code: "D"})
    // })
    return list
})

export const topSearchResultsDistrictOnly = computed(
    () => {
        let results = [];
        topSearchResults.value.forEach((result) => {
            if (result.code !== undefined)
                if (result.code === "D") {
                    results.push(result)
                }
        })
        return results
    }
)
export const topSearchResultsSchoolOnly = computed(
    () => {
        let results = [];
        topSearchResults.value.forEach((result) => {
            if (result.code !== undefined)
                if (result.code !== "D") {
                    results.push(result)
                }
        })
        return results
    }
)



/*Map Data */
export const districtsMapKey = signal(topSearchResultsDistrictOnly.value.length)
export const mapDataType = signal("gradRate");

export const mapScore = signal(0)
export const layerColor = computed(() => {
    if (mapDataType.value === "gradRate") {
        if (mapScore.value <= 60) return gradRateColorScale.value[1]
        if (mapScore.value > 60 && mapScore.value <= 70) return gradRateColorScale.value[2]
        if (mapScore.value > 70 && mapScore.value <= 80) return gradRateColorScale.value[3]
        if (mapScore.value > 80 && mapScore.value <= 90) return gradRateColorScale.value[4]
        if (mapScore.value > 90 && mapScore.value <= 100) return gradRateColorScale.value[5]
    }
    if (mapDataType.value === "ACTCompositeAVG") {
        if (mapScore.value <= 13) return ACTCompositeAVGColorScale.value[1]
        if (mapScore.value > 13 && mapScore.value <= 16) return ACTCompositeAVGColorScale.value[2]
        if (mapScore.value > 16 && mapScore.value <= 19) return ACTCompositeAVGColorScale.value[3]
        if (mapScore.value > 19 && mapScore.value <= 22) return ACTCompositeAVGColorScale.value[4]
        if (mapScore.value > 22 && mapScore.value <= 32) return ACTCompositeAVGColorScale.value[5]
    }
    if (mapDataType.value === "teacherReturnRate") {
        if (Number(mapScore.value) <= 60) return teacherReturnRateColorScale.value[1]
        if (Number(mapScore.value) > 60 && mapScore.value <= 70) return teacherReturnRateColorScale.value[2]
        if (Number(mapScore.value) > 70 && mapScore.value <= 80) return teacherReturnRateColorScale.value[3]
        if (Number(mapScore.value) > 80 && mapScore.value <= 90) return teacherReturnRateColorScale.value[4]
        if (Number(mapScore.value) > 90 && mapScore.value <= 100) return teacherReturnRateColorScale.value[5]
    }
    if (mapDataType.value === "avgTeacherSalaryLastYr") {
        let salary = mapScore.value
        if (salary <= 48000) return avgTeacherSalaryColorScale.value[1]
        if (salary > 48000 && salary <= 51000) return avgTeacherSalaryColorScale.value[2]
        if (salary > 51000 && salary <= 54000) return avgTeacherSalaryColorScale.value[3]
        if (salary > 54000 && salary <= 57000) return avgTeacherSalaryColorScale.value[4]
        if (salary > 57000 && salary <= 60000) return avgTeacherSalaryColorScale.value[5]
    }
})

export const gradRateColorScale = signal({
    1:"#1359F0",
    2: "#477CEE",
    3:"#85A6EC",
    4: "#6490e8",
    5: "#c1d3f7"
})

export const ACTCompositeAVGColorScale = signal({
    1:"#25660f",
    2: "#317819",
    3:"#4B8B36",
    4: "#51BD2E",
    5: "#8cf569"
})

export const teacherReturnRateColorScale = signal({
    1: "#5b6310",
    2: "#87912c",
    3:"#9ca647",
    4: "#bec769",
    5: "#e5ed98",

})

export const avgTeacherSalaryColorScale = signal({
    1: "#7C197E",
    2: "#942196",
    3:"#C920CC",
    4: "#F37BF6",
    5: "#f1b3f2"
})