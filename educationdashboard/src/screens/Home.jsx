import '../index.css';
import '../css/search.css';
import LiveMap from "../components/LiveMap.jsx";
import { Link, TableCell, TableRow, Typography} from "@mui/material";
import dataFile from "../dataImport/dataFile.json";
import {useNavigate} from "react-router-dom";


function Home() {
    const navigate = useNavigate();


  return (
      <div id="container">
          <div id="title">
              <h1>South Carolina Schools Explorer</h1>
          </div>


          <div className="app-search">
              <div className="search-row">
                  <input id="fill-box" type="text" placeholder="Search school or district ..."/>
                      <i className="fa fa-search"></i>
              </div>
              <div className="search-eg">
                  <p>For example: </p>
                  <p><a href="/district">Abbeville County School District</a></p>
                  <p><a href="/school/0403024">Iva Elementary School</a></p>
              </div>
              <div id="suggestions-list" className="list-items"></div>
          </div>

          <div className="map-border">
            <LiveMap/>
          </div>

          <h1>School Data</h1>
          <table border="1" cellPadding="7" id="data" className="table table-striped">
          <thead>
          <tr>
              <th>Name</th>
              <th>Education Level</th>
              <th>Graduation Rate</th>
              <th>Avg ACT Score</th>
              <th>Avg Teacher Salary</th>
              <th>3-Yr Teacher Retention</th>
          </tr>
          </thead>
          <tbody>
          {dataFile === undefined ? <></> :
              Object.entries(dataFile).map((school, index) => {
                      return (
                          <TableRow
                              key={index} sx={{'&:last-child td, &:last-child th': {border: 0}}}
                          >
                              <TableCell component="th" scope="row">
                                  <Typography>
                                      <Link onClick={() =>  {navigate(`/school/${school[0]}`)}}>
                                          {school[1].schoolName}
                                      </Link>
                                  </Typography>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                  <Typography>{school[1].schoolType}</Typography>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                  <Typography>{school[1].gradRate ?? ""}</Typography>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                  <Typography>{school[1].academicPerformance.ACTCompositeAVG ?? ""}</Typography>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                  <Typography>{school[1].avgTeacherSalary ?? ""}</Typography>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                  <Typography>{school[1].teacherReturnRate ?? ""}</Typography>
                              </TableCell>

                          </TableRow>
                      )
              })
          }

          </tbody>
      </table>


</div>
  )
}

export default Home
