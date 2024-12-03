import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import backIcon from "../../assets/back-icon.svg";
import patientImage from "../../assets/image.svg";
import line from "../../assets/line.svg";
import nextPage from "../../assets/next-page.svg";
import chronicIcon from "../../assets/chronic.svg";
import acuteIcon from "../../assets/acute.svg";
import { useNavigate } from "react-router-dom";

const getRandomStatus = () => (Math.random() < 0.5 ? "Chronic" : "Acute");

const patientsData = [
  {
    id: "#214",
    date: "Aug 12, 24",
    time: "10:00 AM",
    lastAppointment: "10:00 AM Aug 12, 24",
    appointementNo: "07",
    appointTo: "Dr. Aoze",
    status: getRandomStatus(),
    description: "Heart Disease",
  },
  {
    id: "#215",
    date: "Aug 12, 24",
    time: "10:00 AM",
    gender: "Female",
    lastAppointment: "11:00 AM Aug 10, 24",
    appointementNo: "07",
    appointTo: "Dr. Aoze",
    status: getRandomStatus(),
    description: "Diabetes",
  },
  {
    id: "#216",
    date: "Aug 12, 24",
    time: "10:00 AM",
    lastAppointment: "12:00 PM Aug 08, 24",
    appointementNo: "24",
    appointTo: "Dr. Aoze",
    status: getRandomStatus(),
    description: "Heart Disease",
  },
  {
    id: "#217",
    date: "Aug 12, 24",
    time: "10:00 AM",
    gender: "Female",
    lastAppointment: "03:00 PM Aug 06, 24",
    appointementNo: "20",
    appointTo: "Dr. Aoze",
    status: getRandomStatus(),
    description: "Heart Disease",
  },
  {
    id: "#218",
    date: "Aug 12, 24",
    time: "10:00 AM",
    lastAppointment: "02:00 PM Aug 05, 24",
    appointementNo: "10",
    appointTo: "Dr. Aoze",
    status: getRandomStatus(),
    description: "Heart Disease",
  },
  {
    id: "#219",
    date: "Aug 12, 24",
    time: "10:00 AM",
    gender: "Female",
    lastAppointment: "09:00 AM Aug 04, 24",
    appointementNo: "09",
    appointTo: "Dr. Aoze",
    status: getRandomStatus(),
    description: "Heart Disease",
  },
  {
    id: "#220",
    date: "Aug 12, 24",
    time: "10:00 AM",
    lastAppointment: "11:30 AM Aug 03, 24",
    appointementNo: "03",
    appointTo: "Dr. Aoze",
    status: getRandomStatus(),
    description: "Heart Disease",
  },
  {
    id: "#221",
    date: "Aug 12, 24",
    time: "10:00 AM",
    gender: "Female",
    lastAppointment: "08:30 AM Aug 02, 24",
    appointementNo: "08",
    appointTo: "Dr. Aoze",
    status: getRandomStatus(),
    description: "Heart Disease",
  },
  {
    id: "#222",
    date: "Aug 12, 24",
    time: "10:00 AM",
    lastAppointment: "05:00 PM Aug 01, 24",
    appointementNo: "05",
    appointTo: "Dr. Aoze",
    status: getRandomStatus(),
    description: "Liver Disease",
  },
  {
    id: "#223",
    date: "Aug 12, 24",
    time: "10:00 AM",
    gender: "Female",
    lastAppointment: "04:00 PM Jul 31, 24",
    appointementNo: "04",
    appointTo: "Dr. Aoze",
    status: getRandomStatus(),
    description: "Heart Disease",
  },
  {
    id: "#224",
    date: "Aug 12, 24",
    time: "10:00 AM",
    lastAppointment: "06:00 PM Jul 30, 24",
    appointementNo: "02",
    appointTo: "Dr. Aoze",
    status: getRandomStatus(),
    description: "Kidney Stones",
  },
  {
    id: "#225",
    date: "Aug 12, 24",
    time: "10:00 AM",
    gender: "Female",
    lastAppointment: "07:00 PM Jul 29, 24",
    appointementNo: "07",
    appointTo: "Dr. Aoze",
    status: getRandomStatus(),
    description: "Heart Disease",
  },
];

