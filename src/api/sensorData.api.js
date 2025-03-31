import api from './base.api';

const endpoint = '/sensorData';

//Obtener los valores de todos los sensores de un dispositivo
export const getDeviceSensors = async (deviceId) => {
    return await api.get(`/${endpoint}/${deviceId}/sensors`);
};

//Obtener los valores de un sensor específico en un rango de tiempo
export const getAllSensorsDataInRange = async (deviceId, startDate, endDate) => {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    const formattedStartDate = startDate || lastWeek.toISOString();
    const formattedEndDate = endDate || today.toISOString();

    return await api.get(`/${endpoint}/${deviceId}/sensors/data`, {
        params: {
            startDate: formattedStartDate,
            endDate: formattedEndDate,
        },
    });
};