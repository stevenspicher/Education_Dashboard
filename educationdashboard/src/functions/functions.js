
///Returns report object with all available data
// format: {category: data}
export function createFullDataObject(data) {
    if (data !== undefined) {
        let reportCategories = [];
        let report = [];
        data[0].forEach((category) => {
            reportCategories.push(category)
        })
        data.forEach((row, index) => {
            if (index > 0) {
                reportCategories.map((category, index) => {
                    report[row[3]] = {
                        ...report[row[3]],
                        [category]: row[index]
                    }
                })
            }
        })
        return report
    }
}

/// returns report object including only the categories listed in the category arr parameter:
/// eg: ["TCHSALARY_AvgCurrYr", "TCHRETURN3yrAvg_PctCurrYr"]
/// format: {category: data}
export function createSpecificDataObject(data, categoryArr) {
    let reportCategories = [];
    let report = [];
    data[0].forEach((category) => {
        reportCategories.push(category)
    })
    data.forEach((row, index) => {
        if (index > 0){
         categoryArr.forEach((category) => {
            reportCategories.map((reportCategory, index) => {
                if (reportCategory === category)
                    report[row[3]] = {
                        ...report[row[3]],
                        [reportCategory]: row[index]
                    }
            })
         })
        }
    })
    return report
}
