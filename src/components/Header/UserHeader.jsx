import React, { useContext, useEffect, useState } from 'react';
import addAdminIcon from '../../assets/add-admin.svg';
import LogoutButton from '../Buttons/LogoutButton/LogoutButton';
import './Header.css';
import { UserContext } from '../../UserContext';

const UserHeader = ({ onLogout }) => {
    const { user, requestStatus, requestAdminRole, checkRequestStatus } = useContext(UserContext);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        if (user) {
            checkRequestStatus(user.userId);
        }
    }, [user, checkRequestStatus]);

    const handleRequestAdmin = () => {
        if (requestStatus === 'pending') {
            alert("Вы уже отправили заявку, и она находится на рассмотрении.");
        } else if (requestStatus === 'rejected') {
            requestAdminRole(user.userId);
            alert("Ваша заявка на получение прав администратора отклонена.");
        } else if (requestStatus === 'none') {
            requestAdminRole(user.userId);
            alert("Заявка на получение прав администратора");
        } else {
            requestAdminRole(user.userId);
            alert("Заявка на получение прав администратора одобрена." +
                " Перезайдите в аккаунт, чтобы перейти на `Admin Dashboard`");
        }
    };

    return (
        <header className="header">
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
