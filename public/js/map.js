d3.json("../static/data.geojson").then(function (loadedData) {
    console.log(loadedData);


    var map = L.map('map', {
        minZoom: 7,
        maxZoom: 10,
    }).setView([33.4, -81.1], 7);


    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWFkaXR0YW1iZSIsImEiOiJja3R2eDFjZjMyZXJxMnhwcTR0Y3F5eGk2In0.9AAyIXkTkCMcZ8NNlDPB9g', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);

    function getColorTotal(d, min = 15, mid = 50000, max = 76964, endColor = '#1979b9', midColor = 'black', startColor = '#de5826') {
        const scale = chroma.scale([startColor, midColor, endColor]).domain([min, mid, max]);
        return scale(d).hex();
    }

    function getColorGirls(d, min = 11, max = 37451, endColor = '#1979b9', startColor = '#de5826') {
        const scale = chroma.scale([startColor, endColor]).domain([min, max]);
        return scale(d).hex();
    }

    function getColorBoys(d, min = 264, max = 39513, endColor = '#1979b9', startColor = '#de5826') {
        const scale = chroma.scale([startColor, endColor]).domain([min, max]);
        return scale(d).hex();
    }

    function getColorUnknown(d, min = 0, max = 21, endColor = '#1979b9', startColor = '#7C6970') {
        const scale = chroma.scale([startColor, endColor]).domain([min, max]);
        return scale(d).hex();
    }

// function getColorIndian(d, min = -51, max = 30, endColor = '#1979b9', startColor = '#de5826') {
//     const scale = chroma.scale([startColor, endColor]).domain([min, max]);
//     return scale(d).hex();
// }

// function getColorAsian(d, min = 0, max = 85, endColor = '#1979b9', startColor = '#7C6970') {
//     const scale = chroma.scale([startColor, endColor]).domain([min, max]);
//     return scale(d).hex();
// }

// function getColorPacific(d, min = 0, max = 120, endColor = '#1979b9', startColor = '#7C6970') {
//     const scale = chroma.scale([startColor, endColor]).domain([min, max]);
//     return scale(d).hex();
// }

// function getColorOther(d, min = 0, max = 370, endColor = '#1979b9', startColor = '#7C6970') {
//     const scale = chroma.scale([startColor, endColor]).domain([min, max]);
//     return scale(d).hex();
// }

// function getColorTwo(d, min = 0, max = 265, endColor = '#1979b9', startColor = '#7C6970') {
//     const scale = chroma.scale([startColor, endColor]).domain([min, max]);
//     return scale(d).hex();
// }

    function style(feature) {
        var property = parseFloat((feature.properties.total_students_enrolled)).toFixed(0);
        // console.log(property)
        return {
            fillColor: getColorTotal(property),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    function onEachFeature(feature, layer) {
        layer.bindPopup("<p style = \"text-align:center;\">" + '<strong>' + feature.properties.LEA_NAME + '</strong>' + " <br>total kidz: " + '<strong>' + parseFloat((feature.properties.total_students_enrolled)).toFixed(0) + " XXXXXXXX " + "<a href='{{'>hi</a>" + " XXXX " + "</strong></p>");
    }

    var geojsonLayer = new L.geoJson(loadedData, {onEachFeature: onEachFeature, style: style});

    geojsonLayer.addTo(map);

    var totalLegend = L.control({position: 'bottomright'});

    totalLegend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [80000, 40000, 20000, 0],
            labels = [];

        for (var i = 0; i < grades.length; i++) {
            // console.log(grades[i])
            div.innerHTML +=
                '<i style="background:' + getColorTotal(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i] ? ' and ' + grades[i] + '<br>' : ' and less');
        }

        return div;
    };

    var boyLegend = L.control({position: 'bottomright'});

    boyLegend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [40000, 20000, 0],
            labels = [];

        for (var i = 0; i < grades.length; i++) {
            // console.log(grades[i])
            div.innerHTML +=
                '<i style="background:' + getColorTotal(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i] ? ' and ' + grades[i] + '<br>' : ' and less');
        }

        return div;
    };


    var girlLegend = L.control({position: 'bottomright'});

    girlLegend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [40000, 20000, 0],
            labels = [];

        for (var i = 0; i < grades.length; i++) {
            // console.log(grades[i])
            div.innerHTML +=
                '<i style="background:' + getColorTotal(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i] ? ' and ' + grades[i] + '<br>' : ' and less');
        }

        return div;
    };

    var unknownLegend = L.control({position: 'bottomright'});

    unknownLegend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [100, 40, 20],
            labels = [];

        for (var i = 0; i < grades.length; i++) {
            // console.log(grades[i])
            div.innerHTML +=
                '<i style="background:' + getColorUnknown(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i] ? ' and ' + grades[i] + '<br>' : ' and less');
        }

        return div;
    };

