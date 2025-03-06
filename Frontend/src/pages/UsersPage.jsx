import React, { useState } from "react";
import { FaHome, FaChevronRight, FaSearch, FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

const UsersPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedUser , setSelectedUser ] = useState(null);

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

    const indexOfLastUser  = currentPage * usersPerPage;
    const indexOfFirstUser  = indexOfLastUser  - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser , indexOfLastUser );
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const openEditModal = (user) => {
        setSelectedUser (user);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedUser (null);
    };

    const openDeleteModal = (user) => {
        setSelectedUser (user);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedUser (null);
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    return (
        <div className="relative min-h-screen bg-cover bg-center" style={{backgroundImage: "url('/bg.png')"}}>
            <div className="m-4 ml-6 flex items-center">
                <FaHome className="mr-2" size={25}/>
                <FaChevronRight className="mr-2" size={25}/>
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
                    <button className="bg-[#DEFF35] w-10 h-full flex items-center justify-center rounded-r-xl">
                        <FaSearch size={20} color="black"/>
                    </button>
                </div>
                <button onClick={openAddModal}
                        className="bg-[#DEFF35] h-12 rounded-lg flex items-center justify-center shadow-md px-4">
                    <span className="text-lg">Agregar administrador</span>
                </button>
            </div>

            <div className="flex justify-between px-4 mb-2 mt-2">
                <span className="font-bold text-lg w-1/5 text-center">Usuario</span>
                <span className="font-bold text-lg w-1/5 text-center">Nombre</span>
                <span className="font-bold text-lg w-1/5 text-center">Apellido</span>
                <span className="font-bold text-lg w-1/5 text-center">Acciones</span>
            </div>

            <ul className="mt-4">
                {currentUsers.map((user) => (
                    <li key={user.id} className="p-2 border-b border-gray-300 flex justify-between items-center">
                        <span className="text-xl w-1/5 text-center">{user.username}</span>
                        <span className="text-xl w-1/5 text-center">{user.name}</span>
                        <span className="text-xl w-1/5 text-center">{user.surname}</span>
                        <div className="w-1/5 flex justify-center">
                            <button className="ml-2 text-green-500" onClick={() => openEditModal(user)}>
                                <FaEdit size={24}/>
                            </button>
                            <button className="ml-2 text-red-500" onClick={() => openDeleteModal(user)}>
                                <FaTrash size={24}/>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex justify-end mt-4 pr-4">
                <button onClick={handlePrevPage} disabled={currentPage === 1}
                        className="mr-2 bg-[#DEFF35] px-4 py-2 rounded">
                    Anterior
                </button>
                {Array.from({length: totalPages}, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-[#DEFF35]' : 'bg-gray-200'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={handleNextPage} disabled={currentPage === totalPages}
                        className="bg-[#DEFF35] px-4 py-2 rounded">
                    Siguiente
                </button>
            </div>

            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/10">
                    <div className="bg-white p-6 rounded-2xl shadow-lg w-96 relative border border-black">
                        <button onClick={closeEditModal} className="absolute top-2 right-2 text-black">
                            <FaTimes size={20}/>
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-center">Editar Administrador</h2>
                        <input
                            type="text"
                            className="w-full border border-black rounded-lg p-2 mb-3"
                            placeholder="Nombre"
                            defaultValue={selectedUser?.name}
                        />
                        <input
                            type="text"
                            className="w-full border border-black rounded-lg p-2 mb-3"
                            placeholder="Apellidos"
                            defaultValue={selectedUser?.surname}
                        />
                        <input
                            type="email"
                            className="w-full border border-black rounded-lg p-2 mb-3"
                            placeholder="Correo"
                            defaultValue={selectedUser?.username}
                        />
                        <div className="flex justify-center space-x-4 mt-4">
                            <button onClick={closeEditModal} className="border border-black px-4 py-2 rounded-lg">
                                Cancelar
                            </button>
                            <button className="border border-black bg-[#DEFF35] px-4 py-2 rounded-lg">
                                Actualizar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/10">
                    <div className="bg-white p-6 rounded-2xl shadow-lg w-96 relative border border-black">
                        <button onClick={closeDeleteModal} className="absolute top-2 right-2 text-black">
                            <FaTimes size={20}/>
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-center">Eliminar Administrador</h2>
                        <p className="text-center">¿Estás seguro que deseas eliminar al administrador?</p>
                        <div className="flex justify-center space-x-4 mt-4">
                            <button onClick={closeDeleteModal} className="border border-black px-4 py-2 rounded-lg">
                                Cancelar
                            </button>
                            <button className="border border-black bg-[#DEFF35] text-black px-4 py-2 rounded-lg">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isAddModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/10">
                    <div className="bg-white p-6 rounded-2xl shadow-lg w-96 relative border border-black">
                        <button onClick={closeAddModal} className="absolute top-2 right-2 text-black">
                            <FaTimes size={20}/>
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-center">Agregar Administrador</h2>
                        <input
                            type="text"
                            className="w-full border border-black rounded-lg p-2 mb-3"
                            placeholder="Nombre"
                        />
                        <input
                            type="text"
                            className="w-full border border-black rounded-lg p-2 mb-3"
                            placeholder="Apellidos"
                        />
                        <input
                            type="email"
                            className="w-full border border-black rounded-lg p-2 mb-3"
                            placeholder="Correo"
                        />
                        <input
                            type="password"
                            className="w-full border border-black rounded-lg p-2 mb-3"
                            placeholder="Contraseña"
                        />
                        <input
                            type="password"
                            className="w-full border border-black rounded-lg p-2 mb-3"
                            placeholder="Confirmar Contraseña"
                        />
                        <div className="flex justify-center space-x-4 mt-4">
                            <button onClick={closeAddModal} className="border border-black px-4 py-2 rounded-lg">
                                Cancelar
                            </button>
                            <button className="border border-black bg-[#DEFF35] px-4 py-2 rounded-lg">
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage;