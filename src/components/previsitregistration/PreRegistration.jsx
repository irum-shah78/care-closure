import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import FormSection from "../../components/formselection/FormSelection";
import backIcon from "../../assets/back-icon.svg";
import { useNavigate } from "react-router-dom";
import tickIcon from "../../assets/tick.svg";

const PreRegistration = () => {
  const navigate = useNavigate();
  const handlePatient = () => {
    navigate("/patients");
  };

  const patientDetailsFields = [
    { type: "text", label: "Visit ID", placeholder: "#2315" },
    {
      type: "select",
      label: "Visit Type",
      placeholder: "New Consultation",
      options: ["Checkup", "Regular"],
    },
    {
      type: "select",
      label: "Department",
      placeholder: "General Medicine",
      options: ["Medicine", "Labs"],
    },
    {
      type: "select",
      label: "Preferred Doctor",
      placeholder: "Select your gender",
      options: ["Male", "Female"],
    },
    { type: "date", label: "Preferred Date", placeholder: "mm/dd/yy" },
    {
      type: "select",
      label: "Preferred Time Slot",
      placeholder: "Morning(9AM - 12PM)",
      options: ["Morning(9AM - 12PM)", "Morning(9AM - 12PM)"],
    },
    { type: "text", label: "Last ", placeholder: "Enter last name" },
    
    
    {
      type: "select",
      label: "Marital Status",
      placeholder: "Select your marital status",
      options: ["Single", "Married"],
    },
    {
      type: "select",
      label: "Blood Group",
      placeholder: "Select your blood group",
      options: ["A+", "B+", "O+", "AB+"],
    },
  ];

  const contactInformationFields = [
    { type: "text", label: "Mobile Number", placeholder: "Placeholder" },
    { type: "text", label: "Email", placeholder: "Placeholder" },
    {
      type: "select",
      label: "City",
      placeholder: "Select Your City",
      options: ["City 1", "City 2", "City 3"],
    },
    { type: "text", label: "Address", placeholder: "Placeholder", colSpan: 2 },
    {
      type: "select",
      label: "State",
      placeholder: "Select Your State",
      options: ["State 1", "State 2", "State 3"],
    },
    { type: "text", label: "Pincode", placeholder: "Enter your pincode" },
  ];

  const emergencyContactFields = [
    { type: "text", label: "Contact Name", placeholder: "Enter name" },
    { type: "text", label: "Relationship", placeholder: "Enter relationship" },
    {
      type: "text",
      label: "Contact Number",
      placeholder: "Enter contact number",
    },
  ];

  const medicalInformationFields = [
    { type: "text", label: "Known Allergies", placeholder: "If any" },
    { type: "text", label: "Current Medications", placeholder: "If any" },
    {
      type: "select",
      label: "Medical History",
      placeholder: "Any previous conditions",
      options: ["None", "Condition 1", "Condition 2"],
    },
  ];

  const insuranceInformationFields = [
    {
      type: "text",
      label: "Insurance Provider",
      placeholder: "Enter name of insurance provider",
    },
    {
      type: "text",
      label: "Policy Number",
      placeholder: "Enter policy number",
    },
  ];

  const cardDetailsFields = [
    { type: "text", label: "Card Number", placeholder: "12345678" },
    { type: "text", label: "Expiry Date", placeholder: "mm/yy" },
    { type: "text", label: "CVV", placeholder: "123" },
  ];

  const paymentFields = [
    {
      type: "select",
      label: "Payment Status",
      placeholder: "Select status",
      options: ["Received", "Pending", "Failed"],
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
            <h1 className="text-2xl font-bold">Pre-Visit Patient Registration</h1>
          </div>
          <form className="mt-6 space-y-6 shadow-sm">
            <FormSection title="Visit Information">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {patientDetailsFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title="Contact Information">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {contactInformationFields.map((field, index) => {
                  if (field.label === "Address") {
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
                  if (field.label === "Pincode") {
                    return (
                      <label key={index} className="block col-span-1">
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

            <FormSection title="Emergency Contact">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {emergencyContactFields.map((field, index) =>
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

            <FormSection title="Insurance Information">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {insuranceInformationFields.map((field, index) => {
                  if (field.label === "Insurance Provider") {
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

                  if (field.label === "Policy Number") {
                    return (
                      <label key={index} className="block col-span-1 relative">
                        <span className="text-sm font-medium">
                          {field.label}
                        </span>
                        <div className="relative mt-3">
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            className="border border-gray-300 text-[#808080] p-2 rounded w-full pr-10"
                          />
                          <img
                            src={tickIcon}
                            alt="Icon"
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 w-5 h-5"
                          />
                        </div>
                      </label>
                    );
                  }

                  return renderField(field, index);
                })}
              </div>
            </FormSection>

            <FormSection title="Card Details">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {cardDetailsFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title="Payment">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 gap-x-14 gap-y-4 mt-4">
                {paymentFields.map((field, index) => renderField(field, index))}
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
                Generate ID
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PreRegistration;
