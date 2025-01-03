import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import totalPatients from "../../assets/totalPatients.svg";
import appointments from "../../assets/appointments.svg";
import compliance from "../../assets/compliance.svg";
import next from "../../assets/next.svg";
import previous from "../../assets/previous.svg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import waitingIcon from "../../assets/waiting.svg";
import inProgressIcon from "../../assets/inprogress.svg";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

const getRandomStatus = () => (Math.random() < 0.5 ? "In Progress" : "Waiting");

const Dashboard = () => {
  const { t } = useTranslation();

  const [date, setDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("patientQueue");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [patientsData, setPatientsData] = useState([]);

  const [appointmentsData, setAppointmentsData] = useState([]);
  const navigate = useNavigate();

  const API_AUTH_HEADERS = {
    Authorization: "Bearer yourAuthToken",
    "X-xPxApp-App-Account-Id": "yourAppAccountId",
    "X-xPxApp-App-Auth": "yourAppAuth",
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const recordType = "outpatient";
  const searchQuery = "";

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get("http://localhost:8000/records", {
          headers: API_AUTH_HEADERS,
          params: {
            recordType,
            q: searchQuery,
            options: "discharges",
          },
        });

        const fetchedRecords = response.data.records || [];
        setPatientsData(fetchedRecords);
        const storedAppointments =
          JSON.parse(localStorage.getItem("patientVisits")) || [];
        setAppointmentsData(storedAppointments);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchRecords();
  }, []);

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

    const getRandomAction = () =>
      Math.random() > 0.5 ? "Check In" : "Check Out";

    return {
      ...patient,
      date: recentAppointment?.preferredDate || "N/A",
      time: recentAppointment?.preferredTimeSlot || "N/A",
      status: recentAppointment?.status || getRandomStatus(),
      appointment: appointmentNumber || "N/A",
      action: getRandomAction(),
    };
  });

  const handleChange = (newDate) => {
    setDate(newDate);
  };

  const patients = [
    {
      initials: "CM",
      name: "Mr. Chris Mathews",
      gender: "Male",
      age: "54 Years",
      appointment: "2nd Appointment",
      status: "Waiting",
      time: "10:00 AM",
      date: "11 Nov 2014",
    },
    {
      initials: "AM",
      name: "Ms. Alice Moore",
      gender: "Female",
      age: "48 Years",
      appointment: "1st Appointment",
      status: "Waiting",
      time: "10:30 AM",
      date: "12 Nov 2014",
    },
    {
      initials: "JS",
      name: "Mr. John Smith",
      gender: "Male",
      age: "65 Years",
      appointment: "Follow-up",
      status: "Completed",
      time: "11:00 AM",
      date: "13 Nov 2014",
    },
    {
      initials: "LM",
      name: "Ms. Laura Mitchell",
      gender: "Female",
      age: "39 Years",
      appointment: "Routine Checkup",
      status: "Waiting",
      time: "11:30 AM",
      date: "14 Nov 2014",
    },
    {
      initials: "RB",
      name: "Mr. Robert Brown",
      gender: "Male",
      age: "58 Years",
      appointment: "Checkup",
      status: "Completed",
      time: "12:00 PM",
      date: "15 Nov 2014",
    },
    {
      initials: "SS",
      name: "Ms. Sarah Stevens",
      gender: "Female",
      age: "47 Years",
      appointment: "Consultation",
      status: "Waiting",
      time: "12:30 PM",
      date: "16 Nov 2014",
    },
  ];

  const handleNext = () => {
    if (currentIndex < patients.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // const handlePatientDetails = (patient) => {
  //   navigate("/patients/patient-details", { state: { patient } });
  // };

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
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1 bg-gray-100">
        <Header />
        <div className="lg:px-8 px-4 py-6 bg-gray-100">
          <h1 className="text-2xl font-bold text-gray-800">
            {t("pages.dashboard.title")}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
            <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex bg-white shadow-md p-4 rounded-xl">
                <div className="flex items-center justify-center bg-[#2E255924] w-[50px] h-[50px] rounded-lg mt-4">
                  <img src={totalPatients} alt="total patients" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {t("pages.dashboard.stats.totalPatients")}
                  </h3>
                  <p className="text-2xl font-bold">1248</p>
                  <p className="text-sm text-[#38AC4C]">
                    <span className="font-bold text-[#38AC4C]">+20%</span>{" "}
                    {t("pages.dashboard.stats.fromLastMonth")}
                  </p>
                </div>
              </div>

              <div className="flex bg-white shadow-md p-4 rounded-xl">
                <div className="flex items-center justify-center bg-[#2E255924] w-[50px] h-[50px] rounded-lg mt-4">
                  <img src={appointments} alt="appointments" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {t("pages.dashboard.stats.todayAppointments")}
                  </h3>
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-sm text-[#6D59CE]">
                    12 {t("pages.dashboard.stats.remaining")}
                  </p>
                </div>
              </div>

              <div className="flex bg-white shadow-md p-4 rounded-xl">
                <div className="flex items-center justify-center bg-[#2E255924] w-[50px] h-[50px] rounded-lg mt-4">
                  <img src={compliance} alt="compliance" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {t("pages.dashboard.stats.complianceScore")}
                  </h3>
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-sm text-[#38AC4C]">
                    <span className="font-bold text-[#38AC4C]">+2%</span>{" "}
                    {t("pages.dashboard.stats.fromLastWeek")}
                  </p>
                </div>
              </div>

              <div className="col-span-3 bg-white shadow-md p-4 rounded-xl relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800">
                    {t("pages.dashboard.nextPatient.title")}
                  </h3>
                  <div className="flex gap-2 absolute top-0 right-0 mt-4 mr-6">
                    <button
                      onClick={handlePrevious}
                      disabled={currentIndex === 0}
                      className={`swiper-button-prev p-1 ${
                        currentIndex === 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <img src={previous} alt="previous" />
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentIndex === patients.length - 1}
                      className={`swiper-button-next p-1 ${
                        currentIndex === patients.length - 1
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <img src={next} alt="next" />
                    </button>
                  </div>
                </div>
                <hr className="mt-2" />
                <div>
                  {patients.map(
                    (patient, index) =>
                      index === currentIndex && (
                        <div
                          key={index}
                          className="flex items-center p-2 space-x-10"
                        >
                          <div className="flex items-center">
                            <div className="flex items-center justify-center bg-[#2E2559] text-white w-10 h-10 rounded-full font-semibold text-xs sm:text-sm">
                              {patient.initials}
                            </div>
                            <div className="ml-4">
                              <h4 className="text-base font-medium text-[#363636]">
                                {patient.name}
                              </h4>
                            </div>
                          </div>
                          <div className="text-sm text-[#363636]">
                            {patient.gender}
                          </div>
                          <div className="text-sm text-[#363636]">
                            {patient.age}
                          </div>
                          <div className="text-sm text-[#363636]">
                            {patient.appointment}
                          </div>
                          <div>
                            <p
                              className={`text-sm font-semibold ${
                                patient.status === "Waiting"
                                  ? "text-[#6D59CE]"
                                  : "text-[#38AC4C]"
                              }`}
                            >
                              {patient.status}
                            </p>
                          </div>
                          <div>
                            <p className="text-base font-medium text-[#2E2559]">
                              {patient.time}
                            </p>
                          </div>
                          <div className="text-sm text-[#363636]">
                            {patient.date}
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-1 bg-white shadow px-4 py-3 rounded-lg hidden xl:block">
              <div className="">
                <Calendar
                  onChange={handleChange}
                  value={date}
                  calendarType="gregory"
                  className="custom-calendar"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 bg-white shadow px-6 py-3 mt-6 rounded-lg">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab("patientQueue")}
                className={`px-4 py-1 rounded ${
                  activeTab === "patientQueue"
                    ? "text-black font-semibold border-b-4 border-[#6D59CE]"
                    : "text-gray-600"
                }`}
              >
                {t("pages.dashboard.patientQueue.title")}
              </button>
            </div>

            <div>
              {activeTab === "patientQueue" && (
                <div>
                  <div className="bg-white overflow-hidden w-full h-full">
                    <div className="max-h-[500px] overflow-y-auto w-full">
                      <div className="overflow-x-auto w-full">
                        <table className="min-w-full bg-white">
                          <thead className="bg-gray-200">
                            <tr>
                              {[
                                t("pages.dashboard.patientQueue.headers.id"),
                                t("pages.dashboard.patientQueue.headers.name"),
                                t("pages.dashboard.patientQueue.headers.age"),
                                t(
                                  "pages.dashboard.patientQueue.headers.gender"
                                ),
                                t(
                                  "pages.dashboard.patientQueue.headers.appointment"
                                ),
                                t("pages.dashboard.patientQueue.headers.time"),
                                t(
                                  "pages.dashboard.patientQueue.headers.status"
                                ),
                                t("pages.dashboard.patientQueue.headers.date"),
                                t(
                                  "pages.dashboard.patientQueue.headers.action"
                                ),
                              ].map((header, index) => (
                                <th
                                  key={index}
                                  className="p-4 text-center text-sm"
                                >
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {combinedData.map((patient) => {
                              const {
                                id,
                                name,
                                age,
                                gender,
                                appointment,
                                time,
                                status,
                                date,
                              } = patient;

                              return (
                                <tr
                                  key={id}
                                  className="border-b hover:bg-gray-50 cursor-pointer text-center"
                                  onClick={() => handlePatientDetails(patient)}
                                >
                                  <td className="p-4">{id}</td>
                                  <td className="p-4">{name}</td>
                                  <td className="p-4">{age}</td>
                                  <td className="p-4">{gender}</td>
                                  <td className="p-4">{appointment}</td>
                                  <td className="p-4">{time}</td>
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
                                      <span>
                                        {status === "In Progress"
                                          ? t(
                                              "pages.dashboard.patientQueue.status.inProgress"
                                            )
                                          : t(
                                              "pages.dashboard.patientQueue.status.waiting"
                                            )}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="p-4">{date}</td>
                                  <td className="p-4">
                                    {patient.action === "Check In" ? (
                                      <button>
                                        {t(
                                          "pages.dashboard.patientQueue.action.checkIn"
                                        )}
                                      </button>
                                    ) : (
                                      <button>
                                        {t(
                                          "pages.dashboard.patientQueue.action.checOut"
                                        )}
                                      </button>
                                    )}
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
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
