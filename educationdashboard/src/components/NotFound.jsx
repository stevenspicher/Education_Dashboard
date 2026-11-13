import {Container, Paper} from "@mui/material";
import FullSearch from "./FullSearch.jsx";

//// Shown when the URL does not match a school or district in the current data
const NotFound = () => (
    <Container>
        <Paper elevation={12} sx={{marginTop: "10px", border: '1px solid black'}}>
            <FullSearch/>
        </Paper>
        <Paper elevation={12} sx={{marginTop: "10px", border: '1px solid black', padding: "30px", textAlign: "center"}}>
            <div className={"h5"}>We couldn&apos;t find that school or district. Use the search above, or return to the <a href="/home">home page</a>.</div>
        </Paper>
    </Container>
);

export default NotFound
