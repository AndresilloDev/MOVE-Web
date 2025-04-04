import { useState, useEffect } from "react";
import { getUnfiledNotifications, getFiledNotifications } from "../../api/notifications.api";
import { useNotification } from "../../context/NotificationContext";
import SearchFilter from "../../components/ui/SearchFilter";
import NotificationsTable from "../../components/ui/tables/NotificationsTable";
import { Archive, Inbox } from "lucide-react";

export default function NotificationsPage() {
  const { getError } = useNotification();
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showFiled, setShowFiled] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = showFiled ? await getFiledNotifications() : await getUnfiledNotifications();

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
  }, [showFiled]);

  const filteredNotifications = notifications.filter(notification =>
    notification.nombre.toLowerCase().includes(search.toLowerCase()) ||
    notification.dispositivo.toLowerCase().includes(search.toLowerCase()) ||
    notification.sensor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full min-h-screen overflow-hidden" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <div className="relative z-10 p-6 transition-all duration-300">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 gap-4">
          <SearchFilter search={search} setSearch={setSearch} />

          <div className="flex items-center gap-2">
            <div 
              className="relative flex items-center bg-secondary rounded-full w-18 h-8 p-1 cursor-pointer transition"
              onClick={() => setShowFiled(!showFiled)}
            >
              <div 
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all 
                ${!showFiled && "bg-action-primary shadow-md"}`}
              >
                <Inbox size={18} />
              </div>

              <div 
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all 
                ${showFiled && "bg-action-primary shadow-md"}`}
              >
                <Archive size={18} />
              </div>
            </div>
          </div>
        </div>

        <div className="text-lg font-semibold mb-2 flex items-center gap-2">
          <p>Notificaciones {showFiled ? "archivadas" : ""}</p>
        </div>
        <NotificationsTable data={filteredNotifications} search={search} />
      </div>
    </div>
  );
}
