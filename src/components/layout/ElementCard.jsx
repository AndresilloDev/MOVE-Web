import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

const ElementCard = ({ item, type, onDelete, onSave }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const routes = {
            buildings: `/classrooms/${item._id}`,
            classrooms: `/devices/${item._id}`,
            devices: `/device/${item._id}`
        };
        navigate(routes[type] || "/");
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation(); // Evita que el evento de clic en el card se dispare
        onDelete(item);
    };

    const handleEditClick = (e) => {
        e.stopPropagation(); // Evita que el evento de clic en el card se dispare
        onSave(item);
    };

    const renderContent = () => {
        switch (type) {
            case "buildings":
                return (
                    <>
                        <p><span className="font-['Helvetica-Bold']">Nombre:</span> <span className="truncate">{item.name}</span></p>
                        <p><span className="font-['Helvetica-Bold']">Dispositivos registrados:</span> {item.deviceCount}</p>
                        <p><span className="font-['Helvetica-Bold']">Espacios registrados:</span> {item.spaceCount}</p>
                    </>
                );
            case "classrooms":
                return (
                    <>
                        <p><span className="font-['Helvetica-Bold']">Aula:</span> <span className="truncate">{item.name}</span></p>
                        <p><span className="font-['Helvetica-Bold']">Capacidad:</span> {item.capacity}</p>
                        <p><span className="font-['Helvetica-Bold']">Dispositivos:</span> {item.deviceCount}</p>
                    </>
                );
            case "devices":
                return (
                    <>
                        <div className="flex space-x-4">
                            <div><span className="font-['Helvetica-Bold']">Dispositivo:</span> <span className="truncate">{item.name}</span></div>
                        </div>
                        <div className="mt-2">
                            <div><span className="font-['Helvetica-Bold']">Aula:</span> {item.space ? item.space.name : 'Aula no disponible'}</div>
                            <div><span className="font-['Helvetica-Bold']">Edificio:</span> {item.building ? item.building.name : 'Edificio no disponible'}</div>
                        </div>
                    </>
                );
            default:
                return <p>Información no disponible</p>;
        }
    };

    return (
        <div 
            className="flex flex-1 flex-col items-start justify-between
                       min-w-[420px] w-1/2 bg-white 
                       text-black text-xl border rounded-lg border-secondary
                       p-4 cursor-pointer relative hover:bg-secondary-background"
            onClick={handleClick}
        >
            {/* Botones de Editar y Eliminar */}
            <div className="absolute top-3 right-3 flex gap-2 z-10">
                <button 
                    className="text-gray-500 hover:text-black p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={handleEditClick}
                >
                    <Pencil size={20} />
                </button>
                <button 
                    className="text-red-600 hover:text-red-800 p-2 rounded-md border border-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                    onClick={handleDeleteClick}
                >
                    <Trash2 size={20} />
                </button>
            </div>

            <div className="flex-1 w-full">
                {renderContent()}
            </div>
        </div>
    );
};

export default ElementCard;