import { useEffect, useState } from "react";
import { getBuildings } from "../../api/buildings.api";
import SearchFilter from "../../components/layout/SearchFilter";
import CardsTable from "../../components/layout/CardsTable";

const BuildingsPage = () => {
    const [buildings, setBuildings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                const response = await getBuildings();
                const sortedBuildings = response.data.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                setBuildings(sortedBuildings);
            } catch (err) {
                console.log(err);
                setError("Error al obtener los edificios");
            } finally {
                setLoading(false);
            }
        };
        fetchBuildings();
    }, []);

    const filteredBuildings = buildings.filter(building =>
        building.name.toLowerCase().includes(search.toLowerCase())
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
    }
    if (error) return <p>{error}</p>;

    return (
        <div>
            <SearchFilter search={search} setSearch={setSearch} />
            <CardsTable items={filteredBuildings} type="buildings" />
        </div>
    );
};

export default BuildingsPage;