import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import AddPatient from "./pages/addpatient/AddPatient.jsx";
import "./index.css"
import Patients from "./pages/patients/Patients.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/add-patient" element={<AddPatient />} />
      </Routes>
    </Router>
  );
};

export default App;
