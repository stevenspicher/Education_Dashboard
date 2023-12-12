import {Container, Grid, Stack} from "@mui/material";


const SchoolLegend = ({school}) => {
    return (
        <Container
            style={{
                margin: "auto",
                width: "90%",
                padding: "10px",
                height: "95px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>

            <Stack direction={"column"}>

                <Grid style={{
                    padding: "5px",
                    width: "100%",
                    minWidth: "100px",
                    fontWeight: "bold",
                    fontSize: "small",
                    backgroundColor: "#3366cc",
                    textAlign: "center",
                    border: '1px solid black',
                }}>
                    {school.schoolName}
                </Grid>


                <Grid style={{
                    padding: "5px",
                    fontWeight: "bold",
                    fontSize: "small",
                    width: "100%",
                    minWidth: "100px",
                    textAlign: "center",
                    border: '1px solid black',
                    backgroundColor: "#dc3911"
                }}>
                    District
                </Grid>


                <Grid style={{
                    padding: "5px",
                    fontWeight: "bold",
                    fontSize: "small",
                    width: "100%",
                    minWidth: "100px",
                    textAlign: "center",
                    border: '1px solid black',
                    backgroundColor: "#ff9900"
                }}>
                    State
                </Grid>

            </Stack>

        </Container>
    )
}

export default SchoolLegend;
