import api from './base.api';

export const getNotifications = async () => {
    return await api.get('/notifications');
}

export const getNotification = async (id) => {
    return await api.get(`/notifications/${id}`);
}

export const fileNotification = async (data) => {
    return await api.post('/notifications', data);
}

export const getFiledNotifications = async () => {
    return await api.get('/notifications/filed');
}

export const getFiledNotification = async (id) => {
    return await api.get(`/notifications/filed/${id}`);
}