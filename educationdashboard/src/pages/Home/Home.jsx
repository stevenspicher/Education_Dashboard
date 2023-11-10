import '../../index.css';
import '../../css/search.css';
import LiveMap from "./DistrictMap/LiveMap.jsx";
import Paper from '@mui/material/Paper';
import SchoolTable from "./Table/Table.jsx";
import FullSearch from "../../components/FullSearch.jsx";
import {Box, Container, FormControlLabel, Grow, Switch} from "@mui/material";
import {useState} from "react";


function Home() {
    const elevationHeight = 12;


    return (
        <Container>

            <Grow in={true} timeout={1000}>

            <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
            <div id="title">
                <h1>South Carolina Schools Explorer</h1>
            </div>
                </Paper>
            </Grow>
            <Grow in={true} timeout={1000}>

            <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
            <FullSearch />
                </Paper>
            </Grow>
            <Grow in={true} timeout={1000}>

            <Paper elevation={elevationHeight} sx={{marginTop:"10px",  height: "690px"}}>
                    <LiveMap />
                </Paper>
            </Grow>
            <Grow in={true} timeout={1000}>
                <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
                <SchoolTable />
            </Paper>
            </Grow>
        </Container>
    )
}

export default Home
