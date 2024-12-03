import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import FormSection from "../../components/formselection/FormSelection";
import backIcon from "../../assets/back-icon.svg";
import { useNavigate } from "react-router-dom";
import tickIcon from "../../assets/tick.svg";

const AddPatient = () => {
  const navigate = useNavigate();
  const handlePatient = () => {
    navigate("/patients");
  };

  const patientDetailsFields = [
    { type: "text", label: "First Name", placeholder: "Enter first name" },
    { type: "text", label: "Last Name", placeholder: "Enter last name" },
    { type: "date", label: "Date of Birth", placeholder: "mm/dd/yy" },
    {
      type: "select",
      label: "Gender",
      placeholder: "Select your gender",
      options: ["Male", "Female"],
    },
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
            <h1 className="text-2xl font-bold">Add New Patient</h1>
          </div>
          <form className="mt-6 space-y-6 shadow-sm">
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

// import React, { useState } from "react";
// import Header from "../../components/header/Header";
// import Sidebar from "../../components/sidebar/Sidebar";
// import FormSection from "../../components/formselection/FormSelection";
// import backIcon from "../../assets/back-icon.svg";
// import { useNavigate } from "react-router-dom";
// import tickIcon from "../../assets/tick.svg";

// const AddPatient = () => {
//   const navigate = useNavigate();

//   // State to manage form fields
//   const [patientDetails, setPatientDetails] = useState({
//     firstName: "",
//     lastName: "",
//     dob: "",
//     gender: "",
//     maritalStatus: "",
//     bloodGroup: "",
//   });

//   const [contactInfo, setContactInfo] = useState({
//     mobileNumber: "",
//     email: "",
//     city: "",
//     address: "",
//     state: "",
//     pincode: "",
//   });

//   const handleInputChange = (section, field, value) => {
//     if (section === "patientDetails") {
//       setPatientDetails({ ...patientDetails, [field]: value });
//     } else if (section === "contactInfo") {
//       setContactInfo({ ...contactInfo, [field]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Combine all data
//     const allData = { ...patientDetails, ...contactInfo };

//     // Filter relevant data for patients' table
//     const patientData = {
//       firstName: patientDetails.firstName,
//       lastName: patientDetails.lastName,
//       dob: patientDetails.dob,
//       gender: patientDetails.gender,
//       maritalStatus: patientDetails.maritalStatus,
//       bloodGroup: patientDetails.bloodGroup,
//     };

//     console.log("All Form Data:", allData);
//     console.log("Patient Table Data:", patientData);

//     // Navigate to patients page (or handle further as needed)
//     navigate("/patients");
//   };

//   const renderField = (field, section, key) => {
//     if (field.type === "select") {
//       return (
//         <label key={key} className="block">
//           <span className="text-sm font-medium">{field.label}</span>
//           <select
//             className="border border-[#CDCDCD] p-2 rounded w-full mt-3 text-[#808080]"
//             defaultValue=""
//             onChange={(e) => handleInputChange(section, field.name, e.target.value)}
//           >
//             <option value="" disabled>
//               {field.placeholder}
//             </option>
//             {field.options.map((option, idx) => (
//               <option key={idx} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </label>
//       );
//     }
//     return (
//       <label key={key} className="block">
//         <span className="text-sm font-medium">{field.label}</span>
//         <input
//           type={field.type}
//           placeholder={field.placeholder}
//           className="border border-gray-300 text-[#808080] p-2 rounded w-full mt-3"
//           onChange={(e) => handleInputChange(section, field.name, e.target.value)}
//         />
//       </label>
//     );
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       <Sidebar />
//       <main className="flex-1">
//         <Header />
//         <div className="px-8 py-4">
//           <div className="flex gap-2">
//             <img
//               src={backIcon}
//               alt="back-icon"
//               className="cursor-pointer"
//               onClick={() => navigate("/patients")}
//             />
//             <h1 className="text-2xl font-bold">Add New Patient</h1>
//           </div>
//           <form className="mt-6 space-y-6 shadow-sm" onSubmit={handleSubmit}>
//             <FormSection title="Patient Details">
//               <hr className="text-[#D1D1D1] border-1" />
//               <div className="grid grid-cols-3 gap-x-14 gap-y-4 mt-4">
//                 {[
//                   { type: "text", label: "First Name", name: "firstName", placeholder: "Enter first name" },
//                   { type: "text", label: "Last Name", name: "lastName", placeholder: "Enter last name" },
//                   { type: "date", label: "Date of Birth", name: "dob", placeholder: "mm/dd/yy" },
//                   {
//                     type: "select",
//                     label: "Gender",
//                     name: "gender",
//                     placeholder: "Select your gender",
//                     options: ["Male", "Female"],
//                   },
//                   {
//                     type: "select",
//                     label: "Marital Status",
//                     name: "maritalStatus",
//                     placeholder: "Select your marital status",
//                     options: ["Single", "Married"],
//                   },
//                   {
//                     type: "select",
//                     label: "Blood Group",
//                     name: "bloodGroup",
//                     placeholder: "Select your blood group",
//                     options: ["A+", "B+", "O+", "AB+"],
//                   },
//                 ].map((field, index) =>
//                   renderField(field, "patientDetails", index)
//                 )}
//               </div>
//             </FormSection>

//             <FormSection title="Contact Information">
//               <hr className="text-[#D1D1D1] border-1" />
//               <div className="grid grid-cols-3 gap-x-14 gap-y-4 mt-4">
//                 {[
//                   { type: "text", label: "Mobile Number", name: "mobileNumber", placeholder: "Placeholder" },
//                   { type: "text", label: "Email", name: "email", placeholder: "Placeholder" },
//                   {
//                     type: "select",
//                     label: "City",
//                     name: "city",
//                     placeholder: "Select Your City",
//                     options: ["City 1", "City 2", "City 3"],
//                   },
//                   { type: "text", label: "Address", name: "address", placeholder: "Placeholder" },
//                   {
//                     type: "select",
//                     label: "State",
//                     name: "state",
//                     placeholder: "Select Your State",
//                     options: ["State 1", "State 2", "State 3"],
//                   },
//                   { type: "text", label: "Pincode", name: "pincode", placeholder: "Enter your pincode" },
//                 ].map((field, index) =>
//                   renderField(field, "contactInfo", index)
//                 )}
//               </div>
//             </FormSection>

//             <div className="flex justify-end gap-4 mt-6">
//               <button
//                 type="button"
//                 className="px-6 py-2 rounded-xl border border-[#747474] text-[#747474]"
//                 onClick={() => navigate("/patients")}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-6 py-2 rounded-xl bg-[#2E2559] text-white"
//               >
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AddPatient;
