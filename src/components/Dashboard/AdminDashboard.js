import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Перенаправляем на страницу логина после выхода
    };

    return (
        <div>
            <h1>Административная панель</h1>
            <p>Здесь отображаются данные для администратора.</p>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    );
};

export default AdminDashboard;
