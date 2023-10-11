import "../css/search.css"
import "../css/district.css"
import home from "../assets/home.png"
import {Card, Container} from "react-bootstrap";
import {Stack} from "@mui/material";
import {Chart} from "react-google-charts";
import {
    black,
    careerReadyDiplomaEarners,
    collegeReadyDiplomaEarners,
    dropoutPercentage, englishLanguageLearningStudents,
    mathScoreData,
    onTimeGraduationRate,
    options, other,
    readingScoreData,
    scienceScoreData, studentsInPoverty, studentsWithDisabilities, white
} from "../dataImport/data.js";
import dataFile from "../dataImport/dataFile.json";
import LiveMap from "../components/LiveMap.jsx";
const District = () => {
    const studentNumber = "2,376"
    return (
<Container>
        <div className="search-block">
            <div className="app-search">
                <a href="../../.."><img src={home}/></a>
                <div className="search-row">
                    <input id="fill-box" type="text" placeholder="Search school or district ..."/>
                        <i className="fa fa-search"></i>
                </div>
            </div>

            <div id="suggestions-list" className="list-items"></div>
        </div>
        <div className="title-text">
            <h1>Abbeville County School Dist</h1>
            <h2>{studentNumber} students</h2>
            <h4>400 Greenville Street, Abbeville</h4>
            <h4>864-366-5427, <a href="https://acsdsc.org" target="_blank">website</a></h4>
        </div>
            <Stack direction={"row"}>

            {/*<div className=" graphic">*/}
            {/*    <div id='map' className="graphic-style">*/}
                    <LiveMap/>
                {/*</div>*/}
            {/*</div>*/}

            {/*<div className=" graphic">*/}
            {/*    <div className="school-col-inner">*/}
                    <h4>Schools in this district</h4>
                    <div className="inner-text">
                        <ul>
                            <li>Elementary Schools</li>
                            <ul>


                                <li><a href="../../school/160018/">Cherokee Trail Elementary</a></li>


                                <li><a href="../../school/160019/">Diamond Hill Elementary School</a></li>


                                <li><a href="../../school/160007/">John C. Calhoun Elementary School</a></li>


                                <li><a href="../../school/160017/">Westwood Elementary School</a></li>


                            </ul>
                            <li>Middle Schools</li>
                            <ul>


                                <li><a href="../../school/160018/">Cherokee Trail Middle</a></li>


                                <li><a href="../../school/160019/">Diamond Hill Middle School</a></li>


                                <li><a href="../../school/160016/">Wright Middle</a></li>


                            </ul>
                            <li>High Schools</li>
                            <ul>


                                <li><a href="../../school/160001/">Abbeville High School</a></li>


                                <li><a href="../../school/160003/">Dixie High School</a></li>


                            </ul>
                        </ul>
                    </div>
                {/*</div>*/}
            {/*</div>*/}
        </Stack>
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
    )
};

export default District