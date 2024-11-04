import React from 'react';
import Header from '../components/Header/UserHeader';
import MainButtonsCity from '../components/Buttons/MainButtons/MainButtonsCity';
import '../styles/Main.css';
import SearchBar from "../components/SearchBar/SearchBar";

function UserCityPage({ onLogout, onRequestAdmin, role }) {
    return (
        <div className="admin-container">
            <Header onLogout={onLogout} onRequestAdmin={onRequestAdmin} />
            <MainButtonsCity role={role} />
            <div className="search-bar-wrapper">
                <SearchBar placeholder="Искать по name" />
            </div>
        </div>
    );
}

export default UserCityPage;



