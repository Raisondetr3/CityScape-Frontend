import React, { useContext, useEffect, useState } from 'react';
import requestsIcon from '../../assets/admin-requests-icon.svg';
import LogoutButton from '../Buttons/LogoutButton/LogoutButton';
import AdminRequestsDropdown from '../AdminRequests/AdminRequestsDropdown';
import './Header.css';
import { UserContext } from '../../UserContext';

const AdminHeader = ({ onLogout }) => {
    const { user, updateUser } = useContext(UserContext);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState(user?.username || '');
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        if (user) {
            setNewUsername(user.username); // Устанавливаем начальное имя пользователя
        }
    }, [user]);

    const toggleDropdown = () => {
        console.log('Переключение видимости дропдауна:', !isDropdownVisible);
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);
    };

    const handleSaveUsername = async () => {
        if (newUsername.trim() === '') {
            alert("Имя пользователя не может быть пустым.");
            return;
        }

        try {
            await updateUser({ username: newUsername });
            alert("Имя пользователя успешно обновлено.");
            setIsEditing(false); // Завершаем редактирование
        } catch (error) {
            // Обрабатываем возможные ошибки
            if (error.response?.status === 409) {
                alert("Имя пользователя уже занято. Попробуйте другое.");
            } else if (error.response?.status === 400) {
                alert("Некорректное имя пользователя. Проверьте формат.");
            } else {
                alert("Не удалось обновить имя пользователя.");
            }
            console.error("Ошибка при обновлении имени пользователя:", error);
        }
    };

    return (
        <header className="header">
            <div className="username-container">
                {isEditing ? (
                    <div className="username-edit-container">
                        <input
                            type="text"
                            value={newUsername}
                            onChange={handleUsernameChange}
                            className="username-input"
                        />
                        <button onClick={handleSaveUsername} className="save-username-button">
                            Сохранить
                        </button>
                    </div>
                ) : (
                    <span
                        className="username-display"
                        onClick={handleEditClick}
                        title="Нажмите, чтобы изменить имя пользователя"
                    >
                        {user?.username || "Загрузка..."}
                    </span>
                )}
            </div>
            <h1 className="header-title">Admin Dashboard</h1>
            <div className="header-actions">
                <div
                    className="icon-container"
                    onClick={toggleDropdown}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <img
                        src={requestsIcon}
                        alt="Admin Requests"
                        className="header-icon"
                    />
                    {showTooltip && (
                        <div className="tooltip">Просмотреть заявки на права ADMIN</div>
                    )}
                </div>
                {isDropdownVisible && <AdminRequestsDropdown isVisible={isDropdownVisible} />}
                <LogoutButton onLogout={onLogout} />
            </div>
        </header>
    );
};

export default AdminHeader;
