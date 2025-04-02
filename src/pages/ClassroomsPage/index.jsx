import { useState, useEffect } from "react";
import { getSpaces, deleteSpace, updateSpace, createSpace } from "../../api/spaces.api";
import SearchFilter from "../../components/ui/SearchFilter";
import DeleteDialog from "../../components/ui/dialogs/DeleteDialog";
import EditSpaceDialog from "../../components/ui/dialogs/EditSpaceDialog";
import { useNotification } from "../../context/NotificationContext.jsx";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/ui/Loader.jsx";
import SpacesTable from "../../components/ui/tables/SpacesTable.jsx";
import AddSpaceDialog from "../../components/ui/dialogs/AddSpaceDialog.jsx";

const ClassroomsPage = () => {
    const { getError, getSuccess } = useNotification();

    const { id: buildingId } = useParams();
    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [search, setSearch] = useState("");
    
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openAddSpaceDialog, setOpenAddSpaceDialog] = useState(false);

    const [selectedSpace, setSelectedSpace] = useState(null);
    
    useEffect(() => {
        fetchSpaces();
    }, [buildingId]);

    const fetchSpaces = async () => {
        try {
            setLoading(true);
            const response = await getSpaces(buildingId);
            setSpaces(response.data.sort((a, b) => a.name.localeCompare(b.name)));
        } catch (err) {
            console.log(err);
            getError("Error al obtener los espacios");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedSpace) return;
        try {
            await deleteSpace(buildingId, selectedSpace._id);
            setSpaces(spaces.filter(s => s._id !== selectedSpace._id));
            setOpenDeleteDialog(false);
            setSelectedSpace(null);
            getSuccess("Espacio eliminado correctamente");
        } catch (err) {
            console.error("Error al eliminar el espacio:", err);
            getError("Error al eliminar el espacio");
        }
    };

    const handleEdit = async (editedSpace) => {
        try {
            await updateSpace(buildingId, editedSpace._id, editedSpace);
            setSpaces(spaces.map(s => s._id === editedSpace._id ? editedSpace : s));
            setOpenEditDialog(false);
            setSelectedSpace(null);
            fetchSpaces();
            getSuccess("Espacio actualizado correctamente");
        } catch (err) {
            console.error("Error al actualizar el espacio:", err);
            getError("Error al actualizar el espacio");
        }
    };

    const handleAdd = async (space) => {
        try {
            await createSpace(buildingId, space);
            setOpenAddSpaceDialog(false);
            getSuccess("Espacio creado correctamente");
            fetchSpaces();
        } catch (err) {
            console.error("Error al crear el espacio:", err);
            getError("Error al crear el espacio");
        }
    }


    return (
        <div>
            <SearchFilter search={search} setSearch={setSearch} setOpenAddModal={setOpenAddSpaceDialog} />
            { loading ? (
                <Loader />
            ) : (
                <>
                    <SpacesTable
                        spaces={spaces}
                        onDelete={(space) => {
                            setOpenDeleteDialog(true);
                            setSelectedSpace(space);
                        }}
                        onSave={(space) => {
                            setOpenEditDialog(true);
                            setSelectedSpace(space);
                        }}
                    />
    
                    {openDeleteDialog && (
                        <DeleteDialog
                            onClose={() => {
                                setOpenDeleteDialog(false);
                                setSelectedSpace(null);
                            }}
                            onDelete={handleDelete}
                            itemType="spaces"
                            itemName={selectedSpace?.name}
                        />
                    )}
    
                    {openEditDialog && (
                        <EditSpaceDialog
                            onClose={() => {
                                setOpenEditDialog(false);
                                setSelectedSpace(null);
                            }}
                            onSave={handleEdit}
                            space={selectedSpace}
                        />
                    )}

                    {openAddSpaceDialog && (
                        <AddSpaceDialog
                            onClose={() => {
                                setOpenAddSpaceDialog(false);
                                setSelectedSpace(null);
                            }}
                            onSave={handleAdd}
                        />
                    )}
                </>
            ) }
        </div>
    );
};

export default ClassroomsPage;
