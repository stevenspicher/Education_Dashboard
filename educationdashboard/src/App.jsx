import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import Home from "./screens/Home.jsx";
import School from "./screens/School.jsx";
import District from "./screens/District.jsx";
import ReportCardDataImport from "./screens/DataImport.jsx";

function App () {
    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/home"/>}/>
            <Route path="home" element={<Home/>}/>
            <Route path="district" element={<District/>}/>
            <Route path="district/:id" element={<District/>}/>
            <Route path="school" element={<School/>}/>
            <Route path="school/:idandcode" element={<School/>}/>
            <Route path="importdata" element={<ReportCardDataImport/>}/>
        </Routes>
    )
}

export default App;