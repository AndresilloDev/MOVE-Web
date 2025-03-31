import { useEffect, useState } from "react";
import { getDevices, deleteDevice, updateDevice } from "../../api/devices.api";
import SearchFilter from "../../components/ui/SearchFilter";
import DevicesTable from "../../components/ui/tables/DevicesTable";
import EditDeviceDialog from "../../components/ui/dialogs/EditDeviceDialog";
import { Loader } from "../../components/ui/Loader";
import DeleteDeviceDialog from "../../components/ui/dialogs/DeleteDeviceDialog";

const DevicesPage = () => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    
    const [selectedDevice, setSelectedDevice] = useState(null);

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
            setError("Error al obtener los dispositivos");
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
        } catch (err) {
            console.error("Error al eliminar el dispositivo:", err);
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
        } catch (err) {
            console.error("Error al actualizar el dispositivo:", err);
        }
    };

    const filteredDevices = devices.filter(device =>
        device.name.toLowerCase().includes(search.toLowerCase())
    );

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
                        <DeleteDeviceDialog
                            onClose={() => {
                                setOpenDeleteDialog(false);
                                setSelectedDevice(null);
                            }}
                            onDelete={handleDelete}
                            deviceName={selectedDevice.name}
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