import {useParams} from "react-router";
import {Container, Grow, Paper} from "@mui/material";
import DistrictHeader from "./DistrictHeader/DistrictHeader.jsx";
import DistrictAcademicPerformance from "./DistrictAcademicPerformance/DistrictAcademicPerformance.jsx";
import DistrictDemographics from "./DistrictDemographics/DistrictDemographics.jsx";
import DistrictClimateCards from "./DistrictClimateCards/DistrictClimateCards.jsx";
import DistrictSchoolList from "./DistrictSchoolList/DistrictSchoolList.jsx";
import FullSearch from "../../components/FullSearch.jsx";
import SchoolsMap from "./DistrictMap/schoolsMap.jsx";
import {getIdAndCode} from "../../utils/functions.js";
import {allSchools, selectedDistrict} from "../../store/signalStore.js";
import Trends from "../../components/Trends/Trends.jsx";
import NotFound from "../../components/NotFound.jsx";

const District = () => {
    const elevationHeight = 12;
    const {id} = useParams();
    getIdAndCode(id)
    // look the record up from the URL itself: the store only catches up after this render
    const record = id !== undefined ? allSchools.value[id] : selectedDistrict.value
    if (record === undefined || record.schoolCode !== "D") {
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
                    <DistrictHeader/>
                </Paper>
            </Grow>
            <Grow in={true} timeout={1000}>
                <Paper elevation={elevationHeight} sx={{marginTop: "10px", border: '1px solid black'}}>
                    <SchoolsMap/>
                    <DistrictSchoolList/>
                </Paper>
            </Grow>
            <Grow in={true} timeout={1000}>
                <Paper elevation={elevationHeight} sx={{marginTop: "10px", border: '1px solid black'}}>
                    <DistrictAcademicPerformance/>
                </Paper>
            </Grow>
            <Trends record={record}/>
            <Paper elevation={elevationHeight} sx={{marginTop: "10px", border: '1px solid black'}}>
                <DistrictDemographics/>
            </Paper>
            <Grow in={true} timeout={1000}>
                <Paper elevation={elevationHeight} sx={{marginTop: "10px", border: '1px solid black'}}>
                    <DistrictClimateCards/>
                </Paper>
            </Grow>
        </Container>
    );
};

export default District