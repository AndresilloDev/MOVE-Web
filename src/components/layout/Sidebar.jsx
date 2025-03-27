import {useContext, useState} from "react";
import { NavLink } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { Home, Users, Bell, Building, LogOut, User, Cpu } from "lucide-react";
import { AuthContext } from "../../context/AuthContext.jsx";

export default function Sidebar() {
  const { user, handleLogout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const menuItems = [
    { icon: Cpu, name: "Dispositivos", path: "/devices" },
    { icon: Building, name: "Docencias", path: "/buildings" },
    { icon: Users, name: "Usuarios", path: "/users" },
    { icon: Bell, name: "Notificaciones", path: "/notifications" },
  ];

  return (
    <div
      className={`fixed left-0 top-1/2 transform -translate-y-1/2 h-auto z-50 bg-secondary-background text-black shadow-2xl flex flex-col py-6 duration-300 ${
        sidebarOpen ? "w-64" : "w-16"
      } rounded-r-2xl`}
    >
      {/* Botón para abrir/cerrar */}
      <button
        onClick={toggleSidebar}
        className="absolute top-3 -right-3 bg-white text-gray-700 p-1 rounded-full shadow-md border border-gray-300 hover:bg-gray-200 transition"
      >
        <FaAngleRight
          className={`transition-transform duration-300 ${sidebarOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {/* Imagen de usuario */}
      <div className="flex items-center pl-2 mb-6">
        <img
          src="https://randomuser.me/api/portraits/men/8.jpg"
          alt="User"
          className="w-12 h-12 rounded-lg object-cover duration-300"
        />
        <div
          className={`overflow-hidden transition-[max-width] duration-300 ${
            sidebarOpen ? "max-w-full ml-3" : "max-w-0"
          }`}
        >
          <h3 className="text-sm font-semibold truncate">{user.name}</h3>
          <p className="text-xs text-gray-400 truncate"></p>
        </div>
      </div>

      {/* Menú de navegación */}
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-lg  ${
              isActive ? "bg-action-primary text-black border border-secondary" : "hover:bg-gray-200"
            } ${sidebarOpen ? "justify-start" : "justify-center"}`
          }
        >
          <Home className="w-6 h-6" />
          <div
            className={`overflow-hidden transition-[max-width] duration-300 ${
              sidebarOpen ? "max-w-full ml-4" : "max-w-0"
            }`}
          >
            <span className="text-sm truncate">Inicio</span>
          </div>
        </NavLink>

        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg  ${
                isActive ? "bg-action-primary text-black border border-secondary" : "hover:bg-gray-200"
              } ${sidebarOpen ? "justify-start" : "justify-center"}`
            }
          >
            <item.icon className="w-6 h-6" />
            <div
              className={`overflow-hidden transition-[max-width] duration-300 ${
                sidebarOpen ? "max-w-full ml-4" : "max-w-0"
              }`}
            >
              <span className="text-sm truncate">{item.name}</span>
            </div>
          </NavLink>
        ))}
      </nav>

      <div className="flex-grow"></div>

      {/* Perfil (junto al resto del menú) */}
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex items-center px-4 py-3 rounded-lg  ${
            isActive ? "bg-action-primary text-black border border-secondary" : "hover:bg-gray-200"
          } ${sidebarOpen ? "justify-start" : "justify-center"}` // Moved inside menu
        }
      >
        <User className="w-6 h-6" />
        <div
          className={`overflow-hidden transition-[max-width] duration-300 ${
            sidebarOpen ? "max-w-full ml-4" : "max-w-0"
          }`}
        >
          <span className="text-sm truncate">Perfil</span>
        </div>
      </NavLink>

      {/* Separador */}
      <div className="border-t border-gray-300 my-4"></div>

      {/* Cerrar sesión (separado) */}
      <button
        onClick={() => handleLogout()}
        className={`flex items-center px-4 py-3 hover:bg-red-700 rounded-lg  ${
          sidebarOpen ? "" : "justify-center"
        }`}
      >
        <LogOut className="w-6 h-6" />
        <div
          className={`overflow-hidden transition-[max-width] duration-300 ${
            sidebarOpen ? "max-w-full ml-4" : "max-w-0"
          }`}
        >
          <span className="text-sm truncate">Cerrar sesión</span>
        </div>
      </button>
    </div>
  );
}