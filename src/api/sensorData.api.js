import io from 'socket.io-client';
import api from './base.api';

const endpoint = '/sensorData';
const SOCKET_URL = 'http://move-api-env.eba-jjywtyd3.us-east-1.elasticbeanstalk.com';

// Se crea la conexion al socket
const socket = io(SOCKET_URL);

export const getDeviceSensors = async (deviceId) => {
    return await api.get(`${endpoint}/${deviceId}/sensors`);
};

export const updateSensorThresholds = async (deviceId, sensorId, thresholds) => {
    return await api.put(`${endpoint}/${deviceId}/sensors/${sensorId}/updateSensorThresholds`, {thresholds});
};

export const getAllSensorDataInRange = async (deviceId, params) => {
    const { start, end, sensorName } = params || {};
    
    return await api.get(`${endpoint}/${deviceId}/sensors/data`, {
        params: { 
            start: start || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), 
            end: end || new Date().toISOString(),
            sensorName 
        }
    });
};

// Lectura en tiempo real de los datos
export const listenToSensorUpdates = (callback) => {
    socket.on('sensor-update', (data) => {
        callback(data);
    });

    return () => {
        socket.off('sensor-update');
    };
};