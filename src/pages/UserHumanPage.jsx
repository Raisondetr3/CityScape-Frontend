import React from 'react';
import Header from '../components/Header/UserHeader';
import MainButtonsHuman from '../components/Buttons/MainButtons/MainButtonsHuman';
import '../styles/Main.css';
import SearchBar from "../components/SearchBar/SearchBar";

function UserHumanPage({ onLogout, onRequestAdmin, role }) {
    return (
        <div className="admin-container">
            <Header onLogout={onLogout} onRequestAdmin={onRequestAdmin} />
            <MainButtonsHuman role={role} />
            <div className="search-bar-wrapper">
                <SearchBar placeholder="Искать по name" />
            </div>
        </div>
    );
}

export default UserHumanPage;