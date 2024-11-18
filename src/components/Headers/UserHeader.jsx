import React, { useContext, useEffect, useState } from 'react';
import addAdminIcon from '../../assets/add-admin.svg';
import LogoutButton from '../Buttons/LogoutButton/LogoutButton';
import './Header.css';
import { UserContext } from '../../UserContext';

const UserHeader = ({ onLogout }) => {
    const { user, updateUser, requestStatus, requestAdminRole, checkRequestStatus } = useContext(UserContext);
    const [showTooltip, setShowTooltip] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState(user?.username || '');

    useEffect(() => {
        if (user) {
            setNewUsername(user.username);
            checkRequestStatus(user.id);
        }
    }, [user, checkRequestStatus]);


    const handleRequestAdmin = async () => {
        if (requestStatus === 'pending') {
            alert("Вы уже отправили заявку, и она находится на рассмотрении.");
        } else {
            try {
                await requestAdminRole(user.id);
                alert("Заявка на получение прав администратора отправлена.");
            } catch (error) {
                alert("Произошла ошибка при отправке заявки на права ADMIN.");
                console.error("Ошибка при запросе прав ADMIN:", error);
            }
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);
    };

    const handleSaveUsername = async () => {
        if (newUsername.trim() === '') {
            alert('Имя пользователя не может быть пустым.');
            return;
        }

        try {
            const updatedData = { username: newUsername };
            await updateUser(updatedData);
            setIsEditing(false);
        } catch (error) {
            if (error.message === "Имя пользователя уже занято.") {
                alert("Имя пользователя уже занято. Попробуйте другое.");
            } else if (error.message === "Некорректное имя пользователя.") {
                alert("Некорректное имя пользователя. Проверьте формат.");
            } else {
                alert("Не удалось обновить имя пользователя.");
            }
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
            <h1 className="header-title">User Dashboard</h1>
            <div className="header-actions">
                <div
                    className="icon-container"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <img
                        src={addAdminIcon}
                        alt="Request Admin Access"
                        className="header-icon"
                        onClick={handleRequestAdmin}
                    />
                    {showTooltip && (
                        <div className="tooltip">Отправить заявку на получение прав ADMIN</div>
                    )}
                </div>
                <LogoutButton onLogout={onLogout} />
            </div>
        </header>
    );
};

export default UserHeader;
