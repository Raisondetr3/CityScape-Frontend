import React from 'react';
import Header from '../components/Header/AdminHeader';
import MainButtonsCity from '../components/MainButtons/MainButtonsCity';
import '../styles/Main.css';

function AdminCityPage({ onLogout, role }) {
    return (
        <div className="admin-container">
            <Header onLogout={onLogout} />
            <MainButtonsCity role={role} />
        </div>
    );
}

export default AdminCityPage;


