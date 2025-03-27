import React from "react";
import { AppRouter } from "./routes/Router.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";

function App() {
    return (
        <AuthProvider>
            <NotificationProvider>
                <AppRouter />
            </NotificationProvider>
        </AuthProvider>
    );
}

export default App;
