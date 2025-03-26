import api from "./base.api";

const endpoint = "/notifications";

// Obtener todas las notificaciones NO archivadas
export const getUnfiledNotifications = async () => {
    try {
        const response = await api.get(`${endpoint}/unfiled`);
        return response.data;
    } catch (error) {
        console.error("getUnfiledNotifications error:", error);
        return [];
    }
};

// Obtener todas las notificaciones archivadas
export const getFiledNotifications = async () => {
    try {
        const response = await api.get(`${endpoint}/filed`);
        return response.data;
    } catch (error) {
        console.error("getFiledNotifications error:", error);
        return [];
    }
};

// Obtener una notificación por ID
export const getNotification = async (notificationId) => {
    try {
        const response = await api.get(`${endpoint}/${notificationId}`);
        return response.data;
    } catch (error) {
        console.error("getNotification error:", error);
        return {};
    }
};

// Obtener una notificación archivada por ID
export const getFiledNotification = async (notificationId) => {
    try {
        const response = await api.get(`${endpoint}/filed/${notificationId}`);
        return response.data;
    } catch (error) {
        console.error("getFiledNotification error:", error);
        return {};
    }
};

// Crear una nueva notificación
export const createNotification = async (notification) => {
    try {
        const response = await api.post(endpoint, notification);
        return response.data;
    } catch (error) {
        console.error("createNotification error:", error);
        return {};
    }
};

// Archivar una notificación (cambiar su estado a false)
export const fileNotification = async (notificationId) => {
    try {
        const response = await api.put(`${endpoint}/file/${notificationId}`);
        return response.data;
    } catch (error) {
        console.error("fileNotification error:", error);
        return {};
    }
};
