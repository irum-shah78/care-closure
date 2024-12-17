import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dashboardIconDefault from "../../assets/dashboard.svg";
import dashboardIconActive from "../../assets/dashboard-clicked.svg";
import patientsIconDefault from "../../assets/patient.svg";
import patientsIconActive from "../../assets/patient-clicked.svg";
import checkinIconDefault from "../../assets/patient.svg";
import checkinIconActive from "../../assets/patient-clicked.svg";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const navItems = [
    {
      name: t("components.sidebar.dashboard"),
      path: "/dashboard",
      defaultIcon: dashboardIconDefault,
      activeIcon: dashboardIconActive,
    },
    {
      name: t("components.sidebar.patients"),
      path: "/patients",
      defaultIcon: patientsIconDefault,
      activeIcon: patientsIconActive,
      matchPaths: ["/patients", "/patients/add-patient"],
    },
    {
      name: t("components.sidebar.checkin"),
      path: "/checkin-checkout",
      defaultIcon: checkinIconDefault,
      activeIcon: checkinIconActive,
    },
  ];

  return (
    <aside className="w-[250px] bg-white shadow-sm min-h-screen">
      <p
        className="pl-8 py-4 text-3xl font-bold text-[#2E2559] cursor-pointer"
        onClick={handleClick}
      >
        CareClosure
      </p>
      <nav className="pl-8 py-4">
        <ul>
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.matchPaths &&
                item.matchPaths.some((path) =>
                  location.pathname.startsWith(path)
                ));

            return (
              <li key={item.name} className="my-2 font-semibold text-[16px]">
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 ${
                    isActive
                      ? "bg-[#2E2559] text-white rounded-l-[50px]"
                      : "text-gray-700 hover:text-[#2E2559]"
                  }`}
                >
                  <img
                    src={isActive ? item.activeIcon : item.defaultIcon}
                    alt={`${item.name} icon`}
                    className="w-5 h-5 mr-2"
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
