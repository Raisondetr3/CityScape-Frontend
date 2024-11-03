import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [requestStatus, setRequestStatus] = useState(null);
    const [hasRequestedAdminRole, setHasRequestedAdminRole] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userData = parseJwt(token);
            setUser(userData);
            setRole(userData.role);
            if (userData.userId) checkRequestStatus(userData.userId);
        }
    }, []);

    const login = (token) => {
        const userData = parseJwt(token);
        console.log("User data on login:", userData);
        setUser(userData);
        setRole(userData.role);
        localStorage.setItem('token', token);

        if (userData.userId) checkRequestStatus(userData.userId);

        // Перенаправление после установки роли
        if (userData.role === 'ADMIN') {
            navigate('/admin');
        } else {
            navigate('/user');
        }
    };

    const logout = () => {
        setUser(null);
        setRole(null);
        setRequestStatus(null);
        setHasRequestedAdminRole(false);
        localStorage.removeItem('token');
        navigate('/');
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
        const parsedData = JSON.parse(jsonPayload);

        console.log("Decoded JWT payload:", parsedData);

        return {
            ...parsedData,
            userId: parsedData.userId || parsedData.sub,
        };
    };

    const requestAdminRole = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/request-admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ userId }),
            });
            const message = await response.text();
            setRequestStatus('pending');
            setHasRequestedAdminRole(true);
            return message;
        } catch (error) {
            console.error('Ошибка при запросе на роль администратора', error);
        }
    };

    const checkRequestStatus = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin-requests/status?userId=${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const status = await response.text();

            if (status === "Ваша заявка на администратора находится в ожидании." || status === "Ваша заявка одобрена." || status === "Ваша заявка отклонена.") {
                setRequestStatus('pending');
                setHasRequestedAdminRole(true);
            } else {
                setRequestStatus(null);
                setHasRequestedAdminRole(false);
            }
        } catch (error) {
            console.error("Ошибка при получении статуса заявки на администратора:", error);
        }
    };

    return (
        <UserContext.Provider value={{
            user,
            role,
            login,
            logout,
            requestAdminRole,
            requestStatus,
            hasRequestedAdminRole,
            checkRequestStatus }}>
            {children}
        </UserContext.Provider>
    );

};
