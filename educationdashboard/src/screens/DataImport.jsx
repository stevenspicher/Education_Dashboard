import {useState} from "react";
import {AdditionalInfoImport} from "../dataImport/AdditionalInfoImport.js";
import {ReportCardImport} from "../dataImport/ReportCardImport.js";
import {Box, Dialog, IconButton, Typography, Button} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import {createMainPageDataObject, createGradRateDataObject, createCollegeDataObject} from "../functions/functions.js";

function CloseIcon() {
    return null;
}

const ReportCardDataImport = () => {
    const [reportCardData, setReportCardData] = useState(undefined);
    const [additionalInfoData, setAdditionalInfoData] = useState(undefined);
    const [currentYear, setCurrentYear] = useState(undefined);
    const [yearVerified,setYearVerified] = useState(false);
    const [reportCardVerified, setReportCardVerified] = useState(false);
    const [additionalInfoVerified, setAdditionalInfoVerified] = useState(false);

    const [open, setOpen] = useState(true)

function mergeData (reportCardData, additionalInfoData, currentYear) {
        console.log(additionalInfoData)

const mainPage = createMainPageDataObject(reportCardData);
const gradRate = createGradRateDataObject(reportCardData);
const college = createCollegeDataObject(additionalInfoData);

// const ratings = createDataObject(reportCardData, "ratings");
// const participation = createDataObject(reportCardData, "participation");
// const participationBySubject = createDataObject(reportCardData, "participationBySubject");
        console.log(mainPage)
        console.log(gradRate)
        console.log(college)
        // console.log(participation)
        // console.log(participationBySubject)
}


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        <Dialog
            open={open}
            fullWidth
            maxWidth={"xl"}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

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
            <Button onClick={() => mergeData(reportCardData, additionalInfoData, currentYear)}>Merge Data</Button>
            </Box>
        </Dialog>
    )
}

export default ReportCardDataImport