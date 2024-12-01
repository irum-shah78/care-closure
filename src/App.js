import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import AddPatient from "./pages/addpatient/AddPatient.jsx";
import "./index.css"
import Patients from "./pages/patients/Patients.jsx";
import PreRegistration from "./components/previsitregistration/PreRegistration.jsx";
import PatientsInHospital from "./pages/checkin-checkout/PatientsInHosp.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/add-patient" element={<AddPatient />} />
        <Route path="/patients/pre-registration" element={<PreRegistration />} />
        <Route path="/checkin-checkout" element={<PatientsInHospital />} />
      </Routes>
    </Router>
  );
};

export default App;
