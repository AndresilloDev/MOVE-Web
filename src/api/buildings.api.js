import api from "./base.api";

const endpoint = "/buildings";

//Obtiene todos los edificios
export const getBuildings = async () => {
    return await api.get(endpoint);
}

//Obtiene un edificio
export const getBuilding = async (id) => {
    return await api.get(`${endpoint}/${id}`);
}

//Crea un edificio
export const createBuilding = async (building) => {
    return await api.post(`${endpoint}`, building);
}

//Actualiza un edificio
export const updateBuilding = async (id, building) => {
    return await api.put(`${endpoint}/${id}`, building);
}

//Elimina un edificio;
//NOTA: El eliminado es lógico, no físico
//NOTA: No se puede eliminar un edificio si tiene espacios o dispositivos
export const deleteBuilding = async (id) => {
    return await api.delete(`${endpoint}/${id}`);
}

//Obtiene la cantidad de espacios dentro de un edificio
export const getBuildingSpaces = async (id) => {
    return await api.get(`${endpoint}/${id}/spaces/count`);
}

//Obtiene la cantidad de dispositivos dentro de un edificio
export const getBuildingDevices = async (id) => {
    return await api.get(`${endpoint}/${id}/devices/count`);
}