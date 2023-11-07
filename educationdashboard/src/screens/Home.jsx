import '../index.css';
import '../css/search.css';
import LiveMap from "../components/Home/DistrictMap/LiveMap.jsx";
import Paper from '@mui/material/Paper';
import SchoolTable from "../components/Home/Table/Table.jsx";
import FullSearch from "../components/Home/HomePageSearch/FullSearch.jsx";
import {Container} from "@mui/material";
import {useState} from "react";


function Home() {
    const elevationHeight = 12;
    const [results, setResults] = useState([]);
    const [districtResults, setDistrictResults] = useState([]);
    const [schoolResults, setSchoolResults] = useState([]);
        let dResults = [];
        let sResults = [];
   results.forEach((result) => {
       if (result.type !== undefined)
        if (result.type === "D") {dResults.push(result)} else {
            sResults.push(result)
        }
        })
    return (
        <Container>
            <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
            <div id="title">
                <h1>South Carolina Schools Explorer</h1>
            </div>
                </Paper>
            <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
            <FullSearch results={results} setResults={setResults}/>
                </Paper>
            <Paper elevation={elevationHeight} sx={{marginTop:"10px",  height: "690px"}}>
                    <LiveMap districtResults={dResults}/>
                </Paper>
                <Paper elevation={elevationHeight} sx={{marginTop:"10px"}}>
                <SchoolTable schoolResults = {sResults}/>
            </Paper>
        </Container>
    )
}

export default Home
