import React, { createContext, useContext, useState } from "react";

const PatientsContext = createContext();

export const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);

  const addPatient = (newPatient) => {
    setPatients((prevPatients) => [...prevPatients, newPatient]);
  };

  return (
    <PatientsContext.Provider value={{ patients, addPatient }}>
      {children}
    </PatientsContext.Provider>
  );
};

export const usePatients = () => useContext(PatientsContext);
