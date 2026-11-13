import Control from 'react-leaflet-custom-control'
import "../../../css/Legend.css"
import {allSchools, mapDataType} from "../../../store/signalStore.js";
import {getScale} from "../../../utils/mapScale.js";
import {Chip, Stack} from "@mui/material";


//// Legend for the district heat map. Ranges come from the data (see utils/mapScale.js)
function DistrictsHeatMap() {
    const scale = getScale(mapDataType.value, allSchools.value);
    return (
        <Control prepend position='topright'>
            <Stack>
                {scale.legend.map((entry) => (
                    <Chip key={entry.label} label={entry.label}
                          style={{backgroundColor: entry.color, border: '1px solid black'}}/>
                ))}
            </Stack>
        </Control>
    )
}
export default DistrictsHeatMap;
