import React, { useState } from 'react';
import requestsIcon from '../../assets/admin-requests-icon.svg';
import LogoutButton from '../Buttons/LogoutButton/LogoutButton';
import AdminRequestsDropdown from '../AdminRequests/AdminRequestsDropdown';
import './Header.css';

const Header = ({ onLogout }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    return (
        <header className="header">
            <h1 className="header-title">Admin Dashboard</h1>
            <div className="header-actions">
                <div className="icon-container" onClick={toggleDropdown}>
                    <img
                        src={requestsIcon}
                        alt="Admin Requests"
                        className="header-icon"
                    />
                    <span className="tooltip">Просмотреть заявки на права ADMIN</span>
                    <AdminRequestsDropdown isVisible={isDropdownVisible} />
                </div>
                <LogoutButton onLogout={onLogout} />
            </div>
        </header>
    );
};

export default Header;
