import React, { useState } from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import FormSection from "../../components/formselection/FormSelection";
import backIcon from "../../assets/back-icon.svg";
import { useNavigate } from "react-router-dom";
import tickIcon from "../../assets/tick.svg";

const AddPatient = () => {
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
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

    const existingPatients = JSON.parse(
      localStorage.getItem("patients") || "[]"
    );
    existingPatients.push(newPatient);
    localStorage.setItem("patients", JSON.stringify(existingPatients));
    navigate("/patients");
  };

  const renderField = (field, index) => {
    if (field.type === "select") {
      return (
        <label key={index} className="block">
          <span className="text-sm font-medium">{field.label}</span>
          <select
            className="border border-[#CDCDCD] p-2 rounded w-full mt-3 text-[#808080]"
            value={field.value}
            onChange={field.onChange}
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
        />
      </label>
    );
  };

  const patientDetailsFields = [
    {
      label: "First Name",
      type: "text",
      placeholder: "Enter first name",
      value: name,
      onChange: (e) => setname(e.target.value),
    },
    {
      label: "Last Name",
      type: "text",
      placeholder: "Enter last name",
      value: lastName,
      onChange: (e) => setLastName(e.target.value),
    },
    {
      label: "Date of Birth",
      type: "date",
      placeholder: "mm/dd/yy",
      value: dob,
      onChange: (e) => setDob(e.target.value),
    },
    {
      label: "Gender",
      type: "select",
      placeholder: "Select your gender",
      options: ["Male", "Female"],
      value: gender,
      onChange: (e) => setGender(e.target.value),
    },
    {
      label: "Marital Status",
      type: "select",
      placeholder: "Select your marital status",
      options: ["Single", "Married"],
      value: maritalStatus,
      onChange: (e) => setMaritalStatus(e.target.value),
    },
    {
      label: "Blood Group",
      type: "select",
      placeholder: "Select your blood group",
      options: ["A+", "B+", "O+", "AB+"],
      value: bloodGroup,
      onChange: (e) => setBloodGroup(e.target.value),
    },
    {
      label: "Age",
      type: "text",
      placeholder: "Enter age",
      value: age,
      onChange: (e) => setAge(e.target.value),
    },
    {
      label: "Description",
      type: "text",
      placeholder: "Enter description",
      value: description,
      onChange: (e) => setDescription(e.target.value),
    },
  ];

  const contactInformationFields = [
    {
      label: "Mobile Number",
      type: "text",
      placeholder: "Enter your mobile number",
      value: mobileNumber,
      onChange: (e) => setMobileNumber(e.target.value),
    },
    {
      label: "Email",
      type: "text",
      placeholder: "Enter your email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      label: "City",
      type: "select",
      placeholder: "Select Your City",
      options: ["City 1", "City 2", "City 3"],
      value: city,
      onChange: (e) => setCity(e.target.value),
    },
    {
      label: "Address",
      type: "text",
      placeholder: "Enter your address",
      value: address,
      onChange: (e) => setAddress(e.target.value),
    },
    {
      label: "State",
      type: "select",
      placeholder: "Select Your State",
      options: ["State 1", "State 2", "State 3"],
      value: state,
      onChange: (e) => setState(e.target.value),
    },
    {
      label: "Pincode",
      type: "text",
      placeholder: "Enter your pincode",
      value: pincode,
      onChange: (e) => setPincode(e.target.value),
    },
  ];

  const emergencyContactFields = [
    {
      label: "Contact Name",
      type: "text",
      placeholder: "Enter contact name",
      value: emergencyContactName,
      onChange: (e) => setEmergencyContactName(e.target.value),
    },
    {
      label: "Relationship",
      type: "text",
      placeholder: "Enter relationship",
      value: emergencyRelationship,
      onChange: (e) => setEmergencyRelationship(e.target.value),
    },
    {
      label: "Contact Number",
      type: "text",
      placeholder: "Enter contact number",
      value: emergencyContactNumber,
      onChange: (e) => setEmergencyContactNumber(e.target.value),
    },
  ];

  const medicalInformationFields = [
    {
      label: "Known Allergies",
      type: "text",
      placeholder: "If any",
      value: allergies,
      onChange: (e) => setAllergies(e.target.value),
    },
    {
      label: "Current Medications",
      type: "text",
      placeholder: "If any",
      value: medications,
      onChange: (e) => setMedications(e.target.value),
    },
    {
      label: "Medical History",
      type: "select",
      placeholder: "Any previous conditions",
      options: ["None", "Condition 1", "Condition 2"],
      value: medicalHistory,
      onChange: (e) => setMedicalHistory(e.target.value),
    },
  ];

  const insuranceInformationFields = [
    {
      label: "Insurance Provider",
      type: "text",
      placeholder: "Enter name of insurance provider",
      value: insuranceProvider,
      onChange: (e) => setInsuranceProvider(e.target.value),
    },
    {
      label: "Policy Number",
      type: "text",
      placeholder: "Enter policy number",
      value: policyNumber,
      onChange: (e) => setPolicyNumber(e.target.value),
    },
  ];

  const cardDetailsFields = [
    {
      label: "Card Number",
      type: "text",
      placeholder: "12345678",
      value: cardNumber,
      onChange: (e) => setCardNumber(e.target.value),
    },
    {
      label: "Expiry Date",
      type: "text",
      placeholder: "MM/YY",
      value: expiryDate,
      onChange: (e) => setExpiryDate(e.target.value),
    },
    {
      label: "CVV",
      type: "text",
      placeholder: "123",
      value: cvv,
      onChange: (e) => setCvv(e.target.value),
    },
  ];

  const paymentFields = [
    {
      type: "select",
      label: "Payment Status",
      placeholder: "Select status",
      options: ["Pending", "Completed", "Not Payed"],
      value: paymentStatus,
      onChange: (e) => setPaymentStatus(e.target.value),
    },
  ];

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
            <h1 className="text-2xl font-bold">Add New Patient</h1>
          </div>
          <form className="mt-6 space-y-6 shadow-sm" onSubmit={handleSubmit}>
            <FormSection title="Patient Details">
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

export default AddPatient;
