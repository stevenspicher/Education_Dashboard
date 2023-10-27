import {useContext, useState} from "react";
import {AdditionalInfoImport} from "../dataImport/AdditionalInfoImport.js";
import {ReportCardImport} from "../dataImport/ReportCardImport.js";
import {Box, IconButton, Typography, Button} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import {AppContext} from "../context/appContext.tsx";
import { useNavigate} from "react-router-dom";
import {mergeData} from "../functions/mergeData_2";

function CloseIcon() {
    return null;
}

const ReportCardDataImport = () => {
    const {dispatch} = useContext(AppContext)
    const [reportCardData, setReportCardData] = useState(undefined);
    const [additionalInfoData, setAdditionalInfoData] = useState(undefined);
    const [currentYear, setCurrentYear] = useState(undefined);
    const [reportCardVerified, setReportCardVerified] = useState(false);
    const [additionalInfoVerified, setAdditionalInfoVerified] = useState(false);


    const navigate = useNavigate();
    const [schoolData, setSchoolData] = useState({});


    const sendData = (data) => {
        fetch('http://192.168.86.94:5001/posthomed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data.homeDistrictInfo, null, 2)
        })
        fetch('http://192.168.86.94:5001/posthomes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data.homeSchoolInfo, null, 2)
        })
        fetch('http://192.168.86.94:5001/poststate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data.state, null, 2)
        })
        fetch('http://192.168.86.94:5001/postdistricts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data.districts, null, 2)
        })
        fetch('http://192.168.86.94:5001/poste', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data.e, null, 2)
        })
        fetch('http://192.168.86.94:5001/posth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data.h, null, 2)
        })
        fetch('http://192.168.86.94:5001/postm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data.m, null, 2)
        })
        fetch('http://192.168.86.94:5001/postp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data.p, null, 2)
        })
    }


    const style = {
        top: '70%',
        left: '50%',
        bgcolor: 'background.paper',
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
                        AdditionalInfoImport(e.target.files[0], setAdditionalInfoData, currentYear, setYearVerified, setAdditionalInfoVerified)
                    }}
                    name="myfile"/>
                {additionalInfoVerified ? <CheckIcon/> : <></>}
            <Button onClick={() => {
              mergeData(reportCardData, additionalInfoData, setSchoolData, currentYear);
            }}>Merge Data</Button>
                <Button onClick={() => {
                    sendData(schoolData)
            }}>Send Data</Button> <Button onClick={() => {
                navigate("/home")
            }}>Home</Button>

            </Box>
    )
}

export default ReportCardDataImport