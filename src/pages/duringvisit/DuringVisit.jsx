import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import FormSection from "../../components/formselection/FormSelection";
import backIcon from "../../assets/back-icon.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
const DuringVisit = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const patient = state?.patient;
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");
  const [insuranceStatus, setInsuranceStatus] = useState("");
  const [wardType, setWardType] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [bedNumber, setBedNumber] = useState("");
  const [admissionType, setAdmissionType] = useState("");
  const [assignedDoctor, setAssignedDoctor] = useState("");
  const [assignedNurse, setAssignedNurse] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [admissionStatus, setAdmissionStatus] = useState("");
  const [assignedDate, setAssignedDate] = useState("");
  const [assignedTime, setAssignedTime] = useState("");

  useEffect(() => {
    if (patient) {
      setFirstName(patient.firstName || patient.name || "");
      setMiddleName(patient.middleName || "");
      setLastName(patient.lastName || "");
      setInsuranceProvider(patient.insuranceProvider || "");
      setInsuranceNumber(patient.insuranceNumber || patient.policyNumber || "");
      setInsuranceStatus(patient.insuranceStatus || "");
    }
  }, [patient]);

  const handlePatient = () => {
    navigate("/patients/patient-details", { state: { patient } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const visitDetails = {
      firstName,
      middleName,
      lastName,
      insuranceProvider,
      insuranceNumber,
      insuranceStatus,
      wardType,
      roomNumber,
      bedNumber,
      admissionType,
      assignedDoctor,
      assignedNurse,
      additionalNotes,
      admissionStatus,
      assignedDate,
      assignedTime,
    };

    const storedData = localStorage.getItem("duringVisitDetails");
    const existingDetails = Array.isArray(JSON.parse(storedData))
      ? JSON.parse(storedData)
      : [];

    existingDetails.push(visitDetails);
    localStorage.setItem("duringVisitDetails", JSON.stringify(existingDetails));
    navigate("/patients/patient-details", { state: { patient } });
  };

  const patientDetailsFields = [
    {
      type: "text",
      label: t("pages.duringvisit.patientDetails.firstName.label"),
      placeholder: t("pages.duringvisit.patientDetails.firstName.placeholder"),
      value: firstName,
      onChange: (e) => setFirstName(e.target.value),
    },
    {
      type: "text",
      label: t("pages.duringvisit.patientDetails.middleName.label"),
      placeholder: t("pages.duringvisit.patientDetails.middleName.placeholder"),
      value: middleName,
      onChange: (e) => setMiddleName(e.target.value),
    },
    {
      type: "text",
      label: t("pages.duringvisit.patientDetails.lastName.label"),
      placeholder: t("pages.duringvisit.patientDetails.lastName.placeholder"),
      value: lastName,
      onChange: (e) => setLastName(e.target.value),
    },
    {
      type: "select",
      label: t("pages.duringvisit.patientDetails.insuranceProvider.label"),
      placeholder: t(
        "pages.duringvisit.patientDetails.insuranceProvider.placeholder"
      ),
      options: [
        t(
          "pages.duringvisit.patientDetails.insuranceProvider.options.providerOne"
        ),
        t(
          "pages.duringvisit.patientDetails.insuranceProvider.options.providerTwo"
        ),
      ],
      value: insuranceProvider,
      onChange: (e) => setInsuranceProvider(e.target.value),
    },
    {
      type: "text",
      label: t("pages.duringvisit.patientDetails.insuranceNumber.label"),
      placeholder: t(
        "pages.duringvisit.patientDetails.insuranceNumber.placeholder"
      ),
      value: insuranceNumber,
      onChange: (e) => setInsuranceNumber(e.target.value),
    },
    {
      type: "text",
      label: t("pages.duringvisit.patientDetails.insuranceStatus.label"),
      placeholder: t(
        "pages.duringvisit.patientDetails.insuranceStatus.placeholder"
      ),
      value: insuranceStatus,
      onChange: (e) => setInsuranceStatus(e.target.value),
    },
  ];

  const roomAssignmentFields = [
    {
      type: "select",
      label: t("pages.duringvisit.roomAssignment.wardType.label"),
      placeholder: t("pages.duringvisit.roomAssignment.wardType.placeholder"),
      options: [
        t("pages.duringvisit.roomAssignment.wardType.options.emergency"),
        t("pages.duringvisit.roomAssignment.wardType.options.regular"),
      ],
      value: wardType,
      onChange: (e) => setWardType(e.target.value),
    },
    {
      type: "text",
      label: t("pages.duringvisit.roomAssignment.roomNumber.label"),
      placeholder: t("pages.duringvisit.roomAssignment.roomNumber.placeholder"),
      value: roomNumber,
      onChange: (e) => setRoomNumber(e.target.value),
    },
    {
      type: "text",
      label: t("pages.duringvisit.roomAssignment.bedNumber.label"),
      placeholder: t("pages.duringvisit.roomAssignment.bedNumber.placeholder"),
      value: bedNumber,
      onChange: (e) => setBedNumber(e.target.value),
    },
    {
      type: "select",
      label: t("pages.duringvisit.roomAssignment.admissionType.label"),
      placeholder: t(
        "pages.duringvisit.roomAssignment.admissionType.placeholder"
      ),
      options: [
        t(
          "pages.duringvisit.roomAssignment.admissionType.options.outpatient"
        ),
        t(
       "pages.duringvisit.roomAssignment.admissionType.options.inpatient"
        ),
        t(
          "pages.duringvisit.roomAssignment.admissionType.options.emergency"
           ),
      ],
      value: admissionType,
      onChange: (e) => setAdmissionType(e.target.value),
    },
  ];

  const teamNotificationFields = [
    {
      type: "text",
      label: t("pages.duringvisit.teamNotification.assignedDoctor.label"),
      placeholder: t(
        "pages.duringvisit.teamNotification.assignedDoctor.placeholder"
      ),
      value: assignedDoctor,
      onChange: (e) => setAssignedDoctor(e.target.value),
    },
    {
      type: "text",
      label: t("pages.duringvisit.teamNotification.assignedNurse.label"),
      placeholder: t(
        "pages.duringvisit.teamNotification.assignedNurse.placeholder"
      ),
      value: assignedNurse,
      onChange: (e) => setAssignedNurse(e.target.value),
    },
    {
      type: "text",
      label: t("pages.duringvisit.teamNotification.additionalNotes.label"),
      placeholder: t(
        "pages.duringvisit.teamNotification.additionalNotes.placeholder"
      ),
      value: additionalNotes,
      onChange: (e) => setAdditionalNotes(e.target.value),
    },
  ];

  const admissionStatusFields = [
    {
      type: "text",
      label: t("pages.duringvisit.admissionStatus.status.label"),
      placeholder: t("pages.duringvisit.admissionStatus.status.placeholder"),
      value: admissionStatus,
      onChange: (e) => setAdmissionStatus(e.target.value),
    },
    {
      type: "date",
      label: t("pages.duringvisit.admissionStatus.assignedDate.label"),
      placeholder: t(
        "pages.duringvisit.admissionStatus.assignedDate.placeholder"
      ),
      value: assignedDate,
      onChange: (e) => setAssignedDate(e.target.value),
    },
    {
      type: "time",
      label: t("pages.duringvisit.admissionStatus.assignedTime.label"),
      placeholder: "00:00:00",
      value: assignedTime,
      onChange: (e) => setAssignedTime(e.target.value),
    },
  ];

  const renderField = (field, index) => {
    if (field.type === "select") {
      return (
        <label key={index} className="block">
          <span className="text-sm font-medium">{field.label}</span>
          <select
            className="border border-[#CDCDCD] p-2 rounded w-full mt-3 text-[#808080]"
            value={field.value}
            onChange={field.onChange}
            defaultValue=""
            required
          >
            <option value="" disabled>
              {field.placeholder}
            </option>
            {field.options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      );
    }
    return (
      <label key={index} className="block">
        <span className="text-sm font-medium">{field.label}</span>
        <input
          type={field.type}
          placeholder={field.placeholder}
          className="border border-gray-300 text-[#808080] p-2 rounded w-full mt-3"
          value={field.value}
          onChange={field.onChange}
          required
        />
      </label>
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="px-4 sm:px-6 lg:px-8 py-4 bg-gray-100">
          <div className="flex gap-2">
            <img
              src={backIcon}
              alt="back-icon"
              className="cursor-pointer"
              onClick={handlePatient}
            />
            <h1 className="text-2xl font-bold">
              {t("pages.duringvisit.title")}
            </h1>
          </div>
          <form className="mt-6 space-y-6 shadow-sm" onSubmit={handleSubmit}>
            <FormSection title={t("pages.duringvisit.patientDetails.title")}>
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {patientDetailsFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title={t("pages.duringvisit.roomAssignment.title")}>
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {roomAssignmentFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title={t("pages.duringvisit.teamNotification.title")}>
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {teamNotificationFields.map((field, index) => {
                  if (
                    field.label ===
                    t(
                      "pages.duringvisit.teamNotification.additionalNotes.label"
                    )
                  ) {
                    return (
                      <label key={index} className="block col-span-3">
                        <span className="text-sm font-medium">
                          {field.label}
                        </span>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          className="border border-gray-300 text-[#808080] p-2 rounded w-full mt-3"
                          required
                        />
                      </label>
                    );
                  }
                  return renderField(field, index);
                })}
              </div>
            </FormSection>

            <FormSection title={t("pages.duringvisit.admissionStatus.title")}>
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {admissionStatusFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
              <button
                type="button"
                className="px-6 py-2 rounded-xl border border-[#747474] text-[#747474]"
                onClick={handlePatient}
              >
                {t("pages.duringvisit.buttons.cancel")}
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-[#2E2559] text-white"
                onClick={handlePatient}
              >
                {t("pages.duringvisit.buttons.complete")}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default DuringVisit;
