import React, { useContext } from 'react';
import { Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './App.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import HelloPage from './pages/HelloPage';
import NotFound from './pages/NotFound';

const App = () => {
    const { user, role, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Перенаправление на hello-page после logout
    };

    return (
        <div className="app-container">
            <nav>
                {user ? (
                    <Link to="/" className="cta-button" onClick={handleLogout}>Logout</Link>
                ) : (
                    <>
                        <Link to="/login" className="cta-button">Login</Link> | <Link to="/register" className="cta-button">Register</Link>
                    </>
                )}
            </nav>
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
