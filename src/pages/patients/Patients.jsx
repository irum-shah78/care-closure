import React, { useState } from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import searchIcon from "../../assets/search-icon.svg";
import filterIcon from "../../assets/filter.svg";
import sortIcon from "../../assets/sort.svg";
import addIcon from "../../assets/add.svg";
import chronicIcon from "../../assets/chronic.svg";
import acuteIcon from "../../assets/acute.svg";
import { useNavigate } from "react-router-dom";

const getRandomStatus = () => (Math.random() < 0.5 ? "Chronic" : "Acute");

const patientsData = [
  {
    id: "#214",
    name: "Christopher",
    age: 32,
    gender: "Male",
    lastAppointment: "10:00 AM Aug 12, 24",
    nextAppointment: "10:00 AM Aug 12, 24",
    status: getRandomStatus(),
    description: "Heart Disease",
  },
  {
    id: "#215",
    name: "Emily",
    age: 56,
    gender: "Female",
    lastAppointment: "11:00 AM Aug 10, 24",
    nextAppointment: "09:00 AM Aug 15, 24",
    status: getRandomStatus(),
    description: "Diabetes",
  },
  {
    id: "#216",
    name: "John",
    age: 45,
    gender: "Male",
    lastAppointment: "12:00 PM Aug 08, 24",
    nextAppointment: "12:00 PM Aug 14, 24",
    status: getRandomStatus(),
    description: "Heart Disease",
  },
  {
    id: "#217",
    name: "Sophia",
    age: 29,
    gender: "Female",
    lastAppointment: "03:00 PM Aug 06, 24",
    nextAppointment: "11:00 AM Aug 20, 24",
    status: getRandomStatus(),
    description: "Heart Disease",
  },
  {
    id: "#218",
    name: "Michael",
    age: 63,
    gender: "Male",
    lastAppointment: "02:00 PM Aug 05, 24",
    nextAppointment: "10:00 AM Aug 18, 24",
    status: getRandomStatus(),
    description: "Heart Disease",
  },
  {
    id: "#219",
    name: "Olivia",
    age: 37,
    gender: "Female",
    lastAppointment: "09:00 AM Aug 04, 24",
    nextAppointment: "09:00 AM Aug 16, 24",
    status: getRandomStatus(),
    description: "Heart Disease",
  },
  {
    id: "#220",
    name: "Daniel",
    age: 51,
    gender: "Male",
    lastAppointment: "11:30 AM Aug 03, 24",
    nextAppointment: "03:00 PM Aug 13, 24",
    status: getRandomStatus(),
    description: "Heart Disease",
  },
  {
    id: "#221",
    name: "Isabella",
    age: 48,
    gender: "Female",
    lastAppointment: "08:30 AM Aug 02, 24",
    nextAppointment: "08:30 AM Aug 19, 24",
    status: getRandomStatus(),
    description: "Heart Disease",
  },
  {
    id: "#222",
    name: "Ethan",
    age: 34,
    gender: "Male",
    lastAppointment: "05:00 PM Aug 01, 24",
    nextAppointment: "05:00 PM Aug 21, 24",
    status: getRandomStatus(),
    description: "Liver Disease",
  },
  {
    id: "#223",
    name: "Ava",
    age: 42,
    gender: "Female",
    lastAppointment: "04:00 PM Jul 31, 24",
    nextAppointment: "04:00 PM Aug 22, 24",
    status: getRandomStatus(),
    description: "Heart Disease",
  },
  {
    id: "#224",
    name: "James",
    age: 50,
    gender: "Male",
    lastAppointment: "06:00 PM Jul 30, 24",
    nextAppointment: "02:00 PM Aug 23, 24",
    status: getRandomStatus(),
    description: "Kidney Stones",
  },
  {
    id: "#225",
    name: "Mia",
    age: 39,
    gender: "Female",
    lastAppointment: "07:00 PM Jul 29, 24",
    nextAppointment: "01:00 PM Aug 24, 24",
    status: getRandomStatus(),
    description: "Heart Disease",
  },
];

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/patients/add-patient");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPatients = patientsData.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="px-8 py-4">
          <h2 className="text-2xl font-semibold mb-4">Patients</h2>
          <div className="bg-white rounded-xl border shadow-sm p-4 overflow-auto">
            <div className="flex items-center justify-between mb-6 gap-6 ms-1">
              <div className="relative w-full">
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-[#D1D1D1] bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E2559]"
                  placeholder="Search Patient here.."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <img
                  src={searchIcon}
                  alt="Search Icon"
                  className="absolute top-2.5 right-3 text-gray-500 pointer-events-none"
                />
              </div>
              <div className="flex flex-col md:flex-row w-3/5 gap-3 space-y-2 md:space-y-0 md:space-x-2">
                <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                  <img src={filterIcon} alt="filter" /> Filter
                </button>
                <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                  <img src={sortIcon} alt="filter" /> Sort by
                </button>
                <button className="border border-[#B3B3B3] bg-[#2E2559] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm" onClick={handleClick}>
                  <img src={addIcon} alt="calendar" /> Add New Patient
                </button>
              </div>
            </div>

            <div className="bg-white overflow-hidden w-full h-full">
              <div className="max-h-[500px] overflow-y-auto w-full">
                <table className="w-full bg-white">
                  <thead className="bg-gray-200">
                    <tr>
                      {[
                        "ID",
                        "Name",
                        "Age",
                        "Gender",
                        "Last Appointment",
                        "Next Appointment",
                        "Status",
                        "Description",
                      ].map((header) => (
                        <th key={header} className="p-4 text-left">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map(
                      ({
                        id,
                        name,
                        age,
                        gender,
                        lastAppointment,
                        nextAppointment,
                        status,
                        description,
                      }) => (
                        <tr key={id} className="border-b hover:bg-gray-50">
                          <td className="p-4">{id}</td>
                          <td className="p-4">{name}</td>
                          <td className="p-4">{age}</td>
                          <td className="p-4">{gender}</td>
                          <td className="p-4">{lastAppointment}</td>
                          <td className="p-4">{nextAppointment}</td>
                          <td className="p-4">
                            <div
                              className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg ${
                                status === "Chronic"
                                  ? "bg-[#FFCDC9] text-[#D2362B]"
                                  : "bg-[#E0F5FF] text-[#1A408C]"
                              }`}
                            >
                              <img
                                src={
                                  status === "Chronic" ? chronicIcon : acuteIcon
                                }
                                alt={status}
                                className="w-4 h-4"
                              />
                              <span>{status}</span>
                            </div>
                          </td>
                          <td className="p-4">{description}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Patients;
