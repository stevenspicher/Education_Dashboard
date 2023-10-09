import '../index.css';
import '../css/search.css';
import LiveMap from "../components/LiveMap.jsx";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../context/appContext.tsx";
import {TableCell, TableRow, Typography} from "@mui/material";

function Home() {
    const {state, dispatch} = useContext(AppContext)
    const [report, setReport] = useState(undefined)

    useEffect(() => {
        dispatch({})
        setReport(state.report)
    }, [state]);
console.log(report)

    const downloadFile = ({ data, fileName, fileType }) => {
        // Create a blob with the data we want to download as a file
        const blob = new Blob([data], { type: fileType })
        // Create an anchor element and dispatch a click event on it
        // to trigger a download
        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }

    const exportToJson = e => {
        e.preventDefault()
        downloadFile({
            data: JSON.stringify(report),
            fileName: 'data.json',
            fileType: 'text/json',
        })
    }
  return (
      <div id="container">
          <div id="title">
              <h1>South Carolina Schools Explorer</h1>
          </div>
          <div className='actionBtns'>
              <button type='button' onClick={exportToJson}>
                  Export to JSON
              </button>
          </div>

          <div className="app-search">
              <div className="search-row">
                  <input id="fill-box" type="text" placeholder="Search school or district ..."/>
                      <i className="fa fa-search"></i>
              </div>
              <div className="search-eg">
                  <p>For example: </p>
                  <p><a href="/district">Abbeville County School District</a></p>
                  <p><a href="/school">Iva Elementary School</a></p>
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
          {report === undefined ? <></> :
              report.mainPage.map((row, index) => {
                  const ID = row["SCHOOLID"];
console.log(report.gradRate[ID])
                      return (
                          <TableRow
                              key={index} sx={{'&:last-child td, &:last-child th': {border: 0}}}
                          >
                              <TableCell component="th" scope="row">
                                  <Typography>{row["SchoolNm"]}</Typography>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                  <Typography>{row["SCHOOLID"]}</Typography>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                  <Typography>{"report.gradRate[ID].GRADRATE22"}</Typography>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                  <Typography>{"Avg ACT Score"}</Typography>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                  <Typography>{"Avg Teacher Salary"}</Typography>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                  <Typography>{"3-Yr Teacher Retention"}</Typography>
                              </TableCell>

                          </TableRow>
                      )
              })
          }
          {/*{% for school in school_object_list %}*/}

          {/*<tr>*/}
          {/*    <td><a href="screens/school/{{ school.school_id }}/">{{school.school}}</a></td>*/}

          {/*    {% if school.type_y == 'H' %}*/}
          {/*    <td>High School</td>*/}
          {/*    {% elif school.type_y == 'M' %}*/}
          {/*    <td>Middle School</td>*/}
          {/*    {% elif school.type_y == 'E' %}*/}
          {/*    <td>Elementary School</td>*/}
          {/*    {% else %}*/}
          {/*    <td>N/A</td>*/}
          {/*    {% endif %}*/}

          {/*    {% if school.gpercent_overall|float|round(1) > 0 %}*/}
          {/*    <td>{{school.gpercent_overall | float | round(1)}}%</td>*/}
          {/*    {% else %}*/}
          {/*    <td></td>*/}
          {/*    {% endif %}*/}

          {/*    {% if school.act_avg_composite_score|float > 0 %}*/}
          {/*    <td>{{school.act_avg_composite_score}}</td>*/}
          {/*    {% else %}*/}
          {/*    <td></td>*/}
          {/*    {% endif %}*/}

          {/*    {% if school.tchsalary_avg_curr_yr|int|round(1) > 0 %}*/}
          {/*    <td>${{format_comma(school.tchsalary_avg_curr_yr | int | round(1))}}</td>*/}
          {/*    {% else %}*/}
          {/*    <td></td>*/}
          {/*    {% endif %}*/}

          {/*    {% if school.tchreturn3yr_avg_pct_curr_yr|float|round(1) > 0 %}*/}
          {/*    <td>{{school.tchreturn3yr_avg_pct_curr_yr | float | round(1)}}%</td>*/}
          {/*    {% else %}*/}
          {/*    <td></td>*/}
          {/*    {% endif %}*/}
          {/*</tr>*/}

          {/*{% endfor %}*/}
          </tbody>
      </table>


</div>
  )
}

export default Home
