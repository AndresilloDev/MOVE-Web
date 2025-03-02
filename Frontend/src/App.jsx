import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersScreen from "./screens/UsersScreen";
import SensorCard from "./components/SensorCard";
import ChangePasswordRecoverScreen from "./screens/ChangePasswordRecoverScreen";
import './App.css';

function App() {
    return (
        <Router>
            <div>
                <h1 className="text-3xl font-bold underline">
                    esta noche oscura te tortura la locura procura estar a mi altura aunque baja es tu estatura
                </h1>
                <SensorCard />
                <Routes>
                    <Route path="/" element={<UsersScreen />} />
                    <Route path="/recover-password" element={<ChangePasswordRecoverScreen />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
