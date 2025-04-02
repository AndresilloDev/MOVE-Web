import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useLocation } from "react-router-dom";

const SearchFilter = ({ search, setSearch, setOpenAddModal }) => {
    const location = useLocation();
    const isDevicesPage = location.pathname.includes("/devices");
    const isNotificationsPage = location.pathname.startsWith("/notifications");

    return (
        <div className="flex justify-start p-4 w-full mt-2">
            <div className="flex items-center bg-white border border-gray-300 rounded-full overflow-hidden shadow-md w-full lg:w-3/4">
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="outline-none px-4 py-2 bg-transparent w-full"
                    value={search || ""}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="bg-action-primary p-2 px-4 border-l border-gray-300">
                    <SearchIcon className="text-black" />
                </button>
            </div>
            {(!isDevicesPage && !isNotificationsPage) && (
                <button
                    className="bg-action-primary text-black rounded-full p-2 ml-4 flex items-center"
                    onClick={() => setOpenAddModal(true)}
                > 
                    <AddIcon className="text-black" />
                    <span className="ml-2">Agregar</span>
                </button>
            )}
        </div>
    )
}

export default SearchFilter;