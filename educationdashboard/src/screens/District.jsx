
import {Container} from "react-bootstrap";
import districtsData from "../dataImport/districtsData.json";
import {useParams} from "react-router";
import FullSearch from "../components/District/DistrictSearch/FullSearch"
import DistrictHeader from "../components/District/DistrictHeader/DistrictHeader.jsx";
import DistrictSchoolsMap from "../components/District/DistrictMap/DistrictSchoolsMap.jsx";
import DistrictAcademicPerformance
    from "../components/District/DistrictAcademicPerformance/DistrictAcademicPerformance.jsx";
import DistrictDemographics from "../components/District/DistrictDemographics/DistrictDemographics.jsx";
import DistrictClimateCards from "../components/District/DistrictClimateCards/DistrictClimateCards.jsx";
import {Stack} from "@mui/material";
import DistrictSchoolList from "../components/District/DistrictSchoolList/DistrictSchoolList.jsx";

const District = () => {
    const {id} = useParams();
    return (
        <Container>
            <FullSearch/>
            <DistrictHeader district={districtsData[id]}/>
            <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"

            >
            <DistrictSchoolsMap/>
                <DistrictSchoolList district={districtsData[id]}/>
            </Stack>
            <DistrictAcademicPerformance district={districtsData[id]}/>
            <DistrictDemographics district={districtsData[id]}/>
            <DistrictClimateCards district={districtsData[id]}/>
        </Container>
    );
};

export default District