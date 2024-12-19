import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import FormSection from "../../components/formselection/FormSelection";
import backIcon from "../../assets/back-icon.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const DuringVisit = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handlePatient = () => {
    navigate("/patients/patient-details");
  };

  const patientDetailsFields = [
    {
      type: "text",
      label: t("pages.duringvisit.patientDetails.firstName.label"),
      placeholder: t("pages.duringvisit.patientDetails.firstName.placeholder"),
    },
    {
      type: "text",
      label: t("pages.duringvisit.patientDetails.middleName.label"),
      placeholder: t("pages.duringvisit.patientDetails.middleName.placeholder"),
    },
    {
      type: "text",
      label: t("pages.duringvisit.patientDetails.lastName.label"),
      placeholder: t("pages.duringvisit.patientDetails.lastName.placeholder"),
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
    },
    {
      type: "text",
      label: t("pages.duringvisit.patientDetails.insuranceNumber.label"),
      placeholder: t(
        "pages.duringvisit.patientDetails.insuranceNumber.placeholder"
      ),
    },
    {
      type: "text",
      label: t("pages.duringvisit.patientDetails.insuranceStatus.label"),
      placeholder: t(
        "pages.duringvisit.patientDetails.insuranceStatus.placeholder"
      ),
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
    },
    {
      type: "text",
      label: t("pages.duringvisit.roomAssignment.roomNumber.label"),
      placeholder: t("pages.duringvisit.roomAssignment.roomNumber.placeholder"),
    },
    {
      type: "text",
      label: t("pages.duringvisit.roomAssignment.bedNumber.label"),
      placeholder: t("pages.duringvisit.roomAssignment.bedNumber.placeholder"),
    },
    {
      type: "text",
      label: t("pages.duringvisit.roomAssignment.admissionType.label"),
      placeholder: t(
        "pages.duringvisit.roomAssignment.admissionType.placeholder"
      ),
    },
  ];

  const teamNotificationFields = [
    {
      type: "text",
      label: t("pages.duringvisit.teamNotification.assignedDoctor.label"),
      placeholder: t(
        "pages.duringvisit.teamNotification.assignedDoctor.placeholder"
      ),
    },
    {
      type: "text",
      label: t("pages.duringvisit.teamNotification.assignedNurse.label"),
      placeholder: t(
        "pages.duringvisit.teamNotification.assignedNurse.placeholder"
      ),
    },
    {
      type: "text",
      label: t("pages.duringvisit.teamNotification.additionalNotes.label"),
      placeholder: t(
        "pages.duringvisit.teamNotification.additionalNotes.placeholder"
      ),
    },
  ];

  const admissionStatusFields = [
    {
      type: "text",
      label: t("pages.duringvisit.admissionStatus.status.label"),
      placeholder: t("pages.duringvisit.admissionStatus.status.placeholder"),
    },
    {
      type: "date",
      label: t("pages.duringvisit.admissionStatus.assignedDate.label"),
      placeholder: t(
        "pages.duringvisit.admissionStatus.assignedDate.placeholder"
      ),
    },
    {
      type: "time",
      label: t("pages.duringvisit.admissionStatus.assignedTime.label"),
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
              {t("pages.duringvisit.title")}
            </h1>
          </div>
          <form className="mt-6 space-y-6 shadow-sm">
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
