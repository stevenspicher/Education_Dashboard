import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import Home from "./pages/Home/Home.jsx";
import School from "./pages/School/School.jsx";
import District from "./pages/District/District.jsx";

function App () {
    // TODO:  for eventual API data load:
    // const [apiData, setAPIData] = useState()
    // const getApiData = async () =>  {
    //     const response = await fetch("http://192.168.86.94:5001/api.json");
    //     const data = response.json();
    //    return data;
    // }
    // useEffect(() => {
    // getApiData().then(data => setAPIData(data))
    // setAPIData(getApiData())
    // }, []);
    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/home"/>}/>
            <Route path="home" element={<Home />}/>
            <Route path="district" element={<District/>}/>
            <Route path="district/:id" element={<District/>}/>
            <Route path="school" element={<School/>}/>
            <Route path="school/:idandcode" element={<School/>}/>
        </Routes>
    )
}

export default App;