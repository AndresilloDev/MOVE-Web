import api from "./base.api";

const endpoint = "/users";

//Obtener todos los usuarios
export const getUsers = async () => {
    try {
        const response = await api.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("getUsers error:", error);
        return [];
    }
};

//Obtener un usuario
export const getUser = async (userId) => {
    try {
        const response = await api.get(`${endpoint}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("getUser error:", error);
        return {};
    }
}

//Actualizar un usuario
export const updateUser = async (user) => {
    try {
        const response = await api.put(endpoint, user);
        return response.data;
    } catch (error) {
        console.error("updateUser error:", error);
        return {};
    }
}

//Eliminar un usuario
export const deleteUser = async (userId) => {
    try {
        const response = await api.delete(`/${endpoint}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("deleteUser error:", error);
        return {};
    }
}

//Registrar un usuario
export const register = async (user) => {
    try {
        const response = await api.post(`${endpoint}/register`, user);
        return response.data;
    } catch (error) {
        console.error("createUser error:", error);
        return {};
    }
}