export function createMainPageDataObject(data) {
    let reportCategories = [];
    let report = [];
    data.mainPage[0].forEach((category) => {
        reportCategories.push(category)
    })
    data.mainPage.forEach((row, index) => {
        if (index > 0){
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

export function createGradRateDataObject(data) {
    let reportCategories = [];
    let report = [];
    data.gradRate[0].forEach((category) => {
        reportCategories.push(category)
    })
    data.gradRate.forEach((row, index) => {
        if (index > 0){
            reportCategories.map((category, index) => {
                if (category === "GRADRATE22")
                report[row[3]] = {
                    ...report[row[3]],
                    [category]: row[index]
                }
            })
        }
    })
    return report
}

// export function createRatingsDataObject(data) {
//     let reportCategories = [];
//     let report = [];
//     data.ratings[0].forEach((category) => {
//         reportCategories.push(category)
//     })
//     data.ratings.forEach((row, index) => {
//         if (index > 0){
//             reportCategories.map((category, index) => {
//                 if (category === "ACT_Avg_CompositeScore")
//                     report[row[3]] = {
//                         ...report[row[3]],
//                         [category]: row[index]
//                     }
//             })
//         }
//     })
//     return report
// }

export function createCollegeDataObject(data) {
    console.log(data)
    let reportCategories = [];
    let report = [];
    data.college[0].forEach((category) => {
        reportCategories.push(category)
    })
    data.college.forEach((row, index) => {
        if (index > 0){
            reportCategories.map((category, index) => {
                if (category === "ACT_Avg_CompositeScore") {
                    report[row[3]] = {
                        ...report[row[3]],
                        [category]: row[index]
                    }
                    }
            })
        }
    })
    return report
}
        // } else if (reportTitle === "env") {
        //     report[row[3]] = {
        //         ...report[row[3]],
        //         ["averageTeacherSalary"]: row["TCHSALARY_AvgCurrYr"],
        //         ["3YrTeacherRetention"]: row["TCHRETURN3yrAvg_PctCurrYr"],
        //     }
        // } else if (reportTitle === "college") {
        //     report[row[3]] = {
        //         ...report[row[3]],
        //         ["averageACTComposite"]: row["ACT_Avg_CompositeScore"],
        //     }
        // } else {
