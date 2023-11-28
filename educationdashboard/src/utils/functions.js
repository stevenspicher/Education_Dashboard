import {selectedSchoolId, selectedSchoolCode} from "../store/signalStore.js";

//// gets ID and code from URL parameters,
//// saves to signal store
export const getIdAndCode = (idAndCode) => {
    const id = idAndCode.toString().split("+")[0]
    const code = idAndCode.toString().split("+")[1]
    if (id !== undefined) {
        selectedSchoolId.value = id
    }
    if (code !== undefined) {
        selectedSchoolCode.value = code
    }
    return true
}

export const getSchoolType = (code) => {
    switch (code) {
        case "E" :
            return "Elementary School";
        case "M":
            return "Middle School";
        case "P":
            return "Primary School";
        case "H":
            return "High School";
        default: return "Other";
    }
}
//// Creates url parameters for school or district,
//// Navigates to appropriate page
export const navigateToPage = (school, navigate) => {
    if (school.schoolCode !== "D") {
        navigate(`/school/${school.schoolId}+${school.schoolCode}`);
    } else {
        navigate(`/district/${school.schoolId}`)
    }
    selectedSchoolCode.value = school.schoolCode;
    selectedSchoolId.value = school.schoolId;
};

