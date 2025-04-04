import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fileNotification, getNotification } from "../../api/notifications.api";
import { useNotification } from "../../context/NotificationContext";
import { Loader } from "lucide-react";

const SelectedNotificationPage = () => {
    const { id } = useParams();

    const [notification, setNotification] = useState(null);
    const { getError, getSuccess } = useNotification();

    const navigate = useNavigate();

    const getFormmatedValue = () => {
        if (notification.value) {
            switch (notification.sensor) {
                case "Temperatura":
                    return `${notification.value} °C`;
                case "Humedad":
                    return `${notification.value} %`;
                case "Luz":
                    return `${notification.value} Lux`;
                case "Sonido":
                    return `${notification.value} dB`;
                case "CO2":
                    return `${notification.value} ppm`;
            }
        }
        return "Sin datos";
    }

    const getDate = () => {
        return new Date(notification.date).toISOString().replace("T", " ").substring(0, 19)
    }

    const handleFileNotification = async () => {
        try {
            const response = await fileNotification(id);
            if (response.status === 200) {
                getSuccess("Notificación resuelta correctamente");
                setNotification({ ...notification, status: false });
                navigate("/notifications");
            } else {
                getError("Error al resolver la notificación");
            }
        } catch (error) {
            console.error("Error resolving notification:", error);
            getError("Error al resolver la notificación");
        }
    }

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const response = await getNotification(id);
                setNotification(response.data);
            } catch (error) {
                console.error("Error fetching notification:", error);
                getError("Error al obtener la notificación");
            }
        };
        fetchNotification();
    }, []);

    return (
        <div className="overflow-auto">
            {notification ? (
                <div className="p-10 text-lg">
                    <div className="flex flex-row justify-between flex-wrap">
                        <div className="flex flex-col mr-8">
                            <p><strong>Dispositivo:</strong> {notification?.device.name}</p>
                            <p><strong>Nombre:</strong> {notification?.name}</p>
                        </div>
                        <div className="flex flex-col">
                            <p><strong>Aula: </strong> {notification.space}</p>
                            <p><strong>Edificio: </strong> {notification.building}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-4 mb-4 text-2xl">
                        <p>
                            <strong>Sensor: </strong> {notification.sensor}
                        </p>
                    </div>
                    {notification.status && (
                        <div className="flex flex-col items-end justify-center mt-4 mb-4">
                            <button 
                                className="bg-action-primary text-black rounded-xl 
                                py-2 px-4 border border-[#0000002E]
                                hover:bg-action-hover cursor-pointer transition duration-200"
                                onClick={handleFileNotification}
                            >
                                Notificación resuelta
                            </button>
                        </div>
                    )}

                    <div className="bg-secondary-background rounded-lg p-4 mt-4 mb-4">
                        <div className="flex flex-row flex-wrap items-center justify-between mb-4">
                            <div className="mr-8"><p><strong>Temperatura alcanzada: </strong>{getFormmatedValue()}</p></div>
                            <div className=""><p><strong>Fecha: </strong> {getDate()}</p></div>
                        </div>
                        <div className="">
                            <img 
                                src="https://cdn.milenio.com/uploads/media/2020/01/28/arribar-encontraron-danos-considerables-salon.jpeg"
                                alt="Ha ocurrido un problema al mostrar la imagen"
                                className="w-full h-auto max-h-150 object-contain"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default SelectedNotificationPage;