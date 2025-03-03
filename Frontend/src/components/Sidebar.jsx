import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PeopleIcon from "@mui/icons-material/People";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed left-0 top-1/2 transform -translate-y-1/2 h-2/3 ${
        isOpen ? "w-64" : "w-16"
      } bg-[#F8F8FF] shadow-lg flex flex-col rounded-r-3xl py-6 transition-all duration-300`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-6 right-[-10px] bg-white p-1 rounded-full shadow-md border border-gray-300 hover:bg-gray-200"
      >
        <FaAngleRight
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div className="flex justify-center items-center mb-4">
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="User"
          className="w-12 h-12 rounded-full border-2 border-white shadow-md"
        />
      </div>

      <nav className="flex flex-col">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center w-full h-12 cursor-pointer hover:bg-gray-200 px-4"
          >
            <item.icon className="text-gray-700 text-3xl" />
            {isOpen && <span className="ml-4 text-gray-700">{item.name}</span>}
          </div>
        ))}
      </nav>

      <div className="flex-grow"></div>

      <div className="flex items-center w-full h-12 cursor-pointer hover:bg-gray-200 px-4">
        <AccountCircleIcon className="text-gray-700 text-4xl" />
        {isOpen && <span className="ml-4 text-gray-700">Perfil</span>}
      </div>

      <div className="flex items-center w-full h-12 cursor-pointer hover:bg-gray-200 px-4 border-t">
        <ExitToAppIcon className="text-gray-700 text-4xl" />
        {isOpen && <span className="ml-4 text-gray-700">Cerrar sesión</span>}
      </div>
    </div>
  );
}

const menuItems = [
  { icon: DashboardIcon, name: "Dispositivos" },
  { icon: ApartmentIcon, name: "Docencias" },
  { icon: PeopleIcon, name: "Usuarios" },
  { icon: NotificationsIcon, name: "Notificaciones" },
];