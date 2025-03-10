import { useEffect, useState } from "react";
import { getBuildings } from "../../api/buildings.api";
import BuildingTable from "../../components/layout/BuildingTable";

import SearchFilter from "../../components/layout/SearchFilter";

const BuildingsPage = () => {
    const [buildings, setBuildings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [search, setSearch] = useState("");

    useEffect (() => {
        const fetchBuildings = async () => {
            try {
                const response = await getBuildings();

                const sortedBuildings = response.data.sort((a, b) => 
                    a.name.localeCompare(b.name)
                );

                setBuildings(sortedBuildings);
            } catch(err) {
                console.log(err);
                setError("Error al obtener los edificios");
            } finally {
                setLoading(false);
            }
        }
        fetchBuildings();
    }, []);

    if (loading) return <p>Cargando edificios...</p>;
    if (error) return <p>{error}</p>;
  
    return (        
        <div>
            <SearchFilter search = {search} setSearch = {setSearch} setOpenAddModal={setOpenAddModal}/>
            <BuildingTable buildings={buildings} />
        </div>
    );
}

export default BuildingsPage