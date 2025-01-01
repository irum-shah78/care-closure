import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import FormSection from "../../components/formselection/FormSelection";
import backIcon from "../../assets/back-icon.svg";
import { useNavigate } from "react-router-dom";
import tickIcon from "../../assets/tick.svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { useTranslation } from "react-i18next";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const AddPatient = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyRelationship, setEmergencyRelationship] = useState("");
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medications, setMedications] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [signinAndSymptoms, setSignAndSymptoms] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [headCircumference, setHeadCircumference] = useState("");
  const [abdominalCircumference, setAbdominalCircumference] = useState("");
  const [totalFluidsCalc, setTotalFluidsCalc] = useState(null);
  const [fluids, setFluids] = useState([]);
  const [nationality, setNationality] = useState("");
  const [nationalSecurityId, setNationalSecurityId] = useState(null);
  const [birthPlace, setBirthPlace] = useState("");
  const [domicile, setDomicile] = useState("");
  const [heightDate, setHeightDate] = useState("");
  const [weightDate, setWeightDate] = useState("");
  const [patientType, setPatientType] = useState("");
  const [identificationOrdinal, setIdentificationOrdinal] = useState("");
  const [identificationType, setIdentificationType] = useState("");
  const [identificationValue, setIdentificationValue] = useState("");
  const [communicationOrdinal, setCommunicationOrdinal] = useState("");
  const [communicationType, setCommunicationType] = useState("");
  const [communicationValue, setCommunicationValue] = useState("");
  const [communicationLabel, setCommunicationLabel] = useState("");
  const [assuranceName, setAssuranceName] = useState("");
  const [assuranceId, setAssuranceId] = useState(null);
  const [responsible, setResponsible] = useState("");
  const [policyHolder, setPolicyHolder] = useState(null);
  const [
    responsibleIdentificationOrdinal,
    setResponsibleIdentificationsOrdinal,
  ] = useState("");
  const [responsibleIdentificationType, setResponsibleIdentificationsType] =
    useState("");
  const [responsibleIdentificationValue, setResponsibleIdentificationsValue] =
    useState("");
  const [
    responsibleCommunicationsOrdinal,
    setResponsibleCommunicationsOrdinal,
  ] = useState("");
  const [responsibleCommunicationType, setResponsibleCommunicationsType] =
    useState("");
  const [responsibleCommunicationValue, setResponsibleCommunicationsValue] =
    useState("");
  const [responsibleCommunicationLabel, setResponsibleCommunicationsLabel] =
    useState("");

  const [
    policyHolderIdentificationOrdinal,
    setPolicyHolderIdentificationsOrdinal,
  ] = useState("");
  const [policyHolderIdentificationType, setPolicyHolderIdentificationsType] =
    useState("");
  const [policyHolderIdentificationValue, setPolicyHolderIdentificationsValue] =
    useState("");

  const [
    policyHolderCommunicationOrdinal,
    setPolicyHolderCommunicationOrdinal,
  ] = useState("");
  const [policyHolderCommunicationType, setPolicyHolderCommunicationType] =
    useState("");
  const [policyHolderCommunicationValue, setPolicyHolderCommunicationValue] =
    useState("");
  const [policyHolderCommunicationLabel, setPolicyHolderCommunicationLabel] =
    useState("");

  const handleHeightChange = (e) => {
    const value = e.target.value;
    setHeight(value);
    if (value) {
      setHeightDate("");
    }
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;
    setWeight(value);
    if (value) {
      setWeightDate("");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (height && !heightDate) {
        setHeightDate(new Date().toLocaleString());
      }
      if (weight && !weightDate) {
        setWeightDate(new Date().toLocaleString());
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [height, weight]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const identifications = [
  //     {
  //       ordinal: parseInt(identificationOrdinal, 10),
  //       type: identificationType,
  //       value: identificationValue,
  //     },
  //   ];

  //   const responsibleIdentifications = [
  //     {
  //       ordinal: parseInt(responsibleIdentificationOrdinal, 10),
  //       type: responsibleIdentificationType,
  //       value: responsibleIdentificationValue,
  //     },
  //   ];

  //   const responsibleCommunications = [
  //     {
  //       ordinal: parseInt(responsibleCommunicationsOrdinal, 10),
  //       type: responsibleCommunicationType,
  //       value: responsibleCommunicationValue,
  //       label: responsibleCommunicationLabel,
  //     },
  //   ];

  //   const policyHolderIdentifications = [
  //     {
  //       ordinal: parseInt(policyHolderIdentificationOrdinal, 10),
  //       type: policyHolderIdentificationType,
  //       value: policyHolderIdentificationValue,
  //     },
  //   ];

  //   const policyHolderCommunications = [
  //     {
  //       ordinal: parseInt(policyHolderCommunicationOrdinal, 10),
  //       type: policyHolderCommunicationType,
  //       value: policyHolderCommunicationValue,
  //       label: policyHolderCommunicationLabel,
  //     },
  //   ];

  //   const getRandomStatus = () => (Math.random() < 0.5 ? "Chronic" : "Acute");

  //   const newPatient = {
  //     id: `#${Math.floor(1000 + Math.random() * 9000)}`,
  //     status: getRandomStatus(),
  //     name,
  //     lastName,
  //     dob,
  //     gender,
  //     maritalStatus,
  //     bloodGroup,
  //     age,
  //     description,
  //     mobileNumber,
  //     email,
  //     city,
  //     address,
  //     state,
  //     pincode,
  //     emergencyContactName,
  //     emergencyRelationship,
  //     emergencyContactNumber,
  //     allergies,
  //     medications,
  //     medicalHistory,
  //     signinAndSymptoms,
  //     insuranceProvider,
  //     policyNumber,
  //     cardNumber,
  //     expiryDate,
  //     cvv,
  //     paymentStatus,
  //     weight,
  //     height,
  //     headCircumference,
  //     abdominalCircumference,
  //     totalFluidsCalc,
  //     fluids,
  //     nationality,
  //     nationalSecurityId,
  //     birthPlace,
  //     domicile,
  //     identifications,
  //     communicationOrdinal,
  //     communicationType,
  //     communicationLabel,
  //     communicationValue,
  //     assuranceName,
  //     assuranceId,
  //     responsible,
  //     policyHolder,
  //     responsibleIdentifications,
  //     responsibleCommunications,
  //     policyHolderIdentifications,
  //     policyHolderCommunications,
  //   };

  //   const existingPatientsRaw = localStorage.getItem("patients");
  //   const existingPatients = Array.isArray(JSON.parse(existingPatientsRaw))
  //     ? JSON.parse(existingPatientsRaw)
  //     : [];

  //   existingPatients.push(newPatient);
  //   localStorage.setItem("patients", JSON.stringify(existingPatients));

  //   navigate("/patients");
  // };

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      const response = await axios.get(`${API_URL}/countries`, {
        headers: { "X-CSCAPI-KEY": API_KEY },
      });
      setCountries(response.data);
    } catch (error) {
      console.error("Error loading countries:", error);
    }
  };

  const loadStates = async (countryCode) => {
    try {
      const response = await axios.get(
        `${API_URL}/countries/${countryCode}/states`,
        {
          headers: { "X-CSCAPI-KEY": API_KEY },
        }
      );
      setStates(response.data);
      setCities([]);
    } catch (error) {
      console.error("Error loading states:", error);
    }
  };

  const loadCities = async (countryCode, stateCode) => {
    try {
      const response = await axios.get(
        `${API_URL}/countries/${countryCode}/states/${stateCode}/cities`,
        { headers: { "X-CSCAPI-KEY": API_KEY } }
      );
      setCities(response.data);
    } catch (error) {
      console.error("Error loading cities:", error);
    }
  };

  const handlePatient = () => {
    navigate("/patients");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const identifications = [
      {
        ordinal: parseInt(identificationOrdinal, 10),
        type: identificationType,
        value: identificationValue,
      },
    ];

    const responsibleIdentifications = [
      {
        ordinal: parseInt(responsibleIdentificationOrdinal, 10),
        type: responsibleIdentificationType,
        value: responsibleIdentificationValue,
      },
    ];

    const responsibleCommunications = [
      {
        ordinal: parseInt(responsibleCommunicationsOrdinal, 10),
        type: responsibleCommunicationType,
        value: responsibleCommunicationValue,
        label: responsibleCommunicationLabel,
      },
    ];

    const policyHolderIdentifications = [
      {
        ordinal: parseInt(policyHolderIdentificationOrdinal, 10),
        type: policyHolderIdentificationType,
        value: policyHolderIdentificationValue,
      },
    ];

    const policyHolderCommunications = [
      {
        ordinal: parseInt(policyHolderCommunicationOrdinal, 10),
        type: policyHolderCommunicationType,
        value: policyHolderCommunicationValue,
        label: policyHolderCommunicationLabel,
      },
    ];

    const getRandomStatus = () => (Math.random() < 0.5 ? "Chronic" : "Acute");

    const newPatient = {
      id: `#${Math.floor(1000 + Math.random() * 9000)}`,
      status: getRandomStatus(),
      name,
      lastName,
      dob,
      gender,
      maritalStatus,
      bloodGroup,
      age,
      description,
      mobileNumber,
      email,
      city,
      address,
      state,
      pincode,
      emergencyContactName,
      emergencyRelationship,
      emergencyContactNumber,
      allergies,
      medications,
      medicalHistory,
      insuranceProvider,
      policyNumber,
      cardNumber,
      expiryDate,
      cvv,
      paymentStatus,
      weight,
      height,
      headCircumference,
      abdominalCircumference,
      totalFluidsCalc,
      fluids,
      nationality,
      nationalSecurityId,
      birthPlace,
      domicile,
      identifications,
      communicationOrdinal,
      communicationType,
      communicationLabel,
      communicationValue,
      assuranceName,
      assuranceId,
      responsible,
      policyHolder,
      responsibleIdentifications,
      responsibleCommunications,
      policyHolderIdentifications,
      policyHolderCommunications,
    };

    try {
      const headers = {
        "X-xPxApp-App-Account-Id": "<APP_ACCOUNT_ID>",
        "X-xPxApp-App-Auth": "<MD5_AUTH_TOKEN>",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer <YOUR_AUTH_TOKEN>",
      };

      const response = await axios.post(
        "https://localhost:8000/records",
        newPatient,
        { headers }
      );

      if (response.status === 201) {
        console.log("Patient record saved successfully:", response.data);
        const existingPatientsRaw = localStorage.getItem("patients");
        const existingPatients = Array.isArray(JSON.parse(existingPatientsRaw))
          ? JSON.parse(existingPatientsRaw)
          : [];
        existingPatients.push(response.data);
        localStorage.setItem("patients", JSON.stringify(existingPatients));

        navigate("/patients");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error saving patient record:", error);
      alert("Failed to save patient record. Please try again.");
    }
  };

  const renderField = (field, index) => {
    if (field.type === "phone") {
      return (
        <label key={index} className="block">
          <span className="text-sm font-medium">{field.label}</span>
          <PhoneInput
            country={"us"}
            value={field.value}
            onChange={field.onChange}
            inputStyle={{
              paddingTop: "20px",
              paddingBottom: "20px",
              borderRadius: "5px",
              border: "1px solid #CDCDCD",
              width: "100%",
            }}
            containerStyle={{ margin: "10px 0" }}
            placeholder={field.placeholder}
            enableSearch={true}
            required
          />
        </label>
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

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const isValidDob = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const earliestValidDate = new Date(
      today.getFullYear() - 150,
      today.getMonth(),
      today.getDate()
    );

    return birthDate >= earliestValidDate && birthDate <= today;
  };

  const isCardExpired = (expiryDate) => {
    const today = new Date();
    const cardExpiry = new Date(expiryDate);

    return cardExpiry < today;
  };

  const patientDetailsFields = [
    {
      label: t("pages.addPatient.patientDetails.firstName"),
      type: "text",
      placeholder: t("pages.addPatient.placeholders.enterFirstName"),
      value: name,
      onChange: (e) => setname(e.target.value),
    },
    {
      label: t("pages.addPatient.patientDetails.lastName"),
      type: "text",
      placeholder: t("pages.addPatient.placeholders.enterLastName"),
      value: lastName,
      onChange: (e) => setLastName(e.target.value),
    },
    {
      label: t("pages.addPatient.patientDetails.dob"),
      type: "date",
      placeholder: t("pages.addPatient.placeholders.enterDate"),
      value: dob,
      onChange: (e) => {
        const newDob = e.target.value;

        if (!isValidDob(newDob)) {
          alert("Invalid date of birth! Please enter a realistic date.");
          return;
        }

        setDob(newDob);
        setAge(calculateAge(newDob));
      },
    },
    {
      label: t("pages.addPatient.patientDetails.gender"),
      type: "select",
      placeholder: t("pages.addPatient.placeholders.selectGender"),
      options: [
        t("pages.addPatient.gender.male"),
        t("pages.addPatient.gender.female"),
      ],
      value: gender,
      onChange: (e) => setGender(e.target.value),
    },
    {
      label: t("pages.addPatient.patientDetails.maritalStatus"),
      type: "select",
      placeholder: t("pages.addPatient.placeholders.selectMaritalStatus"),
      options: [
        t("pages.addPatient.maritalStatus.single"),
        t("pages.addPatient.maritalStatus.married"),
      ],
      value: maritalStatus,
      onChange: (e) => setMaritalStatus(e.target.value),
    },
    {
      label: t("pages.addPatient.patientDetails.bloodGroup"),
      type: "select",
      placeholder: t("pages.addPatient.placeholders.selectBloodGroup"),
      options: ["A+", "B+", "O+", "AB+"],
      value: bloodGroup,
      onChange: (e) => setBloodGroup(e.target.value),
    },
    {
      label: t("pages.addPatient.patientDetails.age"),
      type: "number",
      placeholder: t("pages.addPatient.placeholders.enterAge"),
      value: age,
      onChange: (e) => setAge(e.target.value),
    },
    {
      label: t("pages.addPatient.patientDetails.description"),
      type: "text",
      placeholder: t("pages.addPatient.placeholders.enterDescription"),
      value: description,
      onChange: (e) => setDescription(e.target.value),
    },
    {
      label: "Weight",
      type: "text",
      placeholder: "Enter Weight",
      value: weight ? `${weight} ${weightDate}` : "",
      onChange: handleWeightChange,
    },
    {
      label: "Height",
      type: "text",
      placeholder: "Enter Height",
      value: height ? `${height} ${heightDate}` : "",
      onChange: handleHeightChange,
    },
    {
      label: "Head Circumference",
      type: "text",
      placeholder: "Enter Head Circumference",
      value: headCircumference,
      onChange: (e) => setHeadCircumference(e.target.value),
    },
    {
      label: "Abdominal Circumference",
      type: "text",
      placeholder: "Enter Abdominal Circumference",
      value: abdominalCircumference,
      onChange: (e) => setAbdominalCircumference(e.target.value),
    },
    {
      label: "Total Fluids Calc",
      type: "text",
      placeholder: "Enter Total Fluids Calc",
      value: totalFluidsCalc,
      onChange: (e) => setTotalFluidsCalc(e.target.value),
    },
    {
      label: "Fluids",
      type: "text",
      placeholder: "Enter Fluids",
      value: fluids.join(", "),
      onChange: (e) => setFluids(e.target.value.split(", ")),
    },
    {
      label: "Patient Type",
      type: "select",
      placeholder: "Select Patient Type",
      options: ["Neonate", "Pediatric", "Adult"],
      value: patientType,
      onChange: (e) => setPatientType(e.target.value),
    },
  ];

  const contactInformationFields = [
    {
      label: t("pages.addPatient.contactInfo.country"),
      type: "select",
      placeholder: t("pages.addPatient.placeholders.selectCountry"),
      options: countries.map((c) => ({ value: c.iso2, label: c.name })),
      value: country,
      onChange: (e) => {
        const selectedCountry = e.target.value;
        setCountry(selectedCountry);
        setState("");
        setCity("");
        loadStates(selectedCountry);
      },
    },
    {
      label: t("pages.addPatient.contactInfo.state"),
      type: "select",
      placeholder: t("pages.addPatient.placeholders.selectState"),
      options: states.map((s) => ({ value: s.iso2, label: s.name })),
      value: state,
      disabled: !country,
      onChange: (e) => {
        const selectedState = e.target.value;
        setState(selectedState);
        setCity("");
        loadCities(country, selectedState);
      },
    },
    {
      label: t("pages.addPatient.contactInfo.city"),
      type: "select",
      placeholder: t("pages.addPatient.placeholders.selectCity"),
      options: cities.map((c) => ({ value: c.name, label: c.name })),
      value: city,
      disabled: !state,
      onChange: (e) => setCity(e.target.value),
    },
    {
      label: "Nationality",
      type: "text",
      placeholder: "Enter nationality",
      value: nationality,
      onChange: (e) => setNationality(e.target.value),
    },
    {
      label: "National Security Id",
      type: "text",
      placeholder: "Enter National Security Id",
      value: nationality,
      onChange: (e) => setNationalSecurityId(e.target.value),
    },
    {
      label: "Birth Place",
      type: "text",
      placeholder: "Enter Birth Place",
      value: birthPlace,
      onChange: (e) => setBirthPlace(e.target.value),
    },
    {
      label: "Domicile",
      type: "text",
      placeholder: "Enter Domicile",
      value: domicile,
      onChange: (e) => setDomicile(e.target.value),
    },
    {
      label: t("pages.addPatient.contactInfo.mobileNumber"),
      type: "phone",
      placeholder: t("pages.addPatient.placeholders.enterMobileNumber"),
      value: mobileNumber,
      onChange: (value) => setMobileNumber(value),
    },
    {
      label: t("pages.addPatient.contactInfo.email"),
      type: "email",
      placeholder: t("pages.addPatient.placeholders.enterEmail"),
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      label: t("pages.addPatient.contactInfo.zipcode"),
      type: "number",
      placeholder: t("pages.addPatient.placeholders.enterZipcode"),
      value: pincode,
      onChange: (e) => setPincode(e.target.value),
    },
    {
      label: t("pages.addPatient.contactInfo.address"),
      type: "text",
      placeholder: t("pages.addPatient.placeholders.enterAddress"),
      value: address,
      onChange: (e) => setAddress(e.target.value),
    },
  ];

  const emergencyContactFields = [
    {
      label: t("pages.addPatient.emergencyContact.contactName"),
      type: "text",
      placeholder: t("pages.addPatient.placeholders.enterContactName"),
      value: emergencyContactName,
      onChange: (e) => setEmergencyContactName(e.target.value),
    },
    {
      label: t("pages.addPatient.emergencyContact.relationship"),
      type: "select",
      placeholder: t("pages.addPatient.placeholders.selectRelationship"),
      options: ["Father", "Mother", "Husband", "Wife", "Sister", "Daughter"],
      value: emergencyRelationship,
      onChange: (e) => setEmergencyRelationship(e.target.value),
    },
    {
      label: t("pages.addPatient.emergencyContact.contactNumber"),
      type: "phone",
      placeholder: t("pages.addPatient.placeholders.enterContactNumber"),
      value: emergencyContactNumber,
      onChange: (value) => setEmergencyContactNumber(value),
    },
  ];

  const medicalInformationFields = [
    {
      label: t("pages.addPatient.medicalInfo.allergies"),
      type: "text",
      placeholder: t("pages.addPatient.placeholders.enterAllergies"),
      value: allergies,
      onChange: (e) => setAllergies(e.target.value),
    },
    {
      label: t("pages.addPatient.medicalInfo.medications"),
      type: "text",
      placeholder: t("pages.addPatient.placeholders.enterMedications"),
      value: medications,
      onChange: (e) => setMedications(e.target.value),
    },
    {
      label: t("pages.addPatient.medicalInfo.medicalHistory"),
      type: "text",
      placeholder: t("pages.addPatient.placeholders.selectMedicalHistory"),
      value: medicalHistory,
      onChange: (e) => setMedicalHistory(e.target.value),
    },
    {
      label: "Energency Sign and Symptoms",
      type: "text",
      placeholder: "Enter symptoms",
      value: signinAndSymptoms,
      onChange: (e) => setSignAndSymptoms(e.target.value),
    },
  ];

  const insuranceInformationFields = [
    {
      label: t("pages.addPatient.insuranceInfo.insuranceProvider"),
      type: "text",
      placeholder: t("pages.addPatient.placeholders.enterInsuranceProvider"),
      value: insuranceProvider,
      onChange: (e) => setInsuranceProvider(e.target.value),
    },
    {
      label: t("pages.addPatient.insuranceInfo.policyNumber"),
      type: "text",
      placeholder: t("pages.addPatient.placeholders.enterPolicyNumber"),
      value: policyNumber,
      onChange: (e) => setPolicyNumber(e.target.value),
    },
    {
      label: "Assurance Name",
      type: "text",
      placeholder: "Enter Assurance Name",
      value: assuranceName,
      onChange: (e) => setAssuranceName(e.target.value),
    },
    {
      label: "Assurance ID",
      type: "text",
      placeholder: "Enter Assurance ID",
      value: assuranceId,
      onChange: (e) => setAssuranceId(e.target.value),
    },
    {
      label: "Responsible",
      type: "text",
      placeholder: "Enter name",
      value: responsible,
      onChange: (e) => setResponsible(e.target.value),
    },
    {
      label: "Policy Holder",
      type: "text",
      placeholder: "Enter name",
      value: policyHolder,
      onChange: (e) => setPolicyHolder(e.target.value),
    },
  ];

  const identificationsFields = [
    {
      label: "Ordinal",
      type: "number",
      placeholder: "Enter ordinal",
      value: identificationOrdinal,
      onChange: (e) => setIdentificationOrdinal(e.target.value),
    },
    {
      label: "Type",
      type: "text",
      placeholder: "Enter type",
      value: identificationType,
      onChange: (e) => setIdentificationType(e.target.value),
    },
    {
      label: "Value",
      type: "text",
      placeholder: "Enter value",
      value: identificationValue,
      onChange: (e) => setIdentificationValue(e.target.value),
    },
  ];

  const responsibleIdentificationsFields = [
    {
      label: "Ordinal",
      type: "number",
      placeholder: "Enter ordinal",
      value: responsibleIdentificationOrdinal,
      onChange: (e) => setResponsibleIdentificationsOrdinal(e.target.value),
    },
    {
      label: "Type",
      type: "text",
      placeholder: "Enter type",
      value: responsibleIdentificationType,
      onChange: (e) => setResponsibleIdentificationsType(e.target.value),
    },
    {
      label: "Value",
      type: "text",
      placeholder: "Enter value",
      value: responsibleIdentificationValue,
      onChange: (e) => setResponsibleIdentificationsValue(e.target.value),
    },
  ];

  const communicationFields = [
    {
      label: "Ordinal",
      type: "number",
      placeholder: "Enter ordinal",
      value: communicationOrdinal,
      onChange: (e) => setCommunicationOrdinal(e.target.value),
    },
    {
      label: "Type",
      type: "text",
      placeholder: "Enter type",
      value: communicationType,
      onChange: (e) => setCommunicationType(e.target.value),
    },
    {
      label: "Label",
      type: "text",
      placeholder: "Enter label",
      value: communicationLabel,
      onChange: (e) => setCommunicationLabel(e.target.value),
    },
    {
      label: "Value",
      type: "text",
      placeholder: "Enter value",
      value: communicationValue,
      onChange: (e) => setCommunicationValue(e.target.value),
    },
  ];

  const responsibleCommunicationFields = [
    {
      label: "Ordinal",
      type: "number",
      placeholder: "Enter ordinal",
      value: responsibleCommunicationsOrdinal,
      onChange: (e) => setResponsibleCommunicationsOrdinal(e.target.value),
    },
    {
      label: "Type",
      type: "text",
      placeholder: "Enter type",
      value: responsibleCommunicationType,
      onChange: (e) => setResponsibleCommunicationsType(e.target.value),
    },
    {
      label: "Label",
      type: "text",
      placeholder: "Enter label",
      value: responsibleCommunicationLabel,
      onChange: (e) => setResponsibleCommunicationsLabel(e.target.value),
    },
    {
      label: "Value",
      type: "text",
      placeholder: "Enter value",
      value: responsibleCommunicationValue,
      onChange: (e) => setResponsibleCommunicationsValue(e.target.value),
    },
  ];

  const policyHolderIdentificationsFields = [
    {
      label: "Ordinal",
      type: "number",
      placeholder: "Enter ordinal",
      value: policyHolderIdentificationOrdinal,
      onChange: (e) => setPolicyHolderIdentificationsOrdinal(e.target.value),
    },
    {
      label: "Type",
      type: "text",
      placeholder: "Enter type",
      value: policyHolderIdentificationType,
      onChange: (e) => setPolicyHolderIdentificationsType(e.target.value),
    },
    {
      label: "Value",
      type: "text",
      placeholder: "Enter value",
      value: policyHolderIdentificationValue,
      onChange: (e) => setPolicyHolderIdentificationsValue(e.target.value),
    },
  ];

  const policyHolderCommunicationFields = [
    {
      label: "Ordinal",
      type: "number",
      placeholder: "Enter ordinal",
      value: policyHolderCommunicationOrdinal,
      onChange: (e) => setPolicyHolderCommunicationOrdinal(e.target.value),
    },
    {
      label: "Type",
      type: "text",
      placeholder: "Enter type",
      value: policyHolderCommunicationType,
      onChange: (e) => setPolicyHolderCommunicationType(e.target.value),
    },
    {
      label: "Label",
      type: "text",
      placeholder: "Enter label",
      value: policyHolderCommunicationLabel,
      onChange: (e) => setPolicyHolderCommunicationLabel(e.target.value),
    },
    {
      label: "Value",
      type: "text",
      placeholder: "Enter value",
      value: policyHolderCommunicationValue,
      onChange: (e) => setPolicyHolderCommunicationValue(e.target.value),
    },
  ];

  const cardDetailsFields = [
    {
      label: t("pages.addPatient.cardDetails.cardNumber"),
      type: "text",
      placeholder: t("pages.addPatient.placeholders.enterCardNumber"),
      value: cardNumber,
      onChange: (e) => setCardNumber(e.target.value),
    },
    {
      label: t("pages.addPatient.cardDetails.expiryDate"),
      type: "date",
      placeholder: t("pages.addPatient.placeholders.enterExpiryDate"),
      value: expiryDate,
      onChange: (e) => {
        const newExpiryDate = e.target.value;

        if (isCardExpired(newExpiryDate)) {
          alert("This card is expired! Please use a valid card.");
          return;
        }

        setExpiryDate(newExpiryDate);
      },
    },
    {
      label: t("pages.addPatient.cardDetails.cvv"),
      type: "text",
      placeholder: t("pages.addPatient.placeholders.enterCVV"),
      value: cvv,
      onChange: (e) => setCvv(e.target.value),
    },
  ];

  const paymentFields = [
    {
      type: "select",
      label: t("pages.addPatient.paymentInfo.paymentStatus"),
      placeholder: t("pages.addPatient.placeholders.selectPaymentStatus"),
      options: [
        t("pages.addPatient.paymentStatus.pending"),
        t("pages.addPatient.paymentStatus.completed"),
        t("pages.addPatient.paymentStatus.notPaid"),
      ],
      value: paymentStatus,
      onChange: (e) => setPaymentStatus(e.target.value),
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="px-4 sm:px-6 lg:px-8 py-4 bg-gray-100">
          <div className="flex items-center gap-2">
            <img
              src={backIcon}
              alt="back-icon"
              className="cursor-pointer"
              onClick={handlePatient}
            />
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
              {t("pages.addPatient.title")}
            </h1>
          </div>
          <form className="mt-6 space-y-6 shadow-sm" onSubmit={handleSubmit}>
            <FormSection title={t("pages.addPatient.patientDetails.title")}>
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {patientDetailsFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title={t("pages.addPatient.contactInfo.title")}>
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {contactInformationFields.map((field, index) => {
                  if (field.type === "select") {
                    return (
                      <label
                        key={index}
                        className={`block col-span-1 ${
                          field.label ===
                          t("pages.addPatient.contactInfo.address")
                            ? "sm:col-span-2"
                            : "col-span-1"
                        }`}
                      >
                        <span className="text-sm font-medium">
                          {field.label}
                        </span>
                        <select
                          className="border border-gray-300 text-[#808080] p-2 rounded w-full mt-3"
                          value={field.value}
                          onChange={field.onChange}
                          disabled={field.disabled || false}
                          required
                        >
                          <option value="">{field.placeholder}</option>
                          {field.options.map((option, idx) => (
                            <option key={idx} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    );
                  }
                  if (
                    field.label === t("pages.addPatient.contactInfo.address")
                  ) {
                    return (
                      <label
                        key={index}
                        className="block col-span-1 sm:col-span-2 lg:col-span-2"
                      >
                        <span className="text-sm font-medium">
                          {field.label}
                        </span>
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
                  }
                  return renderField(field, index);
                })}
              </div>
            </FormSection>

            <FormSection title={t("pages.addPatient.emergencyContact.title")}>
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {emergencyContactFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title={t("pages.addPatient.medicalInfo.title")}>
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {medicalInformationFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title={t("pages.addPatient.insuranceInfo.title")}>
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {insuranceInformationFields.map((field, index) => {
                  if (
                    field.label ===
                    t("pages.addPatient.insuranceInfo.insuranceProvider")
                  ) {
                    return (
                      <label
                        key={index}
                        className="block col-span-1 sm:col-span-2 lg:col-span-2"
                      >
                        <span className="text-sm font-medium">
                          {field.label}
                        </span>
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
                  }
                  if (
                    field.label ===
                    t("pages.addPatient.insuranceInfo.policyNumber")
                  ) {
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
                            value={field.value}
                            onChange={field.onChange}
                            required
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

            <FormSection title="Identifications">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {identificationsFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title="Comunications">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {communicationFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title="Responsible Identifications">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {responsibleIdentificationsFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title="Responsible Communications">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {responsibleCommunicationFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title="Policyholder Identifications">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {policyHolderIdentificationsFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title="Policyholder Communications">
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {policyHolderCommunicationFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title={t("pages.addPatient.cardDetails.title")}>
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-4 mt-4">
                {cardDetailsFields.map((field, index) =>
                  renderField(field, index)
                )}
              </div>
            </FormSection>

            <FormSection title={t("pages.addPatient.paymentInfo.title")}>
              <hr className="text-[#D1D1D1] border-1" />
              <div className="grid grid-cols-1 gap-4 mt-4">
                {paymentFields.map((field, index) => renderField(field, index))}
              </div>
            </FormSection>

            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
              <button
                type="button"
                className="px-6 py-2 rounded-xl border border-[#747474] text-[#747474]"
                onClick={handlePatient}
              >
                {t("pages.addPatient.buttons.cancel")}
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-[#2E2559] text-white"
              >
                {t("pages.addPatient.buttons.generateID")}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddPatient;
