import "../css/search.css";
import "../css/schools.css";
import "../css/district.css";
import home from "../assets/home.png"
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {Chart} from "react-google-charts";
import {Box, Grid, Stack} from "@mui/material";
import {
    scienceScoreData,
    readingScoreData,
    options,
    mathScoreData,
    careerReadyDiplomaEarners,
    collegeReadyDiplomaEarners,
    onTimeGraduationRate,
    dropoutPercentage,
    studentsWithDisabilities,
    studentsInPoverty,
    englishLanguageLearningStudents,
    black,
    white,
    other
} from "../data/data"


// const options = {
//     chart: {
//         // title: "Students with Positive Reading Score",
//         // subtitle: "Sales, Expenses, and Profit: 2014-2017",
//     },
// };
const School = () => {
    return (
        <>

            {/*<div className="container">*/}
            <Container sx={{maxWidth: "800"}}>
                <div className="search-block">
                    <div className="app-search">
                        <a href="../../"><img src={home}/></a>
                        <input id="fill-box" type="text" placeholder="Search school or district ..."/>
                        <i className="fa fa-search"></i>
                    </div>
                </div>
                <div id="suggestions-list" className="list-items"></div>
                <div className="search-row">
                </div>
                {/*</div>*/}
                <div id="title">
                    <div className={"h1"}>Iva Elementary School</div>
                    <div className={"h2"}>Anderson School District 3</div>
                    <div className={"h4"}>803 Antreville Hwy, Iva</div>
                    <div className={"h4"}>385 students, 30 teachers</div>
                </div>

                <div className={"chart-container graphic-style"}>
                    <Stack>


                    <h5>Academic Performance</h5>

                    <Stack className="chart-container" direction={"row"}>
                        <Chart
                            chartType="ColumnChart"
                            width="200px"
                            height="50%"
                            data={readingScoreData}
                            options={options}
                        />
                        <Chart
                            chartType="ColumnChart"
                            width="200px"
                            height="50%"
                            data={mathScoreData}
                            options={options}
                        />
                        <Chart
                            chartType="ColumnChart"
                            width="200px"
                            height="50%"
                            data={scienceScoreData}
                            options={options}
                        />
                    </Stack>
                        <Stack className="chart-container" direction={"row"}>
                            <Chart
                                chartType="ColumnChart"
                                width="200px"
                                height="50%"
                                data={onTimeGraduationRate}
                                options={options}
                            />
                            <Chart
                                chartType="ColumnChart"
                                width="200px"
                                height="50%"
                                data={dropoutPercentage}
                                options={options}
                            />
                        </Stack>
                        <Stack className="chart-container" direction={"row"}>
                            <Chart
                                chartType="ColumnChart"
                                width="200px"
                                height="50%"
                                data={collegeReadyDiplomaEarners}
                                options={options}
                            />
                            <Chart
                                chartType="ColumnChart"
                                width="200px"
                                height="50%"
                                data={careerReadyDiplomaEarners}
                                options={options}
                            />
                        </Stack>

                    </Stack>
                </div>
                <div className={"chart-container"}>

                    <div className="col-12 col-md-12 graphic">
                        <div className="graphic-style">
                            <Stack>
                            <h5>Demographics</h5>
                            <Stack className="chart-container" direction={"row"}>
                                <Chart
                                    chartType="ColumnChart"
                                    width="200px"
                                    height="50%"
                                    data={studentsInPoverty}
                                    options={options}
                                />
                                <Chart
                                    chartType="ColumnChart"
                                    width="200px"
                                    height="50%"
                                    data={studentsWithDisabilities}
                                    options={options}
                                />
                                <Chart
                                    chartType="ColumnChart"
                                    width="200px"
                                    height="50%"
                                    data={englishLanguageLearningStudents}
                                    options={options}
                                />
                            </Stack>
                                <Stack className="chart-container" direction={"row"}>
                                    <Chart
                                        chartType="ColumnChart"
                                        width="200px"
                                        height="50%"
                                        data={white}
                                        options={options}
                                    />
                                    <Chart
                                        chartType="ColumnChart"
                                        width="200px"
                                        height="50%"
                                        data={black}
                                        options={options}
                                    />
                                    <Chart
                                        chartType="ColumnChart"
                                        width="200px"
                                        height="50%"
                                        data={other}
                                        options={options}
                                    />
                                </Stack>


                        </Stack>
                        </div>
                    </div>
                </div>
                <div className={"card-container"}>
                    <div className="col-md-4 graphic">
                        <Card className={"graphic-style card-width"}>
                            <Card.Body>
                                <Card.Title className="card-total">0</Card.Title>
                                <Card.Text>
                                    Number of incidents of bullying or harassment
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4 graphic">
                        <Card className="graphic-style card-width">
                            <Card.Body>
                                <Card.Title className="card-total">$55,206</Card.Title>
                                <Card.Text>
                                    Average teacher pay
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4 graphic">
                        <Card className={"graphic-style card-width"}>
                            <Card.Body>
                                <Card.Title className="card-total">95%</Card.Title>
                                <Card.Text>
                                    Parents who agree "my child feels safe at school"
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-12 col-md-4 graphic">
                        <Card className="graphic-style card-width">
                            <Card.Body>
                                <Card.Title className="card-total">100%</Card.Title>
                                <Card.Text>
                                    Teachers who agree "I feel safe at my school"
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-12 col-md-4 graphic">
                        <Card className="graphic-style card-width">
                            <Card.Body>
                                <Card.Title className="card-total">8</Card.Title>
                                <Card.Text>
                                    Number of violent assaults
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                {/*</div>*/}


            </Container>
        </>
    )
}
export default School

