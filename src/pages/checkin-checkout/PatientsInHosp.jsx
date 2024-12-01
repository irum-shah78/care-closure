import React, { useState } from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import searchIcon from "../../assets/search-icon.svg";
import filterIcon from "../../assets/filter.svg";
import sortIcon from "../../assets/sort.svg";
import chronicIcon from "../../assets/chronic.svg";
import acuteIcon from "../../assets/acute.svg";
import waitingIcon from "../../assets/waiting.svg";
import inProgressIcon from "../../assets/inprogress.svg";

const getRandomStatus = () => (Math.random() < 0.5 ? "In Progress" : "Waiting");
const getRandomAction = () => (Math.random() < 0.5 ? "Chronic" : "Acute");

const patientsData = [
  {
    id: "#214",
    name: "Christopher",
    age: 32,
    gender: "Male",
    contactNo: "234 000 000",
    time: "10:00 AM",
    date: "Aug 12, 24",
    status: getRandomStatus(),
    appointTo: "Dr. Chris",
    action: getRandomAction(),
  },
  {
    id: "#215",
    name: "Emily",
    age: 56,
    gender: "Female",
    contactNo: "235 111 111",
    time: "11:00 AM",
    date: "Aug 13, 24",
    status: getRandomStatus(),
    appointTo: "Dr. Sarah",
    action: getRandomAction(),
  },
  {
    id: "#216",
    name: "Michael",
    age: 45,
    gender: "Male",
    contactNo: "236 222 222",
    time: "12:30 PM",
    date: "Aug 14, 24",
    status: getRandomStatus(),
    appointTo: "Dr. John",
    action: getRandomAction(),
  },
  {
    id: "#217",
    name: "Jessica",
    age: 29,
    gender: "Female",
    contactNo: "237 333 333",
    time: "2:00 PM",
    date: "Aug 15, 24",
    status: getRandomStatus(),
    appointTo: "Dr. Linda",
    action: getRandomAction(),
  },
  {
    id: "#218",
    name: "Daniel",
    age: 39,
    gender: "Male",
    contactNo: "238 444 444",
    time: "3:15 PM",
    date: "Aug 16, 24",
    status: getRandomStatus(),
    appointTo: "Dr. Chris",
    action: getRandomAction(),
  },
  {
    id: "#219",
    name: "Sophia",
    age: 50,
    gender: "Female",
    contactNo: "239 555 555",
    time: "4:00 PM",
    date: "Aug 17, 24",
    status: getRandomStatus(),
    appointTo: "Dr. Sarah",
    action: getRandomAction(),
  },
  {
    id: "#220",
    name: "James",
    age: 27,
    gender: "Male",
    contactNo: "240 666 666",
    time: "9:00 AM",
    date: "Aug 18, 24",
    status: getRandomStatus(),
    appointTo: "Dr. John",
    action: getRandomAction(),
  },
  {
    id: "#221",
    name: "Olivia",
    age: 36,
    gender: "Female",
    contactNo: "241 777 777",
    time: "10:45 AM",
    date: "Aug 19, 24",
    status: getRandomStatus(),
    appointTo: "Dr. Linda",
    action: getRandomAction(),
  },
  {
    id: "#222",
    name: "David",
    age: 41,
    gender: "Male",
    contactNo: "242 888 888",
    time: "1:00 PM",
    date: "Aug 20, 24",
    status: getRandomStatus(),
    appointTo: "Dr. Chris",
    action: getRandomAction(),
  },
  {
    id: "#223",
    name: "Emma",
    age: 34,
    gender: "Female",
    contactNo: "243 999 999",
    time: "2:30 PM",
    date: "Aug 21, 24",
    status: getRandomStatus(),
    appointTo: "Dr. Sarah",
    action: getRandomAction(),
  },
  {
    id: "#224",
    name: "Liam",
    age: 47,
    gender: "Male",
    contactNo: "244 000 111",
    time: "3:45 PM",
    date: "Aug 22, 24",
    status: getRandomStatus(),
    appointTo: "Dr. John",
    action: getRandomAction(),
  },
];

const PatientsInHospital = () => {
  const [searchTerm, setSearchTerm] = useState("");
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
          <h2 className="text-2xl font-semibold mb-4">Patients In Hospital</h2>
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
              <div className="flex flex-col md:flex-row w-[300px] gap-3 space-y-2 md:space-y-0 md:space-x-2">
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
                        <th key={header} className="p-4 text-center">
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
                        contactNo,
                        time,
                        date,
                        status,
                        appointTo,
                        action,
                      }) => (
                        <tr
                          key={id}
                          className="border-b hover:bg-gray-50 text-center"
                        >
                          <td className="p-4">{id}</td>
                          <td className="p-4">{name}</td>
                          <td className="p-4">{age}</td>
                          <td className="p-4">{gender}</td>
                          <td className="p-4">{contactNo}</td>
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

export default PatientsInHospital;
