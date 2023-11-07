import {List, ListItem, ListItemButton, Stack} from "@mui/material";
import schoolData from "../../../dataImport/homeSchoolData.json";
import districtsData from "../../../dataImport/districtsData.json"
import {useNavigate} from "react-router-dom";


const FullSearch = (props) => {
    const navigate = useNavigate();

        let list = [];
    Object.values(schoolData).map((school) => {

    list.push({name: school.schoolName, id: school.schoolId, type: school.schoolCode})
        })
    Object.entries(districtsData).map((district) => {
        list.push({name: district[1].schoolName, id: district[0], type: "D"})
    })
    const searchName = (e) => {

        let result;
        if (list !== undefined) {
            result = list.filter((school) =>
                school.name.toLowerCase().includes(e.target.value.toLowerCase())
            )
            const resultsSort = result?.sort((a, b) => a.name.localeCompare(b.name))
    props.setResults(resultsSort)
        }
    }

    const SearchResultsDisplay = () => {
        // if (results !== undefined) {
        props.results.map((school, index) => {
            return (
                <ListItem key={index} disablePadding>
                    <ListItemButton onClick={() => {
                        if (school.type === "D") {
                            navigate(`/district/${school.id}`)
                        } else {
                            navigate(`/school/${school.id}+${school.type}`)
                        }


                    }}>
                        {school.name}
                    </ListItemButton>
                </ListItem>
            )
        })
    }
    return (
        <Stack>

                <div className={"app-search"} >
                    <input style={{width:"80%"}} id="fill-box" type="text" placeholder="Search school or district ..."
                           onChange={(e) => {
                               searchName(e)
                           }}/>
                </div>
            <div>
                    <List component="div" disablePadding>
                        {/*<SearchResultsDisplay />*/}
                        {props.results.length !== list.length ? props.results.map((school, index) => {
                            return (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton onClick={() => {
if (school.type === "D")  {
    navigate(`/district/${school.id}`)}
else {
    navigate(`/school/${school.id}+${school.type}`)
}



                                    }}>
                                        {school.name}
                                    </ListItemButton>
                                </ListItem>
                            )
                        }) : <></>
                        }
                    </List>
                </div>
        </Stack>
    )
}

export default FullSearch