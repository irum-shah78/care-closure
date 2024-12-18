// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import dropdown from "../../assets/dropdown.svg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck } from "@fortawesome/free-solid-svg-icons";
// const LanguageSwitcher = () => {
//   const { i18n } = useTranslation();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState(
//     i18n.language || "en"
//   );

//   const languages = [
//     { code: "en", name: "English" },
//     { code: "es", name: "Español/Spanish" },
//     { code: "zh", name: "中文/Chinese" },
//     { code: "fr", name: "Français/French" },
//     { code: "ht", name: "Kreyòl/Haitian" },
//   ];

//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   const changeLanguage = (code) => {
//     setSelectedLanguage(code);
//     i18n.changeLanguage(code);
//     setIsDropdownOpen(false);
//   };

//   return (
//     <div className="relative z-50 ms-3">
//       <button
//         onClick={toggleDropdown}
//         className="flex items-center justify-between w-44 text-sm font-normal space-x-2 bg-white border border-[#D9D9D9] rounded-3xl px-4 py-2"
//       >
//         <span>
//           {languages.find((lang) => lang.code === selectedLanguage)?.name}
//         </span>
//         <img src={dropdown} alt="dropdown" />
//       </button>
//       {isDropdownOpen && (
//         <ul className="absolute w-44 left-0 text-sm mt-2 bg-white border border-gray-300 rounded shadow-lg z-[100]">
//           {languages.map((lang) => (
//             <li
//               key={lang.code}
//               className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 ${
//                 lang.code === selectedLanguage ? "bg-gray-100" : ""
//               }`}
//               onClick={() => changeLanguage(lang.code)}
//             >
//               <div className="w-6 flex-shrink-0">
//                 {lang.code === selectedLanguage && (
//                   <FontAwesomeIcon icon={faCheck} className="text-gray-500" />
//                 )}
//               </div>
//               <span className="flex-grow text-gray-700">{lang.name}</span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default LanguageSwitcher;


import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import dropdown from "../../assets/dropdown.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || "en");

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español/Spanish" },
    { code: "zh", name: "中文/Chinese" },
    { code: "fr", name: "Français/French" },
    { code: "ht", name: "Kreyòl/Haitian" },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const changeLanguage = (code) => {
    setSelectedLanguage(code);
    i18n.changeLanguage(code);
    setIsDropdownOpen(false);
  };

  // Update the selected language when i18n.language changes
  useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, [i18n.language]);

  return (
    <div className="relative z-50 ms-3">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-44 text-sm font-normal space-x-2 bg-white border border-[#D9D9D9] rounded-3xl px-4 py-2"
      >
        <span>
          {languages.find((lang) => lang.code === selectedLanguage)?.name}
        </span>
        <img src={dropdown} alt="dropdown" />
      </button>
      {isDropdownOpen && (
        <ul className="absolute w-44 left-0 text-sm mt-2 bg-white border border-gray-300 rounded shadow-lg z-[100]">
          {languages.map((lang) => (
            <li
              key={lang.code}
              className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                lang.code === selectedLanguage ? "bg-gray-100" : ""
              }`}
              onClick={() => changeLanguage(lang.code)}
            >
              <div className="w-6 flex-shrink-0">
                {lang.code === selectedLanguage && (
                  <FontAwesomeIcon icon={faCheck} className="text-gray-500" />
                )}
              </div>
              <span className="flex-grow text-gray-700">{lang.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
