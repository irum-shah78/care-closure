import React, { useState } from "react";
import profileImage from "../../assets/profile-img.svg";
import dropdown from "../../assets/dropdown.svg";
import notification from "../../assets/notification.svg";
import profileDropdown from "../../assets/profile-dropdown.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import LanguageSwitcher from "../languageswitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Header = ({ user }) => {
  const { t } = useTranslation();
  const [selectedRole, setSelectedRole] = useState("Front Desk Staff");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const getCurrentDateTime = () => {
    const current = new Date();
    return current.toLocaleString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const roles = [
    "Admissions Clerk",
    "Front Desk Staff",
    "Supervisor",
    "Patients",
  ];

  return (
    <>
      <header className="flex items-center justify-between px-4 md:px-6 lg:px-8 h-[70px] bg-white shadow-md w-full z-80">
        <div className="flex items-center cursor-pointer">
          <div className="relative z-50">
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-between w-32 md:w-40 lg:w-44 text-xs md:text-sm space-x-2 bg-white border border-[#D9D9D9] rounded-3xl px-3 py-2"
            >
              <span className="truncate">{selectedRole}</span>
              <img src={dropdown} alt="dropdown" />
            </button>
            {isDropdownOpen && (
              <ul className="absolute w-32 md:w-40 lg:w-44 left-0 text-xs md:text-sm mt-2 bg-white border border-gray-300 rounded shadow-lg z-[100]">
                {roles.map((role) => (
                  <li
                    key={role}
                    className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      role === selectedRole ? "bg-gray-100" : ""
                    }`}
                    onClick={() => {
                      setSelectedRole(role);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <div className="w-6 flex-shrink-0">
                      {role === selectedRole && (
                        <FontAwesomeIcon icon={faCheck} />
                      )}
                    </div>
                    <span className="flex-grow truncate text-gray-700">
                      {role}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <LanguageSwitcher />
        </div>

        <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4 gap-2">
          <div className="text-[#656565] text-xs md:text-sm lg:text-base whitespace-nowrap">
            {getCurrentDateTime()}
          </div>

          <div className="relative">
            <button className="focus:outline-none">
              <img
                src={notification}
                alt="Notification"
                className="w-5 h-5 md:w-6 md:h-6"
              />
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-[#2E2559] rounded-full"></span>
            </button>
          </div>

          <div className="hidden md:flex items-center">
            <img
              src={profileImage}
              alt="User"
              className="w-7 h-7 md:w-8 md:h-8 rounded-full"
            />
            <div className="text-xs md:text-sm flex flex-col ms-2">
              <span className="text-[#656565]">
                {t("components.header.welcome")}
              </span>
              <div className="flex items-center gap-1 md:gap-2 cursor-pointer">
                <span className="text-[#2E2559] font-semibold">
                  Jawad Afzal
                </span>
                <img src={profileDropdown} alt="dropdown" className="w-2 h-2" />
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg
                className="w-6 h-6 text-[#2E2559]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 22 22"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md w-full px-8 py-4 z-[50]">
          <div className="text-[#656565] text-sm mb-4">
            {getCurrentDateTime()}
          </div>
          <div className="flex items-center mb-4">
            <img
              src={profileImage}
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <div className="text-base flex flex-col ms-2">
              <span className="mr-2 text-[#656565] ms-2">
                {t("components.header.welcome")}
              </span>
              <div className="flex justify-between items-center gap-2">
                <span className="ml-2 text-[#2E2559] font-semibold">
                  Jawad Afzal
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
