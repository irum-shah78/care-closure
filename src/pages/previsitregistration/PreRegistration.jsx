import React, { useState } from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import FormSection from "../../components/formselection/FormSelection";
import backIcon from "../../assets/back-icon.svg";
import { useNavigate } from "react-router-dom";

const PreRegistration = () => {
  const navigate = useNavigate();
  const handlePatient = () => {
    navigate("/patients/patient-details");
  };

  // Form states
  const [visitId, setVisitId] = useState("");
  const [visitType, setVisitType] = useState("");
  const [department, setDepartment] = useState("");
  const [preferredDoctor, setPreferredDoctor] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTimeSlot, setPreferredTimeSlot] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create visit details object
    const visitDetails = {
      visitId: `#${Math.floor(1000 + Math.random() * 9000)}`, // Generate dynamic ID
      visitType,
      department,
      preferredDoctor,
      preferredDate,
      preferredTimeSlot,
    };

    // Get existing patient data from localStorage
    const storedData = localStorage.getItem("patientData");
    let patientData = storedData ? JSON.parse(storedData) : {};

    // Update patient data with visit details
    patientData = {
      ...patientData,
      visitDetails: [...(patientData.visitDetails || []), visitDetails],
    };

    // Save updated data back to localStorage
    localStorage.setItem("patientData", JSON.stringify(patientData));

    // Redirect to dashboard or another page
    navigate("/dashboard");
  };

  // const [visitId, setVisitId] = useState("");
  // const [visitType, setVisitType] = useState("");
  // const [department, setDepartment] = useState("");
  // const [preferredDoctor, setPreferredDoctor] = useState("");
  // const [preferredDate, setPreferredDate] = useState("");
  // const [preferredTimeSlot, setPreferredTimeSlot] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const visitDetails = {
  //     visitId: `#${Math.floor(1000 + Math.random() * 9000)}`,
  //     visitType,
  //     department,
  //     preferredDoctor,
  //     preferredDate,
  //     preferredTimeSlot,
  //   };

  //   const patientData = JSON.parse(localStorage.getItem("patients") || "[]");
  //   const updatedPatient = {
  //     ...patientData,
  //     visitDetails,
  //   };

  //   localStorage.setItem("patients", JSON.stringify(updatedPatient));
  //   navigate("/dashboard");
  // };

  const visitInfoFields = [
    {
      type: "number",
      label: "Visit ID",
      placeholder: "#2315",
      value: visitId,
      onChange: (e) => setVisitId(e.target.value),
    },
    {
      type: "select",
      label: "Visit Type",
      placeholder: "New Consultation",
      options: ["Checkup", "Regular"],
      value: visitType,
      onChange: (e) => setVisitType(e.target.value),
    },
    {
      type: "select",
      label: "Department",
      placeholder: "General Medicine",
      options: ["Medicine", "Labs"],
      value: department,
      onChange: (e) => setDepartment(e.target.value),
    },
    {
      type: "select",
      label: "Preferred Doctor",
      placeholder: "Select your gender",
      options: ["Male", "Female"],
      value: preferredDoctor,
      onChange: (e) => setPreferredDoctor(e.target.value),
    },
    {
      type: "date",
      label: "Preferred Date",
      placeholder: "mm/dd/yy",
      value: preferredDate,
      onChange: (e) => setPreferredDate(e.target.value),
    },
    {
      type: "select",
      label: "Preferred Time Slot",
      placeholder: "Morning(9AM - 12PM)",
      options: ["Morning(9AM - 12PM)", "Morning(9AM - 12PM)"],
      value: preferredTimeSlot,
      onChange: (e) => setPreferredTimeSlot(e.target.value),
    },
  ];

  const medicalInformationFields = [
    {
      type: "text",
      label: "Reason For Visit",
      placeholder: "Brief Description of your Medical Concern ",
    },
    {
      type: "text",
      label: "Current Symptoms",
      placeholder: "List any current symptoms",
    },
    {
      type: "text",
      label: "Symptoms Duration",
      placeholder: "How long have you had these symptoms?",
    },
  ];

  const insuranceVerificationFields = [
    { type: "text", label: "Insurance Provider", placeholder: "Enter name" },
    { type: "text", label: "Policy Number", placeholder: "Enter number" },
    { type: "text", label: "Subscriber Name", placeholder: "Enter name" },
    {
      type: "select",
      label: "Relationship to Subscriber",
      placeholder: "Self",
      options: ["Self", "Owner", "Subscriber"],
    },
  ];

  const additionalRequirements = [
    {
      type: "select",
      label: "Additional Requirements",
      placeholder: "Wheelchair access, interpreter, etc",
      options: ["Wheelchair access, interpreter, etc", "AC", "Interpreter"],
    },
  ];

  const renderField = (field, index) => {
    if (field.type === "select") {
      return (
        <label key={index} className="block">
          <span className="text-sm font-medium">{field.label}</span>
          <select
            className="border border-[#CDCDCD] p-2 rounded w-full mt-3 text-[#808080]"
            defaultValue=""
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
        />
      </label>
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="px-8 py-4">
          <div className="flex gap-2">
            <img
              src={backIcon}
              alt="back-icon"
              className="cursor-pointer"
              onClick={handlePatient}
            />
            <h1 className="text-2xl font-bold">
              Pre-Visit Patient Registration
            </h1>
          </div>
          <form className="mt-6 space-y-6 shadow-sm" onSubmit={handleSubmit}>
            <FormSection title="Visit Information">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {visitInfoFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title="Medical Information">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {medicalInformationFields.map((field, index) => {
                  if (field.label === "Reason For Visit") {
                    return (
                      <label key={index} className="block col-span-3">
                        <span className="text-sm font-medium">
                          {field.label}
                        </span>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          className="border border-gray-300 text-[#808080] p-2 rounded w-full mt-3"
                        />
                      </label>
                    );
                  }
                  if (field.label === "Current Symptoms") {
                    return (
                      <label key={index} className="block col-span-2">
                        <span className="text-sm font-medium">
                          {field.label}
                        </span>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          className="border border-gray-300 text-[#808080] p-2 rounded w-full mt-3"
                        />
                      </label>
                    );
                  }
                  return renderField(field, index);
                })}
              </div>
            </FormSection>

            <FormSection title="Insurance Verification">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {insuranceVerificationFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>
            <FormSection title="Medical Information">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {medicalInformationFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title="Additional Requirements">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 gap-x-14 gap-y-4 mt-4">
                {additionalRequirements.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                className="px-6 py-2 rounded-xl border border-[#747474] text-[#747474]"
                onClick={handlePatient}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-[#2E2559] text-white"
              >
                Schedule Visit
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PreRegistration;
