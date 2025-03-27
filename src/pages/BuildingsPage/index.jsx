import { useEffect, useState } from "react";
import { getBuildings, deleteBuilding, updateBuilding } from "../../api/buildings.api";
import SearchFilter from "../../components/ui/SearchFilter";
import CardsTable from "../../components/ui/tables/CardsTable";
import DeleteDialog from "../../components/ui/dialogs/DeleteDialog";
import EditDialog from "../../components/ui/dialogs/EditDialog";
import { useNavigate } from "react-router-dom";

const BuildingsPage = () => {
    const [buildings, setBuildings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, building: null });
    const [editDialog, setEditDialog] = useState({ isOpen: false, building: null });

    const navigate = useNavigate();

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
            setError("Error al obtener los edificios");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteDialog.building) return;
        try {
            await deleteBuilding(deleteDialog.building._id);
            setBuildings(buildings.filter(b => b._id !== deleteDialog.building._id));
            setDeleteDialog({ isOpen: false, building: null });
        } catch (err) {
            console.error("Error al eliminar el edificio:", err);
        }
    };

    const handleSave = async (editedBuilding) => {
        try {
            const response = await updateBuilding(editedBuilding._id, editedBuilding);
            if (response.data) {
                setBuildings(buildings.map(b => b._id === editedBuilding._id ? response.data : b));
            }
            setEditDialog({ isOpen: false, building: null });
            fetchBuildings();
        } catch (err) {
            console.error("Error al actualizar el edificio:", err);
        }
    };
    
    const handleBuildingClick = (buildingId) => {
        localStorage.setItem("selectedBuildingId", buildingId);
        navigate(`/classrooms`);
    };

    const filteredBuildings = buildings.filter(building =>
        building.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div>
                <SearchFilter />
                <div style={{ position: "absolute", left: "50%", top: "50%" }}>
                    <div className="loader"></div>
                </div>
            </div>
        );
    }

    if (error) return <p>{error}</p>;

    return (
        <div>
            <SearchFilter search={search} setSearch={setSearch} />
            <CardsTable
                items={filteredBuildings}
                type="buildings"
                onDelete={(building) => setDeleteDialog({ isOpen: true, building })}
                onSave={(building) => setEditDialog({ isOpen: true, building })}
            />

            <DeleteDialog
                isOpen={deleteDialog.isOpen}
                onClose={() => setDeleteDialog({ isOpen: false, building: null })}
                onDelete={handleDelete}
                itemType="buildings"
                itemName={deleteDialog.building?.name}
            />

            <EditDialog
                isOpen={editDialog.isOpen}
                onClose={() => setEditDialog({ isOpen: false, building: null })}
                onSave={handleSave}
                itemType="buildings"
                item={editDialog.building}
            />
        </div>
    );
};

export default BuildingsPage;