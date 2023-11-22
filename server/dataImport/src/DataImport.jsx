import {useState} from "react";

import {Box, Typography, Button} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import {mergeData} from "./functions/mergeData_2"
import {ReportCardImport} from "./importScripts/ReportCardImport.js";
import {AdditionalInfoImport} from "./importScripts/AdditionalInfoImport.js";
import etl_school_data from "../src/assets/etl_school_full_data_with_coords.json"


const ReportCardDataImport = () => {
    const serverIP = "http://localhost:5001"
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
        ;
    }


        const sendJSONData = (data) => {
            fetch('http://localhost:5001/posthomed', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.homeDistrictInfo, null, 2)
            })
            fetch('http://localhost:5001/posthomes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.homeSchoolInfo, null, 2)
            })
            fetch('http://localhost:5001/poststate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.state, null, 2)
            })
            fetch('http://localhost:5001/postdistricts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.districts, null, 2)
            })
            fetch('http://localhost:5001/poste', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.e, null, 2)
            })
            fetch('http://localhost:5001/posth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.h, null, 2)
            })
            fetch('http://localhost:5001/postm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.m, null, 2)
            })
            fetch('http://localhost:5001/postp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.p, null, 2)
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

                <Typography>Import CSV</Typography>
                <input
                    style={{maxWidth: "400px"}}
                    type="file"
                    multiple
                    onChange={(e) => {
                        // geoDataConversion(e.target.files[0])
                    }
                    }
                    name="myfile"/>
                {additionalInfoVerified ? <CheckIcon/> : <></>}

                <Button onClick={() => {
                    mergeData(reportCardData, additionalInfoData, setSchoolData, currentYear);
                }}>Merge Data</Button>
                <Button onClick={() => {
                    sendJSONData(schoolData)
                }}>Send Data To React</Button>
                <Button onClick={() => {
                    sendAPIData(schoolData)
                }}>Send Data To API</Button>

                <Button onClick={() => {
                    getApiData()
                }}>Get API</Button>

                <Button onClick={() => {
                    geoDataConversion(etl_school_data)
                }}>Convert GeoData</Button>

            </Box>
        )
    }

    export default ReportCardDataImport