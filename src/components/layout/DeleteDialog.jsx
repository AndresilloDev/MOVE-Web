import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import ButtonBox from "../ui/ButtonBox";

const DeleteDialog = ({ isOpen, onClose, onDelete, itemType, itemName }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-xs bg-opacity-40 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-white p-6 rounded-2xl shadow-lg relative w-96"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cierre */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* Título dinámico */}
        <h2 className="text-xl font-semibold mb-4">Eliminar {itemType}</h2>

        {/* Contenido */}
        <p className="text-gray-600 mb-6">
          ¿Estás seguro de que deseas eliminar <strong className="font-['Helvetica-Bold']">{itemName}</strong>?
        </p>

        {/* Botones */}
        <div className="flex justify-end gap-4">
          <ButtonBox text="Cancelar" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-black" />
          <ButtonBox text="Eliminar" onClick={onDelete} className="text-white bg-red-600 hover:bg-red-700" />
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteDialog;