import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminCityPage from './pages/AdminCityPage';
import UserCityPage from './pages/UserCityPage';
import HelloPage from './pages/HelloPage';
import NotFound from './pages/NotFound';

const App = () => {
    const { user, role, logout, requestAdminRole } = useContext(UserContext);

    return (
        <div className="app-container">
            <Routes>
                <Route path="/" element={<HelloPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={role === 'ADMIN' ?
                    <AdminCityPage onLogout={logout} />
                    : <Navigate to="/login" />} />
                <Route path="/user" element={user ?
                    <UserCityPage onLogout={logout} onRequestAdmin={requestAdminRole} /> :
                    <Navigate to="/login" />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default App;
