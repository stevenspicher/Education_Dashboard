import "../css/schools.css";
import home from "../assets/home.png"
import { Card, Container} from "react-bootstrap";
import {useParams} from "react-router";
import {Chart} from "react-google-charts";


import dataFile from "../dataImport/dataFile.json";
import {
    options,
    createScoreData,
    createStudentsInPovertyData,
    createStudentsWithDisabilitiesData,
    createStudentEthnicityData,
    createOnTimeGraduationRateData,
    createDropoutPercentageData,
    createAverageACTScoreData,
    createCollegeReadyDiplomaEarnersData,
    createCareerReadyDiplomaEarnersData, createELLStudentData, optionsLegend,
} from "../components/School/schoolDataFunctions.js";
import {Stack} from "@mui/material";

const School = () => {
    const {id} = useParams();
    console.log(dataFile[id])



    return (
        <>
            <Container fluid>
                <div className="search-block">
                    <div className="app-search">
                        <a href="../../"><img alt={"home icon"} src={home}/></a>
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
                        <div
                            className={"h4"}>{dataFile[id].totalStudents} students, {dataFile[id].teacherCount} teachers
                        </div>
                    </div>

                    <div className=" graphic">
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
                                        width="300px"
                                        height="50%"
                                        data={createScoreData(dataFile[id], "Reading")}
                                        options={optionsLegend}
                                    />
                                    <Chart
                                        chartType="ColumnChart"
                                        width="300px"
                                        height="50%"
                                        data={createScoreData(dataFile[id], "Math")}
                                        options={options}
                                    />
                                    {dataFile[id].schoolType === "High School" ?
                                    <Chart
                                        chartType="ColumnChart"
                                        width="300px"
                                        height="50%"
                                        data={createAverageACTScoreData(dataFile[id])}
                                        options={options}
                                    /> :
                                        <Chart
                                            chartType="ColumnChart"
                                            width="300px"
                                            height="50%"
                                            data={createScoreData(dataFile[id], "Science")}
                                            options={options}
                                        />
                                    }
                                </Stack>
                                {dataFile[id].schoolType === "High School" ?
                                    <>
                                    <Stack className="chart-container" direction={"row"}>
                                        <Chart
                                            chartType="ColumnChart"
                                            width="400px"
                                            height="50%"
                                            data={createOnTimeGraduationRateData(dataFile[id])}
                                            options={options}
                                        />
                                        <Chart
                                            chartType="ColumnChart"
                                            width="400px"
                                            height="50%"
                                            data={createDropoutPercentageData(dataFile[id])}
                                            options={options}
                                        />
                                    </Stack>
                                    <Stack className="chart-container" direction={"row"}>
                                    <Chart
                                        chartType="ColumnChart"
                                        width="400px"
                                        height="50%"
                                        data={createCollegeReadyDiplomaEarnersData(dataFile[id])}
                                        options={options}
                                    />
                                    <Chart
                                        chartType="ColumnChart"
                                        width="400px"
                                        height="50%"
                                        data={createCareerReadyDiplomaEarnersData(dataFile[id])}
                                        options={options}
                                    />
                                </Stack>
                                    </>

                                    : <></>
                                }


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
                                        data={createStudentsInPovertyData(dataFile[id])}
                                        options={options}
                                    /></div>
                                <div className="column is-one-third">
                                    <Chart
                                        chartType="ColumnChart"
                                        // width="300px"
                                        // height="70%"
                                        data={createStudentsWithDisabilitiesData(dataFile[id])}
                                        options={options}
                                    /></div>
                                <div className="column is-one-third">

                                    <Chart
                                        chartType="ColumnChart"
                                        width="200px"
                                        height="50%"
                                        data={createELLStudentData(dataFile[id])}
                                        options={options}
                                    />
                                </div>


                                <div className="column is-one-third">
                                    <Chart
                                        chartType="ColumnChart"
                                        // width="200px"
                                        height="100%"
                                        data={createStudentEthnicityData(dataFile[id], "White")}
                                        options={options}
                                    />
                                </div>
                                <div className="column is-one-third">
                                    <Chart
                                        chartType="ColumnChart"
                                        // width="200px"
                                        height="100%"
                                        data={createStudentEthnicityData(dataFile[id], "Black")}
                                        options={options}
                                    />
                                </div>
                                <div className="column is-one-third">
                                    <Chart
                                        chartType="ColumnChart"
                                        // width="200px"
                                        height="100%"
                                        data={createStudentEthnicityData(dataFile[id], "Other")}
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
    );
}

export default School

