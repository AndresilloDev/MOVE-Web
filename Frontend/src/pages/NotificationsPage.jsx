import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Header from "../components/layout/Header"; 
import Sidebar from "../components/layout/Sidebar"; 

const datos = [
  { fecha: "2025-01-30 11:30:56", dispositivo: "#246568", nombre: "D4 - CC11", sensor: "Temperatura" },
  { fecha: "2025-01-30 11:30:56", dispositivo: "#246568", nombre: "D4 - CC11", sensor: "Humedad" },
  { fecha: "2025-01-30 11:30:56", dispositivo: "#246568", nombre: "D4 - CC11", sensor: "CO2" },
  { fecha: "2025-01-30 11:30:56", dispositivo: "#246568", nombre: "D4 - CC11", sensor: "Ruido" },
  { fecha: "2025-01-30 11:30:56", dispositivo: "#246569", nombre: "D4 - CC12", sensor: "Temperatura" },
  { fecha: "2025-01-30 11:30:56", dispositivo: "#246569", nombre: "D4 - CC12", sensor: "Humedad" },
  { fecha: "2025-01-30 11:30:56", dispositivo: "#246569", nombre: "D4 - CC12", sensor: "CO2" },
  { fecha: "2025-01-30 11:30:56", dispositivo: "#246569", nombre: "D4 - CC12", sensor: "Ruido" },
  { fecha: "2025-01-30 11:30:56", dispositivo: "#246570", nombre: "D4 - CC13", sensor: "Temperatura" },
];

export default function NotificationsPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const isLoggedIn = true; 
  const itemsPerPage = 5;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen); 

  const filteredData = datos.filter(item =>
    item.nombre.toLowerCase().includes(search.toLowerCase()) ||
    item.dispositivo.toLowerCase().includes(search.toLowerCase()) ||
    item.sensor.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      {/* Header */}
      <div className="w-full">
        <Header isLoggedIn={isLoggedIn} />
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Contenido principal */}
      <div className={`relative z-10 p-6 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}>
        {/* Barra de búsqueda */}
        <div className="flex justify-start p-4 w-full mt-2">
          <div className="flex items-center bg-white border border-gray-300 rounded-full overflow-hidden shadow-md w-1/2">
            <input
              type="text"
              placeholder="Buscar..."
              className="outline-none px-4 py-2 bg-transparent w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-[#DEFF35] p-2 px-4 border-l border-gray-300">
              <SearchIcon className="text-black" />
            </button>
          </div>
        </div>

        {/* Tabla de notificaciones */}
        <div className="mt-8">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-black">Fecha</th>
                <th className="px-4 py-2 border-b border-black">Dispositivo</th>
                <th className="px-4 py-2 border-b border-black">Nombre</th>
                <th className="px-4 py-2 border-b border-black">Sensor</th>
                <th className="px-4 py-2 border-b border-black">Detalles</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-b border-black">{item.fecha}</td>
                  <td className="px-4 py-2 border-b border-black">{item.dispositivo}</td>
                  <td className="px-4 py-2 border-b border-black">{item.nombre}</td>
                  <td className="px-4 py-2 border-b border-black">{item.sensor}</td>
                  <td className="px-4 py-2 border-b border-black">
                    <button className="bg-[#DEFF35] text-black px-4 py-1 rounded-md shadow-md transition duration-300 hover:bg-[#c4e62d] hover:shadow-lg">
                      Ver más
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex justify-end mt-8 space-x-2 text-black">
          <button
            className="px-2 py-1"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-2 py-1 text-black font-bold border border-black rounded-md ${
                currentPage === i + 1 ? "bg-[#DEFF35]" : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-2 py-1"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}