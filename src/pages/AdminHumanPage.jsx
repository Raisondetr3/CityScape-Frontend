import React from 'react';
import Header from '../components/Header/AdminHeader';
import MainButtonsHuman from '../components/Buttons/MainButtons/MainButtonsHuman';
import '../styles/Main.css';
import SearchBar from "../components/SearchBar/SearchBar";

function AdminHumanPage({ onLogout, role }) {
    return (
        <div className="admin-container">
            <Header onLogout={onLogout} />
            <MainButtonsHuman role={role} />
            <div className="search-bar-wrapper">
                <SearchBar placeholder="Искать по name" />
            </div>
        </div>
    );
}

export default AdminHumanPage;