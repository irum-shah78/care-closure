import React, { useState } from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import totalPatients from "../../assets/totalPatients.svg";
import appointments from "../../assets/appointments.svg";
import compliance from "../../assets/compliance.svg";
import next from "../../assets/next.svg";
import previous from "../../assets/previous.svg";
import "./Dashboard.css";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Dashboard = () => {
  const [date, setDate] = useState(new Date());

  const handleChange = (newDate) => {
    setDate(newDate);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

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
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome to CareFlow
          </h1>

          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="col-span-3 grid grid-cols-3 gap-4">
              <div className="flex bg-white shadow-md p-4 rounded-xl">
                <div className="flex items-center justify-center bg-[#2E255924] w-[54px] h-[54px] rounded-lg mt-4">
                  <img
                    src={totalPatients}
                    alt="total patients"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Total Patients
                  </h3>
                  <p className="text-2xl font-bold">1248</p>
                  <p className="text-sm text-[#38AC4C]">
                    <span className="font-bold text-[#38AC4C]">+20%</span> from
                    last month
                  </p>
                </div>
              </div>

              <div className="flex bg-white shadow-md p-4 rounded-xl">
                <div className="flex items-center justify-center bg-[#2E255924] w-[54px] h-[54px] rounded-lg mt-4">
                  <img
                    src={appointments}
                    alt="appointments"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Appointments Today
                  </h3>
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-sm text-[#6D59CE]">12 Remaining</p>
                </div>
              </div>

              <div className="flex bg-white shadow-md p-4 rounded-xl">
                <div className="flex items-center justify-center bg-[#2E255924] w-[54px] h-[54px] rounded-lg mt-4">
                  <img src={compliance} alt="compliance"/>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Compliance Score
                  </h3>
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-sm text-[#38AC4C]">
                    <span className="font-bold text-[#38AC4C]">+2%</span> from
                    last week
                  </p>
                </div>
              </div>

              <div className="col-span-3 bg-white shadow-md p-4 rounded-xl relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800">
                    Next Patient
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
                        <div key={index} className="flex items-center p-2">
                          <div>
                            <div className="flex items-center justify-center bg-[#2E2559] text-white w-10 h-10 rounded-full font-semibold text-sm">
                              {patient.initials}
                            </div>
                            <div className="ml-4">
                              <h4 className="text-base font-medium text-[#363636]">
                                {patient.name}
                              </h4>
                              <div className="flex space-x-2 text-sm text-[#363636]">
                                <p>{patient.gender}</p>
                                <p>{patient.age} Years</p>
                                <p>{patient.appointment}</p>
                              </div>
                            </div>
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
                            <p className="text-base font-medium text-[#2E2559]">
                              {patient.time}
                            </p>
                            <p className="text-sm text-[#363636]">
                              {patient.date}
                            </p>
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-1 bg-white shadow px-4 py-3 rounded-lg">
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

          <div className="bg-white shadow mt-6 p-4 rounded-lg">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-lg font-bold text-gray-800">Patient Queue</h3>
              <div className="flex space-x-4">
                <button className="text-indigo-600 font-medium">Queue</button>
                <button className="text-gray-500 font-medium">
                  Appointments
                </button>
              </div>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left px-4 py-2 text-gray-600">ID</th>
                    <th className="text-left px-4 py-2 text-gray-600">Name</th>
                    <th className="text-left px-4 py-2 text-gray-600">Age</th>
                    <th className="text-left px-4 py-2 text-gray-600">
                      Gender
                    </th>
                    <th className="text-left px-4 py-2 text-gray-600">
                      Appointment
                    </th>
                    <th className="text-left px-4 py-2 text-gray-600">Time</th>
                    <th className="text-left px-4 py-2 text-gray-600">
                      Status
                    </th>
                    <th className="text-left px-4 py-2 text-gray-600">Date</th>
                    <th className="text-left px-4 py-2 text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array(6)
                    .fill()
                    .map((_, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-gray-800">#214</td>
                        <td className="px-4 py-2 text-gray-800">Christopher</td>
                        <td className="px-4 py-2 text-gray-800">32</td>
                        <td className="px-4 py-2 text-gray-800">Male</td>
                        <td className="px-4 py-2 text-gray-800">
                          First Appointment
                        </td>
                        <td className="px-4 py-2 text-gray-800">10:00 AM</td>
                        <td className="px-4 py-2 text-indigo-600 font-medium">
                          In Progress
                        </td>
                        <td className="px-4 py-2 text-gray-800">Aug 12, 24</td>
                        <td className="px-4 py-2">
                          <button className="text-white bg-purple-600 px-3 py-1 rounded-full">
                            Check In
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

// custom calendar
/* <div className="col-span-1 bg-white shadow px-4 py-3 rounded-lg">
              <div className="flex items-center justify-between">
                <button className="text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h3 className="text-lg font-bold text-gray-800">
                  January - 2024
                </h3>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 mt-4 text-center text-sm text-gray-500">
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
              </div>

              <div className="grid grid-cols-7 mt-2 text-center">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div className="py-2 rounded-lg">1</div>
                <div className="py-2 rounded-lg">2</div>

                {Array.from({ length: 31 }, (_, i) => (
                  <div
                    key={i}
                    className={`py-2 rounded-lg ${
                      i === 13
                        ? "bg-purple-600 text-white font-bold"
                        : "text-gray-800"
                    }`}
                  >
                    {i + 3}
                  </div>
                ))}
              </div>
            </div> */
