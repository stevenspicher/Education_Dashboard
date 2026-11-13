import {useParams} from "react-router";
import {Container, Grow, Paper} from "@mui/material";
import "../../css/schools.css";
import AcademicPerformance from "./SchoolAcademicPerformance/AcademicPerformance.jsx";
import FullSearch from "../../components/FullSearch.jsx";
import SchoolClimateCards from "./SchoolClimateCards/SchoolClimateCards.jsx";
import SchoolDemographics from "./SchoolDemographics/SchoolDemographics.jsx";
import SchoolHeader from "./SchoolHeader/SchoolHeader.jsx";
import {getIdAndCode} from "../../utils/functions.js";
import {allSchools, selectedSchool} from "../../store/signalStore.js";
import Trends from "../../components/Trends/Trends.jsx";
import NotFound from "../../components/NotFound.jsx";

const School = () => {
    const {idandcode} = useParams();
    getIdAndCode(idandcode)
    const elevationHeight = 12;

    // look the record up from the URL itself: the store only catches up after this render
    const record = idandcode !== undefined ? allSchools.value[idandcode.split("+")[0]] : selectedSchool.value
    if (record === undefined || record.schoolCode === "D") {
        return <NotFound/>
    }
    return (
        <Container>
            <Grow in={true} timeout={1000}>
            <Paper elevation={elevationHeight} sx={{marginTop: "10px", border: '1px solid black'}}>
                <FullSearch/>
            </Paper>
            </Grow>
            <Grow in={true} timeout={1000}>
            <Paper elevation={elevationHeight} sx={{marginTop: "10px", border: '1px solid black'}}>
                <SchoolHeader/>
            </Paper>
            </Grow>
            <Grow in={true} timeout={1000}>
            <Paper elevation={elevationHeight} sx={{marginTop: "10px", border: '1px solid black'}}>
                <AcademicPerformance/>
            </Paper>
            </Grow>
            <Trends record={record}/>
            <Grow in={true} timeout={1000}>
            <Paper elevation={elevationHeight} sx={{marginTop: "10px", border: '1px solid black'}}>
                <SchoolDemographics/>
            </Paper>
            </Grow>
            <Grow in={true} timeout={1000}>
            <Paper elevation={elevationHeight} sx={{marginTop: "10px", border: '1px solid black'}}>
                <SchoolClimateCards/>
            </Paper>
            </Grow>
        </Container>
    );
}

export default School

