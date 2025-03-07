import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import ChangePasswordRecoverPage from "./pages/ChangePasswordRecoverPage";
import ClassroomsPage from "./pages/ClassroomsPage";
import NotificationsPage from "./pages/NotificationsPage";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/recover-password" element={<ChangePasswordRecoverPage />} />
            <Route path="/classrooms" element={<ClassroomsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/sidebar" element={<Sidebar />} />
            <Route path="/login" element={<LoginPage/>} />
        </Routes>
    )
}