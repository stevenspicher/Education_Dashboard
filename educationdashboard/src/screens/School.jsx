import "../css/schools.css";
import home from "../assets/home.png"
import { Card, Container} from "react-bootstrap";
import {useParams} from "react-router";
import {Chart} from "react-google-charts";


import h from "../dataImport/h"
import e from "../dataImport/e"
import m from "../dataImport/m"
import p from "../dataImport/p"
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

    const {idandcode} = useParams();
    const id = idandcode.toString().split("+")[0]
    const code = idandcode.toString().split("+")[1]

    let school;
    
    switch (code) {
        case "H":
        school = h
            break;
        case "E":
            school = e
            break;
        case "P":
            school = p
            break;
        case "M" :
            school = m
            break;
    }

    school = school[id]



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
                        <div className={"h1"}>{school.schoolName}</div>
                        <div className={"h3"}>{school.districtName}</div>
                        <div className={"h4"}>{school.street}, {school.city}</div>
                        <div
                            className={"h4"}>{school.totalStudents} students, {school.teacherCount} teachers
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
                                        data={createScoreData(school, "Reading", "E")}
                                        options={optionsLegend}
                                    />
                                    <Chart
                                        chartType="ColumnChart"
                                        width="300px"
                                        height="50%"
                                        data={createScoreData(school, "Math", "E")}
                                        options={options}
                                    />
                                    {school.schoolType === "High School" ?
                                    <Chart
                                        chartType="ColumnChart"
                                        width="300px"
                                        height="50%"
                                        data={createAverageACTScoreData(school)}
                                        options={options}
                                    /> :
                                        <Chart
                                            chartType="ColumnChart"
                                            width="300px"
                                            height="50%"
                                            data={createScoreData(school, "Science", "E")}
                                            options={options}
                                        />
                                    }
                                </Stack>
                                {school.schoolType === "High School" ?
                                    <>
                                    <Stack className="chart-container" direction={"row"}>
                                        <Chart
                                            chartType="ColumnChart"
                                            width="400px"
                                            height="50%"
                                            data={createOnTimeGraduationRateData(school)}
                                            options={options}
                                        />
                                        <Chart
                                            chartType="ColumnChart"
                                            width="400px"
                                            height="50%"
                                            data={createDropoutPercentageData(school)}
                                            options={options}
                                        />
                                    </Stack>
                                    <Stack className="chart-container" direction={"row"}>
                                    <Chart
                                        chartType="ColumnChart"
                                        width="400px"
                                        height="50%"
                                        data={createCollegeReadyDiplomaEarnersData(school)}
                                        options={options}
                                    />
                                    <Chart
                                        chartType="ColumnChart"
                                        width="400px"
                                        height="50%"
                                        data={createCareerReadyDiplomaEarnersData(school)}
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
                                        data={createStudentsInPovertyData(school)}
                                        options={options}
                                    /></div>
                                <div className="column is-one-third">
                                    <Chart
                                        chartType="ColumnChart"
                                        // width="300px"
                                        // height="70%"
                                        data={createStudentsWithDisabilitiesData(school)}
                                        options={options}
                                    /></div>
                                <div className="column is-one-third">

                                    <Chart
                                        chartType="ColumnChart"
                                        width="200px"
                                        height="50%"
                                        data={createELLStudentData(school)}
                                        options={options}
                                    />
                                </div>


                                <div className="column is-one-third">
                                    <Chart
                                        chartType="ColumnChart"
                                        // width="200px"
                                        height="100%"
                                        data={createStudentEthnicityData(school, "White")}
                                        options={options}
                                    />
                                </div>
                                <div className="column is-one-third">
                                    <Chart
                                        chartType="ColumnChart"
                                        // width="200px"
                                        height="100%"
                                        data={createStudentEthnicityData(school, "Black")}
                                        options={options}
                                    />
                                </div>
                                <div className="column is-one-third">
                                    <Chart
                                        chartType="ColumnChart"
                                        // width="200px"
                                        height="100%"
                                        data={createStudentEthnicityData(school, "Other")}
                                        options={options}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className={"card-container col-12 col-md-12  graphic"}>
                        <Card className={"card-graphic-style card-width"}>
                            <Card.Body>
                                <Card.Title className="card-total">{school.bullyAndHarass}</Card.Title>
                                <Card.Text>
                                    Number of incidents of bullying or harassment
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        {/*</div>*/}
                        {/*<div className="col-md-4 graphic">*/}
                        <Card className="card-graphic-style card-width">
                            <Card.Body>
                                <Card.Title className="card-total">{school.avgTeacherSalary}</Card.Title>
                                <Card.Text>
                                    Average teacher pay
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        {/*</div>*/}
                        {/*<div className="col-md-4 graphic">*/}
                        <Card className={"card-graphic-style card-width"}>
                            <Card.Body>
                                <Card.Title className="card-total">{school.parentFeelsSafe}</Card.Title>
                                <Card.Text>
                                    Parents who agree "my child feels safe at school"
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        {/*</div>*/}
                        {/*<div className="col-12 col-md-4 graphic">*/}
                        <Card className="card-graphic-style card-width">
                            <Card.Body>
                                <Card.Title className="card-total">{school.teacherFeelsSafe}</Card.Title>
                                <Card.Text>
                                    Teachers who agree "I feel safe at my school"
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        {/*</div>*/}
                        {/*// <div className="col-12 col-md-4 graphic">*/}
                        <Card className="card-graphic-style card-width ">
                            <Card.Body>
                                <Card.Title className="card-total">{school.violentAssaults}</Card.Title>
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

