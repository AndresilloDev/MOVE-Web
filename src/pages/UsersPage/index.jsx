import React, {useContext, useEffect, useState} from "react";
import { FaSearch, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { getUsers, updateUser , deleteUser , register } from "../../api/users.api";
import { useNotification } from "../../context/NotificationContext.jsx";
import { AuthContext } from "../../context/AuthContext";

const UsersPage = () => {
    const { handleConfirmEmail } = useContext(AuthContext);
    const { getError, getSuccess } = useNotification();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedUser , setSelectedUser] = useState(null);
    const [newUser , setNewUser] = useState({ name: "", lastName: "", user: "", password: "" });

    const usersPerPage = 5;

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await getUsers();
            setUsers(Array.isArray(fetchedUsers.data) ? fetchedUsers.data : []);
        };
        fetchUsers();
    }, []);

    const filterUsers = (users, searchQuery) => {
        return users.filter(user =>
            user.user.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const filteredUsers = filterUsers(users, searchQuery);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
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
        setNewUser ({ name: "", lastName: "", user: "", password: "" });
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleUpdateUser = async (userData) => {
        try {
            await updateUser (userData);
            const updatedUsers = await getUsers();
            setUsers(Array.isArray(updatedUsers.data) ? updatedUsers.data : []);
            closeEditModal();
            getSuccess("Usuario actualizado correctamente");

        } catch {
            getError("Error al actualizar el usuario");

        }
    };

    const handleDeleteUser  = async () => {
        try {
            await deleteUser(selectedUser._id);
            const updatedUsers = await getUsers();
            setUsers(Array.isArray(updatedUsers.data) ? updatedUsers.data : []);
            closeDeleteModal();
            getSuccess("Usuario eliminado correctamente");

        } catch {
            getError("Error al eliminar el usuario");

        }
    };

    const handleAddUser = async (userData) => {
        try {
            await register(userData);
            await handleConfirmEmail(userData.user)
            const updatedUsers = await getUsers();
            setUsers(Array.isArray(updatedUsers.data) ? updatedUsers.data : []);
            closeAddModal();
            getSuccess("Usuario creado correctamente");

        } catch {
            getError("Error al crear el usuario");

        }
    };

    return (
        <div className="relative w-full min-h-screen bg-[radial-gradient(circle, #737373 10%, transparent 10%)]">
            <div className="flex justify-between mt-2 py-2 px-1">
                <div className="flex items-center w-1/2 h-10 border border-gray-300 rounded-xl bg-white">
                    <input
                        type="text"
                        className="flex-1 h-full pl-3 outline-none"
                        placeholder="Buscar usuario..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="bg-action-primary w-10 h-full flex items-center justify-center rounded-r-xl">
                        <FaSearch size={20} color="black" />
                    </button>
                </div>
                <button onClick={openAddModal} className="bg-action-primary h-12 rounded-lg flex items-center justify-center shadow-md px-4">
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
                        <span className="text-xl w-1/5 text-center">{user.user}</span>
                        <span className="text-xl w-1/5 text-center">{user.name}</span>
                        <span className="text-xl w-1/5 text-center">{user.lastName}</span>
                        <div className="w-1/5 flex justify-center">
                            <button className="ml-2 text-green-500" onClick={() => openEditModal(user)}>
                                <FaEdit size={24} />
                            </button>
                            <button className="ml-2 text-red-500" onClick={() => openDeleteModal(user)}>
                                <FaTrash size={24} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex justify-end mt-4 pr-4">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className="mr-2 bg-action-primary px-4 py-2 rounded">
                    Anterior
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-action-primary' : 'bg-gray-200'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-action-primary px-4 py-2 rounded">
                    Siguiente
                </button>
            </div>

            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/10">
                    <div className="bg-white p-6 rounded-2xl shadow-lg w-96 relative">
                        <button onClick={closeEditModal} className="absolute top-2 right-2 text-black">
                            <FaTimes size={20} />
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-center">Editar Administrador</h2>
                        <input
                            type="text"
                            className="w-full border border-black rounded-lg p-2 mb-3"
                            placeholder="Nombre"
                            defaultValue={selectedUser ?.name}
                            onChange={(e) => setSelectedUser ({ ...selectedUser , name: e.target.value })}
                        />
                        <input
                            type="text"
                            className="w-full border border-black rounded-lg p-2 mb-3"
                            placeholder="Apellidos"
                            defaultValue={selectedUser ?.lastName}
                            onChange={(e) => setSelectedUser ({ ...selectedUser , lastName: e.target.value })}
                        />
                        <div className="flex justify-center space-x-4 mt-4">
                            <button onClick={closeEditModal} className="border border-black px-4 py-2 rounded-lg">
                                Cancelar
                            </button>
                            <button onClick={() => handleUpdateUser (selectedUser)} className="border border-black bg-action-primary px-4 py-2 rounded-lg">
                                Actualizar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/10">
                    <div className="bg-white p-6 rounded-2xl shadow-lg w-96 relative">
                        <button onClick={closeDeleteModal} className="absolute top-2 right-2 text-black">
                            <FaTimes size={20} />
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-center">Eliminar Administrador</h2>
                        <p className="text-center">¿Estás seguro que deseas eliminar al administrador?</p>
                        <div className="flex justify-center space-x-4 mt-4">
                            <button onClick={closeDeleteModal} className="border border-black px-4 py-2 rounded-lg">
                                Cancelar
                            </button>
                            <button onClick={handleDeleteUser} className="border border-black bg-action-primary text-black px-4 py-2 rounded-lg">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isAddModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/10">
                    <div className="bg-white p-6 rounded-2xl shadow-lg w-96 relative">
                        <button onClick={closeAddModal} className="absolute top-2 right-2 text-black">
                            <FaTimes size={20} />
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-center">Agregar Administrador</h2>
                        <input
                            type="text"
                            className="w-full border border-black rounded-lg p-2 mb-3"
                            placeholder="Nombre"
                            value={newUser.name}
                            onChange={(e) => setNewUser ({ ...newUser , name: e.target.value })}
                        />
                        <input
                            type="text"
                            className="w-full border border-black rounded-lg p-2 mb-3"
                            placeholder="Apellidos"
                            value={newUser.lastName}
                            onChange={(e) => setNewUser ({ ...newUser , lastName: e.target.value })}
                        />
                        <input
                            type="email"
                            className="w-full border border-black rounded-lg p-2 mb-3"
                            placeholder="Correo"
                            value={newUser.user}
                            onChange={(e) => setNewUser ({ ...newUser , user: e.target.value })}
                        />
                        <input
                            type="password"
                            className="w-full border border-black rounded-lg p-2 mb-3"
                            placeholder="Contraseña"
                            value={newUser.password}
                            onChange={(e) => setNewUser ({ ...newUser , password: e.target.value })}
                        />
                        <div className="flex justify-center space-x-4 mt-4">
                            <button onClick={closeAddModal} className="border border-black px-4 py-2 rounded-lg">
                                Cancelar
                            </button>
                            <button onClick={() => handleAddUser (newUser)} className="border border-black bg-action-primary px-4 py-2 rounded-lg">
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