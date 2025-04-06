import React, { useContext, useEffect, useState } from "react";
import { getUsers, updateUser, deleteUser, register } from "../../api/users.api";
import { useNotification } from "../../context/NotificationContext.jsx";
import { AuthContext } from "../../context/AuthContext";
import SearchFilter from "../../components/ui/SearchFilter";
import UsersTable from "../../components/ui/tables/UsersTable";
import { Loader } from "../../components/ui/Loader";
import { FaPlus, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import ButtonBox from "../../components/ui/ButtonBox.jsx";
import InputBox from "../../components/ui/InputBox.jsx";

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
    const currentUserId = JSON.parse(localStorage.getItem('user'))?.id;

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

{/* Modales rediseñados */}
{isEditModalOpen && (
    <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-50 px-4" onClick={closeEditModal}>
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-secondary-background rounded-2xl shadow-xl relative w-full max-w-xs sm:max-w-sm md:max-w-md h-fit p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
        >
            <button
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
                onClick={closeEditModal}
            >
                <FaTimes size={24} />
            </button>

            <h2 className="text-xl font-semibold mb-6 text-center">Editar Administrador</h2>

            <div className="mb-4">
                <InputBox
                    type="text"
                    label="Nombre"
                    inputClassName="my-4 bg-secondary-background"
                    spanClassName="bg-secondary-background top-0"
                    translateX="-0.8rem"
                    translateY="-1.5rem"
                    value={selectedUser?.name}
                    setValue={(value) => setSelectedUser({ ...selectedUser, name: value })}
                />
            </div>

            <div className="mb-4">
                <InputBox
                    type="text"
                    label="Apellidos"
                    inputClassName="my-4 bg-secondary-background"
                    spanClassName="bg-secondary-background top-0"
                    translateX="-0.8rem"
                    translateY="-1.5rem"
                    value={selectedUser?.lastName}
                    setValue={(value) => setSelectedUser({ ...selectedUser, lastName: value })}
                />
            </div>

            <div className="flex justify-center gap-4 mt-8">
                <ButtonBox 
                    text="Cancelar" 
                    onClick={closeEditModal} 
                    className="px-6 bg-transparent hover:bg-secondary border border-black" 
                />
                <ButtonBox 
                    text="Actualizar" 
                    onClick={() => handleUpdateUser(selectedUser)} 
                    className="px-6" 
                />
            </div>
        </motion.div>
    </div>
)}

{isDeleteModalOpen && (
    <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-50 px-4" onClick={closeDeleteModal}>
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-secondary-background rounded-2xl shadow-xl relative w-full max-w-xs sm:max-w-sm md:max-w-md h-fit p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
        >
            <button
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
                onClick={closeDeleteModal}
            >
                <FaTimes size={24} />
            </button>

            <h2 className="text-xl font-semibold mb-6 text-center">Eliminar Administrador</h2>
            
            {selectedUser?.isAdmin ? (
                <>
                    <div className="bg-yellow-50 p-4 mb-6">
                        <div className="flex items-center justify-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                    No puedes eliminar a un SuperAdmin
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-center mt-8">
                        <ButtonBox 
                            text="Entendido" 
                            onClick={closeDeleteModal} 
                            className="px-6" 
                        />
                    </div>
                </>
            ) : (
                <>
                    <p className="text-center mb-8">¿Estás seguro que deseas eliminar al administrador <span className="font-semibold">{selectedUser?.name}</span>?</p>
                    
                    <div className="flex justify-center gap-4 mt-8">
                        <ButtonBox 
                            text="Cancelar" 
                            onClick={closeDeleteModal} 
                            className="px-6 bg-transparent hover:bg-secondary border border-black" 
                        />
                        <ButtonBox 
                            text="Eliminar" 
                            onClick={handleDeleteUser} 
                            className="px-6 bg-red-500 hover:bg-red-600 text-white" 
                        />
                    </div>
                </>
            )}
        </motion.div>
    </div>
)}

{isAddModalOpen && (
    <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-50 px-4" onClick={closeAddModal}>
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-secondary-background rounded-2xl shadow-xl relative w-full max-w-xs sm:max-w-sm md:max-w-md h-fit p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
        >
            <button
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
                onClick={closeAddModal}
            >
                <FaTimes size={24} />
            </button>

            <h2 className="text-xl font-semibold mb-6 text-center">Agregar Administrador</h2>

                <InputBox
                    type="text"
                    label="Nombre"
                    inputClassName="my-4 bg-secondary-background"
                    spanClassName="bg-secondary-background top-0"
                    translateX="-0.8rem"
                    translateY="-1.5rem"
                    value={newUser.name}
                    setValue={(value) => setNewUser({ ...newUser, name: value })}
                />

                <InputBox
                    type="text"
                    label="Apellidos"
                    inputClassName="my-4 bg-secondary-background"
                    spanClassName="bg-secondary-background top-0"
                    translateX="-0.8rem"
                    translateY="-1.5rem"
                    value={newUser.lastName}
                    setValue={(value) => setNewUser({ ...newUser, lastName: value })}
                />

                <InputBox
                    type="email"
                    label="Correo"
                    inputClassName="my-4 bg-secondary-background"
                    spanClassName="bg-secondary-background top-0"
                    translateX="-0.8rem"
                    translateY="-1.5rem"
                    value={newUser.user}
                    setValue={(value) => setNewUser({ ...newUser, user: value })}
                />

                <InputBox
                    type="password"
                    label="Contraseña"  
                    inputClassName="my-4 bg-secondary-background"
                    spanClassName="bg-secondary-background top-0"
                    translateX="-0.8rem"
                    translateY="-1.5rem"
                    value={newUser.password}
                    setValue={(value) => setNewUser({ ...newUser, password: value })}
                />

            <div className="flex justify-center gap-4 mt-8">
                <ButtonBox 
                    text="Cancelar" 
                    onClick={closeAddModal} 
                    className="px-6 bg-transparent hover:bg-secondary border border-black" 
                />
                <ButtonBox 
                    text="Agregar" 
                    onClick={() => handleAddUser(newUser)} 
                    className="px-6" 
                />
            </div>
        </motion.div>
    </div>
)}
        </div>
    );
};

export default UsersPage;