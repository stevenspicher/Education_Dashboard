import {List, ListItem, ListItemButton, Stack} from "@mui/material";
import home from "../../../assets/home.png"
import {useNavigate} from "react-router-dom";
import schoolData from "../../../dataImport/homeSchoolData.json";
import districtsData from "../../../dataImport/districtsData.json";
import {useState} from "react";

const FullSearch = () => {
    const navigate = useNavigate();
    const [results, setResults] = useState([])
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
            setResults(resultsSort)
        }
    }
    console.log(results)



    const SearchResultsDisplay = () => {
        // if (results !== undefined) {
            results.map((school, index) => {
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
        // }

    return (
        <>
        <Stack>

            <div className="app-search">
                        <a href="../../"><img alt={"home icon"} src={home}/></a>
                        <div style={{width: "80%"}}>
                            <input  id="fill-box" type="text" placeholder="Search school or district ..."
                                    onChange={(e) => {
                                        searchName(e)
                                    }}/>
                        </div>
                    </div>
        </Stack>
            <div>
                <List component="div" disablePadding>

                    {results.length !== list.length ?
                        results.map((school, index) => {
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
            </>
    )
}

export default FullSearch