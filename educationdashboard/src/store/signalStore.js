import {computed, effect, signal} from "@preact/signals-react";
import homePageSchoolsData from "../dataImport/homeSchoolData.json"
import middleData from "../dataImport/m.json"
import elementaryData from "../dataImport/e.json"
import primaryData from "../dataImport/p.json"
import highSchoolData from "../dataImport/h.json"
import districtsData from "../dataImport/districtsData.json"
import stateData from "../dataImport/stateData.json"


export const districts = signal(districtsData);
export const schools = signal(homePageSchoolsData);

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
        if (elementaryData[schoolId.value] !== undefined) {
            return elementaryData[schoolId.value]
        } else if (middleData[schoolId.value] !== undefined) {
            return middleData[schoolId.value]
        } else if (highSchoolData[schoolId.value] !== undefined) {
            return highSchoolData[schoolId.value]
        } else if (primaryData[schoolId.value] !== undefined) {
            return primaryData[schoolId.value]

        } else return undefined
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
    Object.values(schools.value).map((school) => {

        list.push({name: school.schoolName, id: school.schoolId, code: school.schoolCode})
    })
    Object.entries(districts.value).map((district) => {
        list.push({name: district[1].schoolName, id: district[0], code: "D"})
    })
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



/*Score Card Data*/
export const positiveMathScoreAvg_E_State = signal(stateData.positiveMathScoreAvg_E)
export const positiveReadingScoreAvg_E_State = signal(stateData.positiveReadingScoreAvg_E)
export const positiveScienceScoreAvg_E_State = signal(stateData.positiveScienceScoreAvg_E)
export const positiveMathScoreAvg_H_State = signal(stateData.positiveMathScoreAvg_H)
export const positiveReadingScoreAvg_H_State = signal(stateData.positiveReadingScoreAvg_H)
export const positiveScienceScoreAvg_H_State = signal(stateData.positiveScienceScoreAvg_H)