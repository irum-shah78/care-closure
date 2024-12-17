import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import FormSection from "../../components/formselection/FormSelection";
import backIcon from "../../assets/back-icon.svg";
import { useNavigate } from "react-router-dom";
const DuringVisit = () => {
  const navigate = useNavigate();
  const handlePatient = () => {
    navigate("/patients/patient-details");
  };

  const patientDetailsFields = [
    { type: "text", label: "Patient First Name", placeholder: "Name here" },
    { type: "text", label: "Patient Middle Name", placeholder: "Name here" },
    { type: "text", label: "Patient Last Name", placeholder: "Name here" },
    {
      type: "select",
      label: "Insurance Provider",
      placeholder: "Provider Name",
      options: ["Checkup", "Regular"],
    },
    {
      type: "text",
      label: "Insurance Number",
      placeholder: "Enter insurance number",
    },
    {
      type: "text",
      label: "Insurance Status",
      placeholder: "Verification Status",
    },
  ];

  const roomAssignmentFields = [
    {
      type: "select",
      label: "Ward Type",
      placeholder: "Select Ward Type",
      options: ["Emergency", "Regular"],
    },
    { type: "text", label: "Room Number", placeholder: "Enter room number" },
    { type: "text", label: "Bed Number", placeholder: "Enter bed number" },
    {
      type: "text",
      label: "Admission Type",
      placeholder: "Select admission type",
    },
  ];

  const teamNotificationFields = [
    {
      type: "text",
      label: "Assigned Doctor",
      placeholder: "Enter assigned doctor name",
    },
    {
      type: "text",
      label: "Assigned Nurse",
      placeholder: "Enter assigned nurse name",
    },
    {
      type: "select",
      label: "Additionl Notes",
      placeholder: "Any special instrcutions or requirements",
      options: ["Self", "Owner", "Subscriber"],
    },
  ];

  const admissionStatusFields = [
    {
      type: "text",
      label: "Status",
      placeholder: "Select admission status",
    },
    {
      type: "date",
      label: "Assigned Date",
      placeholder: "Enter assigned nurse name",
    },
    {
      type: "time",
      label: "Assigned Time",
      placeholder: "00:00:00",
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
            <h1 className="text-2xl font-bold">During-Visit</h1>
          </div>
          <form className="mt-6 space-y-6 shadow-sm">
            <FormSection title="Patient & Insurance Verfication">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {patientDetailsFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title="Room Assignment">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {roomAssignmentFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title="Team Notification">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {teamNotificationFields.map((field, index) => {
                  if (field.label === "Additionl Notes") {
                    return (
                      <label key={index} className="block col-span-3">
                        <span className="text-sm font-medium">
                          {field.label}
                        </span>
                        <select
                          className="border border-gray-300 text-[#808080] p-2 rounded w-full mt-3"
                          defaultValue=""
                          required
                        >
                          <option value="" disabled>
                            {field.placeholder}
                          </option>
                          {field.options?.map((option, i) => (
                            <option key={i} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    );
                  }
                  return renderField(field, index);
                })}
              </div>
            </FormSection>

            <FormSection title="Admission Status">
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
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-[#2E2559] text-white"
              >
                Complete Admission
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default DuringVisit;
