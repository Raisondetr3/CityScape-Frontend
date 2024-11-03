// App.js
import React, { useContext } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './styles/App.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import HelloPage from './pages/HelloPage';
import NotFound from './pages/NotFound';
import Header from './components/Header/Header';

const App = () => {
    const { user, role, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="app-container">
            {/* Условный рендеринг Header: показываем только если пользователь авторизован */}
            {user && <Header onLogout={handleLogout} />}

            <Routes>
                <Route path="/" element={<HelloPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={role === 'ADMIN' ? <AdminPage /> : <Navigate to="/login" />} />
                <Route path="/user" element={user ? <UserPage /> : <Navigate to="/login" />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default App;
