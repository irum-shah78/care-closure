import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import FormSection from "../../components/formselection/FormSelection";
import backIcon from "../../assets/back-icon.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PostVisit = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handlePatient = () => {
    navigate("/patients/patient-details");
  };

  const paymentProcessingFields = [
    {
      type: "text",
      label: t("pages.postvisit.paymentProcessing.consultationFee.label"),
      placeholder: "100.00",
    },
    {
      type: "text",
      label: t("pages.postvisit.paymentProcessing.medicatedCharges.label"),
      placeholder: t(
        "pages.postvisit.paymentProcessing.medicatedCharges.placeholder"
      ),
    },
    {
      type: "text",
      label: t("pages.postvisit.paymentProcessing.additionalServices.label"),
      placeholder: t(
        "pages.postvisit.paymentProcessing.additionalServices.placeholder"
      ),
    },
    {
      type: "text",
      label: t("pages.postvisit.paymentProcessing.totalAmount.label"),
      placeholder: t(
        "pages.postvisit.paymentProcessing.totalAmount.placeholder"
      ),
    },
    {
      type: "select",
      label: t("pages.postvisit.paymentProcessing.paymentMethod.label"),
      placeholder: t(
        "pages.postvisit.paymentProcessing.paymentMethod.placeholder"
      ),
      options: [
        t("pages.postvisit.paymentProcessing.paymentMethod.options.online"),
        t("pages.postvisit.paymentProcessing.paymentMethod.options.cash"),
      ],
    },
    {
      type: "select",
      label: t("pages.postvisit.paymentProcessing.paymentStatus.label"),
      placeholder: t(
        "pages.postvisit.paymentProcessing.paymentStatus.placeholder"
      ),
      options: [
        t("pages.postvisit.paymentProcessing.paymentStatus.options.pending"),
        t("pages.postvisit.paymentProcessing.paymentStatus.options.completed"),
      ],
    },
  ];

  const followupFields = [
    {
      type: "select",
      label: t("pages.postvisit.followupSection.required.label"),
      placeholder: t("pages.postvisit.followupSection.required.placeholder"),
      options: [
        t("pages.postvisit.followupSection.required.options.option1"),
        t("pages.postvisit.followupSection.required.options.option2"),
      ],
    },
    {
      type: "date",
      label: t("pages.postvisit.followupSection.preferredDate.label"),
      placeholder: "mm/dd/yy",
    },
    {
      type: "text",
      label: t("pages.postvisit.followupSection.assignedDoctor.label"),
      placeholder: t(
        "pages.postvisit.followupSection.assignedDoctor.placeholder"
      ),
    },
    {
      type: "text",
      label: t("pages.postvisit.followupSection.department.label"),
      placeholder: t("pages.postvisit.followupSection.department.placeholder"),
    },
  ];

  const visitSummaryFields = [
    {
      type: "text",
      label: t("pages.postvisit.visitSummary.diagnosis.label"),
      placeholder: t("pages.postvisit.visitSummary.diagnosis.placeholder"),
    },
    {
      type: "text",
      label: t("pages.postvisit.visitSummary.treatmentSummary.label"),
      placeholder: t(
        "pages.postvisit.visitSummary.treatmentSummary.placeholder"
      ),
    },
    {
      type: "text",
      label: t("pages.postvisit.visitSummary.medicationsPrescribed.label"),
      placeholder: t(
        "pages.postvisit.visitSummary.medicationsPrescribed.placeholder"
      ),
    },
    {
      type: "text",
      label: t("pages.postvisit.visitSummary.specialInstructions.label"),
      placeholder: t(
        "pages.postvisit.visitSummary.specialInstructions.placeholder"
      ),
    },
  ];

  const visitStatusFields = [
    {
      type: "text",
      label: t("pages.postvisit.visitStatus.statusUpdate.label"),
      placeholder: t("pages.postvisit.visitStatus.statusUpdate.placeholder"),
    },
    {
      type: "date",
      label: t("pages.postvisit.visitStatus.dischargedDate.label"),
      placeholder: "mm/dd/yy",
    },
    {
      type: "time",
      label: t("pages.postvisit.visitStatus.dischargedTime.label"),
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
            <h1 className="text-2xl font-bold">
              {" "}
              {t("pages.postvisit.title")}
            </h1>
          </div>
          <form className="mt-6 space-y-6 shadow-sm">
            <FormSection title={t("pages.postvisit.paymentProcessing.title")}>
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {paymentProcessingFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title={t("pages.postvisit.followupSection.title")}>
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {followupFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title={t("pages.postvisit.visitSummary.title")}>
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {visitSummaryFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title={t("pages.postvisit.visitStatus.title")}>
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {visitStatusFields.map((field, index) =>
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
                {t("pages.postvisit.printSummary")}
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-[#2E2559] text-white"
                onClick={handlePatient}
              >
                {t("pages.postvisit.completeCheckout")}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PostVisit;
