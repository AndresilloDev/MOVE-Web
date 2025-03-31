import { useState, useEffect } from "react";
import { getUnfiledNotifications } from "../../api/notifications.api"; 
import { useNotification } from "../../context/NotificationContext"; 
import SearchFilter from "../../components/ui/SearchFilter";
import NotificationsTable from "../../components/ui/tables/NotificationsTable";

export default function NotificationsPage() {
  const { getError } = useNotification(); 
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getUnfiledNotifications();

        if (!Array.isArray(data)) {
          throw new Error("La respuesta de la API no es un array válido");
        }

        const formattedData = data.map(notification => ({
          fecha: notification.date,
          dispositivo: `#${notification.device}`, 
          nombre: notification.name,
          sensor: notification.sensor
        }));

        setNotifications(formattedData);
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
        getError("Error al obtener las notificaciones");
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
