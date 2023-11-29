import "../../css/schools.css";
import SchoolClimateCards from "./SchoolClimateCards/SchoolClimateCards.jsx";
import AcademicPerformance from "./SchoolAcademicPerformance/AcademicPerformance.jsx";
import SchoolDemographics from "./SchoolDemographics/SchoolDemographics.jsx";
import SchoolHeader from "./SchoolHeader/SchoolHeader.jsx";
import {Container, Grow, Paper} from "@mui/material";
import FullSearch from "../../components/FullSearch.jsx";
import {useParams} from "react-router";
import {getIdAndCode} from "../../utils/functions.js";

const School = () => {
    const {idandcode} = useParams();
    getIdAndCode(idandcode)
    const elevationHeight = 12;

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

