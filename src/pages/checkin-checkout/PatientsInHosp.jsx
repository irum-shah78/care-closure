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
import { useTranslation } from "react-i18next";
import axios from "axios";

const PatientsInHospital = () => {
  const { t } = useTranslation();
  const [patientsData, setPatientsData] = useState([]);
  const [appointmentsData, setAppointmentsData] = useState([]);
  const navigate = useNavigate();
  const getRandomStatus = () =>
    Math.random() < 0.5
      ? t("pages.checkin-checkout.table.status.inProgress")
      : t("pages.checkin-checkout.table.status.waiting");

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    setPatientsData(storedPatients);
    const storedAppointments =
      JSON.parse(localStorage.getItem("patientVisits")) || [];
    setAppointmentsData(storedAppointments);
  }, []);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const headers = {
          "X-xPxApp-App-Account-Id": "<APP_ACCOUNT_ID>",
          "X-xPxApp-App-Auth": "<MD5_AUTH_TOKEN>",
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer <YOUR_AUTH_TOKEN>",
        };

        const response = await axios.get(
          "https://localhost:8000/patient-profiles",
          {
            headers,
            params: {
              q: searchTerm,
            },
          }
        );

        if (response.status === 200) {
          setPatientsData(response.data);
        } else {
          console.error("Failed to fetch patient profiles");
        }
      } catch (error) {
        console.error("Error fetching patient profiles:", error);
      }
    };

    fetchPatients();
  }, [searchTerm]);

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
    const getRandomAction = () =>
      Math.random() > 0.5
        ? t("pages.checkin-checkout.table.action.chronic")
        : t("pages.checkin-checkout.table.action.acute");

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

  const handlePatientDetails = async (patient) => {
    try {
      const headers = {
        "X-xPxApp-App-Account-Id": "<APP_ACCOUNT_ID>",
        "X-xPxApp-App-Auth": "<MD5_AUTH_TOKEN>",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer <YOUR_AUTH_TOKEN>",
      };

      const response = await axios.get(
        `https://localhost:8000/patient-profiles/${patient.id}`,
        { headers }
      );

      if (response.status === 200) {
        navigate("/patients/patient-details", {
          state: { patientDetails: response.data },
        });
      } else {
        console.error("Failed to fetch patient details");
      }
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  // const handlePatientDetails = (patient) => {
  //   navigate("/patients/patient-details", { state: { patient } });
  // };
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1 bg-gray-100">
        <Header />
        <div className="lg:px-8 px-4 py-6 bg-gray-100">
          <h2 className="text-2xl font-semibold mb-4">
            {t("pages.checkin-checkout.title")}
          </h2>
          <div className="bg-white rounded-xl border shadow-sm p-4 overflow-auto">
            <div className="flex flex-col xl:flex-row items-start justify-between mb-6 gap-6 ms-1">
              <div className="relative w-full">
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-[#D1D1D1] bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E2559]"
                  placeholder={t("pages.checkin-checkout.search.placeholder")}
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <img
                  src={searchIcon}
                  alt="Search Icon"
                  className="absolute top-2.5 right-3 text-gray-500 pointer-events-none"
                />
              </div>
              <div className="flex flex-row w-[300px] gap-3 gap-y-2">
                <button className="truncate border border-[#B3B3B3] px-2 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                  <img src={filterIcon} alt="filter" />{" "}
                  {t("pages.checkin-checkout.buttons.filter")}
                </button>
                <button className="truncate border border-[#B3B3B3] px-2 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                  <img src={sortIcon} alt="filter" />{" "}
                  {t("pages.checkin-checkout.buttons.sortBy")}
                </button>
              </div>
            </div>
            <div className="bg-white overflow-hidden w-full h-full">
              <div className="max-h-[500px] overflow-y-auto w-full">
                <table className="w-full bg-white">
                  <thead className="bg-gray-200">
                    <tr>
                      {[
                        t("pages.checkin-checkout.table.headers.id"),
                        t("pages.checkin-checkout.table.headers.name"),
                        t("pages.checkin-checkout.table.headers.age"),
                        t("pages.checkin-checkout.table.headers.gender"),
                        t("pages.checkin-checkout.table.headers.contactNo"),
                        t("pages.checkin-checkout.table.headers.time"),
                        t("pages.checkin-checkout.table.headers.date"),
                        t("pages.checkin-checkout.table.headers.status"),
                        t("pages.checkin-checkout.table.headers.appointTo"),
                        t("pages.checkin-checkout.table.headers.action"),
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
                                status ===
                                t(
                                  "pages.checkin-checkout.table.status.inProgress"
                                )
                                  ? "bg-[#E2E0E8] text-[#2E1A8C]"
                                  : "bg-[#DAEEF9] text-[#1A628C]"
                              }`}
                            >
                              <img
                                src={
                                  status ===
                                  t(
                                    "pages.checkin-checkout.table.status.inProgress"
                                  )
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
                                action ===
                                t("pages.checkin-checkout.table.action.chronic")
                                  ? "bg-[#FFCDC9] text-[#D2362B]"
                                  : "bg-[#E0F5FF] text-[#1A408C]"
                              }`}
                            >
                              <img
                                src={
                                  action ===
                                  t(
                                    "pages.checkin-checkout.table.action.chronic"
                                  )
                                    ? chronicIcon
                                    : acuteIcon
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
