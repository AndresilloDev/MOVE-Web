import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersScreen from "./screens/UsersScreen";
import Sidebar from "./components/Sidebar";
import ChangePasswordRecoverScreen from "./screens/ChangePasswordRecoverScreen";
import ClassroomsPage from "./pages/ClassroomsPage"; 
import NotificationsPage from "./pages/NotificationsPage";
import './App.css';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<UsersScreen />} />
                    <Route path="/recover-password" element={<ChangePasswordRecoverScreen />} />
                    <Route path="/classrooms" element={<ClassroomsPage />} /> 
                    <Route path="/notifications" element={<NotificationsPage />} /> 
                    <Route path="/sidebar" element={<Sidebar />} /> 
                </Routes>
            </div>
        </Router>
    );
}

export default App;