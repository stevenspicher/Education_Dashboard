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
// text currently typed into the home page search box ("" = no search active)
export const searchQuery = signal("")
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
export const mapDataType = signal("gradRate");
// changes whenever the map needs to redraw its district layer (metric or search results changed)
export const districtsMapKey = computed(() => {
    return `${mapDataType.value}-${searchQuery.value}-${topSearchResults.value.length}`
})
