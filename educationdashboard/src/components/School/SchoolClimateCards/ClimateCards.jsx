import {Card} from "react-bootstrap";
import {Stack} from "@mui/material";

const ClimateCards = ({school}) => {

    return (
        <Stack>
            <h5 className={"chart-title"} style={{marginLeft:"100px"}}>School Climate</h5>
            <Stack
                className="chart-container"
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                // spacing={4}
            >
            <Card
                className={"card-graphic-style card-width"}
                style={{height:"175px", margin:"20px"}}
            >
                <Card.Body>
                    <Card.Title className="card-total">{school.bullyAndHarass}</Card.Title>
                    <Card.Text>
                        Number of incidents of bullying or harassment
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card
                className="card-graphic-style card-width"
                style={{height:"175px", margin:"20px"}}
            >
                <Card.Body>
                    <Card.Title className="card-total">{school.avgTeacherSalary}</Card.Title>
                    <Card.Text>
                        Average teacher pay
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card
                className={"card-graphic-style card-width"}
                style={{height:"175px", margin:"20px"}}
            >
                <Card.Body>
                    <Card.Title className="card-total">{school.parentFeelsSafe}</Card.Title>
                    <Card.Text>
                        Parents who agree "my child feels safe at school"
                    </Card.Text>
                </Card.Body>
            </Card>
            </Stack>
            <Stack
                className="chart-container"
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                // spacing={4}
            >
            <Card
                className="card-graphic-style card-width"
                style={{height:"175px", margin:"20px"}}
            >
                <Card.Body>
                    <Card.Title className="card-total">{school.teacherFeelsSafe}</Card.Title>
                    <Card.Text>
                        Teachers who agree "I feel safe at my school"
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card
                className="card-graphic-style card-width "
                style={{height:"175px", margin:"20px"}}
            >
                <Card.Body>
                    <Card.Title className="card-total">{school.violentAssaults}</Card.Title>
                    <Card.Text className={"h5"}>
                        Number of violent assaults
                    </Card.Text>
                </Card.Body>
            </Card>
            </Stack>
        </Stack>

    )
}
export default ClimateCards