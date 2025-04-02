import { useState, useMemo } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ElementsNotAvailable } from "../ElementsNotAvailable";
import { useNavigate } from "react-router-dom";

export default function NotificationsTable({ data = [], search }) {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.nombre.toLowerCase().includes(search.toLowerCase()) ||
      item.dispositivo.toLowerCase().includes(search.toLowerCase()) ||
      item.sensor.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="mt-8">
      {paginatedData.length > 0 ? (
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
            {paginatedData.map((item) => (
              <tr key={item._id || Math.random()}>
                <td className="px-4 py-2 border-b border-black">{item.fecha}</td>
                <td className="px-4 py-2 border-b border-black">{item.dispositivo}</td>
                <td className="px-4 py-2 border-b border-black">{item.nombre}</td>
                <td className="px-4 py-2 border-b border-black">{item.sensor}</td>
                <td className="px-4 py-2 border-b border-black">
                  <button 
                    className="bg-action-primary text-black px-4 py-1 rounded-md shadow-md transition duration-300 hover:bg-action-hover hover:shadow-lg"
                    onClick={() => navigate(`/notification/${item._id}`)}
                  >
                    Ver más
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      ) : (
        <ElementsNotAvailable element = "notificaciones" />
      )}

      {/* Paginación */}
      {totalPages > 1 && (
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
                currentPage === i + 1 ? "bg-action-primary" : ""
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
      )}
    </div>
  );
}
