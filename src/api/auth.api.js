import api from './base.api';

const endpoint = "/auth";

// Login de usuario
export const login = async (user, password) => {
    return await api.post(`${endpoint}/login`, {
        user: user,
        password: password
    });
};


export const logout = async () => {
    return await api.post(`${endpoint}/logout`);
};

export const isLogged = async () => {
    return await api.get(`${endpoint}/isLogged`);
}