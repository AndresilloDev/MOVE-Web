import api from "./base.api";

const endpoint = "/buildings";

//Obtiene todos los espacios
export const getSpaces = async (buildingId) => {
    return await api.get(`${endpoint}/${buildingId}/spaces`);
}

//Obtiene un espacio
export const getSpace = async (buildingId, id) => {
    return await api.get(`${endpoint}/${buildingId}/spaces/${id}`);
}

//Crea un espacio
export const createSpace = async (buildingId, space) => {
    return await api.post(`${endpoint}/${buildingId}/spaces`, space);
}

//Actualiza un espacio

export const updateSpace = async (buildingId, id, space) => {
    return await api.put(`${endpoint}/${buildingId}/spaces/${id}`, space);
}

//Elimina un espacio;
//NOTA: El eliminado es lógico, no físico
//NOTA: No se puede eliminar un espacio si tiene dispositivos
export const deleteSpace = async (buildingId, id) => {
    return await api.delete(`${endpoint}/${buildingId}/spaces/${id}`);
}

//Obtiene la cantidad de dispositivos dentro de un espacio
export const getSpaceDevices = async (buildingId, id) => {
    return await api.get(`${endpoint}/${buildingId}/spaces/${id}/devices`);
}