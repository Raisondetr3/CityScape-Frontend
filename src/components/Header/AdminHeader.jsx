import React from 'react';
import requestsIcon from '../../assets/admin-requests-icon.svg';
import LogoutButton from './LogoutButton';
import './Header.css';

const Header = ({ onLogout }) => {
    return (
        <header className="header">
            <h1 className="header-title">Admin Dashboard</h1>
            <div className="header-actions">
                <img
                    src={requestsIcon}
                    alt="Admin Requests"
                    className="header-icon"
                />
                <LogoutButton onLogout={onLogout} />
            </div>
        </header>
    );
};

export default Header;
