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
import districtsData from "../dataImport/districtsData.json";
import LiveMap from "../components/LiveMap.jsx";
import {useParams} from "react-router";
import DistrictSchoolList from "../components/District/DistrictSchoolList.jsx";

const District = () => {
    const {id} = useParams();
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
                <h1>{ districtsData[id].schoolName}</h1>
                <h2>{ districtsData[id].totalStudents} students</h2>
                <h4>{ districtsData[id].street}, { districtsData[id].city}</h4>
                <h4>{ districtsData[id].schoolPhone}, <a href={ districtsData[id].url} target="_blank">website</a></h4>
            </div>
            <Stack direction={"row"} spacing={3}>
                <Card style={{minWidth: 520}}>
                    {/*<LiveMap/>*/}
                </Card>
                <Card style={{minWidth: 520}}>
                    <DistrictSchoolList list={ districtsData[id].districtSchoolList}/>
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
                            data={createDistrictScoreData(districtsData[id], "Reading")}
                            options={options}
                        />
                        <Chart
                            chartType="ColumnChart"
                            width="200px"
                            height="50%"
                            data={createDistrictScoreData(districtsData[id], "Math")}
                            options={options}
                        />
                        <Chart
                            chartType="ColumnChart"
                            width="200px"
                            height="50%"
                            data={createDistrictScoreData(districtsData[id], "Science")}
                            options={options}
                        />
                    </Stack>
                    <Stack className="chart-container" direction={"row"}>
                        <Chart
                            chartType="ColumnChart"
                            width="200px"
                            height="50%"
                            data={createOnTimeGraduationRateData(districtsData[id])}
                            options={options}
                        />
                        <Chart
                            chartType="ColumnChart"
                            width="200px"
                            height="50%"
                            data={createAverageACTScoreData(districtsData[id])}
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
                                    data={createStudentsInPovertyData(districtsData[id])}
                                    options={options}
                                />
                                <Chart
                                    chartType="ColumnChart"
                                    width="200px"
                                    height="50%"
                                    data={createStudentsWithDisabilitiesData(districtsData[id])}
                                    options={options}
                                />
                            </Stack>
                            <Stack className="chart-container" direction={"row"}>
                                <Chart
                                    chartType="ColumnChart"
                                    width="200px"
                                    height="50%"
                                    data={createWhiteData(districtsData[id])}
                                    options={options}
                                />
                                <Chart
                                    chartType="ColumnChart"
                                    width="200px"
                                    height="50%"
                                    data={createBlackData(districtsData[id])}
                                    options={options}
                                />
                                <Chart
                                    chartType="ColumnChart"
                                    width="200px"
                                    height="50%"
                                    data={createOtherData(districtsData[id])}
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
                            <Card.Title className="card-total">{ districtsData[id].bullyAndHarass}</Card.Title>
                            <Card.Text>
                                Number of incidents of bullying or harassment
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4 graphic">
                    <Card className="graphic-style card-width">
                        <Card.Body>
                            <Card.Title className="card-total">{ districtsData[id].avgTeacherSalary}</Card.Title>
                            <Card.Text>
                                Average teacher pay
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4 graphic">
                    <Card className={"graphic-style card-width"}>
                        <Card.Body>
                            <Card.Title className="card-total">{ districtsData[id].parentFeelsSafe}</Card.Title>
                            <Card.Text>
                                Parents who agree "my child feels safe at school"
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-12 col-md-4 graphic">
                    <Card className="graphic-style card-width">
                        <Card.Body>
                            <Card.Title className="card-total">{ districtsData[id].teacherFeelsSafe}</Card.Title>
                            <Card.Text>
                                Teachers who agree "I feel safe at my school"
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-12 col-md-4 graphic">
                    <Card className="graphic-style card-width">
                        <Card.Body>
                            <Card.Title className="card-total">{ districtsData[id].violentAssaults}</Card.Title>
                            <Card.Text>
                                Number of violent assaults
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