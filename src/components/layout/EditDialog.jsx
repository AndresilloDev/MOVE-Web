import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import ButtonBox from "../ui/ButtonBox";
import InputBox from "../ui/InputBox";
import Select from "react-select";

const EditDialog = ({ isOpen, onClose, onSave, itemType, item, buildings }) => {
    const [editedItem, setEditedItem] = useState(item || {});
    
    useEffect(() => {
        if (item) {
            setEditedItem(item);
    
            if (item.buildingId && !item.building) {
                getBuilding(item.buildingId).then(response => {
                    setEditedItem(prev => ({
                        ...prev,
                        building: response.data
                    }));
                }).catch(error => console.error("Error obteniendo el edificio:", error));
            }
        }
    }, [item]);
      

    const handleChange = (name, value) => {
        setEditedItem((prevState) => {
            const updatedState = { ...prevState, [name]: value };
            console.log("Estado actualizado:", updatedState);
            return updatedState;
        });
    };    

    const renderForm = () => {
        switch (itemType) {
            case "buildings":
                return (
                    <InputBox
                        type="text"
                        label="Nombre"
                        inputClassName="my-4 bg-secondary-background"
                        spanClassName="bg-secondary-background top-0"
                        translateX="-0.8rem"
                        translateY="-1.5rem"
                        value={editedItem.name}
                        setValue={(value) => handleChange("name", value)}
                    />
                );
            case "spaces":
                return (
                    <>
                        <InputBox
                            type="text"
                            label="Aula"
                            inputClassName="my-4 bg-secondary-background"
                            spanClassName="bg-secondary-background top-0"
                            translateX="-0.75rem"
                            translateY="-1.5rem"
                            value={editedItem.name}
                            setValue={(value) => handleChange("name", value)}
                        />
                        <Select
                            className="mt-1 block w-full"
                            value={
                                editedItem.building 
                                    ? { value: editedItem.building.id, label: editedItem.building.name } 
                                    : null
                            }
                            onChange={(selectedOption) => 
                                handleChange("building", { id: selectedOption.value, name: selectedOption.label })
                            }
                            options={buildings?.map((building) => ({
                                value: building.id,
                                label: building.name,
                            }))}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderColor: state.isFocused ? "#000000" : "#D9D9D9",
                                    boxShadow: state.isFocused ? "0 0 0px 000" : null,
                                    "&:hover": { borderColor: "#D9D9D9" },
                                    backgroundColor: "#F8F8FF",
                                    borderRadius: "8px",
                                }),
                                menu: (baseStyles) => ({
                                    ...baseStyles,
                                    borderRadius: "8px",
                                    marginTop: "4px",
                                    zIndex: 100,
                                }),
                                option: (baseStyles, state) => ({
                                    ...baseStyles,
                                    backgroundColor: state.isSelected ? "lightblue" : state.isFocused ? "lightgray" : null,
                                    color: state.isSelected ? "black" : "darkgray",
                                    padding: "10px 15px",
                                    cursor: "pointer",
                                }),
                            }}
                            placeholder="Seleccione un edificio"
                        />
                    </>
                );
            case "devices":
                return (
                    <>
                        <InputBox
                            type="text"
                            label="Dispositivo"
                            inputClassName="my-4 bg-secondary-background"
                            spanClassName="bg-secondary-background top-0"
                            translateX="-1rem"
                            translateY="-1.5rem"
                            value={editedItem.name}
                            setValue={(value) => handleChange("name", value)}
                        />
                        <InputBox
                            type="text"
                            label="Aula"
                            inputClassName="my-4 bg-secondary-background"
                            spanClassName="bg-secondary-background top-0"
                            translateX="-.6rem"
                            translateY="-1.5rem"
                            value={editedItem.space ? editedItem.space.name : 'Aula no disponible'}
                            setValue={(value) => handleChange("spaceName", value)}
                        />
                        <InputBox
                            type="text"
                            label="Edificio"
                            inputClassName="my-4 bg-secondary-background"
                            spanClassName="bg-secondary-background top-0"
                            translateX="-.75rem"
                            translateY="-1.5rem"
                            value={editedItem.building ? editedItem.building.name : 'Edificio no disponible'}
                            setValue={(value) => handleChange("buildingName", value)}
                        />
                    </>
                );
            default:
                return <p>Formulario no disponible para este tipo de elemento.</p>;
        }
    };

    if (!isOpen || !editedItem) return null;

    return (
        <div
            className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-50 px-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-secondary-background rounded-2xl shadow-xl relative w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl h-fit p-6 sm:p-8 md:p-10 lg:p-12"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                    onClick={onClose}
                >
                    <X size={24} />
                </button>

                <h2 className="text-xl sm:text-2xl font-semibold mb-8 text-center">Editar {itemType}</h2>

                <div className="mb-4 sm:mb-6">
                    {renderForm()}
                </div>

                <div className="flex justify-center gap-4 mt-8 sm:mt-12">
                    <ButtonBox text="Cancelar" onClick={onClose} className="px-6 sm:px-12 bg-transparent hover:bg-secondary border border-black" />
                    <ButtonBox text="Guardar" onClick={() => onSave(editedItem)} className="px-6 sm:px-12" />
                </div>
            </motion.div>
        </div>
    );
};

export default EditDialog;