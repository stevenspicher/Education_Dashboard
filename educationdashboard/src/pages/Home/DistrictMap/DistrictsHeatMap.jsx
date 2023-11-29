import Control from 'react-leaflet-custom-control'
import "https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.4.2/chroma.min.js"
import "../../../css/Legend.css"
import {
    ACTCompositeAVGColorScale,
    avgTeacherSalaryColorScale,
    gradRateColorScale,
    mapDataType, teacherReturnRateColorScale
} from "../../../store/signalStore.js";
import {Chip, Stack} from "@mui/material";


function DistrictsHeatMap() {
switch (mapDataType.value) {
    case "gradRate":
        return (
            <Control prepend position='topright'>
                    <Stack>
                    <Chip label="100% to 90.1%" style={{backgroundColor: gradRateColorScale.value[5], border: '1px solid black'}}/>
                    <Chip label="90% to 80.1%" style={{backgroundColor: gradRateColorScale.value[4], border: '1px solid black'}} />
                    <Chip label="80% to 70.1%" style={{backgroundColor: gradRateColorScale.value[3], border: '1px solid black'}}/>
                    <Chip label="70% to 60.1%" style={{backgroundColor: gradRateColorScale.value[2], border: '1px solid black'}} />
                    <Chip label="60% or below"  style={{backgroundColor: gradRateColorScale.value[1], border: '1px solid black'}}/>
                    </Stack>
            </Control>
        )
    case "ACTCompositeAVG":
        return (
            <Control prepend position='topright'>
                    <Stack>
                    <Chip label="32 to 23" style={{backgroundColor:ACTCompositeAVGColorScale.value[5], border: '1px solid black'} } />
                    <Chip label="22 to 20" style={{backgroundColor: ACTCompositeAVGColorScale.value[4], border: '1px solid black'}}/>
                    <Chip label="19 to 17" style={{backgroundColor: ACTCompositeAVGColorScale.value[3], border: '1px solid black'}}/>
                    <Chip label="16 to 14" style={{backgroundColor: ACTCompositeAVGColorScale.value[2], border: '1px solid black'}}/>
                    <Chip label="13 or below" style={{backgroundColor: ACTCompositeAVGColorScale.value[1], border: '1px solid black'}}/>
                    </Stack>
            </Control>
        )
    case "avgTeacherSalaryLastYr":
        return (
            <Control prepend position='topright'>
                <Stack>
                    <Chip label="$60,000 to $57,000" style={{backgroundColor:avgTeacherSalaryColorScale.value[5], border: '1px solid black'} } />
                    <Chip label="$57,000 to $54,000" style={{backgroundColor: avgTeacherSalaryColorScale.value[4], border: '1px solid black'}}/>
                    <Chip label="$54,000 to $51,000" style={{backgroundColor: avgTeacherSalaryColorScale.value[3], border: '1px solid black'}}/>
                    <Chip label="$51,000 to $48,000" style={{backgroundColor: avgTeacherSalaryColorScale.value[2], border: '1px solid black'}}/>
                    <Chip label="$48,000 or below" style={{backgroundColor: avgTeacherSalaryColorScale.value[1], border: '1px solid black'}}/>
                </Stack>
            </Control>
        )
    case "teacherReturnRate":
        return (
            <Control prepend position='topright'>
                <Stack>
                    <Chip label="100% to 90.1%" style={{backgroundColor: teacherReturnRateColorScale.value[5], border: '1px solid black'} } />
                    <Chip label="90% to 80.1%" style={{backgroundColor: teacherReturnRateColorScale.value[4], border: '1px solid black'}}/>
                    <Chip label="80% to 70.1%" style={{backgroundColor: teacherReturnRateColorScale.value[3], border: '1px solid black'}}/>
                    <Chip label="70% or below" style={{backgroundColor: teacherReturnRateColorScale.value[2], border: '1px solid black'}}/>
                    {/*<Chip label="60% or below" style={{backgroundColor: teacherReturnRateColorScale.value[1]}}/>*/}
                </Stack>
            </Control>
        )
}



}
export default DistrictsHeatMap;