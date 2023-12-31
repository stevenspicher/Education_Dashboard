import {useParams} from "react-router";
import {Container, Grow, Paper, Stack} from "@mui/material";
import DistrictHeader from "./DistrictHeader/DistrictHeader.jsx";
import DistrictAcademicPerformance from "./DistrictAcademicPerformance/DistrictAcademicPerformance.jsx";
import DistrictDemographics from "./DistrictDemographics/DistrictDemographics.jsx";
import DistrictClimateCards from "./DistrictClimateCards/DistrictClimateCards.jsx";
import DistrictSchoolList from "./DistrictSchoolList/DistrictSchoolList.jsx";
import FullSearch from "../../components/FullSearch.jsx";
import SchoolsMap from "./DistrictMap/schoolsMap.jsx";
import {getIdAndCode} from "../../utils/functions.js";

const District = () => {
    const elevationHeight = 12;
    const {id} = useParams();
    getIdAndCode(id)
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
                    <Stack
                        direction="row"
                    >
                        <SchoolsMap/>
                        <DistrictSchoolList/>
                    </Stack>
                </Paper>
            </Grow>
            <Grow in={true} timeout={1000}>
                <Paper elevation={elevationHeight} sx={{marginTop: "10px", border: '1px solid black'}}>
                    <DistrictAcademicPerformance/>
                </Paper>
            </Grow>
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