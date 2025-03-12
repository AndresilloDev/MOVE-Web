import { useState } from "react";
import SearchFilter from "../../components/layout/SearchFilter";
import ClassroomsCard from "../../components/layout/ClassroomsCard";
import { Close, Add } from "@mui/icons-material";

const aulasData = [
  { nombre: "CC11", dispositivos: 1 },
  { nombre: "CC12", dispositivos: 3 },
  { nombre: "CC13", dispositivos: 2 },
  { nombre: "CC14", dispositivos: 5 },
  { nombre: "CC15", dispositivos: 3 },
  { nombre: "CC16", dispositivos: 2 },
  { nombre: "CC17", dispositivos: 5 },
  { nombre: "CC18", dispositivos: 3 },
];

export default function ClassroomsPage() {
  const [aulas, setAulas] = useState(aulasData);
  const [search, setSearch] = useState("");
  const [selectedAula, setSelectedAula] = useState(null);
  const [modalType, setModalType] = useState("");

  const openModal = (type, aula = null) => {
    setSelectedAula(aula);
    setModalType(type);
  };

  const closeModal = () => setModalType("");

  const filteredAulas = aulas.filter((aula) =>
    aula.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="classrooms-container">
      <style>
        {`
          /* Estilos del modal */
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 50;
            pointer-events: none;
          }

          .modal-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            width: 400px;
            text-align: center;
            position: relative;
            z-index: 51;
            pointer-events: auto;
          }

          .close-btn {
            position: absolute;
            top: 20px;
            right: 10px;
            border: none;
            background: none;
            cursor: pointer;
          }

          .modal-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
          }

          .modal-input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          .modal-actions {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 15px;
          }

          .cancel-btn {
            background-color: white;
            color: black;
            border: 1px solid black;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
          }

          .action-btn {
            background-color: #DEFF35;
            color: black;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            border: none;
          }
        `}
      </style>

      <div className="relative z-10 p-6 transition-all duration-300 flex items-center">
        {/* Componente de búsqueda */}
        <SearchFilter search={search} setSearch={setSearch} setOpenAddModal={() => openModal("add")} />
        
        {/* Botón de Agregar */}
        <button
          className="flex items-center bg-action-primary text-black px-4 py-2 rounded-full shadow-md ml-4 hover:bg-action-hover transition duration-300"
          onClick={() => openModal("add")}
        >
          <Add className="mr-2" />
          Agregar
        </button>
      </div>

      {/* Cards de aulas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {filteredAulas.map((aula, index) => (
          <ClassroomsCard
            key={index}
            aula={aula}
            onEdit={() => openModal("edit", aula)}
            onDelete={() => openModal("delete", aula)}
          />
        ))}
      </div>

      {/* Modales */}
      {modalType && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              <Close />
            </button>

            {/* Modal de Editar Aula */}
            {modalType === "edit" && (
              <>
                <h2 className="modal-title">Editar Aula</h2>
                <input className="modal-input" type="text" defaultValue={selectedAula?.nombre} placeholder="Nombre" />
                <input className="modal-input" type="text" defaultValue="D4" placeholder="Docencia" />
                <div className="modal-actions">
                  <button className="cancel-btn" onClick={closeModal}>Cancelar</button>
                  <button className="action-btn">Actualizar</button>
                </div>
              </>
            )}

            {/* Modal de Añadir Aula */}
            {modalType === "add" && (
              <>
                <h2 className="modal-title">Añadir Aula</h2>
                <input className="modal-input" type="text" placeholder="Nombre" />
                <input className="modal-input" type="text" placeholder="Docencia" />
                <div className="modal-actions">
                  <button className="cancel-btn" onClick={closeModal}>Cancelar</button>
                  <button className="action-btn">Agregar</button>
                </div>
              </>
            )}

            {/* Modal de Eliminar Aula */}
            {modalType === "delete" && (
              <>
                <h2 className="modal-title">Eliminar Aula</h2>
                <p className="modal-text">¿Estás seguro que deseas eliminar el aula {selectedAula?.nombre}?</p>
                <div className="modal-actions">
                  <button className="cancel-btn" onClick={closeModal}>Cancelar</button>
                  <button className="action-btn">Eliminar</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
