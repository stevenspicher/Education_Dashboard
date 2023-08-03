import "../css/search.css"
import "../css/district.css"
import home from "../assets/home.png"
const District = () => {
    return (
        <>
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
    <div className="container">
        <div className="title-text">
            <h1>Abbeville County School Dist</h1>
            <h2><span id="student-count"></span> students</h2>
            <h4>400 Greenville Street, Abbeville</h4>
            <h4>864-366-5427, <a href="https://acsdsc.org" target="_blank">website</a></h4>
        </div>
        <div className="row">
            <div className="col-12 col-md-6 graphic">
                <div id='map' className="graphic-style"></div>
            </div>
            <div className="col-12 col-md-6 graphic">
                <div className="school-col-inner">
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
                </div>
            </div>
            <div className="graphic">
                <div className="graphic-style">
                    <h5>Academic Performance</h5>
                    <div className="row">
                        <div className="col-sm-4">
                            <canvas id="chart-academic"></canvas>
                        </div>
                        <div className="col-sm-4">
                            <canvas id="chart-academic2"></canvas>
                        </div>
                        <div className="col-sm-4">
                            <canvas id="chart-academic3"></canvas>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <canvas id="chart-academic4"></canvas>
                        </div>
                        <div className="col-sm-6">
                            <canvas id="chart-academic5"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-12 graphic">
                <div className="graphic-style">
                    <h5>Demographics</h5>
                    <div className="row">
                        <div className="col-sm-6">
                            <canvas id="chart-poverty"></canvas>
                        </div>
                        <div className="col-sm-6">
                            <canvas id="chart-disabilities"></canvas>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <canvas id="chart-race"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4 graphic">
                <div className="graphic-style">
                    <div id="chart-harrassment"></div>
                </div>
            </div>
            <div className="col-md-4 graphic">
                <div className="graphic-style">
                    <div id="chart-teacherpay"></div>
                </div>
            </div>
            <div className="col-md-4 graphic">
                <div className="graphic-style">
                    <div id="chart-childsafe"></div>
                </div>
            </div>
            <div className="col-12 col-md-4 graphic">
                <div className="graphic-style">
                    <div id="chart-teachersafe"></div>
                </div>
            </div>
            <div className="col-12 col-md-4 graphic">
                <div className="graphic-style">
                    <div id="chart-violent"></div>
                </div>
            </div>
        </div>


    </div>
        </>
    )
};

export default District