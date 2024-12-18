import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import backIcon from "../../assets/back-icon.svg";
import patientImage from "../../assets/image.svg";
import line from "../../assets/line.svg";
import nextPage from "../../assets/next-page.svg";
import chronicIcon from "../../assets/chronic.svg";
import acuteIcon from "../../assets/acute.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const getRandomStatus = () => (Math.random() < 0.5 ? "Chronic" : "Acute");
const PatientDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const patient = state?.patient;
  const [appointments, setAppointments] = useState([]);
  const [appointmentStats, setAppointmentStats] = useState({
    total: 0,
    lastAppointment: "N/A",
  });

  useEffect(() => {
    if (patient) {
      localStorage.setItem("patient", JSON.stringify(patient));
    }
    const storedAppointments = localStorage.getItem("patientVisits");
    if (storedAppointments) {
      const parsedAppointments = JSON.parse(storedAppointments);
      const filteredAppointments = parsedAppointments
        .filter((appointment) => appointment.patientId === patient?.id)
        .map((appointment) => ({
          ...appointment,
          status: appointment.status || getRandomStatus(),
        }));

      setAppointments(filteredAppointments);

      if (filteredAppointments.length > 0) {
        const lastAppointmentDate = filteredAppointments
          .map(
            (appointment) =>
              new Date(
                appointment.preferredDate + " " + appointment.preferredTimeSlot
              )
          )
          .sort((a, b) => b - a)[0];

        setAppointmentStats({
          total: filteredAppointments.length,
          lastAppointment: lastAppointmentDate.toLocaleString(),
        });
      } else {
        setAppointmentStats({ total: 0, lastAppointment: "N/A" });
      }
    }
  }, [patient]);

  useEffect(() => {
    if (patient) {
      localStorage.setItem("patient", JSON.stringify(patient));
    }
  }, [patient]);

  const handleBack = () => navigate("/patients");
  const handlePreVisit = () => {
    navigate("/patients/patient-details/pre-visit", { state: { patient } });
  };
  const handleDuringVisit = () => {
    navigate("/patients/patient-details/during-visit", { state: { patient } });
  };
  const handlePostVisit = () => {
    navigate("/patients/patient-details/post-visit", { state: { patient } });
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6 space-y-6 bg-gray-100">
          <div className="flex items-center gap-3">
            <img
              src={backIcon}
              alt={t("pages.patientdetails.back")}
              className="cursor-pointer"
              onClick={handleBack}
            />
            <h1 className="text-2xl font-bold text-gray-800">
              {t("pages.patientdetails.title")}
            </h1>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="xl:col-span-8 col-span-12 flex bg-white p-3 rounded-xl shadow-md h-[270px]">
              <div className="flex flex-col items-center justify-center space-x-4 pr-6 text-center">
                <img
                  src={patientImage}
                  alt={t("pages.patientdetails.patient")}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold mt-4 ">
                    {patient?.name} {patient?.lastName}
                  </h2>
                  <p className="text-gray-600">{patient?.email}</p>
                  <div className="flex items-center gap-8">
                    <div className="flex flex-col text-center items-center justify-center">
                      <span className="text-gray-700 text-sm font-medium">
                        {patient?.posts || 0}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {t("pages.patientdetails.personalInfo.posts")}
                      </span>
                    </div>
                    <img src={line} alt="line" />
                    <div className="flex flex-col text-center items-center justify-center">
                      <span className="text-gray-700 text-sm font-medium">
                        {patient?.upcomingAppointments || 0}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {t("pages.patientdetails.personalInfo.upcoming")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l border-3 border-[#B4B4B4] mx-6"></div>
              <div className="grid grid-cols-3">
                <div className="grid grid-rows-3 py-3">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-[#797979]">
                      {t("pages.patientdetails.personalInfo.gender")}
                    </p>
                    <p className="text-gray-800">{patient?.gender}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-[#797979]">
                      {t("pages.patientdetails.personalInfo.streetAddress")}
                    </p>
                    <p className="text-gray-800">{patient?.address}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-[#797979]">
                      {t("pages.patientdetails.personalInfo.status")}
                    </p>
                    <p className="text-[#47DA60]">
                      {patient?.status || "Active"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-rows-3 py-3 px-8">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-[#797979]">
                      {t("pages.patientdetails.personalInfo.birthday")}
                    </p>
                    <p className="text-gray-800">{patient?.dob}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-[#797979]">
                      {t("pages.patientdetails.personalInfo.city")}
                    </p>
                    <p className="text-gray-800">{patient?.city}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-[#797979]">
                      {t("pages.patientdetails.personalInfo.registeredDate")}
                    </p>
                    <p className="text-gray-800">{patient?.registeredDate}</p>
                  </div>
                </div>

                <div className="grid grid-rows-3 py-3 px-8">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-[#797979]">
                      {t("pages.patientdetails.personalInfo.phoneNumber")}
                    </p>
                    <p className="text-gray-800">{patient?.mobileNumber}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-[#797979]">
                      {t("pages.patientdetails.personalInfo.zipCode")}
                    </p>
                    <p className="text-gray-800">{patient?.pincode}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:col-span-4 col-span-12 flex flex-col justify-center gap-6 h-[270px]">
              <button
                className="px-4 text-[#363636] font-medium text-left bg-white p-6 rounded-xl shadow-md flex items-center justify-center gap-4"
                onClick={handlePreVisit}
              >
                {t("pages.patientdetails.visitTypes.preVisit")}{" "}
                <img src={nextPage} alt="filter" />
              </button>
              <button
                className="px-4 text-[#363636] font-medium text-left bg-white p-6 rounded-xl shadow-md flex items-center justify-center gap-4"
                onClick={handleDuringVisit}
              >
                {t("pages.patientdetails.visitTypes.duringVisit")}{" "}
                <img src={nextPage} alt="filter" />
              </button>
              <button
                className="px-4 text-[#363636] font-medium text-left bg-white p-6 rounded-xl shadow-md flex items-center justify-center gap-4"
                onClick={handlePostVisit}
              >
                {t("pages.patientdetails.visitTypes.postVisit")}{" "}
                <img src={nextPage} alt="filter" />
              </button>
            </div>
          </div>

          <div className="col-span-12 bg-white overflow-hidden rounded-xl shadow-md w-full h-full px-4 py-3">
            <h2 className="text-xl font-bold text-gray-800 mt-2">
              {t("pages.patientdetails.appointmentDetails.title")}
            </h2>
            <hr className="text-[#D1D1D1] border-1 mt-6 mb-6" />
            <div className="max-h-[500px] overflow-y-auto w-full">
              {appointments.length > 0 ? (
                <table className="w-full bg-white">
                  <thead className="bg-gray-200">
                    <tr>
                      {[
                        t("pages.patientdetails.appointmentDetails.table.id"),
                        t("pages.patientdetails.appointmentDetails.table.date"),
                        t("pages.patientdetails.appointmentDetails.table.time"),
                        t(
                          "pages.patientdetails.appointmentDetails.table.appointmentNo"
                        ),
                        t(
                          "pages.patientdetails.appointmentDetails.table.appointTo"
                        ),
                        t(
                          "pages.patientdetails.appointmentDetails.table.status"
                        ),
                        t(
                          "pages.patientdetails.appointmentDetails.table.description"
                        ),
                      ].map((header) => (
                        <th key={header} className="p-4 text-center">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map(
                      (
                        {
                          visitId,
                          preferredDate,
                          preferredTimeSlot,
                          preferredDoctor,
                          status,
                          description,
                        },
                        index
                      ) => {
                        const appointmentNumber = index + 1;
                        return (
                          <tr
                            key={visitId}
                            className="border-b hover:bg-gray-50 text-center"
                          >
                            <td className="p-4">{visitId}</td>
                            <td className="p-4">{preferredDate}</td>
                            <td className="p-4">{preferredTimeSlot}</td>

                            <td className="p-4">{appointmentNumber}</td>
                            <td className="p-4">{preferredDoctor}</td>
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
                                    status === "Chronic"
                                      ? chronicIcon
                                      : acuteIcon
                                  }
                                  alt={status}
                                  className="w-4 h-4"
                                />
                                <span>{status}</span>
                              </div>
                            </td>
                            <td className="p-4">{patient.description}</td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-600 text-center">
                  No appointment details found.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDetails;
