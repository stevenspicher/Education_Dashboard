import "../css/search.css"
import "../css/district.css"
import home from "../assets/home.png"
import {Card, Container} from "react-bootstrap";
import {Stack} from "@mui/material";
import {Chart} from "react-google-charts";
import {
    createAverageACTScoreData,
    createBlackData,
    createDistrictScoreData,
    createOnTimeGraduationRateData, createOtherData,
    createStudentsInPovertyData,
    createStudentsWithDisabilitiesData, createWhiteData,
    options,

} from "../components/District/districtDataFunctions";
import dataFile from "../dataImport/dataFile.json";
import LiveMap from "../components/LiveMap.jsx";
import {useParams} from "react-router";
import DistrictSchoolList from "../components/District/DistrictSchoolList.jsx";

const District = () => {
    const {id} = useParams();
    console.log(dataFile[id])
    return (
        <Container>
            <div className="search-block">
                <div className="app-search">
                    <a href="../../.."><img src={home} alt="home icon"/></a>
                    <div className="search-row">
                        <input id="fill-box" type="text" placeholder="Search school or district ..."/>
                        <i className="fa fa-search"></i>
                    </div>
                </div>

                <div id="suggestions-list" className="list-items"></div>
            </div>
            <div className="title-text">
                <h1>{dataFile[id].schoolName}</h1>
                <h2>{dataFile[id].totalStudents} students</h2>
                <h4>{dataFile[id].street}, {dataFile[id].city}</h4>
                <h4>{dataFile[id].schoolPhone}, <a href={dataFile[id].url} target="_blank">website</a></h4>
            </div>
            <Stack direction={"row"} spacing={3}>
                <Card style={{minWidth: 520}}>
                    <LiveMap/>
                </Card>
                <Card style={{minWidth: 520}}>
                    <DistrictSchoolList list={dataFile[id].districtSchoolList}/>
                </Card>
            </Stack>
            <div className={"chart-container graphic-style"}>
                <Stack>
                    <h5>Academic Performance</h5>
                    <Stack className="chart-container" direction={"row"}>
                        <Chart
                            chartType="ColumnChart"
                            width="200px"
                            height="50%"
                            data={createDistrictScoreData(dataFile[id], "Reading")}
                            options={options}
                        />
                        <Chart
                            chartType="ColumnChart"
                            width="200px"
                            height="50%"
                            data={createDistrictScoreData(dataFile[id], "Math")}
                            options={options}
                        />
                        <Chart
                            chartType="ColumnChart"
                            width="200px"
                            height="50%"
                            data={createDistrictScoreData(dataFile[id], "Science")}
                            options={options}
                        />
                    </Stack>
                    <Stack className="chart-container" direction={"row"}>
                        <Chart
                            chartType="ColumnChart"
                            width="200px"
                            height="50%"
                            data={createOnTimeGraduationRateData(dataFile[id])}
                            options={options}
                        />
                        <Chart
                            chartType="ColumnChart"
                            width="200px"
                            height="50%"
                            data={createAverageACTScoreData(dataFile[id])}
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
                                    data={createStudentsInPovertyData(dataFile[id])}
                                    options={options}
                                />
                                <Chart
                                    chartType="ColumnChart"
                                    width="200px"
                                    height="50%"
                                    data={createStudentsWithDisabilitiesData(dataFile[id])}
                                    options={options}
                                />
                            </Stack>
                            <Stack className="chart-container" direction={"row"}>
                                <Chart
                                    chartType="ColumnChart"
                                    width="200px"
                                    height="50%"
                                    data={createWhiteData(dataFile[id])}
                                    options={options}
                                />
                                <Chart
                                    chartType="ColumnChart"
                                    width="200px"
                                    height="50%"
                                    data={createBlackData(dataFile[id])}
                                    options={options}
                                />
                                <Chart
                                    chartType="ColumnChart"
                                    width="200px"
                                    height="50%"
                                    data={createOtherData(dataFile[id])}
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
                            <Card.Title className="card-total">{dataFile[id].bullyAndHarass}</Card.Title>
                            <Card.Text>
                                Number of incidents of bullying or harassment
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4 graphic">
                    <Card className="graphic-style card-width">
                        <Card.Body>
                            <Card.Title className="card-total">{dataFile[id].avgTeacherSalary}</Card.Title>
                            <Card.Text>
                                Average teacher pay
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4 graphic">
                    <Card className={"graphic-style card-width"}>
                        <Card.Body>
                            <Card.Title className="card-total">{dataFile[id].parentFeelsSafe}</Card.Title>
                            <Card.Text>
                                Parents who agree "my child feels safe at school"
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-12 col-md-4 graphic">
                    <Card className="graphic-style card-width">
                        <Card.Body>
                            <Card.Title className="card-total">{dataFile[id].teacherFeelsSafe}</Card.Title>
                            <Card.Text>
                                Teachers who agree "I feel safe at my school"
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-12 col-md-4 graphic">
                    <Card className="graphic-style card-width">
                        <Card.Body>
                            <Card.Title className="card-total">{dataFile[id].teacherFeelsSafe}</Card.Title>
                            <Card.Text>
                                Number of violent assaults -- fix
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            {/*</div>*/}


        </Container>
    );
};

export default District