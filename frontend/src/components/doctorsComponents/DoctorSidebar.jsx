import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiFileText,
  FiActivity,
  FiClipboard,
  FiUser,
  FiLogOut,
  FiHeart,
} from "react-icons/fi";
import { BRAND } from "../../config/brand";

export default function DoctorSidebar() {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FiHome />,
      path: "/doctordashboard",
    },
    {
      name: "Patients",
      icon: <FiUsers />,
      path: "/doctors/patients",
    },
    {
      name: "Appointments",
      icon: <FiCalendar />,
      path: "/doctors/appointments",
    },
    {
      name: "Medical History",
      icon: <FiFileText />,
      path: "/doctor/history",
    },
    {
      name: "Test Reports",
      icon: <FiActivity />,
      path: "/doctors/test-reports",
    },
    {
      name: "Prescription",
      icon: <FiClipboard />,
      path: "/doctors/all-prescriptions",
    },
    {
      name: "Profile",
      icon: <FiUser />,
      path: "/doctor/profile",
    },
  ];

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside className="w-72 bg-white shadow-xl flex flex-col border-r border-slate-200">

      {/* Logo */}
      <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-200">
        <img
          src={BRAND.logoUrl}
          alt="logo"
          className="w-12 h-12 rounded-xl object-contain"
        />

        <div>
          <h2 className="font-bold text-lg text-teal-700">
            {BRAND.appName}
          </h2>

          <p className="text-xs text-slate-500">
            Doctor Portal
          </p>
        </div>
      </div>

      {/* Doctor Profile */}
      <div className="px-6 py-5 border-b border-slate-200">

        <div className="w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center text-2xl mx-auto">
          <FiUser />
        </div>

        <h3 className="text-center mt-3 font-semibold text-slate-700">
          Dr. Sharma
        </h3>

        <p className="text-center text-sm text-slate-500">
          Cardiologist
        </p>

      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto py-4">

        {menuItems.map((item) => (

          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/doctor"}
            className={({ isActive }) =>
              `mx-3 mb-2 flex items-center gap-4 px-4 py-3 rounded-xl transition-all
              ${
                isActive
                  ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg"
                  : "text-slate-600 hover:bg-teal-50 hover:text-teal-700"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>

            <span className="font-medium">
              {item.name}
            </span>

          </NavLink>

        ))}

      </div>

      {/* Logout */}
      <div className="p-4 border-t border-slate-200">

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
        >
          <FiLogOut />

          Logout
        </button>

      </div>

    </aside>
  );
}