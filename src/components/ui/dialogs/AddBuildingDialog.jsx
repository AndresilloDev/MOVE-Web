import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import ButtonBox from "../ButtonBox";
import InputBox from "../InputBox";

export const AddBuildingDialog = ({ onClose, onSave }) => {
    const [buildingName, setBuildingName] = useState("");

    const handleSave = () => {
        const building = {
            name: buildingName,
        };
        onSave(building);
    };   

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

                <h2 className="text-xl sm:text-2xl font-semibold mb-8 text-center">Agregar Edificio</h2>

                <div className="mb-4 sm:mb-6">
                    <InputBox
                        type="text"
                        label="Nombre"
                        inputClassName="my-4 bg-secondary-background"
                        spanClassName="bg-secondary-background top-0"
                        translateX="-0.8rem"
                        translateY="-1.5rem"
                        value={buildingName}
                        setValue={(value) => setBuildingName(value)}
                    />
                </div>

                <div className="flex justify-center gap-4 mt-8 sm:mt-12">
                    <ButtonBox text="Cancelar" onClick={onClose} className="px-6 sm:px-12 bg-transparent hover:bg-secondary border border-black" />
                    <ButtonBox text="Guardar" onClick={handleSave} className="px-6 sm:px-12" loadingType="redirect" />
                </div>
            </motion.div>
        </div>
    );
};

export default AddBuildingDialog;