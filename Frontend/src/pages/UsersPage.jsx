import React, { useState } from "react";
import { FaHome, FaChevronRight, FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const UsersPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    const users = [
        { id: 129340, username: "20233tn097@utez", name: "Sebastian", surname: "Jimenez" },
        { id: 129341, username: "20233tn098@utez", name: "Carlos", surname: "Hernandez" },
        { id: 129342, username: "20233tn099@utez", name: "Maria", surname: "Lopez" },
        { id: 129343, username: "20233tn098@utez", name: "Ronal", surname: "Dinho" },
        { id: 129344, username: "20233tn098@utez", name: "Cesar", surname: "Rin" },
        { id: 129345, username: "20233tn098@utez", name: "Erikiti", surname: "Rijillo" },
    ];

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastUser       = currentPage * usersPerPage;
    const indexOfFirstUser       = indexOfLastUser       - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser      , indexOfLastUser      );

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/bg.png')" }}>
            <div className="m-4 ml-6 flex items-center">
                <FaHome className="mr-2" size={25} />
                <FaChevronRight className="mr-2" size={25} />
                <span className="text-xl">Administradores</span>
            </div>

            <div className="flex justify-between mt-2 py-2 px-1">
                <div className="flex items-center w-1/2 h-10 border border-black rounded-xl bg-white">
                    <input
                        type="text"
                        className="flex-1 h-full pl-3 outline-none"
                        placeholder="Buscar usuario..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="bg-yellow-300 w-10 h-full flex items-center justify-center rounded-r-xl">
                        <FaSearch size={20} color="black" />
                    </button>
                </div>
                <button className="bg-yellow-300 w-12 h-12 rounded-full flex items-center justify-center shadow-md">
                    <FaPlus size={30} color="#000" />
                </button>
            </div>

            <div className="flex justify-start px-4 mb-2 mt-2">
                <span className="font-bold text-lg w-1/5 text-left">ID</span>
                <span className="font-bold text-lg w-1/5 text-left">Usuario</span>
                <span className="font-bold text-lg w-1/5 text-left">Nombre</span>
                <span className="font-bold text-lg w-1/5 text-left">Apellido</span>
                <span className="font-bold text-lg w-1/5 text-left">Acciones</span>
            </div>

            <ul className="mt-4">
                {currentUsers.map((user) => (
                    <li key={user.id} className="p-2 border-b border-gray-300 flex justify-between items-center">
                        <span className="text-xl w-1/5 text-left">{user.id}</span>
                        <span className="text-xl w-1/5 text-left">{user.username}</span>
                        <span className="text-xl w-1/5 text-left">{user.name}</span>
                        <span className="text-xl w-1/5 text-left">{user.surname}</span>
                        <div className="w-1/5 flex justify-start"> {/* Cambiado a justify-start */}
                            <button className="ml-2 text-green-500">
                                <FaEdit size={24} />
                            </button>
                            <button className="ml-2 text-red-500">
                                <FaTrash size={24} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex justify-end mt-4 pr-4">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className="mr-2 bg-yellow-300 px-4 py-2 rounded">
                    Anterior
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-yellow-300' : 'bg-gray-200'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-yellow-300 px-4 py-2 rounded">
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default UsersPage;