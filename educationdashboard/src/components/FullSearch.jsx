import {List, ListItem, ListItemButton, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {
    fullSearchList,
    schoolId,
    schoolCode,
    selectedSchoolCode,
    selectedSchoolId,
    topSearchResults, allSchools
} from "../store/signalStore.js"
import home from "../assets/home.png"
import {navigateToPage} from "../utils/functions.js";

const FullSearch = () => {
    const navigate = useNavigate();
    const searchName = (e) => {
        let result;

        if (fullSearchList.value !== undefined) {
            result = fullSearchList.value.filter((school) =>
                school.schoolName.toLowerCase().includes(e.target.value.toLowerCase()))


            const resultsSort = result?.sort((a, b) => a.schoolName.localeCompare(b.schoolName))
            topSearchResults.value = resultsSort
        }
    }

    // const SearchResultsDisplay = () => {
    //     // if (results !== undefined) {
    //     topSearchResults.value.map((school, index) => {
    //         return (
    //             <ListItem key={index} disablePadding>
    //                 <ListItemButton onClick={() => {
    //                     schoolCode.value = school.type;
    //                     schoolId.value = school.id
    //                     if (school.type === "D") {
    //                         navigate(`/district`)
    //                     } else {
    //                         navigate(`/school`)
    //                     }
    //                 }}>
    //                     {school.name}
    //                 </ListItemButton>
    //             </ListItem>
    //         )
    //     })
    // }
    return (
        <Stack>
            <div className={"app-search"}>
            <a href="../../"><img alt={"home icon"} src={home}/></a>
                <input style={{width: "80%"}} id="fill-box" type="text" placeholder="Search school or district ..."
                       onChange={(e) => {
                           searchName(e)
                       }}/>
            </div>
            <div>
                <List component="div" disablePadding>
                    {/*<SearchResultsDisplay />*/}
                    {topSearchResults.value.length !== fullSearchList.value.length ? topSearchResults.value.map((school, index) => {
                        return (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={() => {
                                    school.schoolCode = school.schoolCode
                                    school.schoolId = school.schoolId
                                    navigateToPage(school, navigate)
                                    topSearchResults.value = []
                                }}>
                                    {school.schoolName}
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