import React, { createContext, useState, useEffect, useCallback } from 'react';
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
            fetchCurrentUser(); // Загружаем данные текущего пользователя с сервера
        }
    }, []);

    const saveCurrentPath = (path) => {
        localStorage.setItem('currentPath', path);
    };

    const fetchCurrentUser = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch(`${process.env.REACT_APP_AUTH}/current`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Не удалось загрузить данные текущего пользователя.');
            }

            const userData = await response.json();
            console.log('Fetched user data:', userData);
            setUser(userData);
            setRole(userData.role);
        } catch (error) {
            console.error('Ошибка при получении текущего пользователя:', error);
            logout(); // Если запрос не удался, выполняем выход
        }
    };

    const login = (token) => {
        const userData = parseJwt(token);
        setUser(userData);
        setRole(userData.role);
        localStorage.setItem('token', token);

        fetchCurrentUser(); // Загружаем актуальные данные с сервера

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
        return JSON.parse(jsonPayload);
    };

    const requestAdminRole = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_AUTH}/request-admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ userId }),
            });

            if (!response.ok) {
                throw new Error("Ошибка при отправке заявки");
            }

            const message = await response.text();

            if (message.includes("Пользователю немедленно предоставлены права ADMIN")) {
                setRole('ADMIN');
            } else if (message.includes("Admin approval requested")) {
                setRequestStatus('pending');
                setHasRequestedAdminRole(true);
            }
        } catch (error) {
            console.error('Ошибка при запросе на роль администратора:', error);
            throw error;
        }
    };

    const checkRequestStatus = useCallback(async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_AUTH}/admin-requests/status?userId=${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const status = await response.text();

            if (status.includes("ожидании")) {
                setRequestStatus('pending');
                setHasRequestedAdminRole(true);
            } else {
                setRequestStatus(null);
                setHasRequestedAdminRole(false);
            }
        } catch (error) {
            console.error("Ошибка при получении статуса заявки на администратора:", error);
        }
    }, []);

    const updateUser = async (updatedData) => {
        try {
            // Шаг 1: Отправляем запрос на обновление пользователя
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_AUTH}/current`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Ошибка при обновлении данных пользователя');
            }

            // Шаг 2: Получаем новый токен и данные пользователя
            const { token: newToken, user: updatedUser } = await response.json();

            // Шаг 3: Сохраняем новый токен
            localStorage.setItem('token', newToken);

            // Шаг 4: Обновляем состояние пользователя
            setUser(updatedUser);

            // Уведомляем пользователя об успешном обновлении
            alert('Имя пользователя успешно обновлено.');
        } catch (error) {
            // Обрабатываем ошибки
            if (error.message.includes('already exists')) {
                alert('Имя пользователя уже занято. Попробуйте другое.');
            } else if (error.message.includes('Validation failed')) {
                alert('Некорректное имя пользователя. Проверьте формат.');
            } else {
                alert('Не удалось обновить имя пользователя.');
            }
            console.error('Ошибка при обновлении имени пользователя:', error);
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
            checkRequestStatus,
            updateUser,
            saveCurrentPath,
        }}>
            {children}
        </UserContext.Provider>
    );
};