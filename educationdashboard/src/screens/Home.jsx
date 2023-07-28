import '../index.css';
import '../css/search.css';
import LiveMap from "../components/LiveMap.jsx";

function Home() {

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
