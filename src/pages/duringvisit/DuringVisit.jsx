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
      label: "History of Present Illness",
      placeholder: "Enter history of present illness",
      value: historyOfPresentIllness,
      onChange: (e) => setHistoryOfPresentIllness(e.target.value),
    },
    {
      type: "text",
      label: "History of Present Illness (Auto)",
      placeholder: "Enter auto-generated history of present illness",
      value: historyOfPresentIllnessAuto,
      onChange: (e) => setHistoryOfPresentIllnessAuto(e.target.value),
    },
    {
      type: "checkbox",
      label: "Skip Medical History",
      value: skipMedicalHistory,
      onChange: (e) => setSkipMedicalHistory(e.target.checked),
    },
    {
      type: "text",
      label: "Perinatal Medical History",
      placeholder: "Enter perinatal medical history",
      value: perinatalMedicalHistory,
      onChange: (e) => setPerinatalMedicalHistory(e.target.value),
    },
    {
      type: "text",
      label: "Past Medical History",
      placeholder: "Enter past medical history",
      value: pastMedicalHistory,
      onChange: (e) => setPastMedicalHistory(e.target.value),
    },
    {
      type: "text",
      label: "Surgical History",
      placeholder: "Enter surgical history",
      value: surgicalHistory,
      onChange: (e) => setSurgicalHistory(e.target.value),
    },
    {
      type: "text",
      label: "Family History",
      placeholder: "Enter family history",
      value: familyHistory,
      onChange: (e) => setFamilyHistory(e.target.value),
    },
    {
      type: "text",
      label: "Immunization",
      placeholder: "Enter immunization details",
      value: immunization,
      onChange: (e) => setImmunization(e.target.value),
    },
    {
      type: "text",
      label: "Developmental Milestones",
      placeholder: "Enter developmental milestones",
      value: developmentalMilestones,
      onChange: (e) => setDevelopmentalMilestones(e.target.value),
    },
    {
      type: "text",
      label: "Drug History",
      placeholder: "Enter drug history",
      value: drugHistory,
      onChange: (e) => setDrugHistory(e.target.value),
    },
    {
      type: "text",
      label: "Substances Use",
      placeholder: "Enter substances use details",
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
      label: "Vital Sign Name",
      placeholder: "Enter vital sign name",
      value: vitalSigns.name,
      onChange: (e) => setVitalSigns({ ...vitalSigns, name: e.target.value }),
    },
    {
      type: "text",
      label: "Vital Sign Value",
      placeholder: "Enter vital sign value",
      value: vitalSigns.value,
      onChange: (e) => setVitalSigns({ ...vitalSigns, value: e.target.value }),
    },
  ];

  const physicalExaminationFields = [
    {
      type: "text",
      label: "Examination Name",
      placeholder: "Enter examination name",
      value: physicalExamination.name,
      onChange: (e) =>
        setPhysicalExamination({
          ...physicalExamination,
          name: e.target.value,
        }),
    },
    {
      type: "text",
      label: "Physical Examination Result",
      placeholder: "Enter examination result",
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
      label: "Vaginal Examination Result",
      placeholder: "Enter examination result",
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
      label: "Last Menstrual Period (LMP)",
      placeholder: "Enter LMP",
      value: LMP,
      onChange: (e) => setLMP(e.target.value),
    },
  ];

  const GAPCFields = [
    {
      type: "text",
      label: "GAPC Name",
      placeholder: "Enter GAPC name",
      value: GAPC.name,
      onChange: (e) => setGAPC({ ...GAPC, name: e.target.value }),
    },
  ];

  const GAPCCurrentFields = [
    {
      type: "text",
      label: "Current GAPC",
      placeholder: "Enter current GAPC",
      value: GAPCCurrent.current,
      onChange: (e) =>
        setGAPCCurrent({ ...GAPCCurrent, current: e.target.value }),
    },
  ];

  const perinatalOutcomesFields = [
    {
      type: "text",
      label: "Perinatal Outcome",
      placeholder: "Enter perinatal outcome",
      value: perinatalOutcomes.outcome,
      onChange: (e) =>
        setPerinatalOutcomes({ ...perinatalOutcomes, outcome: e.target.value }),
    },
  ];

  // const diagnosticFields = [
  //   {
  //     type: "text",
  //     label: "Diagnostic Test",
  //     placeholder: "Enter diagnostic test",
  //     value: diagnostic.name,
  //     onChange: (e) => setDiagnostic({ ...diagnostic, name: e.target.value }),
  //   },
  // ];

  // const treatmentFields = [
  //   {
  //     type: "text",
  //     label: "Treatment",
  //     placeholder: "Enter treatment",
  //     value: treatment.name,
  //     onChange: (e) => setTreatment({ ...treatment, name: e.target.value }),
  //   },
  // ];

  const diagnosticFields = [
    {
      type: "text",
      label: "Diagnostic Test",
      placeholder: "Enter diagnostic test",
      value: diagnostic.name,
      onChange: (e) => setDiagnostic({ ...diagnostic, name: e.target.value }),
    },
    {
      type: "text",
      label: "Code",
      placeholder: "Enter code",
      value: diagnostic.code,
      onChange: (e) => setDiagnostic({ ...diagnostic, code: e.target.value }),
    },
    {
      type: "text",
      label: "Note",
      placeholder: "Enter note",
      value: diagnostic.note,
      onChange: (e) => setDiagnostic({ ...diagnostic, note: e.target.value }),
    },
    {
      type: "text",
      label: "Capitalize Indexes",
      placeholder: "Enter capitalize indexes",
      value: diagnostic.capitalizeIndexes,
      onChange: (e) =>
        setDiagnostic({ ...diagnostic, capitalizeIndexes: e.target.value }),
    },
  ];

  // Fields for treatment
  const treatmentFields = [
    {
      type: "text",
      label: "Treatment",
      placeholder: "Enter treatment",
      value: treatment.name,
      onChange: (e) => setTreatment({ ...treatment, name: e.target.value }),
    },
    {
      type: "text",
      label: "Use",
      placeholder: "Enter use",
      value: treatment.use,
      onChange: (e) => setTreatment({ ...treatment, use: e.target.value }),
    },

    {
      type: "text",
      label: "Presentation",
      placeholder: "Enter presentation",
      value: treatment.presentation,
      onChange: (e) =>
        setTreatment({ ...treatment, presentation: e.target.value }),
    },
    {
      type: "text",
      label: "Indications",
      placeholder: "Enter indications",
      value: treatment.indications,
      onChange: (e) =>
        setTreatment({ ...treatment, indications: e.target.value }),
    },
    {
      type: "number",
      label: "Missing Days",
      placeholder: "Enter missing days",
      value: treatment.missingDays,
      onChange: (e) =>
        setTreatment({ ...treatment, missingDays: e.target.value }),
    },
    {
      type: "text",
      label: "Note",
      placeholder: "Enter note",
      value: treatment.note,
      onChange: (e) => setTreatment({ ...treatment, note: e.target.value }),
    },
    {
      type: "text",
      label: "Capitalize Indexes",
      placeholder: "Enter capitalize indexes",
      value: treatment.capitalizeIndexes,
      onChange: (e) =>
        setTreatment({ ...treatment, capitalizeIndexes: e.target.value }),
    },
    {
      type: "checkbox",
      label: "Is Drug",
      value: treatment.isDrug,
      onChange: (e) => setTreatment({ ...treatment, isDrug: e.target.checked }),
    },
    {
      type: "checkbox",
      label: "Visible in Admission Form",
      value: treatment.visibleInAdmissionForm,
      onChange: (e) =>
        setTreatment({
          ...treatment,
          visibleInAdmissionForm: e.target.checked,
        }),
    },
    {
      type: "checkbox",
      label: "Visible in Egress Form",
      value: treatment.visibleInEgressForm,
      onChange: (e) =>
        setTreatment({ ...treatment, visibleInEgressForm: e.target.checked }),
    },

    {
      type: "checkbox",
      label: "Visible Treatment Time",
      value: treatment.visibleTreatmentTime,
      onChange: (e) =>
        setTreatment({ ...treatment, visibleTreatmentTime: e.target.checked }),
    },
    {
      type: "checkbox",
      label: "Visible in Inpatients Report",
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
      label: "Diet",
      placeholder: "Enter diet",
      value: diet,
      onChange: (e) => setDiet(e.target.value),
    },
  ];

  const physicalActivityField = [
    {
      type: "text",
      label: "Physical Activity",
      placeholder: "Enter physical activity",
      value: physicalActivity,
      onChange: (e) => setPhysicalActivity(e.target.value),
    },
  ];

  const positionField = [
    {
      type: "text",
      label: "Position",
      placeholder: "Enter position",
      value: position,
      onChange: (e) => setPosition(e.target.value),
    },
  ];

  const curesField = [
    {
      type: "text",
      label: "Cures",
      placeholder: "Enter cures",
      value: cures,
      onChange: (e) => setCures(e.target.value),
    },
  ];

  const oxygenTherapyField = [
    {
      type: "text",
      label: "Oxygen Therapy",
      placeholder: "Enter oxygen therapy details",
      value: oxygenTherapy,
      onChange: (e) => setOxygenTherapy(e.target.value),
    },
  ];

  const chestPhysiotherapyField = [
    {
      type: "text",
      label: "Chest Physiotherapy",
      placeholder: "Enter chest physiotherapy details",
      value: chestPhysiotherapy,
      onChange: (e) => setChestPhysiotherapy(e.target.value),
    },
  ];

  const cathetersField = [
    {
      type: "text",
      label: "Catheters",
      placeholder: "Enter catheter details",
      value: catheters,
      onChange: (e) => setCatheters(e.target.value),
    },
  ];

  const drainsField = [
    {
      type: "text",
      label: "Drains",
      placeholder: "Enter drain details",
      value: drains,
      onChange: (e) => setDrains(e.target.value),
    },
  ];

  const nebulizationsField = [
    {
      type: "text",
      label: "Nebulizations",
      placeholder: "Enter nebulization details",
      value: nebulizations,
      onChange: (e) => setNebulizations(e.target.value),
    },
  ];

  const fluidsField = [
    {
      type: "text",
      label: "Fluids",
      placeholder: "Enter fluid details",
      value: fluids.name,
      onChange: (e) => setFluids({ ...fluids, name: e.target.value }),
    },
  ];

  const totalFluidsCalcField = [
    {
      type: "text",
      label: "Total Fluids Calculation",
      placeholder: "Enter total fluids calculation",
      value: totalFluidsCalc,
      onChange: (e) => setTotalFluidsCalc(e.target.value),
    },
  ];

  const fluidBalanceField = [
    {
      type: "text",
      label: "Fluid Balance",
      placeholder: "Enter fluid balance",
      value: fluidBalance,
      onChange: (e) => setFluidBalance(e.target.value),
    },
  ];

  const hourlyDiuresisField = [
    {
      type: "text",
      label: "Hourly Diuresis",
      placeholder: "Enter hourly diuresis",
      value: hourlyDiuresis,
      onChange: (e) => setHourlyDiuresis(e.target.value),
    },
  ];

  const hourlyMeanDiuresisField = [
    {
      type: "text",
      label: "Hourly Mean Diuresis",
      placeholder: "Enter hourly mean diuresis",
      value: hourlyMeanDiuresis,
      onChange: (e) => setHourlyMeanDiuresis(e.target.value),
    },
  ];

  const timeTemperatureCurveField = [
    {
      type: "text",
      label: "Time-Temperature Curve",
      placeholder: "Enter time-temperature curve details",
      value: timeTemperatureCurve,
      onChange: (e) => setTimeTemperatureCurve(e.target.value),
    },
  ];

  const controlsField = [
    {
      type: "text",
      label: "Controls",
      placeholder: "Enter control details",
      value: controls.name,
      onChange: (e) => setControls({ ...controls, name: e.target.value }),
    },
  ];

  const othersOrderSetsField = [
    {
      type: "text",
      label: "Other Order Sets",
      placeholder: "Enter other order sets",
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

            <FormSection title="Medical History">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {medicalHistoryFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title="Examinations">
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

            <FormSection title="Care & Treatment">
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

            <FormSection title="Monitoring">
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
