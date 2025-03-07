import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Box, TextField, Button } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

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
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAula, setSelectedAula] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoggedIn = true;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const filteredAulas = aulas.filter((aula) =>
    aula.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <Header isLoggedIn={isLoggedIn} />

      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`relative z-10 p-6 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}>
        <div className="flex justify-start p-4 w-full mt-2">
          <div className="flex items-center bg-white border border-gray-300 rounded-full overflow-hidden shadow-md w-1/2">
            <input
              type="text"
              placeholder="Buscar..."
              className="outline-none px-4 py-2 bg-transparent w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-[#DEFF35] p-2 px-4 border-l border-gray-300">
              <SearchIcon className="text-black" />
            </button>
          </div>
          {/* Botón de Agregar */}
          <button
            className="flex items-center bg-[#DEFF35] text-black px-4 py-2 rounded-full shadow-md ml-4 hover:bg-[#c4e62d] transition duration-300"
            onClick={() => setOpenAddModal(true)}
          >
            <AddIcon className="mr-2" /> {/* Ícono de MUI */}
            Agregar
          </button>
        </div>

        {/* Cards de aulas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {filteredAulas.map((aula, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg border border-gray-200"
            >
              <div className="text-left">
                <p className="font-bold">Nombre: {aula.nombre}</p>
                <p>Dispositivos registrados: {aula.dispositivos}</p>
              </div>
              <div className="flex gap-3 text-gray-600">
                <DeleteIcon className="cursor-pointer hover:text-red-500" onClick={() => setOpenDeleteModal(true)} />
                <EditIcon className="cursor-pointer hover:text-[#c4e62d]" onClick={() => setOpenEditModal(true)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Editar Aula */}
      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <Box sx={modalStyles}>
          <h2 className="text-xl font-bold mb-4 text-center">Editar Aula</h2>
          <TextField label="Nombre" defaultValue={selectedAula?.nombre} fullWidth margin="normal" />
          <TextField label="Docencia" defaultValue="D4" fullWidth margin="normal" />
          <div className="flex justify-center gap-2 mt-4">
            <Button variant="outlined" onClick={handleCloseEditModal} sx={cancelButtonStyle}>
              Cancelar
            </Button>
            <Button variant="contained" sx={actionButtonStyle}>
              Actualizar
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Modal de Añadir Aula */}
      <Modal open={openAddModal} onClose={handleCloseAddModal}>
        <Box sx={modalStyles}>
          <h2 className="text-xl font-bold mb-4 text-center">Añadir Aula</h2>
          <TextField label="Nombre" placeholder="CC12" fullWidth margin="normal" />
          <TextField label="Docencia" placeholder="D4" fullWidth margin="normal" />
          <div className="flex justify-center gap-2 mt-4">
            <Button variant="outlined" onClick={handleCloseAddModal} sx={cancelButtonStyle}>
              Cancelar
            </Button>
            <Button variant="contained" sx={actionButtonStyle}>
              Agregar
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Modal de Eliminar Aula */}
      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box sx={modalStyles}>
          <h2 className="text-xl font-bold mb-4 text-center">Eliminar Aula</h2>
          <p className="mb-4 text-center">¿Estás seguro que deseas eliminar el aula {selectedAula?.nombre}?</p>
          <div className="flex justify-center gap-2">
            <Button variant="outlined" onClick={handleCloseDeleteModal} sx={cancelButtonStyle}>
              Cancelar
            </Button>
            <Button variant="contained" sx={actionButtonStyle}>
              Eliminar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

// Estilos de los modales
const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const cancelButtonStyle = {
  backgroundColor: "#FFFFFF",
  color: "#000000",
  borderBlockColor: "#000000",
};

const actionButtonStyle = {
  backgroundColor: "#DEFF35",
  color: "#000000",
};