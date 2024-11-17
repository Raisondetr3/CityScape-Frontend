import React from 'react';
import Header from '../components/Headers/AdminHeader';
import MainButtonsCoordinates from '../components/Buttons/MainButtons/MainButtonsCoordinates';
import '../styles/Main.css';

function AdminCoordinatePage({ onLogout, role }) {
    return (
        <div className="main-container">
            <Header onLogout={onLogout} />
            <MainButtonsCoordinates role={role} />
        </div>
    );
}

export default AdminCoordinatePage;