import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersPage from "./pages/UsersPage.jsx";
import Sidebar from "./components/Sidebar";
import ChangePasswordRecoverPage from "./pages/ChangePasswordRecoverPage.jsx";
import ClassroomsPage from "./pages/ClassroomsPage"; 
import NotificationsPage from "./pages/NotificationsPage";
import './App.css';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<UsersPage />} />
                    <Route path="/recover-password" element={<ChangePasswordRecoverPage />} />
                    <Route path="/classrooms" element={<ClassroomsPage />} /> 
                    <Route path="/notifications" element={<NotificationsPage />} /> 
                    <Route path="/sidebar" element={<Sidebar />} /> 
                </Routes>
            </div>
        </Router>
    );
}

export default App;