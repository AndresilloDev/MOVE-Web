import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ClassroomsCard = ({ aula, onEdit, onDelete }) => {
  return (
    <div className="relative z-10 flex justify-between items-center bg-white p-4 shadow-md rounded-lg border border-gray-200">
      <div className="text-left">
        <p className="font-bold">Nombre: {aula.nombre}</p>
        <p>Dispositivos registrados: {aula.dispositivos}</p>
      </div>
      <div className="flex gap-3 text-gray-600">
        <DeleteIcon className="cursor-pointer hover:text-red-500" onClick={onDelete} />
        <EditIcon className="cursor-pointer hover:text-[#c4e62d]" onClick={onEdit} />
      </div>
    </div>
  );
};

export default ClassroomsCard;
