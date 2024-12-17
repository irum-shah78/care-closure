import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import searchIcon from "../../assets/search-icon.svg";
import filterIcon from "../../assets/filter.svg";
import sortIcon from "../../assets/sort.svg";
import addIcon from "../../assets/add.svg";
import pendingIcon from "../../assets/pending-icon.svg";
import completedIcon from "../../assets/completed-icon.svg";
import notPaidIcon from "../../assets/not-payed-icon.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Patients = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [patientsData, setPatientsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
    setPatientsData(Array.isArray(storedPatients) ? storedPatients : []);
  }, []);

  const handleClick = () => {
    navigate("/patients/add-patient");
  };

  const handlePatientDetails = (patient) => {
    navigate("/patients/patient-details", { state: { patient } });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPatients = Array.isArray(patientsData)
    ? patientsData.filter(
        (patient) =>
          patient.name &&
          patient.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100">
        <Header />
        <div className="lg:px-8 px-4 py-6 bg-gray-100">
          <h2 className="text-2xl font-semibold mb-4">
            {t("pages.patients.title")}
          </h2>
          <div className="bg-white rounded-xl border shadow-sm p-4 overflow-auto">
            <div className="flex flex-col xl:flex-row items-start justify-between mb-6 gap-6 ms-1">
              <div className="relative w-full mb-4 md:mb-0">
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-[#D1D1D1] bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E2559]"
                  placeholder={t("pages.patients.searchPlaceholder")}
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <img
                  src={searchIcon}
                  alt="Search Icon"
                  className="absolute top-2.5 right-3 text-gray-500 pointer-events-none"
                />
              </div>
              <div className="flex flex-col md:flex-row w-full md:w-3/5 gap-3 md:gap-2">
                <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                  <img src={filterIcon} alt="filter" />
                  {t("pages.patients.filter")}
                </button>
                <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                  <img src={sortIcon} alt="sort" />
                  {t("pages.patients.sort")}
                </button>
                <button
                  className="border border-[#B3B3B3] bg-[#2E2559] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm"
                  onClick={handleClick}
                >
                  <img src={addIcon} alt="add" />
                  {t("pages.patients.addNew")}
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white overflow-hidden w-full h-full">
              <div className="max-h-[500px] overflow-auto w-full ">
                <table className="min-w-full bg-white table-auto">
                  <thead className="bg-gray-200">
                    <tr>
                      {[
                        t("pages.patients.tableHeaders.patientID"),
                        t("pages.patients.tableHeaders.name"),
                        t("pages.patients.tableHeaders.age"),
                        t("pages.patients.tableHeaders.gender"),
                        t("pages.patients.tableHeaders.bloodGroup"),
                        t("pages.patients.tableHeaders.contactNumber"),
                        t("pages.patients.tableHeaders.emergencyContact"),
                        t("pages.patients.tableHeaders.paymentStatus"),
                      ].map((header) => (
                        <th key={header} className="p-4 text-center">
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
                        bloodGroup,
                        mobileNumber,
                        emergencyContactNumber,
                        paymentStatus,
                      } = patient;

                      const paymentStatusText =
                        paymentStatus === "Pending"
                          ? t("pages.patients.paymentStatus.pending")
                          : paymentStatus === "Completed"
                          ? t("pages.patients.paymentStatus.completed")
                          : t("pages.patients.paymentStatus.notPaid");

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
                          <td className="p-4">{bloodGroup}</td>
                          <td className="p-4">{mobileNumber}</td>
                          <td className="p-4">{emergencyContactNumber}</td>
                          <td className="p-4">
                            <div
                              className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg ${
                                paymentStatus === "Pending"
                                  ? "bg-[#FFEFC9] text-[#CE7B06]"
                                  : paymentStatus === "Completed"
                                  ? "bg-[#E0F5FF] text-[#1A408C]"
                                  : "bg-[#FFCDC9] text-[#D2362B]"
                              }`}
                            >
                              <img
                                src={
                                  paymentStatus === "Pending"
                                    ? pendingIcon
                                    : paymentStatus === "Completed"
                                    ? completedIcon
                                    : notPaidIcon
                                }
                                alt={paymentStatusText}
                                className="w-4 h-4"
                              />
                              <span>{paymentStatusText}</span>
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

export default Patients;
