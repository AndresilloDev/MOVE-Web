import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fileNotification, getNotification } from "../../api/notifications.api";
import { useNotification } from "../../context/NotificationContext";
import { Loader } from "lucide-react";
import { getBuilding } from "../../api/buildings.api"; // Asegúrate de importar las funciones adecuadas
import { getSpace } from "../../api/spaces.api"; // Asegúrate de importar las funciones adecuadas

const SelectedNotificationPage = () => {
    const { id } = useParams();

    const [notification, setNotification] = useState(null);
    const [buildingName, setBuildingName] = useState("");
    const [spaceName, setSpaceName] = useState("");
    const { getError, getSuccess } = useNotification();

    const navigate = useNavigate();

    const getFormmatedValue = () => {
        if (notification.value) {
            const value = parseFloat(notification.value); // Convierte a número
            console.log("Valor formateado:", value); // Verifica cómo se formatea el valor
            switch (notification.sensor) {
                case "temperatura":
                    return `${value} °C`;
                case "humedad":
                    return `${value} %`;
                case "luz":
                    return `${value} Lux`;
                case "sonido":
                    return `${value} dB`;
                case "dióxido de carbono":
                    return `${value} ppm`;
                default:
                    return "Sin datos";
            }
        }
        return "Sin datos";
    };    

    const getDate = () => {
        return new Date(notification.date).toISOString().replace("T", " ").substring(0, 19);
    };

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
    };

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const response = await getNotification(id);
                setNotification(response.data);
                const buildingResponse = await getBuilding(response.data.building);
                setBuildingName(buildingResponse.data.name);

                const spaceResponse = await getSpace(response.data.building, response.data.space);
                setSpaceName(spaceResponse.data.name);
            } catch (error) {
                setBuildingName("Desconocido");
                setSpaceName("Desconocido");
            }
        };
        fetchNotification();
    }, [id]);

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
                            <p><strong>Aula: </strong> {spaceName}</p>
                            <p><strong>Edificio: </strong> {buildingName}</p>
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
                            <div className="mr-8"><p>Valor: {getFormmatedValue()}</p></div>
                            <div className=""><p><strong>Fecha: </strong> {getDate()}</p></div>
                        </div>
                        <div className="">
                        {notification.image && (
                            <img 
                            src={notification.image.startsWith('data:image') ? notification.image : `data:image/jpeg;base64,${notification.image}`}
                                alt="Captura de la notificación"
                                className="w-full h-auto max-h-[500px] object-contain rounded-md shadow"
                            />
                        )}
                        </div>
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default SelectedNotificationPage;