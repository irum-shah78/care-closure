import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import AddPatient from "./pages/addpatient/AddPatient.jsx";
import "./index.css";
import Patients from "./pages/patients/Patients.jsx";
import PreRegistration from "./pages/previsitregistration/PreRegistration.jsx";
import PatientsInHospital from "./pages/checkin-checkout/PatientsInHosp.jsx";
import PatientDetails from "./pages/patientdetails/PatientDetails.jsx";
import DuringVisit from "./pages/duringvisit/DuringVisit.jsx";
import PostVisit from "./pages/postvisit/PostVisit.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/add-patient" element={<AddPatient />} />
        <Route path="/checkin-checkout" element={<PatientsInHospital />} />
        <Route path="/patients/patient-details" element={<PatientDetails />} />
        <Route
          path="/patients/patient-details/pre-visit"
          element={<PreRegistration />}
        />
        <Route
          path="/patients/patient-details/during-visit"
          element={<DuringVisit />}
        />
        <Route
          path="/patients/patient-details/post-visit"
          element={<PostVisit />}
        />
      </Routes>
    </Router>
  );
};

export default App;