const PatientDetails = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/patients");
  };

  const handlePreVisit = () => {
    navigate("/patients/patient-details/pre-visit");
  };

  const handleDuringVisit = () => {
    navigate("/patients/patient-details/during-visit");
  };

  const handlePostVisit = () => {
    navigate("/patients/patient-details/post-visit");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <img
              src={backIcon}
              alt="Back"
              className="cursor-pointer"
              onClick={handleBack}
            />
            <h1 className="text-2xl font-bold text-gray-800">
              Patient Details
            </h1>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8 flex bg-white p-3 rounded-xl shadow-md h-[270px]">
              <div className="flex flex-col items-center justify-center space-x-4 pr-6">
                <img
                  src={patientImage}
                  alt="Patient"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold mt-4">William Henry</h2>
                  <p className="text-gray-600">william@mail.com</p>
                  <div className="flex items-center gap-8">
                    <div className="flex flex-col text-center items-center justify-center">
                      <span className="text-gray-700 text-sm font-medium">
                        15
                      </span>{" "}
                      <span className="text-gray-500 text-sm">Post</span>
                    </div>
                    <img src={line} alt="line" />
                    <div className="flex flex-col text-center items-center justify-center">
                      <span className="text-gray-700 text-sm font-medium">
                        01
                      </span>{" "}
                      <span className="text-gray-500 text-sm">Upcoming</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l border-3 border-[#B4B4B4] mx-6"></div>
              <div className="grid grid-cols-3">
                <div className="grid grid-rows-3 py-3">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-[#797979]">Gender</p>
                    <p className="text-gray-800">Male</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-[#797979]">
                      Street Address
                    </p>
                    <p className="text-gray-800">231 New Street</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-[#797979]">Status</p>
                    <p className="text-[#47DA60]">Active</p>
                  </div>
                </div>

                <div className="grid grid-rows-3 py-3 px-8">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-[#797979]">
                      Birthday
                    </p>
                    <p className="text-gray-800">Jan 23rd, 2002</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-[#797979]">City</p>
                    <p className="text-gray-800">Big City</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-[#797979]">
                      Registered Date
                    </p>
                    <p className="text-gray-800">Nov 24th, 2024</p>
                  </div>
                </div>

                <div className="grid grid-rows-3 py-3 px-8">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-[#797979]">
                      Phone Number
                    </p>
                    <p className="text-gray-800">0000 0000 000</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-[#797979]">
                      ZIP Code
                    </p>
                    <p className="text-gray-800">67302</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-4 flex flex-col justify-center gap-6 h-[270px]">
              <button
                className="px-4 text-[#363636] font-medium text-left bg-white p-6 rounded-xl shadow-md flex items-center justify-center gap-4"
                onClick={handlePreVisit}
              >
                Pre-Visit Details <img src={nextPage} alt="filter" />
              </button>
              <button
                className="px-4 text-[#363636] font-medium text-left bg-white p-6 rounded-xl shadow-md flex items-center justify-center gap-4"
                onClick={handleDuringVisit}
              >
                During-Visit Details <img src={nextPage} alt="filter" />
              </button>
              <button
                className="px-4 text-[#363636] font-medium text-left bg-white p-6 rounded-xl shadow-md flex items-center justify-center gap-4"
                onClick={handlePostVisit}
              >
                Post-Visit Details <img src={nextPage} alt="filter" />
              </button>
            </div>
          </div>

          <div className="bg-white overflow-hidden rounded-xl shadow-md w-full h-full px-4 py-3">
            <h2 className="text-xl font-bold text-gray-800 mt-2">
              Appointment Details
            </h2>
            <hr className="text-[#D1D1D1] border-1 mt-6 mb-6" />
            <div className="max-h-[500px] overflow-y-auto w-full">
              <table className="w-full bg-white">
                <thead className="bg-gray-200">
                  <tr>
                    {[
                      "ID",
                      "Date",
                      "Time",
                      "Last Appointment",
                      "Appointment No.",
                      "Appoint to",
                      "Status",
                      "Description",
                    ].map((header) => (
                      <th key={header} className="p-4 text-center">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {patientsData.map(
                    ({
                      id,
                      date,
                      time,
                      lastAppointment,
                      appointementNo,
                      appointTo,
                      status,
                      description,
                    }) => (
                      <tr
                        key={id}
                        className="border-b hover:bg-gray-50 cursor-pointer text-center"
                      >
                        <td className="p-4">{id}</td>
                        <td className="p-4">{date}</td>
                        <td className="p-4">{time}</td>
                        <td className="p-4">{lastAppointment}</td>
                        <td className="p-4">{appointementNo}</td>
                        <td className="p-4">{appointTo}</td>
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
      </main>
    </div>
  );
};

export default PatientDetails;
