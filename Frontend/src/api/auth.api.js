import api from './base.api';

export const login = async (credentials) => {
    return await api.post('/login', credentials);
};