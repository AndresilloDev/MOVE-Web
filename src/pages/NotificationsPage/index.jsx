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
        const response = await getUnfiledNotifications();

        console.log("Response from API:", response.data);

        const formattedData = response.data.map(notification => ({
          fecha: new Date(notification.date).toLocaleDateString("es-MX", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
          dispositivo: `#${notification.device}`, 
          nombre: notification.name,
          sensor: notification.sensor,
          _id: notification._id,
        }));

        setNotifications(formattedData);
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
        getError("Error al obtener las notificaciones");
      }
    };

    fetchNotifications();
  }, []);

  const filteredNotifications = notifications.filter(notification =>
    notification.nombre.toLowerCase().includes(search.toLowerCase()) ||
    notification.dispositivo.toLowerCase().includes(search.toLowerCase()) ||
    notification.sensor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full min-h-screen overflow-hidden" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <div className="relative z-10 p-6 transition-all duration-300">
        <SearchFilter search={search} setSearch={setSearch} />
        <NotificationsTable data={filteredNotifications} search={search} /> 
      </div>
    </div>
  );
}
