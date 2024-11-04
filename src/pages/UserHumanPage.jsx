import React from 'react';
import Header from '../components/Header/UserHeader';
import MainButtonsHuman from '../components/Buttons/MainButtons/MainButtonsHuman';
import '../styles/Main.css';

function UserCityPage({ onLogout, onRequestAdmin, role }) {
    return (
        <div className="admin-container">
            <Header onLogout={onLogout} onRequestAdmin={onRequestAdmin} />
            <MainButtonsHuman role={role} />
        </div>
    );
}

export default UserCityPage;