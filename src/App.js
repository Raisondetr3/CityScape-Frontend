import React, { useContext, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminCityPage from './pages/AdminCityPage';
import AdminHumanPage from './pages/AdminHumanPage';
import AdminCoordinatesPage from './pages/AdminCoordinatesPage';
import UserCityPage from './pages/UserCityPage';
import UserHumanPage from './pages/UserHumanPage';
import UserCoordinatesPage from './pages/UserCoordinatesPage';
import HelloPage from './pages/HelloPage';
import NotFound from './pages/NotFound';

const App = () => {
    const { user, role, logout, saveCurrentPath } = useContext(UserContext);
    const location = useLocation();

    useEffect(() => {
        // Сохраняем текущий путь в localStorage
        saveCurrentPath(location.pathname);
    }, [location, saveCurrentPath]);

    return (
        <div className="app-container">
            <Routes>
                <Route path="/" element={<HelloPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Default redirect for /admin and /user */}
                <Route path="/admin" element={<Navigate to="/admin/city" replace />} />
                <Route path="/user" element={<Navigate to="/user/city" replace />} />

                {/* Admin routes */}
                <Route path="/admin/city" element={role === 'ADMIN' ? <AdminCityPage onLogout={logout} role={role} /> : <Navigate to="/login" />} />
                <Route path="/admin/human" element={role === 'ADMIN' ? <AdminHumanPage onLogout={logout} role={role} /> : <Navigate to="/login" />} />
                <Route path="/admin/coordinates" element={role === 'ADMIN' ? <AdminCoordinatesPage onLogout={logout} role={role} /> : <Navigate to="/login" />} />

                {/* User routes */}
                <Route path="/user/city" element={user ? <UserCityPage onLogout={logout} role={role} /> : <Navigate to="/login" />} />
                <Route path="/user/human" element={user ? <UserHumanPage onLogout={logout} role={role} /> : <Navigate to="/login" />} />
                <Route path="/user/coordinates" element={user ? <UserCoordinatesPage onLogout={logout} role={role} /> : <Navigate to="/login" />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default App;
