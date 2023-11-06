import "../css/schools.css";
import {useParams} from "react-router";


import h from "../dataImport/h"
import e from "../dataImport/e"
import m from "../dataImport/m"
import p from "../dataImport/p"
import ClimateCards from "../components/School/SchoolClimateCards/ClimateCards.jsx";
import FullSearch from "../components/School/SchoolSearch/FullSearch.jsx";
import AcademicPerformance from "../components/School/SchoolAcademicPerformance/AcademicPerformance.jsx";
import SchoolDemographics from "../components/School/SchoolDemographics/SchoolDemographics.jsx";
import SchoolHeader from "../components/School/SchoolHeader/SchoolHeader.jsx";
import {Container, Paper} from "@mui/material";

const School = () => {
    const elevationHeight = 12;
    const {idandcode} = useParams();
    const id = idandcode.toString().split("+")[0]
    const code = idandcode.toString().split("+")[1]

    let school;

    switch (code) {
        case "H":
            school = h
            break;
        case "E":
            school = e
            break;
        case "P":
            school = p
            break;
        case "M" :
            school = m
            break;
    }

    school = school[id]


    return (
            <Container>
                <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
                <FullSearch/>
                </Paper>
                <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
                <SchoolHeader school={school}/>
                </Paper>
                <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
                <AcademicPerformance school={school}/>
                </Paper>
                <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
                <SchoolDemographics school={school}/>
                </Paper>
                <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
                <ClimateCards school={school}/>
                </Paper>
            </Container>
    );
}

export default School

