import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import ButtonBox from "../ButtonBox";
import InputBox from "../InputBox";
import { useNotification } from "../../../context/NotificationContext";

const ConfigSensorDialog = ({ onClose, sensor, deviceId, onSave }) => {
    const [lowerThreshold, setLowerThreshold] = useState(sensor?.thresholds?.lower);
    const [upperThreshold, setUpperThreshold] = useState(sensor?.thresholds?.upper);
    console.log(sensor);
    console.log(sensor?.thresholds?.lower);
    console.log(sensor?.thresholds?.upper);

    const { getError, getSuccess } = useNotification();

    const sensorRanges = {
        'temperature': { min: 0, max: 50 },
        'humidity': { min: 0, max: 100 },
        'co2': { min: 0, max: 3000 },
        'light': { min: 0, max: 3000 },
        'sound': { min: 0, max: 420 }
      };    

    const handleSave = () => {
        if (lowerThreshold < sensorRanges[sensor.sensorName].min || lowerThreshold >= sensorRanges[sensor.sensorName].max) {
            getError(`El umbral inferior debe estar entre ${sensorRanges[sensor.sensorName].min} y ${sensorRanges[sensor.sensorName].max}`);
            return;
        }

        if (upperThreshold < sensorRanges[sensor.sensorName].min || upperThreshold >= sensorRanges[sensor.sensorName].max) {
            getError(`El umbral superior debe estar entre ${sensorRanges[sensor.sensorName].min} y ${sensorRanges[sensor.sensorName].max}`);
            return;
        }

        if (lowerThreshold >= upperThreshold) {
            getError("El umbral inferior debe ser menor que el umbral superior");
            return;
        }
        if (lowerThreshold === "" || upperThreshold === "") {
            getError("Los umbrales no pueden estar vacíos");
            return;
        }
        
        console.log({
            device: deviceId,
            sensor: sensor._id,
            thresholds: {
                lower: parseFloat(lowerThreshold),
                upper: parseFloat(upperThreshold),
            }});

        onSave({
            device: deviceId,
            sensor: sensor._id,
            thresholds: {
                lower: parseFloat(lowerThreshold),
                upper: parseFloat(upperThreshold),
            }});
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

                <h2 className="text-xl sm:text-2xl font-semibold mb-8 text-center">Editar Umbrales</h2>

                <div className="mb-4 sm:mb-6">
                    <div className="my-4">
                        <InputBox
                            type="text"
                            label="Umbral Inferior"
                            inputClassName="my-4 bg-secondary-background"
                            spanClassName="bg-secondary-background top-0"
                            translateX="-1rem"
                            translateY="-1.5rem"
                            value={lowerThreshold}
                            setValue={setLowerThreshold}
                        />
                    </div>

                    <div className="my-4">
                        <InputBox
                            type="text"
                            label="Umbral Superior"
                            inputClassName="my-4 bg-secondary-background"
                            spanClassName="bg-secondary-background top-0"
                            translateX="-1rem"
                            translateY="-1.5rem"
                            value={upperThreshold}
                            setValue={(value) => setUpperThreshold(value)}
                        />
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

export default ConfigSensorDialog;