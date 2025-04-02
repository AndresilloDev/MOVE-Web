import { createContext, useEffect, useState } from "react";
import { login, logout, checkAuth, recoverPassword, changePassword } from "../api/auth.api.js";
import {useNavigate, useSearchParams} from "react-router-dom";
import { useNotification } from "./NotificationContext.jsx";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const navigate = useNavigate();
    const { getError, getSuccess } = useNotification();
    const [queryParams] = useSearchParams()

    useEffect(() => {
        const validateSession = async () => {
            try {
                await checkAuth();
            } catch {
                setUser(null);
                sessionStorage.removeItem("user");
            }
        };
        validateSession();
    }, []);

    const handleLogin = async (username, password) => {
        try {
            const response = await login(username, password);

            if (response.status === 200 && response.data.user) {
                setUser(response.data.user);
                sessionStorage.setItem("user", JSON.stringify(response.data.user));
                getSuccess("Inicio de sesión exitoso");
                navigate("/");
                return true; 
            }
        } catch {
            setUser(null);
            sessionStorage.removeItem("user");
            getError("Usuario o contraseña incorrectos");
            return false; 
        }
    };

    const handleLogout = () => {
        setUser(null);
        logout();
        sessionStorage.removeItem("user");
        navigate("/");
        getSuccess("Cierre de sesión exitoso");
    };

    const updateProfile = async (user) => {
        try {
            setUser(user);
            sessionStorage.setItem("user", JSON.stringify(user));
            getSuccess("Perfil actualizado correctamente");
        } catch {
            getError("Error al actualizar el perfil");
        }
    };

    const handleRecoverPassword = async (user) => {
        try {
            const response = await recoverPassword(user);
            if (response.status === 200) {
                getSuccess("Correo enviado");

            }
        } catch {
            getError("Usuario no encontrado");

        }
    }

    const handleChangePassword = async (newPassword, confirmPassword) => {
        try {
            if (newPassword !== confirmPassword) return getError("Las contraseñas no son iguales!");

            const token =  queryParams.get("token");
            const user = queryParams.get("user");

            const response = await changePassword(newPassword, token, user);
            if (response.status === 200) {
                getSuccess("Contraseña cambiada correctamente");

            }
        } catch {
            getError("Algo salio mal, intenta de nuevo más tarde");

        }
    }

    return (
        <AuthContext.Provider value={{ user, handleLogout, handleLogin, updateProfile, handleRecoverPassword, handleChangePassword }}>
            {children}
        </AuthContext.Provider>
    );
};
