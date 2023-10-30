import {Stack} from "@mui/material";

const FullSearch = () => {
    return (
        <Stack>

                <div >
                    <input id="fill-box" type="text" placeholder="Search school or district ..."/>
                    <i className="fa fa-search"></i>
                </div>
                <div>
                    <p>For example: </p>
                    <p><a href="/district/0160999">Abbeville County School District</a></p>
                    <p><a href="/school/0403024+E">Iva Elementary School</a></p>
                </div>
                <div id="suggestions-list" className="list-items"></div>
        </Stack>
    )
}

export default FullSearch