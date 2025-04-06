import React, { useContext, useEffect, useState } from "react";
import { getUsers, updateUser, deleteUser, register } from "../../api/users.api";
import { useNotification } from "../../context/NotificationContext.jsx";
import { AuthContext } from "../../context/AuthContext";
import SearchFilter from "../../components/ui/SearchFilter";
import UsersTable from "../../components/ui/tables/UsersTable";
import { Loader } from "../../components/ui/Loader";
import { FaPlus, FaTimes, FaEdit, FaTrash } from "react-icons/fa";

const UsersPage = () => {
    const { handleConfirmEmail } = useContext(AuthContext);
    const { getError, getSuccess } = useNotification();
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newUser, setNewUser] = useState({ name: "", lastName: "", user: "", password: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const fetchedUsers = await getUsers();
                setUsers(Array.isArray(fetchedUsers.data) ? fetchedUsers.data : []);
            } catch (error) {
                getError("Error al obtener los usuarios");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const openEditModal = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedUser(null);
    };

    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
    };

    const openAddModal = () => {
        setNewUser({ name: "", lastName: "", user: "", password: "" });
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleUpdateUser = async (userData) => {
        try {
            await updateUser(userData);
            const updatedUsers = await getUsers();
            setUsers(Array.isArray(updatedUsers.data) ? updatedUsers.data : []);
            closeEditModal();
            getSuccess("Usuario actualizado correctamente");
        } catch {
            getError("Error al actualizar el usuario");
        }
    };

    const handleDeleteUser = async () => {
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
            await handleConfirmEmail(userData.user);
            const updatedUsers = await getUsers();
            setUsers(Array.isArray(updatedUsers.data) ? updatedUsers.data : []);
            closeAddModal();
            getSuccess("Usuario creado correctamente");
        } catch {
            getError("Error al crear el usuario");
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <SearchFilter 
                    search={search} 
                    setSearch={setSearch} 
                    setOpenAddModal={openAddModal}
                    showAddButton={true}
                />
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader />
                </div>
            ) : (
                <UsersTable 
                    data={users} 
                    search={search} 
                    onEdit={openEditModal}
                    onDelete={openDeleteModal}
                />
            )}

            {/* Modales del segundo código */}
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
                            defaultValue={selectedUser?.name}
                            onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                        />
                        <input
                            type="text"
                            className="w-full border border-black rounded-lg p-2 mb-3"
                            placeholder="Apellidos"
                            defaultValue={selectedUser?.lastName}
                            onChange={(e) => setSelectedUser({ ...selectedUser, lastName: e.target.value })}
                        />
                        <div className="flex justify-center space-x-4 mt-4">
                            <button onClick={closeEditModal} className="border border-black px-4 py-2 rounded-lg">
                                Cancelar
                            </button>
                            <button onClick={() => handleUpdateUser(selectedUser)} className="border border-black bg-action-primary px-4 py-2 rounded-lg">
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
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        />
                        <input
                            type="text"
                            className="w-full border border-black rounded-lg p-2 mb-3"
                            placeholder="Apellidos"
                            value={newUser.lastName}
                            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                        />
                        <input
                            type="email"
                            className="w-full border border-black rounded-lg p-2 mb-3"
                            placeholder="Correo"
                            value={newUser.user}
                            onChange={(e) => setNewUser({ ...newUser, user: e.target.value })}
                        />
                        <input
                            type="password"
                            className="w-full border border-black rounded-lg p-2 mb-3"
                            placeholder="Contraseña"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        />
                        <div className="flex justify-center space-x-4 mt-4">
                            <button onClick={closeAddModal} className="border border-black px-4 py-2 rounded-lg">
                                Cancelar
                            </button>
                            <button onClick={() => handleAddUser(newUser)} className="border border-black bg-action-primary px-4 py-2 rounded-lg">
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