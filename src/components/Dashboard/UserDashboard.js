import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <h1>Панель пользователя</h1>
            <p>Здесь отображаются данные для обычного пользователя.</p>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    );
};

export default UserDashboard;
