import io from 'socket.io-client';
import api from './base.api';

const endpoint = '/sensorData';
const SOCKET_URL = 'http://localhost:3000';

// Create socket connection
const socket = io(SOCKET_URL);

export const getDeviceSensors = async (deviceId) => {
    return await api.get(`${endpoint}/${deviceId}/sensors`);
};

export const getAllSensorsDataInRange = async (deviceId, sensorName, startDate, endDate) => {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    const formattedStartDate = startDate || lastWeek.toISOString();
    const formattedEndDate = endDate || today.toISOString();

    return await api.get(`${endpoint}${deviceId}/sensors/data`, {
        params: { 
            sensorName,
            startDate: formattedStartDate, 
            endDate: formattedEndDate 
        }
    });
};

// Function to listen for real-time sensor updates
export const listenToSensorUpdates = (callback) => {
    socket.on('sensor-update', (data) => {
        callback(data);
    });

    // Return a cleanup function
    return () => {
        socket.off('sensor-update');
    };
};
