import { useState, useEffect } from "react";
import { getSpaces, deleteSpace, updateSpace } from "../../api/spaces.api";
import { getBuildings } from "../../api/buildings.api";
import SearchFilter from "../../components/layout/SearchFilter";
import CardsTable from "../../components/layout/CardsTable";
import DeleteDialog from "../../components/layout/DeleteDialog";
import EditDialog from "../../components/layout/EditDialog";

const ClassroomsPage = ({ buildingId }) => {
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
            setError("Error al obtener los espacios");
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
        }
    };

    const handleDelete = async () => {
        if (!deleteDialog.space) return;
        try {
            await deleteSpace(buildingId, deleteDialog.space._id);
            setSpaces(spaces.filter(s => s._id !== deleteDialog.space._id));
            setDeleteDialog({ isOpen: false, space: null });
        } catch (err) {
            console.error("Error al eliminar el espacio:", err);
        }
    };

    const handleSave = async (editedSpace) => {
        try {
            await updateSpace(buildingId, editedSpace._id, editedSpace);
            setSpaces(spaces.map(s => s._id === editedSpace._id ? editedSpace : s));
            setEditDialog({ isOpen: false, space: null });
            fetchSpaces();
        } catch (err) {
            console.error("Error al actualizar el espacio:", err);
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