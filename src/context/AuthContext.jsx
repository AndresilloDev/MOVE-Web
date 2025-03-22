import { createContext, useState } from "react";
import { login } from "../api/auth.api.js";
import { logout } from "../api/auth.api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [error, setError] = useState(null);

    const handleLogin = async (username, password) => {
        try {
            const response = await login(username, password);

            if (response.status === 200) {
                setUser(response.data.user);
                localStorage.setItem("user", JSON.stringify(response.data.user));

            } else if (response.status === 401) {
                setUser(null);
                setError(true);

            }
        } catch (err) {
            console.log('Error en la conexión:', err);
            setError(true);
            setUser(null);
        }
    };

    const handleLogout = () => {
        setUser(null);
        logout();
        localStorage.removeItem("user"); // Eliminar usuario al cerrar sesión
    };

    return (
        <AuthContext.Provider value={{ user, handleLogout, handleLogin, error }}>
            {children}
        </AuthContext.Provider>
    );
};