import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Add,
  Home,
  Task,
  Login,
  Register,
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
        <Route path="/login" element={ <Login/>}/> 
        <Route path="/register" element={ <Register/>}/> 
    </Routes>
    </div>
  </Router>
);

