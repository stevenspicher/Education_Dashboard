import { useEffect } from "react";
import {useMap} from "react-leaflet";
import L from "leaflet";
import "https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.4.2/chroma.min.js"
import "../../../css/Legend.css"
import {CRS as chroma} from "leaflet/src/geo/index.js";

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


function Legend() {
    const map = useMap();
    useEffect(() => {
        if (map) {

            const totalLegend = L.control({ position: "bottomright" });

            totalLegend.onAdd = () => {
                const div = L.DomUtil.create("div", "info legend"),
                    grades = [80000, 40000, 20000, 0],
                    labels = [];

                for (let i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        `<h4>${grades[i]}</h4>`
                        // "<b>Lorem ipsum dolor sit amet consectetur adipiscing</b>";
                        // '<i style="background:' + getColorTotal(grades[i] + 1) + '"></i> '
                    // grades[i] + (grades[i] ? ' and ' + grades[i] + '<br>' : ' and less');
                }
                return div;
            };

            totalLegend.addTo(map);
        }

        }, [map]);
        return null;

}
export default Legend;