import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import DeveloperBoardOutlinedIcon from '@mui/icons-material/DeveloperBoardOutlined';
import { Tooltip } from "react-tooltip"; 
import "react-tooltip/dist/react-tooltip.css"; 

// Lista de elementos del menú
const menuItems = [
  { icon: DeveloperBoardOutlinedIcon, name: "Dispositivos" },
  { icon: ApartmentIcon, name: "Docencias" },
  { icon: PeopleAltOutlinedIcon, name: "Usuarios" },
  { icon: NotificationsNoneOutlinedIcon, name: "Notificaciones" },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div
      className={`fixed left-0 top-1/2 transform -translate-y-1/2 h-auto ${
        isOpen ? "w-64" : "w-16"
      } bg-[#F8F8FF] shadow-lg flex flex-col rounded-r-3xl py-6 transition-all duration-300`}
    >
      {/* Botón para abrir/cerrar */}
      <button
        onClick={toggleSidebar}
        className="absolute top-6 -right-5 bg-white p-1 rounded-full shadow-md border border-gray-300 hover:bg-gray-200 cursor-pointer"
      >
        <FaAngleRight
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {/* Imagen de usuario */}
      <div className="flex justify-center items-center mb-4">
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="User"
          className="w-12 h-12 rounded-full border-2 border-white shadow-md"
        />
      </div>

      {/* Menú de navegación */}
      <nav className="flex flex-col">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center w-full h-12 cursor-pointer hover:bg-gray-200 px-4"
          >
            <item.icon 
              className="text-gray-600 text-3xl"
              data-tooltip-id="sidebar-tooltip"
              data-tooltip-content={item.name} 
            />
            <span className={`ml-4 text-gray-700 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 hidden"}`}>
              {item.name}
            </span>
          </div>
        ))}
      </nav>

      <div className="flex-grow"></div>

      {/* Perfil */}
      <div className="flex items-center w-full h-12 cursor-pointer hover:bg-gray-200 px-4">
        <AccountCircleOutlinedIcon 
          className="text-gray-600 text-4xl"
          data-tooltip-id="sidebar-tooltip" 
          data-tooltip-content="Perfil" 
        />
        <span className={`ml-4 text-gray-700 ${isOpen ? "opacity-100" : "opacity-0 hidden"}`}>Perfil</span>
      </div>

      {/* Cerrar sesión */}
      <div className="flex items-center w-full h-12 cursor-pointer hover:bg-gray-200 px-4 border-t">
        <ExitToAppOutlinedIcon 
          className="text-gray-600 text-4xl"
          data-tooltip-id="sidebar-tooltip" 
          data-tooltip-content="Cerrar sesión" 
        />
        <span className={`ml-4 text-gray-700 ${isOpen ? "opacity-100" : "opacity-0 hidden"}`}>Cerrar sesión</span>
      </div>

      <Tooltip
        id="sidebar-tooltip"
        className="!bg-[#DEFF35] !text-black !rounded-md !px-3 !py-2 !text-sm !shadow-lg"
        place="right" 
        delayShow={300} 
        delayHide={100} 
      />
    </div>
  );
}