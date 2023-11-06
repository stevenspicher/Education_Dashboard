import '../index.css';
import '../css/search.css';
import LiveMap from "../components/Home/DistrictMap/LiveMap.jsx";
import Paper from '@mui/material/Paper';
import SchoolTable from "../components/Home/Table/Table.jsx";
import FullSearch from "../components/Home/HomePageSearch/FullSearch.jsx";
import {Container} from "@mui/material";


function Home() {
    const elevationHeight = 12;
    return (
        <Container>
            <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
            <div id="title">
                <h1>South Carolina Schools Explorer</h1>
            </div>
                </Paper>
            <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
            <FullSearch/>
                </Paper>
            <Paper elevation={elevationHeight} sx={{marginTop:"10px",  height: "690px"}}>
                    <LiveMap/>
                </Paper>
                <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
                <SchoolTable/>
            </Paper>
        </Container>
    )
}

export default Home
