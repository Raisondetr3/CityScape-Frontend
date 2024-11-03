import React from 'react';
import Header from '../components/Header/AdminHeader';
import MainButtonsHuman from '../components/MainButtons/MainButtonsHuman';
import '../styles/Main.css';

function AdminCityPage({ onLogout, role }) {
    return (
        <div className="admin-container">
            <Header onLogout={onLogout} />
            <MainButtonsHuman role={role} />
        </div>
    );
}

export default AdminCityPage;