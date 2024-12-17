import React from "react";
const FormSection = ({ title, children }) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </section>
  );
};

export default FormSection;
