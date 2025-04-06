import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import ButtonBox from "../ButtonBox";
import InputBox from "../InputBox";
import { getBuildings } from "../../../api/buildings.api";
import { getSpaces } from "../../../api/spaces.api";

const EditDeviceDialog = ({ onClose, onSave, device }) => {
    const [name, setName] = useState(device.name || "");
    const [buildingName, setBuildingName] = useState(device.building ? device.building.name : "");
    const [spaceName, setSpaceName] = useState(device.space ? device.space.name : "");  

    const [buildings, setBuildings] = useState([]);
    const [spaces, setSpaces] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const buildingData = await getBuildings();
            setBuildings(buildingData.data.sort((a, b) => a.name.localeCompare(b.name)));

            if (device.buildingId) {
                const spaceData = await getSpaces(device.buildingId);
                setSpaces(spaceData.data.sort((a, b) => a.name.localeCompare(b.name)));
            }
        }
        fetchData();
    }, [device.buildingId]);

    const fetchSpaces = async (buildingId) => {
        try {
            if (!buildingId) {
                setSpaces([]);
                return
            };
            const response = await getSpaces(buildingId);
            // const respone = await getUsers();
            setSpaces(response.data.sort((a, b) => a.name.localeCompare(b.name)));
        } catch (error) {
            console.error("Error fetching spaces:", error);
        }
    };

    const handleSave = () => {
        const editedItem = {
            ...device,
            name,
            building: { name: buildingName },
            space: { name: spaceName },
        };
        onSave(editedItem);
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

                <h2 className="text-xl sm:text-2xl font-semibold mb-8 text-center">Editar Dispositivo</h2>

                <div className="mb-4 sm:mb-6">
                    <InputBox
                        type="text"
                        label="Dispositivo"
                        inputClassName="my-4 bg-secondary-background"
                        spanClassName="bg-secondary-background top-0"
                        translateX="-1rem"
                        translateY="-1.5rem"
                        value={name}
                        setValue={(value) => setName(value)}
                    />

                    <div className="my-4">
                        <label className="block text-sm font-medium mb-2">Edificio</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            value={buildingName}
                            onChange={(e) => {
                                const selectedBuilding = buildings.find((b) => b.name === e.target.value);
                                setBuildingName(e.target.value || "");
                                setSpaceName("");
                                if (selectedBuilding) {
                                    fetchSpaces(selectedBuilding._id);
                                } else {
                                    setSpaces([]);
                                }
                            }}                            
                        >
                            <option value="">Seleccionar edificio</option>
                            {buildings
                                .map((building) => (
                                    <option key={building._id} value={building.name}>
                                        {building.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="my-4">
                        <label className="block text-sm font-medium mb-2">Aula</label>
                        { !spaces ? <p className="text-gray-500">Seleccione un edificio</p> : (
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                value={spaceName}
                                onChange={(e) => setSpaceName(e.target.value)}
                            >
                                <option value={spaceName}>{spaceName || "Seleccionar aula"}</option>
                                {spaces
                                    .filter((s) => s.name !== spaceName)
                                    .map((space) => (
                                        <option key={space.id} value={space.name}>
                                            {space.name}
                                        </option>
                                    ))}
                            </select>
                        ) }
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-8 sm:mt-12">
                    <ButtonBox text="Cancelar" onClick={onClose} className="px-6 sm:px-12 bg-transparent hover:bg-secondary border border-black" />
                    <ButtonBox text="Guardar" onClick={handleSave} className="px-6 sm:px-12" loadingType="redirect" />
                </div>
            </motion.div>
        </div>
    );
};

export default EditDeviceDialog;