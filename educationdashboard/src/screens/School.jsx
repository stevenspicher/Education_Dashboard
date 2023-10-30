import "../css/schools.css";
import {Container} from "react-bootstrap";
import {useParams} from "react-router";


import h from "../dataImport/h"
import e from "../dataImport/e"
import m from "../dataImport/m"
import p from "../dataImport/p"
import ClimateCards from "../components/School/SchoolClimateCards/ClimateCards.jsx";
import FullSearch from "../components/School/SchoolSearch/FullSearch.jsx";
import AcademicPerformance from "../components/School/SchoolAcademicPerformance/AcademicPerformance.jsx";
import Demographics from "../components/School/SchoolDemographics/Demographics.jsx";
import SchoolHeader from "../components/School/SchoolHeader/SchoolHeader.jsx";

const School = () => {

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
            <Container fluid>
                <FullSearch/>
                <SchoolHeader school={school}/>
                <AcademicPerformance school={school}/>
                <Demographics school={school}/>
                <ClimateCards school={school}/>
            </Container>
    );
}

export default School

