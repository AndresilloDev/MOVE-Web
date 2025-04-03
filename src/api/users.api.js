import api from "./base.api";

const endpoint = "/users";

//Obtener todos los usuarios
export const getUsers = async () => {
    return await api.get(endpoint);
};

//Obtener un usuario
export const getUser = async (userId) => {
    return await api.get(`${endpoint}/${userId}`);
}

//Actualizar un usuario
export const updateUser = async (user) => {
    return await api.put(`${endpoint}/${user._id}`, user);
}

//Eliminar un usuario
export const deleteUser = async (userId) => {
    return await api.delete(`${endpoint}/${userId}`);
}

//Registrar un usuario
export const register = async (user) => {
    return await api.post(`${endpoint}/`, user);
}