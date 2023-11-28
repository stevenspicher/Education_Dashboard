import Control from 'react-leaflet-custom-control'
import "../../../css/Legend.css"
import {districtsMapKey, mapDataType} from "../../../store/signalStore.js";
import {Button, Stack} from "@mui/material";


function DistrictMapButtons() {
const backgroundColor = "#FFFFFF"
const clickHandler = (subject) => {
    mapDataType.value = subject;
    districtsMapKey.value = subject;
    document.getElementById("gradRate").style.background= backgroundColor;
    document.getElementById("ACTCompositeAVG").style.background=backgroundColor;
    document.getElementById("avgTeacherSalaryLastYr").style.background=backgroundColor;
    document.getElementById("teacherReturnRate").style.background=backgroundColor;
}
return (
    <Control prepend position='topright'>
        <Stack spacing={5}>
        <Button
            style={{background: "#c1d3f7" }}
            id={"gradRate"}
                onClick={
            () => {clickHandler("gradRate")
    document.getElementById("gradRate").style.background='#c1d3f7';
        }}>
            Graduation Rate
        </Button>
        <Button
            style={{background:backgroundColor }}

            id={"ACTCompositeAVG"}
                onClick={() => {
                    clickHandler("ACTCompositeAVG")
                    document.getElementById("ACTCompositeAVG").style.background='#8cf569';
                }}>
            AVG ACT Score
        </Button>
        <Button
            style={{background:backgroundColor }}
            id={"avgTeacherSalaryLastYr"}
                onClick={() => {
                    clickHandler("avgTeacherSalaryLastYr")
                    document.getElementById("avgTeacherSalaryLastYr").style.background='#f1b3f2';
                }}>
            Teacher Salary
        </Button>
        <Button
            style={{background:backgroundColor }}
            id={"teacherReturnRate"}
                onClick={() => {
                    clickHandler("teacherReturnRate")
                    document.getElementById("teacherReturnRate").style.background='#e5ed98';
                }}>
            Teacher Retention
        </Button>
        </Stack>
    </Control>
)
}
export default DistrictMapButtons;