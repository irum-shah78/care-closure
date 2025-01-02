import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import FormSection from "../../components/formselection/FormSelection";
import backIcon from "../../assets/back-icon.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

const PreRegistration = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const patient = state?.patient;
  const navigate = useNavigate();
  const [visitType, setVisitType] = useState("");
  const [department, setDepartment] = useState("");
  const [preferredDoctor, setPreferredDoctor] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTimeSlot, setPreferredTimeSlot] = useState("");
  const [description, setDescription] = useState("");
  const [reasonForVisit, setReasonForVisit] = useState("");
  const [currentSymptoms, setCurrentSymptoms] = useState("");
  const [symptomsDuration, setSymptomsDuration] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [subscriberName, setSubscriberName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [additionalRequirement, setAdditionalRequirement] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [admissionOrigin, setAdmissionOrigin] = useState(null);
  const [referredFrom, setReferredFrom] = useState(null);
  const [isCoordinatedReferredFrom, setIsCoordinatedReferredFrom] =
    useState(null);
  const [admissionTransportWay, setAdmissionTransportWay] = useState("");
  const [admissionTransportInfo, setAdmissionTransportInfo] = useState("");

  const [chiefComplaintOrdinal, setChiefComplaintOrdinal] = useState("");
  const [chiefComplaintIndexes, setChiefComplaintIndexes] = useState("");
  const [chiefComplaintName, setChiefComplaintName] = useState("");
  const [chiefComplaintEvolutionTime, setChiefComplaintEvolutionTime] =
    useState("");
  const [chiefComplaintTimeMeausre, setChiefComplaintTimeMeasure] =
    useState("");
  const [chiefComplaintDescription, setChiefComplaintDescription] =
    useState("");
  const [triage, setTriage] = useState([]);
  const [triageSystem, setTriageSystem] = useState(null);
  const [planAdmission, setPlanAdmission] = useState(null);
  const [admissionPrintForm, setAdmissionPrintForm] = useState(null);

  const [instituitionID, setInstituitionID] = useState("");
  const [instituitionCode, setInstituitionCode] = useState("");
  const [instituitionName, setInstituitionName] = useState("");
  const [departmentID, setDepartmentID] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [medicalOfficeID, setMedicalOfficeID] = useState("");
  const [sign, setSign] = useState("");

  const handlePatient = () => {
    navigate("/patients/patient-details", { state: { patient } });
  };

  useEffect(() => {
    if (patient) {
      setInsuranceProvider(patient.insuranceProvider || "");
      setPolicyNumber(patient.policyNumber || "");
      setSubscriberName(patient.subscriberName || "");
      setRelationship(patient.relationship || "");
      setDescription(patient.description || "");
    }
  }, [patient]);

  const API_AUTH_HEADERS = {
    Authorization: "Bearer yourAuthToken",
    "X-xPxApp-App-Account-Id": "yourAppAccountId",
    "X-xPxApp-App-Auth": "yourAppAuth",
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const visitId = `#${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date();
    const selectedDate = new Date(preferredDate);

    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      alert(
        "The appointment date cannot be in the past. Please select a valid date."
      );
      return;
    }

    const chiefComplaint = [
      {
        ordinal: parseInt(chiefComplaintOrdinal, 10),
        capitalizeIndexes: chiefComplaintIndexes,
        name: chiefComplaintName,
        evolutionTime: chiefComplaintEvolutionTime,
        timeMeasure: chiefComplaintTimeMeausre,
        description: chiefComplaintDescription,
      },
    ];

    const updatedPatient = {
      ...patient,
      description,
      insuranceProvider,
      policyNumber,
      subscriberName,
      relationship,
    };

    const visitDetails = {
      patientId: updatedPatient.id,
      name: updatedPatient.name,
      visitId,
      visitType,
      department,
      preferredDoctor,
      preferredDate,
      preferredTimeSlot,
      description: updatedPatient.description,
      reasonForVisit,
      currentSymptoms,
      symptomsDuration,
      insuranceProvider: updatedPatient.insuranceProvider,
      policyNumber: updatedPatient.policyNumber,
      subscriberName: updatedPatient.subscriberName,
      relationship: updatedPatient.relationship,
      additionalRequirement,
      admissionDate,
      arrivalDate,
      admissionOrigin,
      referredFrom,
      isCoordinatedReferredFrom,
      admissionTransportWay,
      admissionTransportInfo,
      chiefComplaint,
      triage,
      triageSystem,
      planAdmission,
      admissionPrintForm,
      instituitionID,
      instituitionName,
      instituitionCode,
      departmentID,
      departmentName,
      medicalOfficeID,
      sign,
    };

    try {
      await axios.post("http://localhost:8000/records", visitDetails, {
        headers: API_AUTH_HEADERS,
      });

      const existingPatientsRaw = localStorage.getItem("patients");
      const existingPatients = JSON.parse(existingPatientsRaw) || [];

      const updatedPatients = existingPatients.map((existingPatient) =>
        existingPatient.id === updatedPatient.id
          ? updatedPatient
          : existingPatient
      );

      localStorage.setItem("patients", JSON.stringify(updatedPatients));

      const storedData = localStorage.getItem("patientVisits");
      const existingVisits = Array.isArray(JSON.parse(storedData))
        ? JSON.parse(storedData)
        : [];

      existingVisits.push(visitDetails);
      localStorage.setItem("patientVisits", JSON.stringify(existingVisits));
      navigate("/patients/patient-details", {
        state: { patient: updatedPatient },
      });
    } catch (error) {
      console.error("Error creating the visit record:", error);
      alert(
        "There was an error while submitting the visit record. Please try again."
      );
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const visitId = `#${Math.floor(1000 + Math.random() * 9000)}`;
  //   const today = new Date();
  //   const selectedDate = new Date(preferredDate);

  //   if (selectedDate < today.setHours(0, 0, 0, 0)) {
  //     alert(
  //       "The appointment date cannot be in the past. Please select a valid date."
  //     );
  //     return;
  //   }

  //   const updatedPatient = {
  //     ...patient,
  //     description,
  //     insuranceProvider,
  //     policyNumber,
  //     subscriberName,
  //     relationship,
  //   };

  //   const visitDetails = {
  //     patientId: updatedPatient.id,
  //     name: updatedPatient.name,
  //     visitId,
  //     visitType,
  //     department,
  //     preferredDoctor,
  //     preferredDate,
  //     preferredTimeSlot,
  //     description: updatedPatient.description,
  //     reasonForVisit,
  //     currentSymptoms,
  //     symptomsDuration,
  //     insuranceProvider: updatedPatient.insuranceProvider,
  //     policyNumber: updatedPatient.policyNumber,
  //     subscriberName: updatedPatient.subscriberName,
  //     relationship: updatedPatient.relationship,
  //     additionalRequirement,
  //   };

  //   const existingPatientsRaw = localStorage.getItem("patients");
  //   const existingPatients = JSON.parse(existingPatientsRaw) || [];

  //   const updatedPatients = existingPatients.map((existingPatient) =>
  //     existingPatient.id === updatedPatient.id
  //       ? updatedPatient
  //       : existingPatient
  //   );

  //   localStorage.setItem("patients", JSON.stringify(updatedPatients));

  //   const storedData = localStorage.getItem("patientVisits");
  //   const existingVisits = Array.isArray(JSON.parse(storedData))
  //     ? JSON.parse(storedData)
  //     : [];

  //   existingVisits.push(visitDetails);
  //   localStorage.setItem("patientVisits", JSON.stringify(existingVisits));

  //   navigate("/patients/patient-details", {
  //     state: { patient: updatedPatient },
  //   });
  // };

  const visitInfoFields = [
    {
      type: "select",
      label: t("pages.previsitregistration.visitInformation.visitType.label"),
      placeholder: t(
        "pages.previsitregistration.visitInformation.visitType.placeholder"
      ),
      options: [
        t(
          "pages.previsitregistration.visitInformation.visitType.options.newConsultation"
        ),
        t(
          "pages.previsitregistration.visitInformation.visitType.options.checkup"
        ),
        t(
          "pages.previsitregistration.visitInformation.visitType.options.regular"
        ),
      ],
      value: visitType,
      onChange: (e) => setVisitType(e.target.value),
    },
    {
      type: "select",
      label: t("pages.previsitregistration.visitInformation.department.label"),
      placeholder: t(
        "pages.previsitregistration.visitInformation.department.placeholder"
      ),
      options: [
        t(
          "pages.previsitregistration.visitInformation.department.options.generalMedicine"
        ),
        t(
          "pages.previsitregistration.visitInformation.department.options.medicine"
        ),
        t(
          "pages.previsitregistration.visitInformation.department.options.labs"
        ),
      ],
      value: department,
      onChange: (e) => setDepartment(e.target.value),
    },
    {
      type: "select",
      label: t(
        "pages.previsitregistration.visitInformation.preferredDoctor.label"
      ),
      placeholder: t(
        "pages.previsitregistration.visitInformation.preferredDoctor.placeholder"
      ),
      options: [
        t(
          "pages.previsitregistration.visitInformation.preferredDoctor.options.male"
        ),
        t(
          "pages.previsitregistration.visitInformation.preferredDoctor.options.female"
        ),
      ],
      value: preferredDoctor,
      onChange: (e) => setPreferredDoctor(e.target.value),
    },
    {
      type: "date",
      label: t(
        "pages.previsitregistration.visitInformation.preferredDate.label"
      ),
      placeholder: t(
        "pages.previsitregistration.visitInformation.preferredDate.placeholder"
      ),
      value: preferredDate,
      onChange: (e) => setPreferredDate(e.target.value),
    },
    {
      type: "select",
      label: t(
        "pages.previsitregistration.visitInformation.preferredTimeSlot.label"
      ),
      placeholder: t(
        "pages.previsitregistration.visitInformation.preferredTimeSlot.placeholder"
      ),
      options: [
        t(
          "pages.previsitregistration.visitInformation.preferredTimeSlot.options.morning"
        ),
        t(
          "pages.previsitregistration.visitInformation.preferredTimeSlot.options.afternoon"
        ),
      ],
      value: preferredTimeSlot,
      onChange: (e) => setPreferredTimeSlot(e.target.value),
    },
    {
      type: "date",
      label: t(
        "pages.previsitregistration.visitInformation.admissionDate.label"
      ),
      placeholder: t(
        "pages.previsitregistration.visitInformation.admissionDate.placeholder"
      ),
      value: admissionDate,
      onChange: (e) => setAdmissionDate(e.target.value),
    },
    {
      type: "date",
      label: t("pages.previsitregistration.visitInformation.arrivalDate.label"),
      placeholder: t(
        "pages.previsitregistration.visitInformation.arrivalDate.placeholder"
      ),
      value: arrivalDate,
      onChange: (e) => setArrivalDate(e.target.value),
    },
    {
      type: "select",
      label: t(
        "pages.previsitregistration.visitInformation.admissionOrigin.label"
      ),
      options: [
        t(
          "pages.previsitregistration.visitInformation.admissionOrigin.options.emergency"
        ),
        t(
          "pages.previsitregistration.visitInformation.admissionOrigin.options.consultation"
        ),
      ],
      placeholder: t(
        "pages.previsitregistration.visitInformation.admissionOrigin.placeholder"
      ),
      value: admissionOrigin,
      onChange: (e) => setAdmissionOrigin(e.target.value),
    },
    {
      type: "text",
      label: t(
        "pages.previsitregistration.visitInformation.referredFrom.label"
      ),
      placeholder: t(
        "pages.previsitregistration.visitInformation.referredFrom.placeholder"
      ),
      value: referredFrom,
      onChange: (e) => setReferredFrom(e.target.value),
    },
    {
      type: "select",
      label: t(
        "pages.previsitregistration.visitInformation.isCoordinatedReferredFrom.label"
      ),
      options: [
        t(
          "pages.previsitregistration.visitInformation.isCoordinatedReferredFrom.options.true"
        ),
        t(
          "pages.previsitregistration.visitInformation.isCoordinatedReferredFrom.options.false"
        ),
      ],
      placeholder: t(
        "pages.previsitregistration.visitInformation.isCoordinatedReferredFrom.placeholder"
      ),
      value: isCoordinatedReferredFrom,
      onChange: (e) => setIsCoordinatedReferredFrom(e.target.value),
    },
  ];

  const medicalInformationFields = [
    {
      type: "text",
      label: t(
        "pages.previsitregistration.medicalInformation.description.label"
      ),
      placeholder: t(
        "pages.previsitregistration.medicalInformation.description.placeholder"
      ),
      value: description,
      onChange: (e) => setDescription(e.target.value),
    },
    {
      type: "text",
      label: t(
        "pages.previsitregistration.medicalInformation.reasonForVisit.label"
      ),
      placeholder: t(
        "pages.previsitregistration.medicalInformation.reasonForVisit.placeholder"
      ),
      value: reasonForVisit,
      onChange: (e) => setReasonForVisit(e.target.value),
    },
    {
      type: "text",
      label: t(
        "pages.previsitregistration.medicalInformation.currentSymptoms.label"
      ),
      placeholder: t(
        "pages.previsitregistration.medicalInformation.currentSymptoms.placeholder"
      ),
      value: currentSymptoms,
      onChange: (e) => setCurrentSymptoms(e.target.value),
    },
    {
      type: "text",
      label: t(
        "pages.previsitregistration.medicalInformation.symptomsDuration.label"
      ),
      placeholder: t(
        "pages.previsitregistration.medicalInformation.symptomsDuration.placeholder"
      ),
      value: symptomsDuration,
      onChange: (e) => setSymptomsDuration(e.target.value),
    },
  ];

  // const admissionTransportFields = [
  //   {
  //     type: "text",
  //     label: "Admission Transport Way",
  //     placeholder: "Enter Admission Transport Way",
  //     value: admissionTransportWay,
  //     onChange: (e) => setAdmissionTransportWay(e.target.value),
  //   },
  //   {
  //     type: "text",
  //     label: "Admission Transport Info",
  //     placeholder: "Enter Admission Transport Info",
  //     value: admissionTransportInfo,
  //     onChange: (e) => setAdmissionTransportInfo(e.target.value),
  //   },
  // ];

  // const admissionPlanFields = [
  //   {
  //     type: "text",
  //     label: "Plan Admission",
  //     placeholder: "Enter Admission Plan",
  //     value: planAdmission,
  //     onChange: (e) => setPlanAdmission(e.target.value),
  //   },
  //   {
  //     type: "text",
  //     label: "Admission Print Form",
  //     placeholder: "Enter form",
  //     value: admissionPrintForm,
  //     onChange: (e) => setAdmissionPrintForm(e.target.value),
  //   },
  // ];

  // const chiefComplaintFields = [
  //   {
  //     type: "number",
  //     label: "Ordinal",
  //     placeholder: "Enter ordinal",
  //     value: chiefComplaintOrdinal,
  //     onChange: (e) => setChiefComplaintOrdinal(e.target.value),
  //   },
  //   {
  //     type: "text",
  //     label: "Capitilize Indexes",
  //     placeholder: "Enter Indexes",
  //     value: chiefComplaintIndexes,
  //     onChange: (e) => setChiefComplaintIndexes(e.target.value),
  //   },
  //   {
  //     type: "text",
  //     label: "Name",
  //     placeholder: "Enter name",
  //     value: chiefComplaintName,
  //     onChange: (e) => setChiefComplaintName(e.target.value),
  //   },
  //   {
  //     type: "number",
  //     label: "Evolution Time",
  //     placeholder: "Enter time",
  //     value: chiefComplaintEvolutionTime,
  //     onChange: (e) => setChiefComplaintEvolutionTime(e.target.value),
  //   },
  //   {
  //     type: "select",
  //     label: "Time Measure",
  //     options: ["Days", "Week", "Months"],
  //     placeholder: "Select time",
  //     value: chiefComplaintTimeMeausre,
  //     onChange: (e) => setChiefComplaintTimeMeasure(e.target.value),
  //   },
  //   {
  //     type: "text",
  //     label: "Description",
  //     placeholder: "Enter description",
  //     value: chiefComplaintDescription,
  //     onChange: (e) => setChiefComplaintDescription(e.target.value),
  //   },
  // ];

  // const triageFields = [
  //   {
  //     type: "select",
  //     label: "Triage System",
  //     options: ["Manchester", "ESI", "Canadian"],
  //     placeholder: "Select system",
  //     value: triageSystem,
  //     onChange: (e) => setTriageSystem(e.target.value),
  //   },
  //   {
  //     type: "text",
  //     label: "Triage",
  //     placeholder: "Enter triage",
  //     value: triage,
  //     onChange: (e) => setTriage(e.target.value),
  //   },
  // ];

  const admissionTransportFields = [
    {
      type: "text",
      label: t(
        "pages.previsitregistration.admissionTransport.admissionTransportWay.label"
      ),
      placeholder: t(
        "pages.previsitregistration.admissionTransport.admissionTransportWay.placeholder"
      ),
      value: admissionTransportWay,
      onChange: (e) => setAdmissionTransportWay(e.target.value),
    },
    {
      type: "text",
      label: t(
        "pages.previsitregistration.admissionTransport.admissionTransportInfo.label"
      ),
      placeholder: t(
        "pages.previsitregistration.admissionTransport.admissionTransportInfo.placeholder"
      ),
      value: admissionTransportInfo,
      onChange: (e) => setAdmissionTransportInfo(e.target.value),
    },
  ];

  const admissionPlanFields = [
    {
      type: "text",
      label: t("pages.previsitregistration.admissionPlan.planAdmission.label"),
      placeholder: t(
        "pages.previsitregistration.admissionPlan.planAdmission.placeholder"
      ),
      value: planAdmission,
      onChange: (e) => setPlanAdmission(e.target.value),
    },
    {
      type: "text",
      label: t(
        "pages.previsitregistration.admissionPlan.admissionPrintForm.label"
      ),
      placeholder: t(
        "pages.previsitregistration.admissionPlan.admissionPrintForm.placeholder"
      ),
      value: admissionPrintForm,
      onChange: (e) => setAdmissionPrintForm(e.target.value),
    },
  ];

  const chiefComplaintFields = [
    {
      type: "number",
      label: t(
        "pages.previsitregistration.chiefComplaint.chiefComplaintOrdinal.label"
      ),
      placeholder: t(
        "pages.previsitregistration.chiefComplaint.chiefComplaintOrdinal.placeholder"
      ),
      value: chiefComplaintOrdinal,
      onChange: (e) => setChiefComplaintOrdinal(e.target.value),
    },
    {
      type: "text",
      label: t(
        "pages.previsitregistration.chiefComplaint.chiefComplaintIndexes.label"
      ),
      placeholder: t(
        "pages.previsitregistration.chiefComplaint.chiefComplaintIndexes.placeholder"
      ),
      value: chiefComplaintIndexes,
      onChange: (e) => setChiefComplaintIndexes(e.target.value),
    },
    {
      type: "text",
      label: t(
        "pages.previsitregistration.chiefComplaint.chiefComplaintName.label"
      ),
      placeholder: t(
        "pages.previsitregistration.chiefComplaint.chiefComplaintName.placeholder"
      ),
      value: chiefComplaintName,
      onChange: (e) => setChiefComplaintName(e.target.value),
    },
    {
      type: "number",
      label: t(
        "pages.previsitregistration.chiefComplaint.chiefComplaintEvolutionTime.label"
      ),
      placeholder: t(
        "pages.previsitregistration.chiefComplaint.chiefComplaintEvolutionTime.placeholder"
      ),
      value: chiefComplaintEvolutionTime,
      onChange: (e) => setChiefComplaintEvolutionTime(e.target.value),
    },
    {
      type: "select",
      label: t(
        "pages.previsitregistration.chiefComplaint.chiefComplaintTimeMeasure.label"
      ),
      options: [
        t(
          "pages.previsitregistration.chiefComplaint.chiefComplaintTimeMeasure.options.days"
        ),
        t(
          "pages.previsitregistration.chiefComplaint.chiefComplaintTimeMeasure.options.week"
        ),
        t(
          "pages.previsitregistration.chiefComplaint.chiefComplaintTimeMeasure.options.months"
        ),
      ],
      placeholder: t(
        "pages.previsitregistration.chiefComplaint.chiefComplaintTimeMeasure.placeholder"
      ),
      value: chiefComplaintTimeMeausre,
      onChange: (e) => setChiefComplaintTimeMeasure(e.target.value),
    },
    {
      type: "text",
      label: t(
        "pages.previsitregistration.chiefComplaint.chiefComplaintDescription.label"
      ),
      placeholder: t(
        "pages.previsitregistration.chiefComplaint.chiefComplaintDescription.placeholder"
      ),
      value: chiefComplaintDescription,
      onChange: (e) => setChiefComplaintDescription(e.target.value),
    },
  ];

  const triageFields = [
    {
      type: "select",
      label: t("pages.previsitregistration.triage.triageSystem.label"),
      options: [
        t("pages.previsitregistration.triage.triageSystem.options.manchester"),
        t("pages.previsitregistration.triage.triageSystem.options.esi"),
        t("pages.previsitregistration.triage.triageSystem.options.canadian"),
      ],
      placeholder: t(
        "pages.previsitregistration.triage.triageSystem.placeholder"
      ),
      value: triageSystem,
      onChange: (e) => setTriageSystem(e.target.value),
    },
    {
      type: "text",
      label: t("pages.previsitregistration.triage.triage.label"),
      placeholder: t("pages.previsitregistration.triage.triage.placeholder"),
      value: triage,
      onChange: (e) => setTriage(e.target.value),
    },
  ];

  const insuranceVerificationFields = [
    {
      type: "text",
      label: t(
        "pages.previsitregistration.insuranceInformation.provider.label"
      ),
      placeholder: t(
        "pages.previsitregistration.insuranceInformation.provider.placeholder"
      ),
      value: insuranceProvider,
      onChange: (e) => setInsuranceProvider(e.target.value),
    },
    {
      type: "text",
      label: t(
        "pages.previsitregistration.insuranceInformation.policyNumber.label"
      ),
      placeholder: t(
        "pages.previsitregistration.insuranceInformation.policyNumber.placeholder"
      ),
      value: policyNumber,
      onChange: (e) => setPolicyNumber(e.target.value),
    },
    {
      type: "text",
      label: t(
        "pages.previsitregistration.insuranceInformation.subscriberName.label"
      ),
      placeholder: t(
        "pages.previsitregistration.insuranceInformation.subscriberName.placeholder"
      ),
      value: subscriberName,
      onChange: (e) => setSubscriberName(e.target.value),
    },
    {
      type: "select",
      label: t(
        "pages.previsitregistration.insuranceInformation.relationship.label"
      ),
      placeholder: t(
        "pages.previsitregistration.insuranceInformation.relationship.placeholder"
      ),
      options: [
        t(
          "pages.previsitregistration.insuranceInformation.relationship.options.self"
        ),
        t(
          "pages.previsitregistration.insuranceInformation.relationship.options.owner"
        ),
        t(
          "pages.previsitregistration.insuranceInformation.relationship.options.subscriber"
        ),
      ],
      value: relationship,
      onChange: (e) => setRelationship(e.target.value),
    },
  ];

  const additionalRequirements = [
    {
      type: "select",
      label: t("pages.previsitregistration.additionalRequirements.label"),
      placeholder: t(
        "pages.previsitregistration.additionalRequirements.placeholder"
      ),
      options: [
        t(
          "pages.previsitregistration.additionalRequirements.options.wheelchair"
        ),
        t("pages.previsitregistration.additionalRequirements.options.ac"),
        t(
          "pages.previsitregistration.additionalRequirements.options.interpreter"
        ),
      ],
      value: additionalRequirement,
      onChange: (e) => setAdditionalRequirement(e.target.value),
    },
  ];

  // const institutionFields = [
  //   {
  //     type: "number",
  //     label: "Institution ID",
  //     placeholder: "Enter ID",
  //     value: instituitionID,
  //     onChange: (e) => setInstituitionID(e.target.value),
  //   },
  //   {
  //     type: "text",
  //     label: "Institution Code",
  //     placeholder: "Enter code",
  //     value: instituitionCode,
  //     onChange: (e) => setInstituitionCode(e.target.value),
  //   },
  //   {
  //     type: "text",
  //     label: "Institution Name",
  //     placeholder: "Enter name",
  //     value: instituitionName,
  //     onChange: (e) => setInstituitionName(e.target.value),
  //   },
  //   {
  //     type: "number",
  //     label: "Department ID",
  //     placeholder: "Enter ID",
  //     value: departmentID,
  //     onChange: (e) => setDepartmentID(e.target.value),
  //   },
  //   {
  //     type: "text",
  //     label: "Department Name",
  //     placeholder: "Enter name",
  //     value: departmentName,
  //     onChange: (e) => setDepartmentName(e.target.value),
  //   },
  //   {
  //     type: "number",
  //     label: "Medical Office ID",
  //     placeholder: "Enter ID",
  //     value: medicalOfficeID,
  //     onChange: (e) => setMedicalOfficeID(e.target.value),
  //   },
  //   {
  //     type: "text",
  //     label: "Signature",
  //     placeholder: "Enter name who signed record",
  //     value: sign,
  //     onChange: (e) => setSign(e.target.value),
  //   },
  // ];

  const institutionFields = [
    {
      type: "number",
      label: t("pages.previsitregistration.instituition.institution.institutionID.label"),
      placeholder: t("pages.previsitregistration.instituition.institution.institutionID.placeholder"),
      value: instituitionID,
      onChange: (e) => setInstituitionID(e.target.value),
    },
    {
      type: "text",
      label: t("pages.previsitregistration.instituition.institution.institutionCode.label"),
      placeholder: t("pages.previsitregistration.instituition.institution.institutionCode.placeholder"),
      value: instituitionCode,
      onChange: (e) => setInstituitionCode(e.target.value),
    },
    {
      type: "text",
      label: t("pages.previsitregistration.instituition.institution.institutionName.label"),
      placeholder: t("pages.previsitregistration.instituition.institution.institutionName.placeholder"),
      value: instituitionName,
      onChange: (e) => setInstituitionName(e.target.value),
    },
    {
      type: "number",
      label: t("pages.previsitregistration.instituition.institution.departmentID.label"),
      placeholder: t("pages.previsitregistration.instituition.institution.departmentID.placeholder"),
      value: departmentID,
      onChange: (e) => setDepartmentID(e.target.value),
    },
    {
      type: "text",
      label: t("pages.previsitregistration.instituition.institution.departmentName.label"),
      placeholder: t("pages.previsitregistration.instituition.institution.departmentName.placeholder"),
      value: departmentName,
      onChange: (e) => setDepartmentName(e.target.value),
    },
    {
      type: "number",
      label: t("pages.previsitregistration.instituition.institution.medicalOfficeID.label"),
      placeholder: t("pages.previsitregistration.instituition.institution.medicalOfficeID.placeholder"),
      value: medicalOfficeID,
      onChange: (e) => setMedicalOfficeID(e.target.value),
    },
    {
      type: "text",
      label: t("pages.previsitregistration.instituition.institution.signature.label"),
      placeholder: t("pages.previsitregistration.instituition.institution.signature.placeholder"),
      value: sign,
      onChange: (e) => setSign(e.target.value),
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
              {t("pages.previsitregistration.title")}
            </h1>
          </div>
          <form className="mt-6 space-y-6 shadow-sm" onSubmit={handleSubmit}>
            <FormSection
              title={t("pages.previsitregistration.visitInformation.title")}
            >
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {visitInfoFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection
              title={t("pages.previsitregistration.medicalInformation.title")}
            >
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {medicalInformationFields.map((field, index) => {
                  if (
                    field.label ===
                    t(
                      "pages.previsitregistration.medicalInformation.reasonForVisit.label"
                    )
                  ) {
                    return (
                      <label key={index} className="block col-span-2">
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
                  if (
                    field.label ===
                    t(
                      "pages.previsitregistration.medicalInformation.currentSymptoms.label"
                    )
                  ) {
                    return (
                      <label key={index} className="block col-span-2">
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

            <FormSection
              title={t("pages.previsitregistration.admissionTransport.title")}
            >
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {admissionTransportFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection
              title={t("pages.previsitregistration.admissionPlan.title")}
            >
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {admissionPlanFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title={t("pages.previsitregistration.instituition.title")}>
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {institutionFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection
              title={t("pages.previsitregistration.chiefComplaint.title")}
            >
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {chiefComplaintFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title={t("pages.previsitregistration.triage.title")}>
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {triageFields.map((field, index) => renderField(field, index))}
              </div>
            </FormSection>

            <FormSection
              title={t("pages.previsitregistration.insuranceInformation.title")}
            >
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {insuranceVerificationFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection
              title={t(
                "pages.previsitregistration.additionalRequirements.label"
              )}
            >
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 gap-x-14 gap-y-4 mt-4">
                {additionalRequirements.map((field, index) =>
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
                {t("pages.previsitregistration.buttons.cancel")}
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-[#2E2559] text-white"
              >
                {t("pages.previsitregistration.buttons.schedule")}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PreRegistration;
