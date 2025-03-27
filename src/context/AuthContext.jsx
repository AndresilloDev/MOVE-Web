import {createContext, useEffect, useState} from "react";
import { login } from "../api/auth.api.js";
import { logout } from "../api/auth.api.js";
import { checkAuth } from "../api/auth.api.js";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
                return true;

            } else if (response.status === 401) {
                setUser(null);
                setError(true);
                sessionStorage.removeItem("user");
                return false;

            }
            navigate("/");
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

    return (
        <AuthContext.Provider value={{ user, handleLogout, handleLogin, error }}>
            {children}
        </AuthContext.Provider>
    );
};