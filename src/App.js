import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminCityPage from './pages/AdminCityPage';
import AdminHumanPage from './pages/AdminHumanPage';
import AdminCoordinatePage from './pages/AdminCoordinatePage';
import UserCityPage from './pages/UserCityPage';
import UserHumanPage from './pages/UserHumanPage';
import UserCoordinatePage from './pages/UserCoordinatePage';
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

                {/* Default redirect for /admin and /user */}
                <Route path="/admin" element={<Navigate to="/admin/city" replace />} />
                <Route path="/user" element={<Navigate to="/user/city" replace />} />

                {/* Admin routes */}
                <Route path="/admin/city" element={role === 'ADMIN' ? <AdminCityPage onLogout={logout} role={role} /> : <Navigate to="/login" />} />
                <Route path="/admin/human" element={role === 'ADMIN' ? <AdminHumanPage onLogout={logout} role={role} /> : <Navigate to="/login" />} />
                <Route path="/admin/coordinate" element={role === 'ADMIN' ? <AdminCoordinatePage onLogout={logout} role={role} /> : <Navigate to="/login" />} />

                {/* User routes */}
                <Route path="/user/city" element={user ? <UserCityPage onLogout={logout} onRequestAdmin={requestAdminRole} role={role} /> : <Navigate to="/login" />} />
                <Route path="/user/human" element={user ? <UserHumanPage onLogout={logout} onRequestAdmin={requestAdminRole} role={role} /> : <Navigate to="/login" />} />
                <Route path="/user/coordinate" element={user ? <UserCoordinatePage onLogout={logout} onRequestAdmin={requestAdminRole} role={role} /> : <Navigate to="/login" />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default App;
