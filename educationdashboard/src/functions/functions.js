
///COMMENT FUNCTIONS!!!
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
