import { useState, useEffect } from "react";
import { getSpaces, deleteSpace, updateSpace } from "../../api/spaces.api";
import { getBuildings } from "../../api/buildings.api";
import SearchFilter from "../../components/ui/SearchFilter";
import CardsTable from "../../components/ui/tables/CardsTable";
import DeleteDialog from "../../components/ui/dialogs/DeleteDialog";
import EditDialog from "../../components/ui/dialogs/EditDialog";
import { useNotification } from "../../context/NotificationContext.jsx"; // Importar correctamente el contexto

const ClassroomsPage = ({ buildingId }) => {
    const { getError, getSuccess } = useNotification(); // Usar las funciones correctas
    const [spaces, setSpaces] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, space: null });
    const [editDialog, setEditDialog] = useState({ isOpen: false, space: null });

    useEffect(() => {
        fetchSpaces();
        fetchBuildings();
    }, [buildingId]);

    const fetchSpaces = async () => {
        try {
            setLoading(true);
            const response = await getSpaces(buildingId);
            setSpaces(response.data.sort((a, b) => a.name.localeCompare(b.name)));
        } catch (err) {
            console.log(err);
            getError("Error al obtener los espacios"); // Usar getError en lugar de showNotification
        } finally {
            setLoading(false);
        }
    };

    const fetchBuildings = async () => {
        try {
            const response = await getBuildings();
            setBuildings(response.data);
        } catch (err) {
            console.error("Error al obtener los edificios:", err);
            getError("Error al obtener los edificios"); // Usar getError aquí también
        }
    };

    const handleDelete = async () => {
        if (!deleteDialog.space) return;
        try {
            await deleteSpace(buildingId, deleteDialog.space._id);
            setSpaces(spaces.filter(s => s._id !== deleteDialog.space._id));
            setDeleteDialog({ isOpen: false, space: null });
            getSuccess("Espacio eliminado correctamente"); // Mensaje de éxito
        } catch (err) {
            console.error("Error al eliminar el espacio:", err);
            getError("Error al eliminar el espacio"); // Mensaje de error
        }
    };

    const handleSave = async (editedSpace) => {
        try {
            await updateSpace(buildingId, editedSpace._id, editedSpace);
            setSpaces(spaces.map(s => s._id === editedSpace._id ? editedSpace : s));
            setEditDialog({ isOpen: false, space: null });
            fetchSpaces();
            getSuccess("Espacio actualizado correctamente"); // Mensaje de éxito
        } catch (err) {
            console.error("Error al actualizar el espacio:", err);
            getError("Error al actualizar el espacio"); // Mensaje de error
        }
    };

    const filteredSpaces = spaces.filter(space =>
        space.name.toLowerCase().includes(search.toLowerCase())
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
                items={filteredSpaces}
                type="spaces"
                onDelete={(space) => setDeleteDialog({ isOpen: true, space })}
                onSave={(space) => setEditDialog({ isOpen: true, space })}
            />

            <DeleteDialog
                isOpen={deleteDialog.isOpen}
                onClose={() => setDeleteDialog({ isOpen: false, space: null })}
                onDelete={handleDelete}
                itemType="spaces"
                itemName={deleteDialog.space?.name}
            />

            <EditDialog
                isOpen={editDialog.isOpen}
                onClose={() => setEditDialog({ isOpen: false, space: null })}
                onSave={handleSave}
                itemType="spaces"
                item={editDialog.space}
                buildings={buildings}
            />
        </div>
    );
};

export default ClassroomsPage;
