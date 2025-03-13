import { useState } from "react";
import SearchFilter from "../../components/layout/SearchFilter";
import NotificationsTable from "../../components/layout/NotificationsTable";

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

  return (
    <div className="relative w-full min-h-screen overflow-hidden" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      {/* Contenido principal */}
      <div className="relative z-10 p-6 transition-all duration-300">
        {/* Componente de búsqueda */}
        <SearchFilter search={search} setSearch={setSearch} />
        
        {/* Tabla de notificaciones */}
        <NotificationsTable data={datos} search={search} />
      </div>
    </div>
  );
}
