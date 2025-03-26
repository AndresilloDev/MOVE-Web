import { useState, useEffect } from "react";
import SearchFilter from "../../components/layout/SearchFilter";
import NotificationsTable from "../../components/layout/NotificationsTable";

export default function NotificationsPage() {
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);

  // Llamar a la API cuando se monte el componente
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notifications/unfiled");
        if (!response.ok) throw new Error("Error al obtener las notificaciones");
        const data = await response.json();
        
        // Mapear los datos a la estructura esperada
        const formattedData = data.map(notification => ({
          fecha: notification.date,
          dispositivo: `#${notification.device}`, 
          nombre: notification.name,
          sensor: notification.sensor
        }));

        setNotifications(formattedData);
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <div className="relative z-10 p-6 transition-all duration-300">
        <SearchFilter search={search} setSearch={setSearch} />
        <NotificationsTable data={notifications} search={search} />
      </div>
    </div>
  );
}
