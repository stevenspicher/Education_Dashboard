import districtsData from "../dataImport/districtsData.json";
import {useParams} from "react-router";
import FullSearch from "../components/District/DistrictSearch/FullSearch"
import DistrictHeader from "../components/District/DistrictHeader/DistrictHeader.jsx";
import DistrictSchoolsMap from "../components/District/DistrictMap/DistrictSchoolsMap.jsx";
import DistrictAcademicPerformance
    from "../components/District/DistrictAcademicPerformance/DistrictAcademicPerformance.jsx";
import DistrictDemographics from "../components/District/DistrictDemographics/DistrictDemographics.jsx";
import DistrictClimateCards from "../components/District/DistrictClimateCards/DistrictClimateCards.jsx";
import {Container, Paper, Stack} from "@mui/material";
import DistrictSchoolList from "../components/District/DistrictSchoolList/DistrictSchoolList.jsx";

const District = () => {
    const elevationHeight = 12;
    const {id} = useParams();
    return (
        <Container>
    <Paper elevation={elevationHeight} sx={{marginTop:"10px"}} >
            <FullSearch/>
        </Paper>
            <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
                <DistrictHeader district={districtsData[id]}/>
            </Paper>
            <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
                <Stack
                    className="chart-container"
                    direction="row"
                    justifyContent="space-evenly"
                    // alignItems="center"

                >
                    <DistrictSchoolsMap district={districtsData[id].districtSchoolList}/>
                    <DistrictSchoolList district={districtsData[id]}/>
                </Stack>
            </Paper>
            <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
                <DistrictAcademicPerformance district={districtsData[id]}/>
            </Paper>
            <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
                <DistrictDemographics district={districtsData[id]}/>
            </Paper>
            <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
                <DistrictClimateCards district={districtsData[id]}/>
            </Paper>
        </Container>
    );
};

export default District