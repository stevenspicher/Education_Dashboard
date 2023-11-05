import {Stack} from "@mui/material";
import home from "../../../assets/home.png"

const FullSearch = () => {
    return (
        <Stack>

            <div className="app-search">
                        <a href="../../"><img alt={"home icon"} src={home}/></a>
                        <div  style={{width: "80%"}}>
                            <input id="fill-box" type="text" placeholder="Search school or district ..."/>
                            <i className="fa fa-search"></i>
                        </div>
                    </div>
        </Stack>
    )
}

export default FullSearch