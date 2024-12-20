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

  const handleSubmit = (e) => {
    e.preventDefault();

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
    };

    const existingPatientsRaw = localStorage.getItem("patients");
    const existingPatients = Array.isArray(JSON.parse(existingPatientsRaw))
      ? JSON.parse(existingPatientsRaw)
      : [];

    existingPatients.push(newPatient);
    localStorage.setItem("patients", JSON.stringify(existingPatients));

    navigate("/patients");
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
      type: "select",
      placeholder: t("pages.addPatient.placeholders.selectMedicalHistory"),
      options: ["None", "Condition 1", "Condition 2"],
      value: medicalHistory,
      onChange: (e) => setMedicalHistory(e.target.value),
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
  ];

  const cardDetailsFields = [
    {
      label: t("pages.addPatient.cardDetails.cardNumber"),
      type: "number",
      placeholder:  t("pages.addPatient.placeholders.enterCardNumber"),
      value: cardNumber,
      onChange: (e) => setCardNumber(e.target.value),
    },
    {
      label: t("pages.addPatient.cardDetails.expiryDate"),
      type: "date",
      placeholder: t("pages.addPatient.placeholders.enterExpiryDate"),
      value: expiryDate,
      onChange: (e) => setExpiryDate(e.target.value),
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
      options: [t("pages.addPatient.paymentStatus.pending"), t("pages.addPatient.paymentStatus.completed"), t("pages.addPatient.paymentStatus.notPaid")],
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
                        className="block col-span-1 sm:col-span-2 lg:col-span-3"
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
                  if (field.label === t("pages.addPatient.insuranceInfo.insuranceProvider")) {
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
                  if (field.label === t("pages.addPatient.insuranceInfo.policyNumber")) {
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

            <FormSection  title={t("pages.addPatient.cardDetails.title")}>
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
