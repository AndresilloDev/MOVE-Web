import { useEffect, useState } from "react";
import { getDevices } from "../../api/devices.api";
import SearchFilter from "../../components/layout/SearchFilter";
import CardsTable from "../../components/layout/CardsTable";

const DevicesPage = () => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await getDevices();
                const sortedDevices = response.data.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                setDevices(sortedDevices);
            } catch (err) {
                console.log(err);
                setError("Error al obtener los dispositivos");
            } finally {
                setLoading(false);
            }
        };
        fetchDevices();
    }, []);

    const filteredDevices = devices.filter(device =>
        device.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div>
                <SearchFilter></SearchFilter>
                <div style={{position: "absolute", left:"50%", top: "50%"}}>
                    <div className="loader"></div>
                </div>
            </div>
        );
    }    if (error) return <p>{error}</p>;

    return (
        <div>
            <SearchFilter search={search} setSearch={setSearch} />
            <CardsTable items={filteredDevices} type="devices" />
        </div>
    );
};

export default DevicesPage;
