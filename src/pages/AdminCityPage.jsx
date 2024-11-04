import React from 'react';
import Header from '../components/Header/AdminHeader';
import MainButtonsCity from '../components/Buttons/MainButtons/MainButtonsCity';
import SearchBar from '../components/SearchBar/SearchBar';
import '../styles/Main.css';

function AdminCityPage({ onLogout, role }) {
    return (
        <div className="admin-container">
            <Header onLogout={onLogout} />
            <MainButtonsCity role={role} />
            <div className="search-bar-wrapper">
                <SearchBar placeholder="Искать по name" />
            </div>
        </div>
    );
}

export default AdminCityPage;
