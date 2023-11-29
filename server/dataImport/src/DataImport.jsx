import {useState} from "react";

import {Box, Typography, Button} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import {mergeData} from "./functions/mergeData"
import {ReportCardImport} from "./importScripts/ReportCardImport.js";
import {AdditionalInfoImport} from "./importScripts/AdditionalInfoImport.js";


const ReportCardDataImport = () => {
    const [reportCardData, setReportCardData] = useState(undefined);
    const [additionalInfoData, setAdditionalInfoData] = useState(undefined);
    const [geoData, setGeoData] = useState();
    const [currentYear, setCurrentYear] = useState(undefined);
    const [reportCardVerified, setReportCardVerified] = useState(false);
    const [additionalInfoVerified, setAdditionalInfoVerified] = useState(false);


    const [schoolData, setSchoolData] = useState({});

    const [file, setFile] = useState();
    const [array, setArray] = useState([]);
    const fileReader = new FileReader();

    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

        const array = csvRows.map(i => {
            const values = i.split(",");
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            return obj;
        });

        setArray(array);
        console.log(array)
    };

    const handleOnChange = (e) => {
        setGeoData(e.target.files);
    };

    const geoDataConversion = (data) => {
        let schoolGeoData = {};
        // let schoolFeatures = []
        if (data) {
            data.map((school) => {
                console.log(school)
                let id = school["school_id"].toString()
                if (id.length === 6) {
                    id = "0" + id
                }
                if (school.lat !== "no_result")
                schoolGeoData[id] =
                    {
                        id: school.school_id,
                        lat: school.lat,
                        lon: school.lon,
                        name: school.school
                    }



            });
               writeGeoData(schoolGeoData)
        }

    }


        const sendJSONData = (data) => {

            fetch('http://localhost:5001/poststate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.state, null, 2)
            })
            fetch('http://localhost:5001/postall', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.allSchools, null, 2)
            })
        }

        const sendAPIData = (data) => {
            fetch('http://localhost:5001/postservefile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data, null, 2)
            })
        }

        const writeGeoData = (data) => {
            fetch('http://localhost:5001/postgeodata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data, null, 2)
            })
        }

        const getApiData = async () => {
            const response = await fetch("http://localhost:5001/api.json");
            const data = await response.json();
            console.log(data);
        }


        const style = {
            top: '70%',
            left: '50%',
            // bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            overflow: 'scroll',
        };
        return (

            <Box sx={style}>
                <Typography variant={"h3"}>Import Data for Schools Explorer</Typography>
                <Typography variant={"h5"}>Reports:</Typography>
                <Typography>Import Report Card Data For Researchers</Typography>
                <input
                    style={{maxWidth: "400px"}}
                    type="file"
                    multiple
                    onChange={(e) => {
                        ReportCardImport(e.target.files[0], setReportCardData, setCurrentYear, setReportCardVerified)
                    }}
                    name="myfile"/>
                {reportCardVerified ? <CheckIcon/> : <></>}
                <Typography>Import Report Card Data Additional Info</Typography>
                <input
                    style={{maxWidth: "400px"}}
                    type="file"
                    multiple
                    onChange={(e) => {
                        AdditionalInfoImport(e.target.files[0], setAdditionalInfoData, currentYear, setAdditionalInfoVerified)
                    }}
                    name="myfile"/>
                {additionalInfoVerified ? <CheckIcon/> : <></>}

                {/*<Typography>Import CSV</Typography>*/}
                {/*<input*/}
                {/*    style={{maxWidth: "400px"}}*/}
                {/*    type="file"*/}
                {/*    multiple*/}
                {/*    onChange={(e) => {*/}
                {/*        // geoDataConversion(e.target.files[0])*/}
                {/*    }*/}
                {/*    }*/}
                {/*    name="myfile"/>*/}
                {/*{additionalInfoVerified ? <CheckIcon/> : <></>}*/}
<div>

                <Button onClick={() => {
                    mergeData(reportCardData, additionalInfoData, setSchoolData, currentYear);
                }}>Merge Data</Button>
                <Button onClick={() => {
                    sendJSONData(schoolData)
                }}>Send Data To React</Button>
</div>
                {/*<Button onClick={() => {*/}
                {/*    sendAPIData(schoolData)*/}
                {/*}}>Send Data To API</Button>*/}

                {/*<Button onClick={() => {*/}
                {/*    getApiData()*/}
                {/*}}>Get API</Button>*/}

                {/*<Button onClick={() => {*/}
                {/*    geoDataConversion(etl_school_data)*/}
                {/*}}>Convert GeoData</Button>*/}

            </Box>
        )
    }

    export default ReportCardDataImport