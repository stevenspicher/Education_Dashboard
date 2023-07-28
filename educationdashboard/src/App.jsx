import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from "./screens/Home.jsx";
import School from "./screens/School.jsx";
import District from "./screens/District.jsx";

function App () {
    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/home"/>}/>
            <Route path="home" element={<Home/>}/>
            <Route path="district" element={<District/>}/>
            <Route path="school" element={<School/>}/>
        </Routes>
    )
}

export default App;