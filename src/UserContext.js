import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userData = parseJwt(token);
            setUser(userData);
            setRole(userData.role);
        }
    }, []);

    const login = (token) => {
        const userData = parseJwt(token);
        setUser(userData);
        setRole(userData.role);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUser(null);
        setRole(null);
        localStorage.removeItem('token');
    };

    const parseJwt = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
                .join('')
        );
        return JSON.parse(jsonPayload);
    };

    return (
        <UserContext.Provider value={{ user, role, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
