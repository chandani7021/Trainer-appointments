import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import AddClient from "./components/addAppointment.jsx/AddClient";
import View from "./components/ViewAppointment/View";
import ShowCalender from "./components/Calender/ShowCalender";
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddClient />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/calender" element={<ShowCalender />} />
      </Routes>
    </Router>

  );
}

export default App;
