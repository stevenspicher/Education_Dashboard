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
    const {id} = useParams();
    return (
        <Container>
            <FullSearch/>
            <DistrictHeader district={districtsData[id]}/>
            <Paper elevation={3}>

                <Stack
                    className="chart-container"
                    direction="row"
                    justifyContent="space-evenly"
                    // alignItems="center"
                    spacing={2}
                >
                    <DistrictSchoolsMap district={districtsData[id].districtSchoolList}/>
                    <DistrictSchoolList district={districtsData[id]}/>
                </Stack>
            </Paper>
            <Paper elevation={3}>
                <DistrictAcademicPerformance district={districtsData[id]}/>
            </Paper>
            <Paper elevation={3}>
                <DistrictDemographics district={districtsData[id]}/>
            </Paper>
            <Paper elevation={3}>
                <DistrictClimateCards district={districtsData[id]}/>
            </Paper>
        </Container>
    );
};

export default District