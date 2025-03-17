import api from "./base.api";

const endpoint = "/devices";

export const getDevices = async () => {
    try {
        const response = await api.get(endpoint);
        return { data: response.data };
    } catch (error) {
        console.error("getDevices error:", error);
        return { data: [] };
    }
};


export const getDevice = async (deviceId) => {
    try {
        const response = await api.get(`/${endpoint}/${deviceId}`);
        return response.data;
    } catch (error) {
        console.error("getDevice error:", error);
        return {};
    }
}

//Nota: Lógica por implementar (Conexión por Bluetooth)
export const connectDevice = async (deviceId) => {
    try {
        const response = await api.get(`/${endpoint}/${deviceId}/connect`);
        return response.data;
    } catch (error) {
        console.error("connectDevice error:", error);
        return {};
    }
}

export const updateDevice = async (deviceId, device) => {
    try {
        const response = await api.put(`/${endpoint}/${deviceId}`, device);
        return response.data;
    } catch (error) {
        console.error("updateDevice error:", error);
        return {};
    }
}

export const deleteDevice = async (deviceId) => {
    try {
        const response = await api.delete(`/${endpoint}/${deviceId}`);
        return response.data;
    } catch (error) {
        console.error("deleteDevice error:", error);
        return {};
    }
}