// var indianLegend = L.control({ position: 'bottomright' });

// indianLegend.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [35, 25, 15, 5, -5, -15, -25, -35],
//         labels = [];

//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColorIndian(grades[i] + 1) + '"></i> ' +
//             grades[i] + '%' + (grades[i + 1] ? ' and ' + grades[i + 1] + '%' + '<br>' : ' and less');
//     }

//     return div;
// };

// var asianLegend = L.control({ position: 'bottomright' });

// asianLegend.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [85, 75, 65, 55, 45, 35, 25, 15],
//         labels = [];

//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColorAsian(grades[i] + 1) + '"></i> ' +
//             grades[i] + '%' + (grades[i + 1] ? ' and ' + grades[i + 1] + '%' + '<br>' : ' and less');
//     }

//     return div;
// };

// var pacificLegend = L.control({ position: 'bottomright' });

// pacificLegend.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [120, 10, 80, 60, 40, 20],
//         labels = [];

//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColorPacific(grades[i] + 1) + '"></i> ' +
//             grades[i] + '%' + (grades[i + 1] ? ' and ' + grades[i + 1] + '%' + '<br>' : ' and less');
//     }

//     return div;
// };

// var otherLegend = L.control({ position: 'bottomright' });

// otherLegend.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [400, 350, 300, 250, 200, 150, 100, 50],
//         labels = [];

//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColorOther(grades[i] + 1) + '"></i> ' +
//             grades[i] + '%' + (grades[i + 1] ? ' and ' + grades[i + 1] + '%' + '<br>' : ' and less');
//     }

//     return div;
// };

// var twoLegend = L.control({ position: 'bottomright' });

// twoLegend.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [150, 140, 130, 120, 100, 90],
//         labels = [];

//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColorTwo(grades[i] + 1) + '"></i> ' +
//             grades[i] + '%' + (grades[i + 1] ? ' and ' + grades[i + 1] + '%' + '<br>' : ' and less');
//     }

//     return div;
// };


    var currentLegend = totalLegend;

    var buttons = L.control({position: 'topright'});

    buttons.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        div.innerHTML = '<div><button class="select1 active">Total</button><button class="select1">Boys</button><button class="select1">Girls</button><button class="select1">Unknown</button></div>';
        div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
        console.log(div)
        return div;
    }

    buttons.addTo(map)


// var dropdown = L.control({ position: 'topleft' });

