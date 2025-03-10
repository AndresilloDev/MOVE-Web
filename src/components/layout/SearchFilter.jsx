import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const SearchFilter = ({ search, setSearch, setOpenAddModal }) => {
    return (
        <div className="flex justify-start p-4 w-full mt-2">
                <div className="flex items-center bg-white border border-gray-300 rounded-full overflow-hidden shadow-md w-1/2">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="outline-none px-4 py-2 bg-transparent w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="bg-action-primary p-2 px-4 border-l border-gray-300">
                        <SearchIcon className="text-black" />
                    </button>
                </div> 
                <button
                    className="flex items-center bg-action-primary text-black px-4 py-2 rounded-full shadow-md ml-4 hover:bg-action-hover transition duration-300"
                    onClick={() => setOpenAddModal(true)}
                >
                    <AddIcon className="mr-2" />
                    Agregar
                </button>
            </div>
    )
}

export default SearchFilter;