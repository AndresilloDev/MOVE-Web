import {createContext, useEffect, useState} from "react";
import { login } from "../api/auth.api.js";
import { logout } from "../api/auth.api.js";
import { checkAuth } from "../api/auth.api.js";
import { useNavigate } from "react-router-dom";
import { useNotification } from "./NotificationContext.jsx";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { getError, getSuccess } = useNotification();

    useEffect(() => {
        const validateSession = async () => {
            try { await checkAuth(); } catch {
                setUser(null);
                sessionStorage.removeItem("user");
            }
        };
        validateSession();
    }, []);

    const handleLogin = async (username, password) => {
        try {
            const response = await login(username, password);

            if (response.status === 200) {
                setUser(response.data.user);
                sessionStorage.setItem("user", JSON.stringify(response.data.user));
                setError(null);
                getSuccess("Inicio de sesión exitoso");
                navigate("/");

            } else if (response.status === 401) {
                setUser(null);
                setError(true);
                sessionStorage.removeItem("user");
                getError("Usuario o contraseña incorrectos");
            }
        } catch (err) {
            console.log('Error en la conexión:', err);
            setError(true);
            setUser(null);
            sessionStorage.removeItem("user");
            return false;
        }
    };

    const handleLogout = () => {
        setUser(null);
        logout();
        sessionStorage.removeItem("user");
        navigate("/");
    };

    const updateProfile = async (user) => {
        try {
            setUser(user);
            sessionStorage.setItem("user", JSON.stringify(user));
            getSuccess("Perfil actualizado correctamente");
        } catch (error) {
            setError("Error al actualizar el perfil");
        }
    };

    return (
        <AuthContext.Provider value={{ user, handleLogout, handleLogin, error, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};