import { useEffect, useState } from "react";
import { getDevices, deleteDevice } from "../../api/devices.api";
import SearchFilter from "../../components/layout/SearchFilter";
import CardsTable from "../../components/layout/CardsTable";
import DeleteDialog from "../../components/layout/DeleteDialog";

const DevicesPage = () => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, device: null });

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
        if (!deleteDialog.device) return;
        try {
            await deleteDevice(deleteDialog.device._id);
            setDevices(devices.filter(d => d._id !== deleteDialog.device._id));
            setDeleteDialog({ isOpen: false, device: null });
        } catch (err) {
            console.error("Error al eliminar el dispositivo:", err);
        }
    };

    const filteredDevices = devices.filter(device =>
        device.name.toLowerCase().includes(search.toLowerCase())
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
                items={filteredDevices} 
                type="devices" 
                onDelete={(device) => setDeleteDialog({ isOpen: true, device })} 
            />
            
            <DeleteDialog 
                isOpen={deleteDialog.isOpen} 
                onClose={() => setDeleteDialog({ isOpen: false, device: null })} 
                onDelete={handleDelete} 
                itemType="Dispositivo" 
                itemName={deleteDialog.device?.name} 
            />
        </div>
    );
};

export default DevicesPage;