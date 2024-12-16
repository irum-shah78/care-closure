import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import FormSection from "../../components/formselection/FormSelection";
import backIcon from "../../assets/back-icon.svg";
import { useNavigate } from "react-router-dom";

const PostVisit = () => {
  const navigate = useNavigate();
  const handlePatient = () => {
    navigate("/patients/patient-details");
  };

  const paymentProcessingFields = [
    { type: "text", label: "Cunsultation Fee", placeholder: "100.00" },
    { type: "text", label: "Medicated Charges", placeholder: "Charges here" },
    { type: "text", label: "Additional Services ", placeholder: "If any" },
    { type: "text", label: "Total Amount", placeholder: "Amount here" },
    {
      type: "select",
      label: "Payment Method",
      placeholder: "Select Payment Method ",
      options: ["Online", "Cash"],
    },
    {
      type: "select",
      label: "Payment Status",
      placeholder: "Select Payment status ",
      options: ["Pending", "Completed"],
    },
  ];

  const followupFields = [
    {
      type: "select",
      label: "Follow-up Required",
      placeholder: "Select Option",
      options: ["Option", "Option"],
    },
    { type: "date", label: "Preferred Date", placeholder: "" },
    {
      type: "text",
      label: "Assigned Doctor",
      placeholder: "Select doctor name",
    },
    {
      type: "text",
      label: "Department",
      placeholder: "Select department",
    },
  ];

  const visitSummaryFields = [
    {
      type: "text",
      label: "Diagnosis",
      placeholder: "Enter diagnosis",
    },
    {
      type: "text",
      label: "Treatment Summary",
      placeholder: "Enter summary",
    },
    {
      type: "text",
      label: "Medications Prescribed",
      placeholder: "Enter medications",
    },
    {
      type: "text",
      label: "Special Instructions",
      placeholder: "Enter instructions",
    },
  ];

  const visitStatusFields = [
    {
      type: "text",
      label: "Status Update",
      placeholder: "Select visit status",
    },
    {
      type: "date",
      label: "Discharged Date",
      placeholder: "Enter assigned nurse name",
    },
    {
      type: "time",
      label: "Discharged Time",
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
        <div className="px-8 py-4">
          <div className="flex gap-2">
            <img
              src={backIcon}
              alt="back-icon"
              className="cursor-pointer"
              onClick={handlePatient}
            />
            <h1 className="text-2xl font-bold">Post-Visit</h1>
          </div>
          <form className="mt-6 space-y-6 shadow-sm">
            <FormSection title="Payment Processing">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {paymentProcessingFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title="Follow-up Scheduling">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {followupFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title="Visit Summary">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 gap-x-14 gap-y-4 mt-4">
                {visitSummaryFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title="Visit Status">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {visitStatusFields.map((field, index) =>
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
                Print Summary
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-[#2E2559] text-white"
              >
                Complete Check-out
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PostVisit;
