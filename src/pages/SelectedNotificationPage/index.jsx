import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fileNotification, getNotification } from "../../api/notifications.api";
import { useNotification } from "../../context/NotificationContext";
import { CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { getBuilding } from "../../api/buildings.api";
import { getSpace } from "../../api/spaces.api";
import { Loader } from "../../components/ui/Loader";

const SelectedNotificationPage = () => {
    const { id } = useParams();
    const [notification, setNotification] = useState(null);
    const [buildingName, setBuildingName] = useState("Cargando...");
    const [spaceName, setSpaceName] = useState("Cargando...");
    const { getError, getSuccess } = useNotification();
    const navigate = useNavigate();

    const getFormattedValue = () => {
        if (notification?.value) {
            const value = parseFloat(notification.value);
            switch (notification.sensor.toLowerCase()) {
                case "temperatura":
                    return `${value} °C`;
                case "humedad":
                    return `${value} %`;
                case "luz":
                    return `${value} Lux`;
                case "sonido":
                    return `${value} dB`;
                case "dióxido de carbono":
                case "dioxido de carbono":
                    return `${value} ppm`;
                default:
                    return value;
            }
        }
        return "Sin datos";
    };    

    const getFormattedDate = () => {
        if (!notification?.date) return "Fecha no disponible";
        const date = new Date(notification.date);
        return date.toLocaleString("es-MX", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const handleFileNotification = async () => {
        try {
            const response = await fileNotification(id);
            if (response.status === 200) {
                getSuccess("Notificación resuelta correctamente");
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
                
                try {
                    const buildingResponse = await getBuilding(response.data.building);
                    setBuildingName(buildingResponse.data.name);
                } catch (error) {
                    setBuildingName("Edificio no encontrado");
                }

                try {
                    const spaceResponse = await getSpace(response.data.building, response.data.space);
                    setSpaceName(spaceResponse.data.name);
                } catch (error) {
                    setSpaceName("Espacio no encontrado");
                }
            } catch (error) {
                getError("Error al cargar la notificación");
                navigate("/notifications");
            }
        };
        fetchNotification();
    }, [id, getError, navigate]);

    if (!notification) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader className="animate-spin h-12 w-12 text-blue-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-gray-600 p-4 md:p-6 text-white rounded-t-xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">{notification.name}</h1>
                            <p className="flex items-center mt-1">
                                {notification.status ? (
                                    <AlertTriangle className="h-5 w-5 mr-2 text-yellow-300" />
                                ) : (
                                    <CheckCircle className="h-5 w-5 mr-2 text-green-300" />
                                )}
                                {notification.status ? "Pendiente" : "Resuelta"}
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center">
                            <Clock className="h-5 w-5 mr-2" />
                            <span>{getFormattedDate()}</span>
                        </div>
                    </div>
                </div>

                {/* Contenido principal - Diseño de 2 columnas */}
                <div className="bg-white rounded-b-xl shadow-md overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Columna izquierda - Imagen cuadrada */}
                        <div className="bg-gray-100 p-4 flex items-center justify-center border-r border-gray-200">
                            {notification.image ? (
                                <div className="w-full h-full flex items-center justify-center">
                                    <img 
                                        src={notification.image.startsWith('data:image') 
                                            ? notification.image 
                                            : `data:image/jpeg;base64,${notification.image}`}
                                        alt="Captura de la notificación"
                                        className="w-full h-auto max-h-[500px] object-contain rounded-md shadow-lg"
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-64 flex items-center justify-center bg-gray-200 rounded-md">
                                    <p className="text-gray-500">No hay imagen disponible</p>
                                </div>
                            )}
                        </div>

                        {/* Columna derecha - Tarjetas de información */}
                        <div className="p-6 space-y-6">
                            {/* Tarjeta de Información del Dispositivo */}
                            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Información del Dispositivo
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="font-medium text-gray-600">Nombre:</span>
                                        <span>{notification.device?.name || "No disponible"}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="font-medium text-gray-600">ID:</span>
                                        <span>{notification.device?._id || "No disponible"}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="font-medium text-gray-600">Sensor:</span>
                                        <span className="capitalize">{notification.sensor || "No disponible"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-600">Valor:</span>
                                        <span className="font-semibold">{getFormattedValue()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tarjeta de Ubicación */}
                            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Ubicación
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="font-medium text-gray-600">Edificio:</span>
                                        <span>{buildingName}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="font-medium text-gray-600">Aula:</span>
                                        <span>{spaceName}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="font-medium text-gray-600">Fecha:</span>
                                        <span>{getFormattedDate()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-600">Estado:</span>
                                        <span className={`font-semibold ${notification.status ? 'text-yellow-600' : 'text-green-600'}`}>
                                            {notification.status ? 'Pendiente' : 'Resuelta'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Botón de acción */}
                            {notification.status && (
                                <div className="pt-4">
                                    <button
                                        onClick={handleFileNotification}
                                        className="w-full flex items-center justify-center px-6 py-3 border border-green-600 text-green-600 bg-green-50 rounded-lg shadow hover:bg-green-100 transition-colors duration-200"
                                    >
                                        <CheckCircle className="h-5 w-5 mr-2" />
                                        Marcar como resuelta
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectedNotificationPage;