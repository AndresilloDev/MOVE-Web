import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Box, TextField, Button } from "@mui/material";

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

  const filteredAulas = aulas.filter((aula) =>
    aula.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenEditModal = (aula) => {
    setSelectedAula(aula);
    setOpenEditModal(true);
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleOpenDeleteModal = (aula) => {
    setSelectedAula(aula);
    setOpenDeleteModal(true);
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
    setOpenAddModal(false);
    setOpenDeleteModal(false);
    setSelectedAula(null);
  };

  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      <div className="relative z-10">
        <div className="flex justify-start p-4 w-full">
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
        </div>

        <div className="relative p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <DeleteIcon
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => handleOpenDeleteModal(aula)}
                  />
                  <EditIcon
                    className="cursor-pointer hover:text-blue-500"
                    onClick={() => handleOpenEditModal(aula)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex">
            <button
              className="flex flex-col justify-center items-center w-full md:w-[calc(50%-0.5rem)] p-4 bg-white bg-opacity-[0.85] shadow-md rounded-lg border border-gray-200 hover:bg-gray-100 hover:bg-opacity-[0.85]"
              onClick={handleOpenAddModal}
            >
              <AddIcon className="text-gray-600" />
              <span className="text-lg font-semibold">Añadir nueva aula</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Editar Aula */}
      <Modal open={openEditModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 5,
          }}
        >
          <h2 className="text-xl font-bold mb-4 text-center">Editar Aula</h2>
          <TextField
            label="Nombre"
            defaultValue={selectedAula?.nombre}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Docencia"
            defaultValue="D4" 
            fullWidth
            margin="normal"
          />
          <div className="flex justify-center gap-2 mt-4">
            <Button variant="outlined" onClick={handleCloseModal} style={{ backgroundColor: "#FFFFFF", color: "#000000", borderBlockColor: "#000000"}}>
              Cancelar
            </Button>
            <Button variant="contained" style={{ backgroundColor: "#DEFF35", color: "#000000" }}>
              Actualizar
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Modal de Añadir Aula */}
      <Modal open={openAddModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 5,
          }}
        >
          <h2 className="text-xl font-bold mb-4 text-center">Añadir Aula</h2>
          <TextField
            label="Nombre"
            placeholder="CC12"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Docencia"
            placeholder="D4"
            fullWidth
            margin="normal"
          />
          <div className="flex justify-center gap-2 mt-4">
            <Button variant="outlined" onClick={handleCloseModal} style={{ backgroundColor: "#FFFFFF", color: "#000000", borderBlockColor: "#000000"}}>
              Cancelar
            </Button>
            <Button variant="contained" style={{ backgroundColor: "#DEFF35", color: "#000000" }}>
              Agregar
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Modal de Eliminar Aula */}
      <Modal open={openDeleteModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 5,
          }}
        >
          <h2 className="text-xl font-bold mb-4 text-center">Eliminar Aula</h2>
          <p className="mb-4 text-center">
            ¿Estás seguro que deseas eliminar el aula {selectedAula?.nombre}?
          </p>
          <div className="flex justify-center gap-2">
            <Button variant="outlined" onClick={handleCloseModal} style={{ backgroundColor: "#FFFFFF", color: "#000000", borderBlockColor: "#000000"}}>
              Cancelar
            </Button>
            <Button variant="contained" style={{ backgroundColor: "#DEFF35", color: "#000000" }}>
              Eliminar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}