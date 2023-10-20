import {useContext, useState} from "react";
import {AdditionalInfoImport} from "../dataImport/AdditionalInfoImport.js";
import {ReportCardImport} from "../dataImport/ReportCardImport.js";
import {Box, Dialog, IconButton, Typography, Button} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import {AppContext} from "../context/appContext.tsx";
import {Navigate, useNavigate} from "react-router-dom";
import {mergeData} from "../functions/mergeData";

function CloseIcon() {
    return null;
}

const ReportCardDataImport = () => {
    const {dispatch} = useContext(AppContext)
    const [reportCardData, setReportCardData] = useState(undefined);
    const [additionalInfoData, setAdditionalInfoData] = useState(undefined);
    const [currentYear, setCurrentYear] = useState(undefined);
    const [yearVerified,setYearVerified] = useState(false);
    const [reportCardVerified, setReportCardVerified] = useState(false);
    const [additionalInfoVerified, setAdditionalInfoVerified] = useState(false);

    const [open, setOpen] = useState(true)

    const dispatchReport = (report) => {
        dispatch({
            type: "SAVE_REPORT", report: report
        })
    }
    const navigate = useNavigate();
    const [schoolData, setSchoolData] = useState({});

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const sendData = (data) => {
        fetch('http://192.168.86.94:5001/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data, null, 2)
        })
    }

const downloadFile = (data) => {

    // create file in browser
    const fileName = "data";
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
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
    let report;
    return (
        // <Dialog
        //     open={open}
        //     fullWidth
        //     maxWidth={"xl"}
        //     onClose={handleClose}
        //     aria-labelledby="modal-modal-title"
        //     aria-describedby="modal-modal-description"
        // >

            <Box sx={style}>
                <Typography variant={"h3"}>Import Data for Schools Explorer</Typography>
                {handleClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                ) : null}
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
        // </Dialog>
    )
}

export default ReportCardDataImport