// dropdown.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend');
//     div.innerHTML = '<select id="select1"><option>Total</option><option>Boys</option><option>Girls</option><option>Unknown</option></select>';
//     div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
//     console.log(div.firstChild)
//     return div;
// };
// dropdown.addTo(map);

    $('.select1').click(function () {
        // console.log(this)
        $('.select1').css("background-color", "white")
        $(this).css("background-color", "yellow")

        var property;

        if (this.innerText == "Total") {
            property = 'total_students_enrolled';

        }

            // else if (this.innerText == "White") {
            //     property = "total_students_enrolled";

        // }
        else if (this.innerText == "Girls") {
            property = "gender_female";

        } else if (this.innerText == "Boys") {
            property = "gender_male";

        } else if (this.innerText == "Unknown") {
            property = "gender_missing";

        }

        // else if (this.innerText == "Asian") {
        //     property = "asian";

        // }

        // else if (this.innerText == "Pacific Islander") {
        //     property = "pacific_islander";

        // }

        // else if (this.innerText == "Other") {
        //     property = "other";

        // }

        // else if (this.innerText == "Two or more races") {
        //     property = "two_races";

        // }

        function styleTotal(feature) {

            property2 = parseFloat(feature['properties'][property]).toFixed(1);

            return {
                fillColor: getColorTotal(property2),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }

        function styleBoys(feature) {

            property2 = parseFloat(feature['properties'][property]).toFixed(1);

            return {
                fillColor: getColorBoys(property2),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }

        function styleGirls(feature) {

            property2 = parseFloat(feature['properties'][property]).toFixed(1);

            return {
                fillColor: getColorGirls(property2),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }

        function styleUnknown(feature) {

            property2 = parseFloat(feature['properties'][property]).toFixed(1);

            return {
                fillColor: getColorUnknown(property2),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }

        // function styleAmericanIndian(feature) {

        //     property2 = parseFloat(feature['properties'][property]).toFixed(1);

        //     return {
        //         fillColor: getColorIndian(property2),
        //         weight: 2,
        //         opacity: 1,
        //         color: 'white',
        //         dashArray: '3',
        //         fillOpacity: 0.7
        //     };
        // }

        // function styleAsian(feature) {


        //     property2 = parseFloat(feature['properties'][property]).toFixed(1);

        //     return {
        //         fillColor: getColorAsian(property2),
        //         weight: 2,
        //         opacity: 1,
        //         color: 'white',
        //         dashArray: '3',
        //         fillOpacity: 0.7
        //     };
        // }

        // function stylePacific(feature) {

        //     property2 = parseFloat(feature['properties'][property]).toFixed(1);

        //     return {
        //         fillColor: getColorPacific(property2),
        //         weight: 2,
        //         opacity: 1,
        //         color: 'white',
        //         dashArray: '3',
        //         fillOpacity: 0.7
        //     };
        // }


        // function styleOther(feature) {

        //     property2 = parseFloat(feature['properties'][property]).toFixed(1);

        //     return {
        //         fillColor: getColorOther(property2),
        //         weight: 2,
        //         opacity: 1,
        //         color: 'white',
        //         dashArray: '3',
        //         fillOpacity: 0.7
        //     };
        // }

        // function styleTwo(feature) {

        //     property2 = parseFloat(feature['properties'][property]).toFixed(1);

        //     return {
        //         fillColor: getColorTwo(property2),
        //         weight: 2,
        //         opacity: 1,
        //         color: 'white',
        //         dashArray: '3',
        //         fillOpacity: 0.7
        //     };
        // }

        function onEachFeature2(feature, layer) {
            var updatedProperty

            if (property == "total_students_enrolled") {
                updatedProperty = "Total kidz"
            }

            if (property == "gender_male") {
                updatedProperty = "Boyz"
            } else if (property == "gender_female") {
                updatedProperty = "Girlz"
            } else if (property == "gender_missing") {
                updatedProperty = "Unknown"
            }
            // else if (property == "Asian") {
            //     updatedProperty = "Asian population"
            // }
            // else if (property == "native") {
            //     updatedProperty = "American Indian population"
            // }
            // else if (property == "pacific_islander") {
            //     updatedProperty = "Pacific Islander population"
            // }
            // else if (property == "other") {
            //     updatedProperty = "population that identifies as other"
            // }
            // else if (property == "two_races") {
            //     updatedProperty = "population that identifies as two or more races"
            // }
            if (isNaN(feature['properties'][property]) == true) {
                layer.bindPopup("<p style = \"text-align:center;\">" + '<strong>' + feature.properties.LEA_NAME + '</strong>' + " <br>" + "Note: " + 'womp womp no dara ' + "</p>");
            } else {
                // console.log(updatedProperty)
                layer.bindPopup("<p style = \"text-align:center;\">" + '<strong>' + feature.properties.LEA_NAME + '</strong>' + " <br>" + "Beep boop " + updatedProperty + ": " + '<strong>' + parseFloat((feature['properties'][property])).toFixed(0) + "</strong></p>");
            }
        }

        if (this.innerText == "Total") {

            map.removeLayer(geojsonLayer);
            geojsonLayer = new L.geoJson(loadedData, {onEachFeature: onEachFeature2, style: styleTotal});
            geojsonLayer.addTo(map);

            map.removeControl(currentLegend);
            currentLegend = totalLegend;
            totalLegend.addTo(map);

        } else if (this.innerText == "Boys") {

            map.removeLayer(geojsonLayer);
            geojsonLayer = new L.geoJson(loadedData, {onEachFeature: onEachFeature2, style: styleBoys});
            geojsonLayer.addTo(map);

            map.removeControl(currentLegend);
            currentLegend = boyLegend;
            boyLegend.addTo(map);

        } else if (this.innerText == "Girls") {

            map.removeLayer(geojsonLayer);
            geojsonLayer = new L.geoJson(loadedData, {onEachFeature: onEachFeature2, style: styleGirls});
            geojsonLayer.addTo(map);

            map.removeControl(currentLegend);
            currentLegend = girlLegend;
            girlLegend.addTo(map);

        } else if (this.innerText == "Unknown") {

            map.removeLayer(geojsonLayer);
            geojsonLayer = new L.geoJson(loadedData, {onEachFeature: onEachFeature2, style: styleUnknown});
            geojsonLayer.addTo(map);

            map.removeControl(currentLegend);
            currentLegend = unknownLegend;
            unknownLegend.addTo(map);

        }


        // else if (this.innerText == "American Indian") {

        //     map.removeLayer(geojsonLayer);
        //     geojsonLayer = new L.geoJson(loadedData, { onEachFeature: onEachFeature2, style: styleAmericanIndian });
        //     geojsonLayer.addTo(map);

        //     map.removeControl(currentLegend);
        //     currentLegend = indianLegend;
        //     indianLegend.addTo(map);

        // }

        // else if (this.innerText == "Asian") {

        //     map.removeLayer(geojsonLayer);
        //     geojsonLayer = new L.geoJson(loadedData, { onEachFeature: onEachFeature2, style: styleAsian });
        //     geojsonLayer.addTo(map);

        //     map.removeControl(currentLegend);
        //     currentLegend = asianLegend;
        //     asianLegend.addTo(map);

        // }

        // else if (this.innerText == "Pacific Islander") {

        //     map.removeLayer(geojsonLayer);
        //     geojsonLayer = new L.geoJson(loadedData, { onEachFeature: onEachFeature2, style: stylePacific });
        //     geojsonLayer.addTo(map);

        //     map.removeControl(currentLegend);
        //     currentLegend = pacificLegend;
        //     pacificLegend.addTo(map);

        // }

        // else if (this.innerText == "Other") {

        //     map.removeLayer(geojsonLayer);
        //     geojsonLayer = new L.geoJson(loadedData, { onEachFeature: onEachFeature2, style: styleOther });
        //     geojsonLayer.addTo(map);

        //     map.removeControl(currentLegend);
        //     currentLegend = otherLegend;
        //     otherLegend.addTo(map);

        // }

        // else if (this.innerText == "Two or more races") {

        //     map.removeLayer(geojsonLayer);
        //     geojsonLayer = new L.geoJson(loadedData, { onEachFeature: onEachFeature2, style: styleTwo });
        //     geojsonLayer.addTo(map);

        //     map.removeControl(currentLegend);
        //     currentLegend = twoLegend;
        //     twoLegend.addTo(map);

        // }


    })

    map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');


    currentLegend.addTo(map);
});
