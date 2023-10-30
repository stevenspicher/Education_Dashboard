import {Chart} from "react-google-charts";

import {Stack} from "@mui/material";
import {
    createBlackData,
    createOtherData,
    createStudentsInPovertyData, createStudentsWithDisabilitiesData,
    createWhiteData, options
} from "../districtDataFunctions.js";

const DistrictDemographics = ({district}) => {
    return (
       <Stack>

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
                                   data={createStudentsInPovertyData(district)}
                                   options={options}
                               />
                               <Chart
                                   chartType="ColumnChart"
                                   width="200px"
                                   height="50%"
                                   data={createStudentsWithDisabilitiesData(district)}
                                   options={options}
                               />
                           </Stack>
                           <Stack className="chart-container" direction={"row"}>
                               <Chart
                                   chartType="ColumnChart"
                                   width="200px"
                                   height="50%"
                                   data={createWhiteData(district)}
                                   options={options}
                               />
                               <Chart
                                   chartType="ColumnChart"
                                   width="200px"
                                   height="50%"
                                   data={createBlackData(district)}
                                   options={options}
                               />
                               <Chart
                                   chartType="ColumnChart"
                                   width="200px"
                                   height="50%"
                                   data={createOtherData(district)}
                                   options={options}
                               />
                           </Stack>


                       </Stack>
                   </div>
               </div>
           </div>
       </Stack>
    )
}
export default DistrictDemographics