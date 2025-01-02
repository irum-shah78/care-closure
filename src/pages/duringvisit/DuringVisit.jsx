import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import FormSection from "../../components/formselection/FormSelection";
import backIcon from "../../assets/back-icon.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
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

  const [historyOfPresentIllness, setHistoryOfPresentIllness] = useState("");
  const [historyOfPresentIllnessAuto, setHistoryOfPresentIllnessAuto] =
    useState("");
  const [skipMedicalHistory, setSkipMedicalHistory] = useState(false); // Boolean
  const [perinatalMedicalHistory, setPerinatalMedicalHistory] = useState("");
  const [pastMedicalHistory, setPastMedicalHistory] = useState("");
  const [surgicalHistory, setSurgicalHistory] = useState("");
  const [familyHistory, setFamilyHistory] = useState("");
  const [immunization, setImmunization] = useState("");
  const [developmentalMilestones, setDevelopmentalMilestones] = useState("");
  const [drugHistory, setDrugHistory] = useState("");
  const [substancesUse, setSubstancesUse] = useState("");

  const [vitalSigns, setVitalSigns] = useState([]);
  const [physicalExamination, setPhysicalExamination] = useState([]);
  const [vaginalExaminations, setVaginalExaminations] = useState([]);
  const [LMP, setLMP] = useState("");
  const [GAPC, setGAPC] = useState([]);
  const [GAPCCurrent, setGAPCCurrent] = useState([]);
  const [perinatalOutcomes, setPerinatalOutcomes] = useState([]);

  // const [diagnostic, setDiagnostic] = useState([]);
  // const [treatment, setTreatment] = useState([]);
  const [diet, setDiet] = useState("");
  const [physicalActivity, setPhysicalActivity] = useState("");
  const [position, setPosition] = useState("");
  const [cures, setCures] = useState("");
  const [oxygenTherapy, setOxygenTherapy] = useState("");
  const [chestPhysiotherapy, setChestPhysiotherapy] = useState("");
  const [catheters, setCatheters] = useState("");
  const [drains, setDrains] = useState("");
  const [nebulizations, setNebulizations] = useState("");

  const [fluids, setFluids] = useState([]);
  const [totalFluidsCalc, setTotalFluidsCalc] = useState("");
  const [fluidBalance, setFluidBalance] = useState("");
  const [hourlyDiuresis, setHourlyDiuresis] = useState("");
  const [hourlyMeanDiuresis, setHourlyMeanDiuresis] = useState("");
  const [timeTemperatureCurve, setTimeTemperatureCurve] = useState("");
  const [controls, setControls] = useState([]);
  const [othersOrderSets, setOthersOrderSets] = useState("");

  const [diagnostic, setDiagnostic] = useState({
    ordinal: 0,
    institutionId: 0,
    departmentId: 0,
    name: "",
    code: null,
    note: null,
    recordStage: 1,
    createdDate: "",
    suspendedDate: null,
    capitalizeIndexes: "",
  });

  const [treatment, setTreatment] = useState({
    ordinal: 0,
    institutionId: 0,
    departmentId: 0,
    name: "",
    use: null,
    isDrug: true,
    presentation: null,
    indications: "",
    missingDays: 0,
    note: null,
    recordStage: 1,
    createdDate: "",
    suspendedDate: null,
    capitalizeIndexes: "",
    visibleInAdmissionForm: true,
    visibleInEgressForm: true,
    visibleTreatmentTime: true,
    visibleInInpatientsReport: true,
    supports: [],
  });

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

  const API_AUTH_HEADERS = {
    Authorization: "Bearer yourAuthToken",
    "X-xPxApp-App-Account-Id": "yourAppAccountId",
    "X-xPxApp-App-Auth": "yourAppAuth",
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const handleSubmit = async (e) => {
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
      historyOfPresentIllness,
      historyOfPresentIllnessAuto,
      skipMedicalHistory,
      perinatalMedicalHistory,
      pastMedicalHistory,
      surgicalHistory,
      familyHistory,
      immunization,
      developmentalMilestones,
      drugHistory,
      substancesUse,
      vitalSigns,
      physicalExamination,
      vaginalExaminations,
      LMP,
      GAPC,
      GAPCCurrent,
      perinatalOutcomes,
      diagnostic,
      treatment,
      diet,
      physicalActivity,
      position,
      cures,
      oxygenTherapy,
      chestPhysiotherapy,
      catheters,
      drains,
      nebulizations,
      fluids,
      totalFluidsCalc,
      fluidBalance,
      hourlyDiuresis,
      hourlyMeanDiuresis,
      timeTemperatureCurve,
      controls,
      othersOrderSets,
    };

    try {
      await axios.post("http://localost:8000/records", visitDetails, {
        headers: API_AUTH_HEADERS,
      });

      const storedData = localStorage.getItem("duringVisitDetails");
      const existingDetails = Array.isArray(JSON.parse(storedData))
        ? JSON.parse(storedData)
        : [];

      existingDetails.push(visitDetails);
      localStorage.setItem(
        "duringVisitDetails",
        JSON.stringify(existingDetails)
      );

      navigate("/patients/patient-details", { state: { patient } });
    } catch (error) {
      console.error("Error creating the visit record:", error);
      alert(
        "There was an error while submitting the visit record. Please try again."
      );
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const visitDetails = {
  //     firstName,
  //     middleName,
  //     lastName,
  //     insuranceProvider,
  //     insuranceNumber,
  //     insuranceStatus,
  //     wardType,
  //     roomNumber,
  //     bedNumber,
  //     admissionType,
  //     assignedDoctor,
  //     assignedNurse,
  //     additionalNotes,
  //     admissionStatus,
  //     assignedDate,
  //     assignedTime,
  //   };

  //   const storedData = localStorage.getItem("duringVisitDetails");
  //   const existingDetails = Array.isArray(JSON.parse(storedData))
  //     ? JSON.parse(storedData)
  //     : [];

  //   existingDetails.push(visitDetails);
  //   localStorage.setItem("duringVisitDetails", JSON.stringify(existingDetails));
  //   navigate("/patients/patient-details", { state: { patient } });
  // };

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

  const medicalHistoryFields = [
    {
      type: "text",
      label: t(
        "pages.duringvisit.medicalHistory.historyOfPresentIllness.label"
      ),
      placeholder: t(
        "pages.duringvisit.medicalHistory.historyOfPresentIllness.placeholder"
      ),
      value: historyOfPresentIllness,
      onChange: (e) => setHistoryOfPresentIllness(e.target.value),
    },
    {
      type: "text",
      label: t(
        "pages.duringvisit.medicalHistory.historyOfPresentIllnessAuto.label"
      ),
      placeholder: t(
        "pages.duringvisit.medicalHistory.historyOfPresentIllnessAuto.placeholder"
      ),
      value: historyOfPresentIllnessAuto,
      onChange: (e) => setHistoryOfPresentIllnessAuto(e.target.value),
    },
    {
      type: "checkbox",
      label: t("pages.duringvisit.medicalHistory.skipMedicalHistory.label"),
      value: skipMedicalHistory,
      onChange: (e) => setSkipMedicalHistory(e.target.checked),
    },
    {
      type: "text",
      label: t(
        "pages.duringvisit.medicalHistory.perinatalMedicalHistory.label"
      ),
      placeholder: t(
        "pages.duringvisit.medicalHistory.perinatalMedicalHistory.placeholder"
      ),
      value: perinatalMedicalHistory,
      onChange: (e) => setPerinatalMedicalHistory(e.target.value),
    },
    {
      type: "text",
      label: t("pages.duringvisit.medicalHistory.pastMedicalHistory.label"),
      placeholder: t(
        "pages.duringvisit.medicalHistory.pastMedicalHistory.placeholder"
      ),
      value: pastMedicalHistory,
      onChange: (e) => setPastMedicalHistory(e.target.value),
    },
    {
      type: "text",
      label: t("pages.duringvisit.medicalHistory.surgicalHistory.label"),
      placeholder: t(
        "pages.duringvisit.medicalHistory.surgicalHistory.placeholder"
      ),
      value: surgicalHistory,
      onChange: (e) => setSurgicalHistory(e.target.value),
    },
    {
      type: "text",
      label: t("pages.duringvisit.medicalHistory.familyHistory.label"),
      placeholder: t(
        "pages.duringvisit.medicalHistory.familyHistory.placeholder"
      ),
      value: familyHistory,
      onChange: (e) => setFamilyHistory(e.target.value),
    },
    {
      type: "text",
      label: t("pages.duringvisit.medicalHistory.immunization.label"),
      placeholder: t(
        "pages.duringvisit.medicalHistory.immunization.placeholder"
      ),
      value: immunization,
      onChange: (e) => setImmunization(e.target.value),
    },
    {
      type: "text",
      label: t(
        "pages.duringvisit.medicalHistory.developmentalMilestones.label"
      ),
      placeholder: t(
        "pages.duringvisit.medicalHistory.developmentalMilestones.placeholder"
      ),
      value: developmentalMilestones,
      onChange: (e) => setDevelopmentalMilestones(e.target.value),
    },
    {
      type: "text",
      label: t("pages.duringvisit.medicalHistory.drugHistory.label"),
      placeholder: t(
        "pages.duringvisit.medicalHistory.drugHistory.placeholder"
      ),
      value: drugHistory,
      onChange: (e) => setDrugHistory(e.target.value),
    },
    {
      type: "text",
      label: t("pages.duringvisit.medicalHistory.substancesUse.label"),
      placeholder: t(
        "pages.duringvisit.medicalHistory.substancesUse.placeholder"
      ),
      value: substancesUse,
      onChange: (e) => setSubstancesUse(e.target.value),
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
        t("pages.duringvisit.roomAssignment.admissionType.options.outpatient"),
        t("pages.duringvisit.roomAssignment.admissionType.options.inpatient"),
        t("pages.duringvisit.roomAssignment.admissionType.options.emergency"),
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

  const vitalSignsFields = [
    {
      type: "text",
      label: t("pages.duringvisit.examinations.vitalSigns.name.label"),
      placeholder: t(
        "pages.duringvisit.examinations.vitalSigns.name.placeholder"
      ),
      value: vitalSigns.name,
      onChange: (e) => setVitalSigns({ ...vitalSigns, name: e.target.value }),
    },
    {
      type: "text",
      label: t("pages.duringvisit.examinations.vitalSigns.value.label"),
      placeholder: t(
        "pages.duringvisit.examinations.vitalSigns.value.placeholder"
      ),
      value: vitalSigns.value,
      onChange: (e) => setVitalSigns({ ...vitalSigns, value: e.target.value }),
    },
  ];

  const physicalExaminationFields = [
    {
      type: "text",
      label: t("pages.duringvisit.examinations.physicalExamination.name.label"),
      placeholder: t(
        "pages.duringvisit.examinations.physicalExamination.name.placeholder"
      ),
      value: physicalExamination.name,
      onChange: (e) =>
        setPhysicalExamination({
          ...physicalExamination,
          name: e.target.value,
        }),
    },
    {
      type: "text",
      label: t(
        "pages.duringvisit.examinations.physicalExamination.result.label"
      ),
      placeholder: t(
        "pages.duringvisit.examinations.physicalExamination.result.placeholder"
      ),
      value: physicalExamination.result,
      onChange: (e) =>
        setPhysicalExamination({
          ...physicalExamination,
          result: e.target.value,
        }),
    },
  ];

  const vaginalExaminationsFields = [
    {
      type: "text",
      label: t(
        "pages.duringvisit.examinations.vaginalExaminations.result.label"
      ),
      placeholder: t(
        "pages.duringvisit.examinations.vaginalExaminations.result.placeholder"
      ),
      value: vaginalExaminations.result,
      onChange: (e) =>
        setVaginalExaminations({
          ...vaginalExaminations,
          result: e.target.value,
        }),
    },
  ];

  const lmpField = [
    {
      type: "date",
      label: t("pages.duringvisit.examinations.LMP.label"),
      placeholder: t("pages.duringvisit.examinations.LMP.placeholder"),
      value: LMP,
      onChange: (e) => setLMP(e.target.value),
    },
  ];

  const GAPCFields = [
    {
      type: "text",
      label: t("pages.duringvisit.examinations.GAPC.name.label"),
      placeholder: t("pages.duringvisit.examinations.GAPC.name.placeholder"),
      value: GAPC.name,
      onChange: (e) => setGAPC({ ...GAPC, name: e.target.value }),
    },
  ];

  const GAPCCurrentFields = [
    {
      type: "text",
      label: t("pages.duringvisit.examinations.GAPCCurrent.current.label"),
      placeholder: t(
        "pages.duringvisit.examinations.GAPCCurrent.current.placeholder"
      ),
      value: GAPCCurrent.current,
      onChange: (e) =>
        setGAPCCurrent({ ...GAPCCurrent, current: e.target.value }),
    },
  ];

  const perinatalOutcomesFields = [
    {
      type: "text",
      label: t(
        "pages.duringvisit.examinations.perinatalOutcomes.outcome.label"
      ),
      placeholder: t(
        "pages.duringvisit.examinations.perinatalOutcomes.outcome.placeholder"
      ),
      value: perinatalOutcomes.outcome,
      onChange: (e) =>
        setPerinatalOutcomes({ ...perinatalOutcomes, outcome: e.target.value }),
    },
  ];

  const diagnosticFields = [
    {
      type: "text",
      label: t(
        "pages.duringvisit.careandTreatment.diagnosticFields.fields.diagnosticTest.label"
      ),
      placeholder: t(
        "pages.duringvisit.careandTreatment.diagnosticFields.fields.diagnosticTest.placeholder"
      ),
      value: diagnostic.name,
      onChange: (e) => setDiagnostic({ ...diagnostic, name: e.target.value }),
    },
    {
      type: "text",
      label: t(
        "pages.duringvisit.careandTreatment.diagnosticFields.fields.code.label"
      ),
      placeholder: t(
        "pages.duringvisit.careandTreatment.diagnosticFields.fields.code.placeholder"
      ),
      value: diagnostic.code,
      onChange: (e) => setDiagnostic({ ...diagnostic, code: e.target.value }),
    },
    {
      type: "text",
      label: t(
        "pages.duringvisit.careandTreatment.diagnosticFields.fields.note.label"
      ),
      placeholder: t(
        "pages.duringvisit.careandTreatment.diagnosticFields.fields.note.placeholder"
      ),
      value: diagnostic.note,
      onChange: (e) => setDiagnostic({ ...diagnostic, note: e.target.value }),
    },
    {
      type: "text",
      label: t(
        "pages.duringvisit.careandTreatment.diagnosticFields.fields.capitalizeIndexes.label"
      ),
      placeholder: t(
        "pages.duringvisit.careandTreatment.diagnosticFields.fields.capitalizeIndexes.placeholder"
      ),
      value: diagnostic.capitalizeIndexes,
      onChange: (e) =>
        setDiagnostic({ ...diagnostic, capitalizeIndexes: e.target.value }),
    },
  ];

  const treatmentFields = [
    {
      type: "text",
      label: t(
        "pages.duringvisit.careandTreatment.treatmentFields.fields.treatment.label"
      ),
      placeholder: t(
        "pages.duringvisit.careandTreatment.treatmentFields.fields.treatment.placeholder"
      ),
      value: treatment.name,
      onChange: (e) => setTreatment({ ...treatment, name: e.target.value }),
    },
    {
      type: "text",
      label: t(
        "pages.duringvisit.careandTreatment.treatmentFields.fields.use.label"
      ),
      placeholder: t(
        "pages.duringvisit.careandTreatment.treatmentFields.fields.use.placeholder"
      ),
      value: treatment.use,
      onChange: (e) => setTreatment({ ...treatment, use: e.target.value }),
    },
    {
      type: "text",
      label: t(
        "pages.duringvisit.careandTreatment.treatmentFields.fields.presentation.label"
      ),
      placeholder: t(
        "pages.duringvisit.careandTreatment.treatmentFields.fields.presentation.placeholder"
      ),
      value: treatment.presentation,
      onChange: (e) =>
        setTreatment({ ...treatment, presentation: e.target.value }),
    },
    {
      type: "text",
      label: t(
        "pages.duringvisit.careandTreatment.treatmentFields.fields.indications.label"
      ),
      placeholder: t(
        "pages.duringvisit.careandTreatment.treatmentFields.fields.indications.placeholder"
      ),
      value: treatment.indications,
      onChange: (e) =>
        setTreatment({ ...treatment, indications: e.target.value }),
    },
    {
      type: "number",
      label: t(
        "pages.duringvisit.careandTreatment.treatmentFields.fields.missingDays.label"
      ),
      placeholder: t(
        "pages.duringvisit.careandTreatment.treatmentFields.fields.missingDays.placeholder"
      ),
      value: treatment.missingDays,
      onChange: (e) =>
        setTreatment({ ...treatment, missingDays: e.target.value }),
    },
    {
      type: "text",
      label: t(
        "pages.duringvisit.careandTreatment.treatmentFields.fields.note.label"
      ),
      placeholder: t(
        "pages.duringvisit.careandTreatment.treatmentFields.fields.note.placeholder"
      ),
      value: treatment.note,
      onChange: (e) => setTreatment({ ...treatment, note: e.target.value }),
    },
    {
      type: "checkbox",
      label: t(
        "pages.duringvisit.careandTreatment.treatmentFields.fields.isDrug.label"
      ),
      value: treatment.isDrug,
      onChange: (e) => setTreatment({ ...treatment, isDrug: e.target.checked }),
    },
    {
      type: "checkbox",
      label: t(
        "pages.duringvisit.careandTreatment.treatmentFields.fields.visibleInAdmissionForm.label"
      ),
      value: treatment.visibleInAdmissionForm,
      onChange: (e) =>
        setTreatment({
          ...treatment,
          visibleInAdmissionForm: e.target.checked,
        }),
    },
    {
      type: "checkbox",
      label: t(
        "pages.duringvisit.careandTreatment.treatmentFields.fields.visibleInEgressForm.label"
      ),
      value: treatment.visibleInEgressForm,
      onChange: (e) =>
        setTreatment({ ...treatment, visibleInEgressForm: e.target.checked }),
    },

    {
      type: "checkbox",
      label: t(
        "pages.duringvisit.careandTreatment.treatmentFields.fields.visibleTreatmentTime.label"
      ),
      value: treatment.visibleTreatmentTime,
      onChange: (e) =>
        setTreatment({ ...treatment, visibleTreatmentTime: e.target.checked }),
    },
    {
      type: "checkbox",
      label: t(
        "pages.duringvisit.careandTreatment.treatmentFields.fields.visibleInInpatientsReport.label"
      ),
      value: treatment.visibleInInpatientsReport,
      onChange: (e) =>
        setTreatment({
          ...treatment,
          visibleInInpatientsReport: e.target.checked,
        }),
    },
  ];

  const dietField = [
    {
      type: "text",
      label: t(
        "pages.duringvisit.careandTreatment.dietField.fields.diet.label"
      ),
      placeholder: t(
        "pages.duringvisit.careandTreatment.dietField.fields.diet.placeholder"
      ),
      value: diet,
      onChange: (e) => setDiet(e.target.value),
    },
  ];

  const physicalActivityField = [
    {
      type: "text",
      label: t(
        "pages.duringvisit.careandTreatment.physicalActivityField.fields.physicalActivity.label"
      ),
      placeholder: t(
        "pages.duringvisit.careandTreatment.physicalActivityField.fields.physicalActivity.placeholder"
      ),
      value: physicalActivity,
      onChange: (e) => setPhysicalActivity(e.target.value),
    },
  ];

  const positionField = [
    {
      type: "text",
      label: t(
        "pages.duringvisit.careandTreatment.positionField.fields.position.label"
      ),
      placeholder: t(
        "pages.duringvisit.careandTreatment.positionField.fields.position.placeholder"
      ),
      value: position,
      onChange: (e) => setPosition(e.target.value),
    },
  ];

  const curesField = [
    {
      type: "text",
      label: t(
        "pages.duringvisit.careandTreatment.curesField.fields.cures.label"
      ),
      placeholder: t(
        "pages.duringvisit.careandTreatment.curesField.fields.cures.placeholder"
      ),
      value: cures,
      onChange: (e) => setCures(e.target.value),
    },
  ];

  const oxygenTherapyField = [
    {
      type: "text",
      label: t(
        "pages.duringvisit.careandTreatment.oxygenTherapyField.fields.oxygenTherapy.label"
      ),
      placeholder: t(
        "pages.duringvisit.careandTreatment.oxygenTherapyField.fields.oxygenTherapy.placeholder"
      ),
      value: oxygenTherapy,
      onChange: (e) => setOxygenTherapy(e.target.value),
    },
  ];

  const chestPhysiotherapyField = [
    {
      type: "text",
      label: t(
        "pages.duringvisit.careandTreatment.chestPhysiotherapyField.fields.chestPhysiotherapy.label"
      ),
      placeholder: t(
        "pages.duringvisit.careandTreatment.chestPhysiotherapyField.fields.chestPhysiotherapy.placeholder"
      ),
      value: chestPhysiotherapy,
      onChange: (e) => setChestPhysiotherapy(e.target.value),
    },
  ];

  const cathetersField = [
    {
      type: "text",
      label: t(
        "pages.duringvisit.careandTreatment.cathetersField.fields.catheters.label"
      ),
      placeholder: t(
        "pages.duringvisit.careandTreatment.cathetersField.fields.catheters.placeholder"
      ),
      value: catheters,
      onChange: (e) => setCatheters(e.target.value),
    },
  ];

  const drainsField = [
    {
      type: "text",
      label: t(
        "pages.duringvisit.careandTreatment.drainsField.fields.drains.label"
      ),
      placeholder: t(
        "pages.duringvisit.careandTreatment.drainsField.fields.drains.placeholder"
      ),
      value: drains,
      onChange: (e) => setDrains(e.target.value),
    },
  ];

  const nebulizationsField = [
    {
      type: "text",
      label: t(
        "pages.duringvisit.careandTreatment.nebulizationsField.fields.nebulizations.label"
      ),
      placeholder: t(
        "pages.duringvisit.careandTreatment.nebulizationsField.fields.nebulizations.placeholder"
      ),
      value: nebulizations,
      onChange: (e) => setNebulizations(e.target.value),
    },
  ];

  const fluidsField = [
    {
      type: "text",
      label: t("pages.duringvisit.monitoring.fluidsField.fields.fluids.label"),
      placeholder: t(
        "pages.duringvisit.monitoring.fluidsField.fields.fluids.placeholder"
      ),
      value: fluids.name,
      onChange: (e) => setFluids({ ...fluids, name: e.target.value }),
    },
  ];

  const totalFluidsCalcField = [
    {
      type: "text",
      label: t(
        "pages.duringvisit.monitoring.totalFluidsCalcField.fields.totalFluidsCalc.label"
      ),
      placeholder: t(
        "pages.duringvisit.monitoring.totalFluidsCalcField.fields.totalFluidsCalc.placeholder"
      ),
      value: totalFluidsCalc,
      onChange: (e) => setTotalFluidsCalc(e.target.value),
    },
  ];

  const fluidBalanceField = [
    {
      type: "text",
      label: t(
        "pages.duringvisit.monitoring.fluidBalanceField.fields.fluidBalance.label"
      ),
      placeholder: t(
        "pages.duringvisit.monitoring.fluidBalanceField.fields.fluidBalance.placeholder"
      ),
      value: fluidBalance,
      onChange: (e) => setFluidBalance(e.target.value),
    },
  ];

  const hourlyDiuresisField = [
    {
      type: "text",
      label: t(
        "pages.duringvisit.monitoring.hourlyDiuresisField.fields.hourlyDiuresis.label"
      ),
      placeholder: t(
        "pages.duringvisit.monitoring.hourlyDiuresisField.fields.hourlyDiuresis.placeholder"
      ),
      value: hourlyDiuresis,
      onChange: (e) => setHourlyDiuresis(e.target.value),
    },
  ];

  const hourlyMeanDiuresisField = [
    {
      type: "text",
      label: t(
        "pages.duringvisit.monitoring.hourlyMeanDiuresisField.fields.hourlyMeanDiuresis.label"
      ),
      placeholder: t(
        "pages.duringvisit.monitoring.hourlyMeanDiuresisField.fields.hourlyMeanDiuresis.placeholder"
      ),
      value: hourlyMeanDiuresis,
      onChange: (e) => setHourlyMeanDiuresis(e.target.value),
    },
  ];

  const timeTemperatureCurveField = [
    {
      type: "text",
      label: t(
        "pages.duringvisit.monitoring.timeTemperatureCurveField.fields.timeTemperatureCurve.label"
      ),
      placeholder: t(
        "pages.duringvisit.monitoring.timeTemperatureCurveField.fields.timeTemperatureCurve.placeholder"
      ),
      value: timeTemperatureCurve,
      onChange: (e) => setTimeTemperatureCurve(e.target.value),
    },
  ];

  const controlsField = [
    {
      type: "text",
      label: t(
        "pages.duringvisit.monitoring.controlsField.fields.controls.label"
      ),
      placeholder: t(
        "pages.duringvisit.monitoring.controlsField.fields.controls.placeholder"
      ),
      value: controls.name,
      onChange: (e) => setControls({ ...controls, name: e.target.value }),
    },
  ];

  const othersOrderSetsField = [
    {
      type: "text",
      label: t(
        "pages.duringvisit.monitoring.othersOrderSetsField.fields.othersOrderSets.label"
      ),
      placeholder: t(
        "pages.duringvisit.monitoring.othersOrderSetsField.fields.othersOrderSets.placeholder"
      ),
      value: othersOrderSets,
      onChange: (e) => setOthersOrderSets(e.target.value),
    },
  ];

  const renderField = (field, index) => {
    if (field.type === "checkbox") {
      return (
        <div key={index} className="flex items-center gap-4">
          <input
            type="checkbox"
            className="w-8 h-8 accent-[#2E2559]"
            checked={field.value}
            onChange={field.onChange}
          />
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium">{field.label}</label>
          </div>
        </div>
      );
    }

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

            <FormSection title={t("pages.duringvisit.medicalHistory.title")}>
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {medicalHistoryFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title={t("pages.duringvisit.examinations.title")}>
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {vitalSignsFields.map((field, index) =>
                  renderField(field, index)
                )}
                {physicalExaminationFields.map((field, index) =>
                  renderField(field, index)
                )}
                {vaginalExaminationsFields.map((field, index) =>
                  renderField(field, index)
                )}
                {lmpField.map((field, index) => renderField(field, index))}
                {GAPCFields.map((field, index) => renderField(field, index))}
                {GAPCCurrentFields.map((field, index) =>
                  renderField(field, index)
                )}
                {perinatalOutcomesFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title={t("pages.duringvisit.careandTreatment.title")}>
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {dietField.map((field, index) => renderField(field, index))}
                {physicalActivityField.map((field, index) =>
                  renderField(field, index)
                )}
                {positionField.map((field, index) => renderField(field, index))}
                {curesField.map((field, index) => renderField(field, index))}
                {oxygenTherapyField.map((field, index) =>
                  renderField(field, index)
                )}
                {chestPhysiotherapyField.map((field, index) =>
                  renderField(field, index)
                )}
                {cathetersField.map((field, index) =>
                  renderField(field, index)
                )}
                {drainsField.map((field, index) => renderField(field, index))}
                {nebulizationsField.map((field, index) =>
                  renderField(field, index)
                )}
                {diagnosticFields.map((field, index) =>
                  renderField(field, index)
                )}
                {treatmentFields.map((field, index) =>
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

            <FormSection title={t("pages.duringvisit.monitoring.title")}>
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {fluidsField.map((field, index) => renderField(field, index))}
                {totalFluidsCalcField.map((field, index) =>
                  renderField(field, index)
                )}
                {fluidBalanceField.map((field, index) =>
                  renderField(field, index)
                )}
                {hourlyDiuresisField.map((field, index) =>
                  renderField(field, index)
                )}
                {hourlyMeanDiuresisField.map((field, index) =>
                  renderField(field, index)
                )}
                {timeTemperatureCurveField.map((field, index) =>
                  renderField(field, index)
                )}
                {controlsField.map((field, index) => renderField(field, index))}
                {othersOrderSetsField.map((field, index) =>
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
