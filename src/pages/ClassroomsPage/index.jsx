import { useState } from "react";
import SearchFilter from "../../components/layout/SearchFilter";
import ClassroomsCard from "../../components/layout/ClassroomsCard";
import EditDialog from "../../components/layout/EditDialog";
import { Close, Add } from "@mui/icons-material";

const aulasData = [
  { _id: "1", nombre: "CC11", dispositivos: 1 },
  { _id: "2", nombre: "CC12", dispositivos: 3 },
  // Más datos...
];

export default function ClassroomsPage() {
  const [aulas, setAulas] = useState(aulasData);
  const [search, setSearch] = useState("");
  const [editDialog, setEditDialog] = useState({ isOpen: false, aula: null });

  const handleSave = (editedAula) => {
    setAulas(aulas.map(a => a._id === editedAula._id ? editedAula : a));
    setEditDialog({ isOpen: false, aula: null });
  };

  const filteredAulas = aulas.filter((aula) =>
      aula.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <div className="classrooms-container">
        <div className="relative z-10 p-6 transition-all duration-300 flex items-center">
          <SearchFilter search={search} setSearch={setSearch} />
          <button
              className="flex items-center bg-action-primary text-black px-4 py-2 rounded-full shadow-md ml-4 hover:bg-action-hover transition duration-300"
              onClick={() => setEditDialog({ isOpen: true, aula: null })}
          >
            <Add className="mr-2" />
            Agregar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {filteredAulas.map((aula, index) => (
              <ClassroomsCard
                  key={index}
                  aula={aula}
                  onEdit={() => setEditDialog({ isOpen: true, aula })}
                  onDelete={() => {/* Lógica para eliminar */}}
              />
          ))}
        </div>

        <EditDialog
            isOpen={editDialog.isOpen}
            onClose={() => setEditDialog({ isOpen: false, aula: null })}
            onSave={handleSave}
            itemType="Aula"
            item={editDialog.aula}
        />
      </div>
  );
}