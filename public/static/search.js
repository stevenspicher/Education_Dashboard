
// // // // // //
// // // SEARCH SCRIPT
// // // // // //

function searchApp(pageType) {
    let loc;
    let mode;
    if (pageType == "district" || pageType == "school") {
        loc = "../../"
        mode = ""
    } else if (pageType == "home") {
        loc = "";
        mode = "_light"
    }
    const searchInput = document.querySelector('#fill-box')
    searchInput.addEventListener("input", (e) => {
        let value = e.target.value
        if (value && value.trim().length > 2) {
            d3.csv(`${loc}static/all_search.csv`).then(function (data) {
                const fuse = new Fuse(data, {
                    keys: ['name'],
                    minMatchCharLength: 3,
                    distance: 50,
                    includeMatches: true,
                    threshold: 0.1
                })
                var results = fuse.search(value)
                if (results.length > 1) {
                    d3.select(".search-eg")
                        .style("display", "none")
                    d3.select("#suggestions-list")
                        .style("display", "block")
                }

                d3.selectAll(".individual_result").remove()

                let div = d3.select("#suggestions-list")
                    .html("")
                    .selectAll('.result')
                    .data(results)
                    .enter().append('div').attr("class", "individual_result")

                let img = div
                    .append('img')
                    .attr("src", function (d) {
                        if (d.item.type == "school") {
                            return `${loc}../static/school${mode}.png`
                        } else if (d.item.type == "district") {
                            return `${loc}../static/district${mode}.png`
                        }
                    })

                let text = div
                    .append('p')
                    .append('a')
                    .attr('href', function (d) {
                        if (d.item.type == "school") {
                            //console.log(d)
                            return `${loc}../school/${d.item.id}`
                        } else if (d.item.type == "district") {
                            //console.log(d)
                            return `${loc}../district/${d.item.id}`
                        }
                    })
                    .text(function (d) {
                        return d.item.name
                    })
            })
        } else {
            d3.select(".search-eg")
                .style("display", "flex")
            d3.select("#suggestions-list")
                .style("display", "none")
        }
    })
}