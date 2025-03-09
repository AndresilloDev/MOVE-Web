import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import UsersPage from "../pages/UsersPage";
import ChangePasswordRecoverPage from "../pages/ChangePasswordRecoverPage";
import ClassroomsPage from "../pages/ClassroomsPage";
import NotificationsPage from "../pages/NotificationsPage";
import LoginPage from "../pages/LoginPage";
import HeaderOnlyLayout from "../components/layout/HeaderOnly";
import MainLayout from "../components/layout/MainLayout";
import Sidebar from "../components/layout/Sidebar";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/sidebar" element={<Sidebar />} />
            <Route element={<HeaderOnlyLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/recover-password" element={<ChangePasswordRecoverPage />} />
            </Route>
            <Route element={<MainLayout/>}>
                <Route path="/users" element={<UsersPage />} />
                <Route path="/classrooms" element={<ClassroomsPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
            </Route>
        </Routes>
    )
}