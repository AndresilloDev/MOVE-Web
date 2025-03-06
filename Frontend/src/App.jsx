import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersPage from "./pages/UsersPage.jsx";
import Sidebar from "./components/Sidebar";
import ChangePasswordRecoverPage from "./pages/ChangePasswordRecoverPage.jsx";
import ClassroomsPage from "./pages/ClassroomsPage";
import NotificationsPage from "./pages/NotificationsPage";
import HomePage from "./pages/HomePage.jsx";
import './App.css';
import LoginPage from "./pages/LoginPage.jsx";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/recover-password" element={<ChangePasswordRecoverPage />} />
                    <Route path="/classrooms" element={<ClassroomsPage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/sidebar" element={<Sidebar />} />
                    <Route path="/login" element={<LoginPage/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;