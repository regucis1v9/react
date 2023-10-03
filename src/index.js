import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Add,
  Home
} from "./components"
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
        <Route path="/" element={ <Home/>}/>
        <Route path="/add" element={ <Add/>}/> 
    </Routes>
  </Router>
);

