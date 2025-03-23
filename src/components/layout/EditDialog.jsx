import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import ButtonBox from "../ui/ButtonBox";

const EditDialog = ({ isOpen, onClose, onSave, itemType, item }) => {
	const [editedItem, setEditedItem] = useState(item || {});

    useEffect(() => {
        setEditedItem(item);
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedItem(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const renderForm = () => {
        switch (itemType) {
            case "buildings":
                return (
                    <>
                        <label className="block mb-4">
                            <span className="text-black">Nombre:</span>
                            <input
                                type="text"
                                name="name"
                                value={editedItem.name || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                    </>
                );
            case "classrooms":
                return (
                    <>
                        <label className="block mb-4">
                            <span className="text-black">Aula:</span>
                            <input
                                type="text"
                                name="name"
                                value={editedItem.name || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block mb-4">
                            <span className="text-black">Capacidad:</span>
                            <input
                                type="number"
                                name="capacity"
                                value={editedItem.capacity || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block mb-4">
                            <span className="text-black">Dispositivos:</span>
                            <input
                                type="number"
                                name="deviceCount"
                                value={editedItem.deviceCount || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                    </>
                );
            case "devices":
                return (
                    <>
                        <label className="block mb-4">
                            <span className="text-black">Dispositivo:</span>
                            <input
                                type="text"
                                name="name"
                                value={editedItem.name || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block mb-4">
                            <span className="text-black">Aula:</span>
                            <input
                                type="text"
                                name="spaceName"
                                value={editedItem.space ? editedItem.space.name : 'Aula no disponible'}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block mb-4">
                            <span className="text-black">Edificio:</span>
                            <input
                                type="text"
                                name="buildingName"
                                value={editedItem.building ? editedItem.building.name : 'Edificio no disponible'}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                    </>
                );
            default:
                return <p>Formulario no disponible para este tipo de elemento.</p>;
        }
    };

    if (!isOpen || !editedItem) return null;

    return (
        <div
            className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-50"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-secondary-background rounded-2xl shadow-xl relative w-1/3 h-fit p-12"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                    onClick={onClose}
                >
                    <X size={30} />
                </button>

                <h2 className="text-2xl font-semibold mb-12 text-center">Editar {itemType}</h2>

                <div className="mb-6">
                    {renderForm()}
                </div>

                <div className="flex justify-center gap-4 mt-12">
                    <ButtonBox text="Cancelar" onClick={onClose} className="px-12 bg-transparent hover:bg-secondary border border-black" />
					<ButtonBox text="Guardar" onClick={() => onSave(editedItem)} className="px-12" />
				</div>
            </motion.div>
        </div>
    );
};

export default EditDialog;