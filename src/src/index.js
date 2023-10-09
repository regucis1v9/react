import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Add,
  Home,
  Task,
  Header
} from "./components"
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <div>
    <Header />
    <Routes>
        <Route path="/" element={ <Home/>}/>
        <Route path="/add" element={ <Add/>}/> 
        <Route path="/task" element={ <Task/>}/> 
    </Routes>
    </div>
  </Router>
);

