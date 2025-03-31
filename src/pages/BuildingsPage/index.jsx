import { useEffect, useState } from "react";
import { getBuildings, deleteBuilding, updateBuilding } from "../../api/buildings.api";
import SearchFilter from "../../components/ui/SearchFilter";
import DeleteDialog from "../../components/ui/dialogs/DeleteDialog";
import EditBuildingDialog from "../../components/ui/dialogs/EditBuildingDialog.jsx";
import { useNotification } from "../../context/NotificationContext.jsx";
import BuildingsTable from "../../components/ui/tables/BuildingsTable.jsx";
import { Loader } from "../../components/ui/Loader.jsx";

const BuildingsPage = () => {
    const [buildings, setBuildings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    
    const [openDeleteDialog, setOpenDeleteDilog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedBuilding, setSelectedBuilding] = useState(null);

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
            console.log(err);
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

    const handleSave = async (editedBuilding) => {
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

    const filteredBuildings = buildings.filter(building =>
        building.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <SearchFilter search={search} setSearch={setSearch} />
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
                            onSave={handleSave}
                            building={selectedBuilding}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default BuildingsPage;
