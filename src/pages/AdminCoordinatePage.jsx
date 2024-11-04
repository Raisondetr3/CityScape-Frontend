import React from 'react';
import Header from '../components/Header/AdminHeader';
import MainButtonsCoordinate from '../components/Buttons/MainButtons/MainButtonsCoordinate';
import '../styles/Main.css';

function AdminCoordinatePage({ onLogout, role }) {
    return (
        <div className="admin-container">
            <Header onLogout={onLogout} />
            <MainButtonsCoordinate role={role} />
        </div>
    );
}

export default AdminCoordinatePage;