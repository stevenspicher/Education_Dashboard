import '../index.css';
import '../css/search.css';
import LiveMap from "../components/Home/DistrictMap/LiveMap.jsx";
import Paper from '@mui/material/Paper';
import SchoolTable from "../components/Home/Table/Table.jsx";
import FullSearch from "../components/Home/HomePageSearch/FullSearch.jsx";
import {Container} from "@mui/material";


function Home() {

    return (
        <Container>
            <div id="title">
                <h1>South Carolina Schools Explorer</h1>
            </div>
            <FullSearch/>
            <h1>Districts</h1>
            <Paper elevation={3}>
                    <LiveMap/>
                </Paper>
                <h1>Schools</h1>
                <Paper elevation={3}>

                <SchoolTable/>
            </Paper>
        </Container>
    )
}

export default Home
