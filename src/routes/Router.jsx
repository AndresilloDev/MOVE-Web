import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import MainLayout from "../components/layout/MainLayout";
import HeaderOnlyLayout from "../components/layout/HeaderOnly";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RecoverAccountPage from "../pages/RecoverAccountPage";
import ChangePasswordRecoverPage from "../pages/ChangePasswordRecoverPage";

import DevicesPage from "../pages/DevicesPage";
import SelectedDevicePage from "../pages/SelectedDevicePage";

import BuildingsPage from "../pages/BuildingsPage";
import ClassroomsPage from "../pages/ClassroomsPage";

import UsersPage from "../pages/UsersPage";

import NotificationsPage from "../pages/NotificationsPage";
import FiledNotificationsPage from "../pages/FiledNotificationsPage";
import SelectedNotificationPage from "../pages/SelectedNotificationPage";

import NotFoundPage from "../pages/404Page";

export const AppRouter = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Routes>
            <Route element={isLoggedIn ? <MainLayout /> : <HeaderOnlyLayout />}>
                <Route path="/" element={<HomePage />} />

                {isLoggedIn && (
                    <>
                        <Route path="devices" element={<DevicesPage />} />
                        <Route path="device/:id" element={<SelectedDevicePage />} />

                        <Route path="buildings" element={<BuildingsPage />} />
                        <Route path="/classrooms/:id" element={<ClassroomsPage />} />

                        <Route path="/users" element={<UsersPage />} />

                        <Route path="/notifications" element={<NotificationsPage />} />
                        <Route path="/filed-notifications" element={<FiledNotificationsPage />} />
                        <Route path="/notification/:id" element={<SelectedNotificationPage />} />
                    </>
                )}

                {!isLoggedIn && (
                    <>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/recover-account" element={<RecoverAccountPage />} />
                        <Route path="/recover-password" element={<ChangePasswordRecoverPage />} />
                    </>
                )}
                
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};