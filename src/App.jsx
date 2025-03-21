import React from "react";
import { AppRouter } from "./routes/Router.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
    return (
        <AuthProvider>
            <AppRouter/>
        </AuthProvider>
    );
}

export default App;