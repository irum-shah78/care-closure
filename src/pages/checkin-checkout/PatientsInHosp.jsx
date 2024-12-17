import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import searchIcon from "../../assets/search-icon.svg";
import filterIcon from "../../assets/filter.svg";
import sortIcon from "../../assets/sort.svg";
import chronicIcon from "../../assets/chronic.svg";
import acuteIcon from "../../assets/acute.svg";
import waitingIcon from "../../assets/waiting.svg";
import inProgressIcon from "../../assets/inprogress.svg";
import { useNavigate } from "react-router-dom";

const getRandomStatus = () => (Math.random() < 0.5 ? "In Progress" : "Waiting");
const PatientsInHospital = () => {
  const [patientsData, setPatientsData] = useState([]);
  const [appointmentsData, setAppointmentsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    setPatientsData(storedPatients);
    const storedAppointments =
      JSON.parse(localStorage.getItem("patientVisits")) || [];
    setAppointmentsData(storedAppointments);
  }, []);

  const combinedData = patientsData.map((patient) => {
    const patientAppointments = appointmentsData.filter(
      (appointment) => appointment.patientId === patient.id
    );

    const sortedAppointments = patientAppointments.sort((a, b) => {
      const dateA = new Date(a.preferredDate + " " + a.preferredTimeSlot);
      const dateB = new Date(b.preferredDate + " " + b.preferredTimeSlot);
      return dateB - dateA;
    });

    const recentAppointment = sortedAppointments[0];
    const appointmentNumber = sortedAppointments.length;
    const getRandomAction = () => (Math.random() > 0.5 ? "Chronic" : "Acute");

    return {
      ...patient,
      date: recentAppointment?.preferredDate || "N/A",
      time: recentAppointment?.preferredTimeSlot || "N/A",
      status: recentAppointment?.status || getRandomStatus(),
      appointment: appointmentNumber || "N/A",
      action: getRandomAction(),
      appointTo: recentAppointment?.preferredDoctor || "N/A",
    };
  });

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPatients = combinedData.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePatientDetails = (patient) => {
    navigate("/patients/patient-details", { state: { patient } });
  };
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1 bg-gray-100">
        <Header />
        <div className="lg:px-8 px-4 py-6 bg-gray-100">
          <h2 className="text-2xl font-semibold mb-4">Patients In Hospital</h2>
          <div className="bg-white rounded-xl border shadow-sm p-4 overflow-auto">
            <div className="flex flex-col xl:flex-row items-start justify-between mb-6 gap-6 ms-1">
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
              {/* <div className="flex md:flex-row sm:flex-row w-[300px] gap-3 space-y-2 md:space-y-0 md:space-x-2">
                <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                  <img src={filterIcon} alt="filter" /> Filter
                </button>
                <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                  <img src={sortIcon} alt="filter" /> Sort by
                </button>
              </div> */}
              <div className="flex flex-row flex-wrap w-[300px] gap-3 gap-y-2">
  <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
    <img src={filterIcon} alt="filter" /> Filter
  </button>
  <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
    <img src={sortIcon} alt="filter" /> Sort by
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
                        "Contact No.",
                        "Time",
                        "Date",
                        "Status",
                        "Appoint to",
                        "Action",
                      ].map((header) => (
                        <th key={header} className="px-2 py-4 text-center">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient) => {
                      const {
                        id,
                        name,
                        age,
                        gender,
                        mobileNumber,
                        time,
                        date,
                        status,
                        appointTo,
                        action,
                      } = patient;
                      return (
                        <tr
                          key={id}
                          className="border-b hover:bg-gray-50 text-center cursor-pointer"
                          onClick={() => handlePatientDetails(patient)}
                        >
                          <td className="p-4">{id}</td>
                          <td className="p-4">{name}</td>
                          <td className="p-4">{age}</td>
                          <td className="p-4">{gender}</td>
                          <td className="p-4">{mobileNumber}</td>
                          <td className="p-4">{time}</td>
                          <td className="p-4">{date}</td>
                          <td className="p-4">
                            <div
                              className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg ${
                                status === "In Progress"
                                  ? "bg-[#E2E0E8] text-[#2E1A8C]"
                                  : "bg-[#DAEEF9] text-[#1A628C]"
                              }`}
                            >
                              <img
                                src={
                                  status === "In Progress"
                                    ? inProgressIcon
                                    : waitingIcon
                                }
                                alt={status}
                                className="w-4 h-4"
                              />
                              <span>{status}</span>
                            </div>
                          </td>
                          <td className="p-4">{appointTo}</td>
                          <td className="p-4">
                            <div
                              className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg ${
                                action === "Chronic"
                                  ? "bg-[#FFCDC9] text-[#D2362B]"
                                  : "bg-[#E0F5FF] text-[#1A408C]"
                              }`}
                            >
                              <img
                                src={
                                  action === "Chronic" ? chronicIcon : acuteIcon
                                }
                                alt={action}
                                className="w-4 h-4"
                              />
                              <span>{action}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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

export default PatientsInHospital;
