import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <div className="app-container">
                    <nav>
                        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                    </nav>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </Router>
        </UserProvider>
    );
};

export default App;
