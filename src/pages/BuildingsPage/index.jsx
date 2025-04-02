import { useEffect, useState } from "react";
import SearchFilter from "../../components/ui/SearchFilter";
import DeleteDialog from "../../components/ui/dialogs/DeleteDialog";
import EditBuildingDialog from "../../components/ui/dialogs/EditBuildingDialog.jsx";
import { useNotification } from "../../context/NotificationContext.jsx";
import BuildingsTable from "../../components/ui/tables/BuildingsTable.jsx";
import { Loader } from "../../components/ui/Loader.jsx";
import AddBuildingDialog from "../../components/ui/dialogs/AddBuildingDialog.jsx";
import { getBuildings, deleteBuilding, updateBuilding, createBuilding } from "../../api/buildings.api";

const BuildingsPage = () => {
    const [buildings, setBuildings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    
    const [openDeleteDialog, setOpenDeleteDilog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const [openAddBuilding, setOpenAddBuilding] = useState(false);

    const { getError, getSuccess } = useNotification(); 

    useEffect(() => {
        fetchBuildings();
    }, []);

    const fetchBuildings = async () => {
        try {
            setLoading(true);
            const response = await getBuildings();
            setBuildings(response.data.sort((a, b) => a.name.localeCompare(b.name)));
        } catch (err) {
            console.error(err);
            getError("Error al obtener los edificios"); 
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedBuilding) return;
        try {
            await deleteBuilding(selectedBuilding._id);
            setBuildings(buildings.filter(b => b._id !== selectedBuilding._id));
            setOpenDeleteDilog(false);
            setSelectedBuilding(null);
            getSuccess("Edificio eliminado correctamente");
        } catch (err) {
            console.error("Error al eliminar el edificio:", err);
            getError("Error al eliminar el edificio"); 
        }
    };

    const handleEdit = async (editedBuilding) => {
        try {
            const response = await updateBuilding(editedBuilding._id, editedBuilding);
            if (response.data) {
                setBuildings(buildings.map(b => b._id === editedBuilding._id ? response.data : b));
            }
            setOpenEditDialog(false);
            setSelectedBuilding(null);
            fetchBuildings();
            getSuccess("Edificio actualizado correctamente"); 
        } catch (err) {
            console.error("Error al actualizar el edificio:", err);
            getError("Error al actualizar el edificio"); 
        }
    };

    const handleAdd = async (newBuilding) => {
        try {
            await createBuilding(newBuilding);
            setOpenAddBuilding(false);
            setSelectedBuilding(null);
            fetchBuildings();
            getSuccess("Edificio creado correctamente");
        } catch (err) {
            console.error("Error al crear el edificio:", err);
            getError("Error al crear el edificio");
        }
    }

    const filteredBuildings = buildings.filter(building =>
        building.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <SearchFilter search={search} setSearch={setSearch} setOpenAddModal={setOpenAddBuilding} />
            {loading ? (
                <Loader />
            ) : (
                <>
                    <BuildingsTable
                        buildings={filteredBuildings}
                        onDelete={(building) => {
                            setOpenDeleteDilog(true);
                            setSelectedBuilding(building);
                        }}
                        onSave={(building) => {
                            setOpenEditDialog(true);
                            setSelectedBuilding(building);
                        }}
                    />
    
                    { openDeleteDialog && (
                        <DeleteDialog
                            onClose={() => {
                                setOpenDeleteDilog(false);
                                setSelectedBuilding(null);
                            }}
                            onDelete={handleDelete}
                            itemType="edificio"
                            itemName={selectedBuilding?.name}
                        />
                    )}
    
                    { openEditDialog && (
                        <EditBuildingDialog
                            onClose={() => {
                                setOpenEditDialog(false);
                                setSelectedBuilding(null);
                            }}
                            onSave={handleEdit}
                            building={selectedBuilding}
                        />
                    )}

                    {openAddBuilding && (
                        <AddBuildingDialog
                            onClose={() => {
                                setOpenAddBuilding(false);
                                setSelectedBuilding(null);
                            }}
                            onSave={handleAdd}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default BuildingsPage;
