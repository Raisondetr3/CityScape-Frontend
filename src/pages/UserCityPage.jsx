import React from 'react';
import Header from '../components/Header/UserHeader';
import MainButtonsCity from '../components/Buttons/MainButtons/MainButtonsCity';
import '../styles/Main.css';

function UserCityPage({ onLogout, onRequestAdmin, role }) {
    return (
        <div className="admin-container">
            <Header onLogout={onLogout} onRequestAdmin={onRequestAdmin} />
            <MainButtonsCity role={role} />
        </div>
    );
}

export default UserCityPage;



