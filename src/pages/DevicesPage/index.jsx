import { useEffect, useState } from "react";
import { getDevices, deleteDevice, updateDevice } from "../../api/devices.api";
import SearchFilter from "../../components/ui/SearchFilter";
import DevicesTable from "../../components/ui/tables/DevicesTable";
import EditDeviceDialog from "../../components/ui/dialogs/EditDeviceDialog";
import { Loader } from "../../components/ui/Loader";
import DeleteDialog from "../../components/ui/dialogs/DeleteDialog";
import { useNotification } from "../../context/NotificationContext";

const DevicesPage = () => {
    const [devices, setDevices] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    
    const [selectedDevice, setSelectedDevice] = useState(null);

    const { getError, getSuccess } = useNotification();

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        try {
            setLoading(true);
            const response = await getDevices();
            setDevices(response.data.sort((a, b) => a.name.localeCompare(b.name)));
        } catch (err) {
            console.log(err);
            getError("Error al obtener los dispositivos");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedDevice) return;
        try {
            await deleteDevice(selectedDevice._id);
            setDevices(devices.filter(d => d._id !== selectedDevice._id));
            setOpenDeleteDialog(false);
            setSelectedDevice(null);
            getSuccess("Dispositivo eliminado correctamente");
        } catch (err) {
            console.error("Error al eliminar el dispositivo:", err);
            getError("Error al eliminar el dispositivo");
        }
    };

    const handleSave = async (editedDevice) => {
        try {
            console.log(editedDevice)
            await updateDevice(editedDevice._id, editedDevice);
            setDevices(devices.map(d => d._id === editedDevice._id ? editedDevice : d));
            setOpenEditDialog(false);
            setSelectedDevice(null);
            fetchDevices();
            getSuccess("Dispositivo actualizado correctamente");
        } catch (err) {
            console.error("Error al actualizar el dispositivo:", err);
            getError("Error al actualizar el dispositivo");
        }
    };

    const filteredDevices = devices.filter(device => {
        const lowerSearch = search.toLowerCase();
    
        return (
            device.name.toLowerCase().includes(lowerSearch) || 
            (device.building?.name?.toLowerCase().includes(lowerSearch) || false) || 
            (device.space?.name?.toLowerCase().includes(lowerSearch) || false)
        );
    });

    return (
        <div>
            <SearchFilter search={search} setSearch={setSearch} />
            {loading ? (
                <Loader />
            ) : (
                <>
                    <DevicesTable
                        devices={filteredDevices}
                        onDelete={(device) => {
                            setSelectedDevice(device); 
                            setOpenDeleteDialog(true);
                        } }
                        onSave={(device) => {
                            setSelectedDevice(device); 
                            setOpenEditDialog(true);
                        }}
                    />

                    { openDeleteDialog && (
                        <DeleteDialog
                            onClose={() => {
                                setOpenDeleteDialog(false);
                                setSelectedDevice(null);
                            }}
                            onDelete={handleDelete}
                            itemType="dispositivo"
                            itemName={selectedDevice.name}
                        />
                    )}
            
                    { openEditDialog && (
                        <EditDeviceDialog
                            onClose={() => {
                                setOpenEditDialog(false);
                                setSelectedDevice(null);
                            }}
                            onSave={handleSave}
                            device={selectedDevice}
                        />
                    )}
                </>
                )}
        </div>
    );
};

export default DevicesPage;