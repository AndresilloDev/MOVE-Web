import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersScreen from "./screens/UsersScreen";
import SensorCard from "./components/SensorCard";
import ChangePasswordRecoverScreen from "./screens/ChangePasswordRecoverScreen";
import ClassroomsPage from "./pages/ClassroomsPage"; 
import './App.css';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<UsersScreen />} />
                    <Route path="/recover-password" element={<ChangePasswordRecoverScreen />} />
                    <Route path="/classrooms" element={<ClassroomsPage />} /> 
                </Routes>
            </div>
        </Router>
    );
}

export default App;