import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

const ElementCard = ({ building, onDelete, onSave }) => {
    const navigate = useNavigate();

    const handleDeleteClick = (e) => {
        e.stopPropagation(); // Evita que el evento de clic en el card se dispare
        onDelete(building);
    };

    const handleEditClick = (e) => {
        e.stopPropagation(); // Evita que el evento de clic en el card se dispare
        onSave(building);
    };

    return (
        <div 
            className="flex flex-1 flex-col items-start justify-between
                       min-w-[420px] w-1/2 bg-white 
                       text-black text-xl border rounded-lg border-secondary
                       p-4 cursor-pointer relative hover:bg-secondary-background"
            onClick={() => navigate(`/classrooms/${building._id}`)}
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
                <p><span className="font-['Helvetica-Bold']">Nombre:</span> <span className="truncate">{building.name}</span></p>
                <p><span>Dispositivos registrados:</span> {building.deviceCount}</p>
                <p><span>Espacios registrados:</span> {building.spaceCount}</p>
            </div>
        </div>
    );
};

export default ElementCard;