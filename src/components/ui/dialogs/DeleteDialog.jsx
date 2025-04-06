import { motion } from "framer-motion";
import { X } from "lucide-react";
import ButtonBox from "../ButtonBox";

const DeleteDialog = ({ onClose, onDelete, itemType, itemName }) => {
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
        {/* Botón de cierre */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X size={30} />
        </button>

        {/* Título dinámico */}
        <h2 className="text-2xl font-semibold mb-12 text-center">Eliminar {itemType}</h2>

        {/* Contenido */}
        <p className="text-black text-center mb-6 text-xl">
          ¿Estás seguro de que deseas eliminar <strong className="font-['Helvetica-Bold']">{itemName}</strong>?
        </p>

        {/* Botones */}
        <div className="flex justify-center gap-4 mt-12">
          <ButtonBox text="Cancelar" onClick={onClose} className="px-12 bg-transparent hover:bg-secondary border border-black" />
          <ButtonBox text="Eliminar" onClick={onDelete} className="px-12" loadingType="redirect" />
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteDialog;