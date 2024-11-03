import React from 'react';
import logoutIcon from '../../assets/logout-icon.svg';
import './LogoutButton.css';

const LogoutButton = ({ onLogout }) => {
    return (
        <button className="logout-button" onClick={onLogout}>
            <img src={logoutIcon} alt="Logout" className="logout-icon" />
            Выйти
        </button>
    );
};

export default LogoutButton;