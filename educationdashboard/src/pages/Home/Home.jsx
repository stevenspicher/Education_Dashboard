import '../../index.css';
import '../../css/search.css';
import DistrictsMap from "./DistrictMap/districtsMap.jsx";
import Paper from '@mui/material/Paper';
import SchoolTable  from "./Table/Table.jsx";
import {Container, Grow, Stack} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School.js";



function Home() {
    const elevationHeight = 12;


    return (
        <Container>

            <Grow in={true} timeout={1000}>
            <Paper elevation={elevationHeight} sx={{marginTop:"10px", border: '1px solid black'}}>
                    <Stack id="title" direction={"row"} className={"app-search"}>
                        <SchoolIcon fontSize="large" sx={{marginRight: "20px"}}/>
                        <h1>South Carolina Schools Explorer</h1>
                    </Stack>
                </Paper>
            </Grow>
            <Grow in={true} timeout={1000}>
                <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
                <SchoolTable />
            </Paper>
            </Grow>
            <Grow in={true} timeout={1000}>

            <Paper elevation={elevationHeight} sx={{ border: '1px solid black',marginTop:"10px",  height: "690px"}}>
                    <DistrictsMap />
                </Paper>
            </Grow>
        </Container>
    )
}

export default Home
