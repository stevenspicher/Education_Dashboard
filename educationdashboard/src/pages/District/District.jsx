import {useParams} from "react-router";
import DistrictHeader from "./DistrictHeader/DistrictHeader.jsx";
import SchoolsMap from "./DistrictMap/schoolsMap.jsx";
import DistrictAcademicPerformance
    from "./DistrictAcademicPerformance/DistrictAcademicPerformance.jsx";
import DistrictDemographics from "./DistrictDemographics/DistrictDemographics.jsx";
import DistrictClimateCards from "./DistrictClimateCards/DistrictClimateCards.jsx";
import {Container, Grow, Paper, Stack} from "@mui/material";
import DistrictSchoolList from "./DistrictSchoolList/DistrictSchoolList.jsx";
import FullSearch from "../../components/FullSearch.jsx";
import {getIdAndCode} from "../../utils/functions.js";

const District = () => {
    const elevationHeight = 12;
    const {id} = useParams();
    getIdAndCode(id)
    return (
        <Container>
            <Grow in={true} timeout={1000}>
    <Paper elevation={elevationHeight} sx={{marginTop:"10px"}} >
            <FullSearch/>
        </Paper>
            </Grow>
            <Grow in={true} timeout={1000}>
            <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
                <DistrictHeader />
            </Paper>
            </Grow>
            <Grow in={true} timeout={1000}>
            <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
                <Stack
                    className="chart-container"
                    direction="row"
                    justifyContent="space-evenly"
                    // alignItems="center"
                >
                    <SchoolsMap />
                    <DistrictSchoolList />
                </Stack>
            </Paper>
            </Grow>
            <Grow in={true} timeout={1000}>
            <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
                <DistrictAcademicPerformance/>
            </Paper>
            </Grow>
            <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
                <DistrictDemographics />
            </Paper>
            <Grow in={true} timeout={1000}>
            <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
                <DistrictClimateCards/>
            </Paper>
            </Grow>
        </Container>
    );
};

export default District