import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

const DeviceCard = ({ device, onDelete, onSave }) => {
    const navigate = useNavigate();

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        onDelete(device);
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        onSave(device);
    };

    return (
        <div 
            className="flex flex-1 flex-col items-start justify-between
                       min-w-[420px] w-1/2 bg-white 
                       text-black text-xl border rounded-lg border-secondary
                       p-4 cursor-pointer relative hover:bg-secondary-background"
            onClick={() => navigate(`/device/${device._id}`)}
        >
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
                <div className="flex space-x-4">
                    <div><span className="font-['Helvetica-Bold']">Dispositivo:</span> <span className="truncate">{device.name}</span></div>
                </div>
                <div className="mt-2">
                    <div><span>Aula:</span> {device.space ? device.space.name : 'Sin Aula'}</div>
                    <div><span>Edificio:</span> {device.building ? device.building.name : 'Sin Edificio'}</div>
                </div>
            </div>
        </div>
    );
};

export default DeviceCard;