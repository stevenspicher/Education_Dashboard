import "../css/schools.css";
import home from "../assets/home.png"
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useParams} from "react-router";
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
} from "../dataImport/data.js"
import dataFile from "../dataImport/dataFile.json";

const School = () => {
const {id} = useParams();

    return (
        <>
            <Container fluid>
                <div className="search-block">
                    <div className="app-search">
                        <a href="../../"><img src={home}/></a>
                        <div className="search-row">
                            <input id="fill-box" type="text" placeholder="Search school or district ..."/>
                            <i className="fa fa-search"></i>
                        </div>
                    </div>
                    <div id="suggestions-list" className="list-items"></div>
                </div>
                {/*</div>*/}
                <div className="container">

                    <div id="title">
                        <div className={"h1"}>{dataFile[id].schoolName}</div>
                        <div className={"h3"}>{dataFile[id].districtName}</div>
                        <div className={"h4"}>{dataFile[id].street}, {dataFile[id].city}</div>
                        <div className={"h4"}>{dataFile[id].totalStudents} students, {dataFile[id].teacherCount} teachers</div>
                    </div>

                    <div className="col-12 col-md-12 graphic">
                        <div className={"chart-graphic-style"}>
                            <Stack>
                                <h5 className={"chart-title"}>Academic Performance</h5>
                                <Stack
                                    className="chart-container"
                                    direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                    // spacing={4}
                                >
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
                                {/*<Stack className="chart-container" direction={"row"}>*/}
                                {/*    <Chart*/}
                                {/*        chartType="ColumnChart"*/}
                                {/*        width="200px"*/}
                                {/*        height="50%"*/}
                                {/*        data={onTimeGraduationRate}*/}
                                {/*        options={options}*/}
                                {/*    />*/}
                                {/*    <Chart*/}
                                {/*        chartType="ColumnChart"*/}
                                {/*        width="200px"*/}
                                {/*        height="50%"*/}
                                {/*        data={dropoutPercentage}*/}
                                {/*        options={options}*/}
                                {/*    />*/}
                                {/*</Stack>*/}
                                {/*<Stack className="chart-container" direction={"row"}>*/}
                                {/*    <Chart*/}
                                {/*        chartType="ColumnChart"*/}
                                {/*        width="200px"*/}
                                {/*        height="50%"*/}
                                {/*        data={collegeReadyDiplomaEarners}*/}
                                {/*        options={options}*/}
                                {/*    />*/}
                                {/*    <Chart*/}
                                {/*        chartType="ColumnChart"*/}
                                {/*        width="200px"*/}
                                {/*        height="50%"*/}
                                {/*        data={careerReadyDiplomaEarners}*/}
                                {/*        options={options}*/}
                                {/*    />*/}
                                {/*</Stack>*/}

                            </Stack>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 graphic">
                        <div className="chart-graphic-style">
                            <h5 className={"chart-title"}>Demographics</h5>
                            <div className={"columns is-desktop is-gapless is-multiline"}>
                                <div className="column is-one-third">
                                    <Chart
                                        chartType="ColumnChart"
                                        // width="300px"
                                        // height="70%"
                                        data={studentsInPoverty}
                                        options={options}
                                    /></div>
                                <div className="column is-one-third">
                                    <Chart
                                        chartType="ColumnChart"
                                        // width="300px"
                                        // height="70%"
                                        data={studentsWithDisabilities}
                                        options={options}
                                    /></div>
                                <div className="column is-one-third">
                                    <Chart
                                        chartType="ColumnChart"
                                        // width="300px"
                                        // height="70%"
                                        data={englishLanguageLearningStudents}
                                        options={options}
                                    /></div>


                                <div className="column is-one-third">
                                    <Chart
                                        chartType="ColumnChart"
                                        // width="200px"
                                        height="100%"
                                        data={white}
                                        options={options}
                                    />
                                </div>
                                <div className="column is-one-third">
                                    <Chart
                                        chartType="ColumnChart"
                                        // width="200px"
                                        height="100%"
                                        data={black}
                                        options={options}
                                    />
                                </div>
                                <div className="column is-one-third">
                                    <Chart
                                        chartType="ColumnChart"
                                        // width="200px"
                                        height="100%"
                                        data={other}
                                        options={options}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className={"card-container col-12 col-md-12  graphic"}>
                        <Card className={"card-graphic-style card-width"}>
                            <Card.Body>
                                <Card.Title className="card-total">{dataFile[id].bullyAndHarass}</Card.Title>
                                <Card.Text>
                                    Number of incidents of bullying or harassment
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        {/*</div>*/}
                        {/*<div className="col-md-4 graphic">*/}
                        <Card className="card-graphic-style card-width">
                            <Card.Body>
                                <Card.Title className="card-total">{dataFile[id].avgTeacherSalary}</Card.Title>
                                <Card.Text>
                                    Average teacher pay
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        {/*</div>*/}
                        {/*<div className="col-md-4 graphic">*/}
                        <Card className={"card-graphic-style card-width"}>
                            <Card.Body>
                                <Card.Title className="card-total">{dataFile[id].parentFeelsSafe}</Card.Title>
                                <Card.Text>
                                    Parents who agree "my child feels safe at school"
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        {/*</div>*/}
                        {/*<div className="col-12 col-md-4 graphic">*/}
                        <Card className="card-graphic-style card-width">
                            <Card.Body>
                                <Card.Title className="card-total">{dataFile[id].teacherFeelsSafe}</Card.Title>
                                <Card.Text>
                                    Teachers who agree "I feel safe at my school"
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        {/*</div>*/}
                        {/*// <div className="col-12 col-md-4 graphic">*/}
                        <Card className="card-graphic-style card-width ">
                            <Card.Body>
                                <Card.Title className="card-total">""</Card.Title>
                                <Card.Text className={"h5"}>
                                    Number of violent assaults
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    {/*</div>*/}
                </div>
            </Container>
        </>
    )
}

export default School

