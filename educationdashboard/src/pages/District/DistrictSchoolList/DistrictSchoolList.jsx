import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {selectedDistrict} from "../../../store/signalStore.js";
import {navigateToPage} from "../../../utils/functions.js";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Link} from "@mui/material";
import Typography from '@mui/material/Typography';

const DistrictSchoolList = () => {
    const district = selectedDistrict.value
    const navigate = useNavigate();

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const displaySchoolInfo = (school, code) => {

        if (school.code === code) {
            school.schoolId = school.id
            return (
                <Link onClick={() => {
                    navigateToPage(school, navigate)
                }}>
                    {school.schoolName}
                </Link>
            )
        }
    }
    return (
        <div
            style={{
                overflow: "hidden",
                width:"50%",
            justifyContent:"space-evenly",
                maxHeight: "420px"
            }}
        >
            <h1
                style={{marginLeft:"100px", marginTop: "10px"}}
                className={"chart-title"} >Schools in this district:</h1>

            <Accordion  className="school-inner"  expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Elementary Schools</Typography>
                </AccordionSummary>
                <AccordionDetails >
                    {district.districtSchoolList.map((school, index) => {
                        return (
                            <div key={index}>
                                {displaySchoolInfo(school[0], "E")}
                            </div>
                        )
                    })
                    }
                </AccordionDetails>
            </Accordion>
            <Accordion  className="school-inner" expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Middle Schools</Typography>
                </AccordionSummary>
                <AccordionDetails >
                    {district.districtSchoolList.map((school, index) => {
                        return (
                            <div key={index}>
                                {displaySchoolInfo(school[0], "M")}
                            </div>
                        )
                    })
                    }
                </AccordionDetails>
            </Accordion>
            <Accordion className="school-inner" expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography>High Schools</Typography>
                </AccordionSummary>
                <AccordionDetails >
                    {district.districtSchoolList.map((school, index) => {
                        return (
                            <div key={index}>
                                {displaySchoolInfo(school[0], "H")}
                            </div>
                        )
                    })
                    }
                </AccordionDetails>
            </Accordion>
        </div>

    )
}

export default DistrictSchoolList;
