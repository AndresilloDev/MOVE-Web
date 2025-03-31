import api from "./base.api";

const endpoint = "/devices";

export const getDevices = async () => {
    return await api.get(endpoint);
};

export const getDevice = async (deviceId) => {
    return await api.get(`${endpoint}/${deviceId}`);
};

export const updateDevice = async (deviceId, device) => {
    return await api.put(`${endpoint}/${deviceId}`, device);
};

export const deleteDevice = async (deviceId) => {
    return await api.delete(`${endpoint}/${deviceId}`);
};
