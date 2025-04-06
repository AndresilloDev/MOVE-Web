import { useState, useEffect } from "react";
import { getUnfiledNotifications, getFiledNotifications } from "../../api/notifications.api";
import { getDevice } from "../../api/devices.api";
import { useNotification } from "../../context/NotificationContext";
import SearchFilter from "../../components/ui/SearchFilter";
import NotificationsTable from "../../components/ui/tables/NotificationsTable";
import { Archive, Inbox } from "lucide-react";
import { Loader } from "../../components/ui/Loader";

export default function NotificationsPage() {
  const { getError } = useNotification();
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showFiled, setShowFiled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = showFiled ? await getFiledNotifications() : await getUnfiledNotifications();
        
        const formattedData = await Promise.all(
          response.data.map(async (notification) => {
            try {
              const deviceResponse = await getDevice(notification.device);
              return {
                fecha: new Date(notification.date).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }),
                dispositivo: deviceResponse.data.name || `#${notification.device}`,
                nombre: notification.name,
                sensor: notification.sensor,
                _id: notification._id,
              };
            } catch (error) {
              console.error("Error al obtener dispositivo:", error);
              return {
                fecha: new Date(notification.date).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }),
                dispositivo: `#${notification.device}`,
                nombre: notification.name,
                sensor: notification.sensor,
                _id: notification._id,
              };
            }
          })
        );

        setNotifications(formattedData);
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
        getError("Error al obtener las notificaciones");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [showFiled, getError]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
        <SearchFilter search={search} setSearch={setSearch} />

        <div className="flex items-center gap-2 justify-center">
          <span className={`text-sm mt-2 ${!showFiled ? "font-medium" : "text-gray-500"}`}>Pendientes</span>
          <button 
            onClick={() => setShowFiled(!showFiled)}
            className="relative inline-flex items-center h-10 mt-2 rounded-full w-18 cursor-pointer bg-gray-200 transition-colors duration-300 focus:outline-none"
          >
            <span className={`absolute left-0.5 w-8 h-8 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
              showFiled ? "translate-x-9 bg-blue-500" : "bg-gray-100"
            }`} />
          </button>
          <span className={`text-sm mt-2 ${showFiled ? "font-medium" : "text-gray-500"}`}>Resueltas</span>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <NotificationsTable data={notifications} search={search} />
      )}
    </div>
  );
}