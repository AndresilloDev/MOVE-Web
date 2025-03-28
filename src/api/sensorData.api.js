import io from 'socket.io-client';
import api from './base.api';

const endpoint = '/sensorData';
const SOCKET_URL = 'http://localhost:3000';

// Create socket connection
const socket = io(SOCKET_URL);

export const getDeviceSensors = async (deviceId) => {
    try {
        const response = await api.get(`${endpoint}/${deviceId}/sensors`);
        return response.data;
    } catch (error) {
        console.error("getDeviceSensors error:", error);
        return [];
    }
};

export const getAllSensorsDataInRange = async (deviceId, sensorName, startDate, endDate) => {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    const formattedStartDate = startDate || lastWeek.toISOString();
    const formattedEndDate = endDate || today.toISOString();

    try {
        const response = await api.get(`${endpoint}/${deviceId}/sensors/data`, {
            params: { 
                sensorName,
                startDate: formattedStartDate, 
                endDate: formattedEndDate 
            }
        });
        return response.data;
    } catch (error) {
        console.error("getAllSensorsDataInRange error:", error);
        return [];
    }
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
