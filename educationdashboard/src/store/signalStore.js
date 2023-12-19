import {computed, effect, signal} from "@preact/signals-react";
import stateData from "../dataImport/stateData.json"
import allSchoolsData from "../dataImport/allSchoolsData.json"


export const allSchools = signal(allSchoolsData)
export const state = signal(stateData)
export const selectedSchoolId = signal(undefined);
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
    return allSchools.value[schoolId.value]
    }
)
export const selectedDistrict = computed(() => {
        return allSchools.value[schoolId.value]
        })
export const topSearchResults = signal([])
export const fullSearchList = computed(() => {
    let list = [];
    Object.values(allSchools.value).map((school) => {

        list.push(school)
    })
    return list
})
export const topSearchResultsObj = computed(() => {
    let obj = {};
     Object.entries(topSearchResults.value).map((result) => {
         if (result[1].schoolCode === "D")
         obj[result[1].schoolId] = result[1]
     })
        return obj
})


/*Map Data */
export const heatMapKey = signal(0)
export const districtsMapKey = computed(() => {return topSearchResults.value.length + heatMapKey.value})
export const mapDataType = signal("gradRate");

export const mapScore = signal(0)
export const layerColor = computed(() => {
    if (mapDataType.value === "gradRate") {
        if (mapScore.value <= 60 || mapScore.value == "*") return gradRateColorScale.value[1]
        if (mapScore.value > 60 && mapScore.value <= 70) return gradRateColorScale.value[2]
        if (mapScore.value > 70 && mapScore.value <= 80) return gradRateColorScale.value[3]
        if (mapScore.value > 80 && mapScore.value <= 90) return gradRateColorScale.value[4]
        if (mapScore.value > 90 && mapScore.value <= 100) return gradRateColorScale.value[5]
    }
    if (mapDataType.value === "ACTCompositeAVG") {
        if (mapScore.value <= 13 || mapScore.value == "*") return ACTCompositeAVGColorScale.value[1]
        if (mapScore.value > 13 && mapScore.value <= 16) return ACTCompositeAVGColorScale.value[2]
        if (mapScore.value > 16 && mapScore.value <= 19) return ACTCompositeAVGColorScale.value[3]
        if (mapScore.value > 19 && mapScore.value <= 22) return ACTCompositeAVGColorScale.value[4]
        if (mapScore.value > 22 && mapScore.value <= 32) return ACTCompositeAVGColorScale.value[5]
    }
    if (mapDataType.value === "teacherReturnRate") {
        if (Number(mapScore.value) <= 60 || mapScore.value == "*") return teacherReturnRateColorScale.value[1]
        if (Number(mapScore.value) > 60 && mapScore.value <= 70) return teacherReturnRateColorScale.value[2]
        if (Number(mapScore.value) > 70 && mapScore.value <= 80) return teacherReturnRateColorScale.value[3]
        if (Number(mapScore.value) > 80 && mapScore.value <= 90) return teacherReturnRateColorScale.value[4]
        if (Number(mapScore.value) > 90 && mapScore.value <= 100) return teacherReturnRateColorScale.value[5]
    }
    if (mapDataType.value === "avgTeacherSalaryLastYr") {
        let salary = mapScore.value
        if (salary <= 48000 || mapScore.value == "*") return avgTeacherSalaryColorScale.value[1]
        if (salary > 48000 && salary <= 51000) return avgTeacherSalaryColorScale.value[2]
        if (salary > 51000 && salary <= 54000) return avgTeacherSalaryColorScale.value[3]
        if (salary > 54000 && salary <= 57000) return avgTeacherSalaryColorScale.value[4]
        if (salary > 57000 && salary <= 60000) return avgTeacherSalaryColorScale.value[5]
        if (salary > 60000 && salary <= 66000) return avgTeacherSalaryColorScale.value[6]
    }
})

export const gradRateColorScale = signal({
    5:"#1c51cb",
    4: "#477CEE",
    3:"#85A6EC",
    2: "#6490e8",
    1: "#c1d3f7"
})

export const ACTCompositeAVGColorScale = signal({
    5:"#0c9349",
    4: "#44a620",
    3:"#5fc73f",
    2: "#90e077",
    1: "#b6e7a7"
})

export const teacherReturnRateColorScale = signal({
    5: "#f1d9a7",
    4: "#f3a738",
    3:"#eea243",
    2: "#f3d34a",
    1: "#f3e37c",

})

export const avgTeacherSalaryColorScale = signal({
    6: "#E71713FF",
    5: "#e93e3a",
    4: "#ed683c",
    3:"#f3903f",
    2: "#fdc70c",
    1: "#fff33b"
})

