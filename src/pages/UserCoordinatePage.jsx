import React from 'react';
import Header from '../components/Header/UserHeader';
import MainButtonsCoordinate from '../components/MainButtons/MainButtonsCoordinate';
import '../styles/Main.css';

function UserCityPage({ onLogout, onRequestAdmin, role }) {
    return (
        <div className="admin-container">
            <Header onLogout={onLogout} onRequestAdmin={onRequestAdmin} />
            <MainButtonsCoordinate role={role} />
        </div>
    );
}

export default UserCityPage;